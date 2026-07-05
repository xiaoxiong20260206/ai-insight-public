// 生成Word文档 - AI助手平台使用体验文章（含图片）
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
        LevelFormat, ImageRun } = require('docx');
const fs = require('fs');
const path = require('path');

// 配置
const pageWidth = 12240;
const contentWidth = 9360;
const imagesDir = path.join(__dirname, 'docs', 'images');

// 辅助函数：读取图片
function createImage(filename, width = 580, height = 300) {
  const imagePath = path.join(imagesDir, filename);
  if (!fs.existsSync(imagePath)) {
    console.warn(`警告: 图片不存在 - ${filename}`);
    return new Paragraph({ children: [new TextRun({ text: `[图片: ${filename}]`, italics: true, color: "999999" })] });
  }
  
  const imageBuffer = fs.readFileSync(imagePath);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 120 },
    children: [
      new ImageRun({
        type: 'png',
        data: imageBuffer,
        transformation: { width, height },
        altText: { title: filename, description: filename, name: filename }
      })
    ]
  });
}

// 辅助函数：创建表格
function createTable(data) {
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  
  const rows = data.map((row, rowIndex) => {
    return new TableRow({
      children: row.map(cell => new TableCell({
        borders,
        width: { size: Math.floor(contentWidth / row.length), type: WidthType.DXA },
        shading: rowIndex === 0 ? { fill: "f8f9fa", type: ShadingType.CLEAR } : undefined,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ 
          children: [new TextRun({ text: cell, bold: rowIndex === 0 })] 
        })]
      }))
    });
  });

  return new Table({
    width: { size: contentWidth, type: WidthType.DXA },
    columnWidths: data[0].map(() => Math.floor(contentWidth / data[0].length)),
    rows
  });
}

function createCodeBlock(text) {
  return new Paragraph({
    shading: { fill: "f8f9fa", type: ShadingType.CLEAR },
    spacing: { before: 120, after: 120 },
    children: [new TextRun({ text, font: "Consolas", size: 20 })]
  });
}

function createTip(text) {
  return new Paragraph({
    shading: { fill: "dbeafe", type: ShadingType.CLEAR },
    border: { left: { style: BorderStyle.SINGLE, size: 24, color: "3b82f6" } },
    spacing: { before: 120, after: 120 },
    children: [new TextRun({ text, size: 22 })]
  });
}

// 创建文档
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Microsoft YaHei", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 44, bold: true, font: "Microsoft YaHei", color: "1a1a1a" },
        paragraph: { spacing: { before: 360, after: 240 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Microsoft YaHei", color: "667eea" },
        paragraph: { spacing: { before: 300, after: 180 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Microsoft YaHei", color: "333333" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: { size: { width: pageWidth, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // 标题
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: "\uD83D\uDD25 一周体验：我用 AI助手平台 写代码、做PPT、搞调研、发部署", bold: true })] }),
      new Paragraph({ children: [new TextRun({ text: "差点以为自己有了助理", bold: true, size: 32, color: "667eea" })] }),
      
      // 引言
      new Paragraph({ spacing: { before: 240 }, shading: { fill: "f8f9fa", type: ShadingType.CLEAR }, border: { left: { style: BorderStyle.SINGLE, size: 24, color: "667eea" } }, children: [
        new TextRun({ text: "很多同学可能还停留在 AI助手平台 = AI编程助手 的认知上。今天我想分享一下过去几周的真实体验：" }),
        new TextRun({ text: "AI助手平台 远不止写代码，它帮我完成了产品设计、PPT制作、文档审校、网站部署等各种任务", bold: true }),
        new TextRun({ text: "，体验下来真的有点像 Manus —— 一个能帮你做各种事情的 AI 助手。" })
      ]}),

      // 场景分类
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\uD83D\uDCCA 我用 AI助手平台 做过的事情分类")] }),
      createImage('08-category-overview.png', 580, 320),
      createTable([
        ["类别", "具体场景", "项目数量"],
        ["\uD83D\uDDA5\uFE0F 开发类", "前端开发、可视化、UI设计", "5+"],
        ["\uD83D\uDCC4 文档类", "文档审校、文案撰写、技术调研", "5+"],
        ["\uD83C\uDFA8 创意类", "PPT制作、配图生成", "2+"],
        ["\uD83D\uDE80 运维类", "网站部署、性能优化", "3+"],
        ["\uD83E\uDDE0 产品能力", "记忆功能、多任务并行", "2"]
      ]),

      // 开发类场景
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\uD83D\uDDA5\uFE0F 开发类场景")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("案例1：D3.js 关系图可视化开发")] }),
      new Paragraph({ children: [new TextRun({ text: "背景：", bold: true }), new TextRun("我需要创建一个交互式关系图，展示48个工作任务和9种Agent类型的关系。")] }),
      createImage('01-d3-conversation.png', 580, 380),
      createCodeBlock("第一步：帮我实现一个关系图可视化功能\n第二步：添加缩放控制功能\n第三步：节点有点挤，调整一下布局"),
      new Paragraph({ children: [new TextRun({ text: "AI助手平台 做了什么：", bold: true }), new TextRun("自动创建了 D3.js 力导向图，添加了缩放控件和交互逻辑。")] }),
      createTip("\uD83D\uDCA1 学习要点：不需要一次性描述清楚所有需求，可以先给大方向，然后逐步迭代细化。"),

      // 文档类场景
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\uD83D\uDCC4 文档类场景")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("案例4：技术文档审校")] }),
      createImage('07-doc-review.png', 580, 300),
      new Paragraph({ children: [new TextRun("AI助手平台 发现了1处描述错误、1处格式错误，并验证了核心数据计算的正确性。")] }),
      createTip("\uD83D\uDCA1 学习要点：AI助手平台 不仅能找错别字，还能验证数据计算、检查逻辑一致性。"),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("案例7：Agent 架构技术调研")] }),
      createCodeBlock("第一步：帮我调研业界主流的 Agent 架构设计\n第二步：重点分析编排层设计\n第三步：设计一个6层的 Agent Infra 理想架构"),
      createImage('09-agent-research.png', 580, 380),
      new Paragraph({ children: [new TextRun("最终生成了完整的6层架构设计页面，包含30+核心组件。")] }),
      createTip("\uD83D\uDCA1 学习要点：调研类任务可以分步骤进行，先广度后深度，最后生成可交付成果。"),

      // 创意类场景
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\uD83C\uDFA8 创意类场景")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("案例8：专业 PPT 制作")] }),
      new Paragraph({ children: [new TextRun("AI助手平台 分析项目内容、设计配色、创建8页幻灯片，生成了221KB的专业演示文稿。")] }),
      createImage('04-ppt-preview.png', 580, 320),
      createTip("\uD83D\uDCA1 学习要点：AI助手平台 可以直接生成 .pptx 文件，不只是给你代码。"),

      // 运维类场景
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\uD83D\uDE80 运维类场景")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("案例9：多平台网站部署")] }),
      new Paragraph({ children: [new TextRun("AI助手平台 依次尝试了 Gitee Pages → 腾讯云 → Cloudflare → "), new TextRun({ text: "GitHub Pages（成功！）", bold: true })] }),
      createImage('03-deploy-flow.png', 580, 280),
      createTip("\uD83D\uDCA1 学习要点：遇到问题时，AI助手平台 会自动尝试替代方案。"),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("案例10：网站性能优化")] }),
      createImage('02-performance-comparison.png', 580, 300),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("图片：16 MB → 483 KB（减少 97%）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("CSS：130 KB → 95 KB（减少 27%）")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("JS：63 KB → 34 KB（减少 46%）")] }),

      // 产品能力场景
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\uD83E\uDDE0 产品能力场景")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("案例11：记忆功能 —— 越用越懂我")] }),
      createImage('10-memory-feature.png', 580, 320),
      new Paragraph({ children: [new TextRun("当我说「帮我创建一个 PPT」时，AI助手平台 会根据我之前做过的项目自动推荐主题！")] }),
      createTip("\uD83D\uDCA1 学习要点：多用几次，AI助手平台 会越来越懂你，效率越来越高。"),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("案例12：Duet Space 模式 —— 多任务并行")] }),
      createImage('11-duet-space.png', 580, 340),
      new Paragraph({ children: [new TextRun("我开了3个会话窗口同时处理：性能优化 + 创建PPT + 部署GitHub")] }),
      new Paragraph({ children: [new TextRun("传统串行：65分钟 → "), new TextRun({ text: "Duet并行：25分钟", bold: true }), new TextRun("，节省60%+时间")] }),
      createTip("\uD83D\uDCA1 学习要点：复杂任务拆分成多个会话并行执行，像有多个助理同时帮你干活。"),

      // 案例13：Skills技能系统
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("案例13：Skills 技能系统 —— 让 AI 掌握专业技能")] }),
      createImage('12-skills-system.png', 580, 380),
      new Paragraph({ children: [new TextRun({ text: "背景：", bold: true }), new TextRun("AI助手平台 有一个强大的 Skills 技能系统，可以安装各种专业技能包。")] }),
      new Paragraph({ children: [new TextRun({ text: "我安装的技能包（16个）：", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("📄 文档类：docx, pptx, pdf, xlsx")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("🎨 设计类：frontend-design, canvas-design")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("🔧 开发类：mcp-builder, webapp-testing")] }),
      new Paragraph({ children: [new TextRun({ text: "效果对比：", bold: true })] }),
      new Paragraph({ children: [new TextRun("❌ 没有技能：生成HTML代码，需要自己转换")] }),
      new Paragraph({ children: [new TextRun("✅ 安装pptx技能："), new TextRun({ text: "直接生成 .pptx 文件！", bold: true })] }),
      createTip("\uD83D\uDCA1 学习要点：安装专业技能包，让 AI助手平台 在特定领域表现得像专家一样专业。"),

      // 总结
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\uD83C\uDF93 总结：如何用好 AI助手平台")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "不要局限于写代码", bold: true }), new TextRun(" —— 它能做PPT、审校文档、部署网站、技术调研...")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "学会渐进式交互", bold: true }), new TextRun(" —— 先给大方向，然后逐步迭代")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "遇到问题不要放弃", bold: true }), new TextRun(" —— AI助手平台 会自动尝试替代方案")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "善用继续和进一步", bold: true }), new TextRun(" —— 它会继续深入优化")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "让它学习特定风格", bold: true }), new TextRun(" —— 先分析目标风格，再按风格创作")] }),

      // 最后
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\uD83D\uDE80 最后")] }),
      new Paragraph({ children: [new TextRun("这篇文章本身，也是用 AI助手平台 帮我写的 \uD83D\uDE04")] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "这就是 AI助手平台 的能力 —— 不只是编码，更是你的 AI 工作伙伴。", bold: true, size: 28 })] }),

      // CTA
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("\uD83C\uDF81 立即体验")] }),
      new Paragraph({ children: [new TextRun({ text: "心动不如行动，以下是获取 AI助手平台 的方式：", bold: true })] }),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "\uD83D\uDCE5 下载安装：", bold: true }), new TextRun("https://www.cf.ai/download")] }),
      new Paragraph({ children: [new TextRun({ text: "\uD83C\uDF10 官网：", bold: true }), new TextRun("https://www.cf.ai")] }),
      new Paragraph({ children: [new TextRun({ text: "\uD83D\uDCD6 中文教程：", bold: true }), new TextRun("https://www.w3cschool.cn/cfdocs")] }),
      new Paragraph({ spacing: { before: 160 }, children: [new TextRun({ text: "\uD83D\uDCA1 快速上手：", bold: true }), new TextRun("下载安装 → 打开项目 → 按 Cmd/Ctrl + L → 开始对话")] }),

      // 结尾提示
      new Paragraph({ spacing: { before: 240 }, shading: { fill: "fef3c7", type: ShadingType.CLEAR }, children: [new TextRun({ text: "\uD83D\uDD25 友情提示：", bold: true }), new TextRun("第一次用可能会觉得「这也能做？」，多尝试几次，你会发现它能做的远超你的想象！")] }),

      new Paragraph({ spacing: { before: 200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "如果你也有类似的体验，欢迎在评论区分享！", italics: true, color: "666666" })] })
    ]
  }]
});

// 生成文件
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("docs/AI助手平台-不只是编码.docx", buffer);
  console.log("✅ Word文档已生成: docs/AI助手平台-不只是编码.docx");
  console.log("   包含 10 张配图");
});

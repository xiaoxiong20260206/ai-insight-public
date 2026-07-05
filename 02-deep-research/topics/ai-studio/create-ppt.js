// AI Studio - 企业AI工程师产品体系 PPT 生成脚本
// 使用 pptxgenjs 创建专业演示文稿

const pptxgen = require("pptxgenjs");

// 创建演示文稿
let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "AI Studio";
pres.title = "企业AI工程师 - 完整产品体系";
pres.subject = "从场景分析到产品设计，再到技术架构";

// 配色方案 - Midnight Executive
const COLORS = {
  primary: "1E2761",      // 深海军蓝
  primaryLight: "3B5998", // 亮蓝
  secondary: "667EEA",    // 紫蓝
  accent: "00D9FF",       // 青色
  success: "10B981",      // 绿色
  warning: "F59E0B",      // 橙色
  white: "FFFFFF",
  lightGray: "F8FAFC",
  darkGray: "1E293B",
  textPrimary: "1E293B",
  textSecondary: "64748B",
  border: "E2E8F0"
};

// 辅助函数：创建阴影
const makeShadow = () => ({
  type: "outer",
  color: "000000",
  blur: 8,
  offset: 3,
  angle: 135,
  opacity: 0.15
});

// ============================================
// Slide 1: 封面页
// ============================================
let slide1 = pres.addSlide();
slide1.background = { color: COLORS.primary };

// 装饰圆圈
slide1.addShape(pres.shapes.OVAL, {
  x: -1, y: -1, w: 4, h: 4,
  fill: { color: COLORS.secondary, transparency: 80 }
});
slide1.addShape(pres.shapes.OVAL, {
  x: 7, y: 3, w: 5, h: 5,
  fill: { color: COLORS.accent, transparency: 85 }
});

// 标签
slide1.addText("企业AI工程师 · 完整产品体系", {
  x: 0.5, y: 1.5, w: 9, h: 0.4,
  fontSize: 14, color: COLORS.accent, fontFace: "Arial",
  align: "center"
});

// 主标题
slide1.addText("🚀 AI Studio", {
  x: 0.5, y: 2.0, w: 9, h: 1,
  fontSize: 54, bold: true, color: COLORS.white, fontFace: "Arial",
  align: "center"
});

// 副标题
slide1.addText("从用户场景洞察到产品设计，再到技术架构实现\n构建企业级AI数字员工平台的完整方法论", {
  x: 0.5, y: 3.2, w: 9, h: 0.8,
  fontSize: 18, color: COLORS.white, fontFace: "Arial",
  align: "center", transparency: 15
});

// 统计数据
const stats = [
  { value: "48", label: "覆盖工作任务" },
  { value: "9", label: "Agent类型" },
  { value: "6", label: "架构层级" },
  { value: "100%", label: "场景覆盖" }
];

stats.forEach((stat, i) => {
  const x = 1.2 + i * 2.2;
  slide1.addText(stat.value, {
    x: x, y: 4.3, w: 1.8, h: 0.5,
    fontSize: 32, bold: true, color: COLORS.accent, fontFace: "Arial",
    align: "center"
  });
  slide1.addText(stat.label, {
    x: x, y: 4.8, w: 1.8, h: 0.3,
    fontSize: 11, color: COLORS.white, fontFace: "Arial",
    align: "center", transparency: 30
  });
});

// ============================================
// Slide 2: 问题痛点
// ============================================
let slide2 = pres.addSlide();
slide2.background = { color: COLORS.lightGray };

// 标题
slide2.addText("为什么需要统一的AI工程师平台？", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontSize: 28, bold: true, color: COLORS.textPrimary, fontFace: "Arial",
  margin: 0
});

slide2.addText("企业工程师每天面对数十种AI工具，切换成本高、学习曲线陡、最佳实践难以沉淀", {
  x: 0.5, y: 0.9, w: 9, h: 0.4,
  fontSize: 13, color: COLORS.textSecondary, fontFace: "Arial"
});

// 痛点卡片
const painPoints = [
  { icon: "🔀", title: "工具碎片化", desc: "Cursor、ChatGPT、Perplexity...\n几十种AI工具，切换成本极高" },
  { icon: "📚", title: "学习成本高", desc: "每个工具有不同的使用方式\n需要逐一学习掌握" },
  { icon: "🏢", title: "缺乏企业上下文", desc: "通用AI不理解企业内部\n代码库、知识库、技术规范" },
  { icon: "📝", title: "最佳实践未沉淀", desc: "个人经验难以在团队内\n共享和传承" },
  { icon: "🔒", title: "数据安全顾虑", desc: "敏感数据流向外部AI\n存在合规风险" },
  { icon: "😴", title: "被动响应模式", desc: "现有AI只能被动响应\n缺乏主动服务能力" }
];

painPoints.forEach((pain, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.5 + col * 3.1;
  const y = 1.5 + row * 1.9;
  
  // 卡片背景
  slide2.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: 2.9, h: 1.7,
    fill: { color: COLORS.white },
    shadow: makeShadow()
  });
  
  // 图标
  slide2.addText(pain.icon, {
    x: x + 0.15, y: y + 0.15, w: 0.5, h: 0.5,
    fontSize: 24
  });
  
  // 标题
  slide2.addText(pain.title, {
    x: x + 0.15, y: y + 0.65, w: 2.6, h: 0.3,
    fontSize: 13, bold: true, color: COLORS.textPrimary, fontFace: "Arial"
  });
  
  // 描述
  slide2.addText(pain.desc, {
    x: x + 0.15, y: y + 1.0, w: 2.6, h: 0.6,
    fontSize: 10, color: COLORS.textSecondary, fontFace: "Arial"
  });
});

// ============================================
// Slide 3: 解决方案概览
// ============================================
let slide3 = pres.addSlide();
slide3.background = { color: COLORS.white };

// 标题
slide3.addText("三位一体的产品体系", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontSize: 28, bold: true, color: COLORS.textPrimary, fontFace: "Arial",
  margin: 0
});

slide3.addText("从场景分析到产品设计，再到技术实现，构建完整的AI工程师平台解决方案", {
  x: 0.5, y: 0.85, w: 9, h: 0.4,
  fontSize: 13, color: COLORS.textSecondary, fontFace: "Arial"
});

// 三个步骤卡片
const steps = [
  { 
    step: "STEP 1", 
    icon: "🔍", 
    title: "用户场景分析", 
    desc: "深入研究工程师日常工作\n识别48个核心任务\n抽象9种Agent类型",
    color: "3B82F6",
    highlights: ["48个具体工作任务", "25个研发场景", "9种Agent类型覆盖"]
  },
  { 
    step: "STEP 2", 
    icon: "🎨", 
    title: "产品设计与规划", 
    desc: "基于场景分析\n设计AI Studio产品方案\n提出Agentic核心理念",
    color: "10B981",
    highlights: ["从工具到员工的理念", "主动规划+后台执行", "一个入口，智能路由"]
  },
  { 
    step: "STEP 3", 
    icon: "⚙️", 
    title: "技术架构设计", 
    desc: "设计研发Agent Infra\n6层分层设计\n支撑产品落地",
    color: "8B5CF6",
    highlights: ["6层架构分层设计", "能力层核心原子", "Multi-Agent编排"]
  }
];

steps.forEach((s, i) => {
  const x = 0.5 + i * 3.2;
  
  // 卡片背景
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: x, y: 1.4, w: 3.0, h: 4.0,
    fill: { color: COLORS.white },
    line: { color: COLORS.border, width: 1 },
    shadow: makeShadow()
  });
  
  // 顶部色条
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: x, y: 1.4, w: 3.0, h: 0.08,
    fill: { color: s.color }
  });
  
  // 步骤标签
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: x + 0.15, y: 1.6, w: 0.7, h: 0.25,
    fill: { color: COLORS.lightGray }
  });
  slide3.addText(s.step, {
    x: x + 0.15, y: 1.6, w: 0.7, h: 0.25,
    fontSize: 8, bold: true, color: COLORS.textSecondary, fontFace: "Arial",
    align: "center", valign: "middle"
  });
  
  // 图标
  slide3.addText(s.icon, {
    x: x + 0.15, y: 1.95, w: 0.6, h: 0.6,
    fontSize: 28
  });
  
  // 标题
  slide3.addText(s.title, {
    x: x + 0.15, y: 2.55, w: 2.7, h: 0.35,
    fontSize: 14, bold: true, color: COLORS.textPrimary, fontFace: "Arial"
  });
  
  // 描述
  slide3.addText(s.desc, {
    x: x + 0.15, y: 2.95, w: 2.7, h: 0.7,
    fontSize: 10, color: COLORS.textSecondary, fontFace: "Arial"
  });
  
  // 分隔线
  slide3.addShape(pres.shapes.LINE, {
    x: x + 0.15, y: 3.75, w: 2.7, h: 0,
    line: { color: COLORS.border, width: 1 }
  });
  
  // 亮点列表
  s.highlights.forEach((h, j) => {
    slide3.addText("✓ " + h, {
      x: x + 0.15, y: 3.9 + j * 0.35, w: 2.7, h: 0.3,
      fontSize: 10, color: COLORS.textPrimary, fontFace: "Arial"
    });
  });
  
  // 箭头（除最后一个）
  if (i < 2) {
    slide3.addText("→", {
      x: x + 3.0, y: 3.0, w: 0.2, h: 0.5,
      fontSize: 24, color: COLORS.secondary, fontFace: "Arial",
      align: "center", valign: "middle"
    });
  }
});

// ============================================
// Slide 4: 场景分析详情
// ============================================
let slide4 = pres.addSlide();
slide4.background = { color: COLORS.white };

// 顶部色条
slide4.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.08,
  fill: { color: "3B82F6" }
});

slide4.addText("🔍 STEP 1: 用户场景分析", {
  x: 0.5, y: 0.25, w: 9, h: 0.5,
  fontSize: 24, bold: true, color: COLORS.textPrimary, fontFace: "Arial",
  margin: 0
});

slide4.addText("深入研究企业AI工程师日常工作，识别核心任务，抽象Agent类型", {
  x: 0.5, y: 0.75, w: 9, h: 0.35,
  fontSize: 12, color: COLORS.textSecondary, fontFace: "Arial"
});

// 左侧：统计卡片
const analysisStats = [
  { value: "48", label: "总工作任务", color: "3B82F6" },
  { value: "25", label: "研发场景任务", color: "6366F1" },
  { value: "23", label: "非研发场景任务", color: "10B981" },
  { value: "9", label: "Agent类型", color: "8B5CF6" }
];

analysisStats.forEach((stat, i) => {
  const y = 1.3 + i * 1.0;
  
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: y, w: 2.8, h: 0.85,
    fill: { color: COLORS.white },
    line: { color: COLORS.border, width: 1 }
  });
  
  // 左侧色条
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: y, w: 0.06, h: 0.85,
    fill: { color: stat.color }
  });
  
  slide4.addText(stat.value, {
    x: 0.7, y: y + 0.1, w: 1.0, h: 0.4,
    fontSize: 26, bold: true, color: stat.color, fontFace: "Arial"
  });
  
  slide4.addText(stat.label, {
    x: 0.7, y: y + 0.5, w: 2.4, h: 0.25,
    fontSize: 11, color: COLORS.textSecondary, fontFace: "Arial"
  });
});

// 右侧：Agent类型分布
slide4.addShape(pres.shapes.RECTANGLE, {
  x: 3.5, y: 1.3, w: 6.0, h: 4.0,
  fill: { color: COLORS.lightGray }
});

slide4.addText("9种Agent类型及覆盖率", {
  x: 3.7, y: 1.45, w: 5.6, h: 0.35,
  fontSize: 14, bold: true, color: COLORS.textPrimary, fontFace: "Arial"
});

const agents = [
  { name: "💻 Coding Agent", pct: "47%", desc: "AI编程、代码补全、重构" },
  { name: "💬 Chatbot Agent", pct: "15%", desc: "技术问答、知识查询" },
  { name: "⚙️ Workflow Agent", pct: "15%", desc: "代码审查、文档生成" },
  { name: "🔬 Research Agent", pct: "8%", desc: "技术调研、方案分析" },
  { name: "🎨 Design Agent", pct: "4%", desc: "配图生成、UI设计" },
  { name: "📊 Data Agent", pct: "4%", desc: "数据分析、可视化" },
  { name: "📝 Writing Agent", pct: "4%", desc: "文档写作、邮件起草" },
  { name: "🤝 Meeting Agent", pct: "2%", desc: "会议纪要、日程管理" },
  { name: "🌐 Browser Agent", pct: "1%", desc: "网页操作、自动化" }
];

agents.forEach((agent, i) => {
  const y = 1.9 + i * 0.38;
  
  slide4.addText(agent.name, {
    x: 3.7, y: y, w: 2.0, h: 0.35,
    fontSize: 10, color: COLORS.textPrimary, fontFace: "Arial"
  });
  
  // 进度条背景
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 5.8, y: y + 0.08, w: 2.5, h: 0.18,
    fill: { color: COLORS.border }
  });
  
  // 进度条
  const pctValue = parseInt(agent.pct) / 100;
  slide4.addShape(pres.shapes.RECTANGLE, {
    x: 5.8, y: y + 0.08, w: 2.5 * pctValue, h: 0.18,
    fill: { color: "3B82F6" }
  });
  
  slide4.addText(agent.pct, {
    x: 8.4, y: y, w: 0.5, h: 0.35,
    fontSize: 10, bold: true, color: COLORS.textPrimary, fontFace: "Arial",
    align: "right"
  });
});

// ============================================
// Slide 5: 产品设计
// ============================================
let slide5 = pres.addSlide();
slide5.background = { color: COLORS.white };

// 顶部色条
slide5.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.08,
  fill: { color: "10B981" }
});

slide5.addText("🎨 STEP 2: AI Studio 产品设计", {
  x: 0.5, y: 0.25, w: 9, h: 0.5,
  fontSize: 24, bold: true, color: COLORS.textPrimary, fontFace: "Arial",
  margin: 0
});

slide5.addText("从工具到员工的Agentic核心理念：主动规划 + 后台执行 + 主动预警", {
  x: 0.5, y: 0.75, w: 9, h: 0.35,
  fontSize: 12, color: COLORS.textSecondary, fontFace: "Arial"
});

// 核心理念卡片
const coreIdeas = [
  { icon: "🎯", title: "一个入口", desc: "告别工具切换\n所有AI能力一站式获取" },
  { icon: "🔀", title: "智能路由", desc: "自动识别意图\n匹配最佳Agent处理" },
  { icon: "🤖", title: "主动服务", desc: "不只是工具\n更是主动规划的AI员工" },
  { icon: "🏢", title: "企业上下文", desc: "理解企业代码库\n知识库、技术规范" }
];

coreIdeas.forEach((idea, i) => {
  const x = 0.5 + i * 2.4;
  
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: x, y: 1.3, w: 2.2, h: 1.8,
    fill: { color: COLORS.primary },
    shadow: makeShadow()
  });
  
  slide5.addText(idea.icon, {
    x: x, y: 1.45, w: 2.2, h: 0.5,
    fontSize: 28, align: "center"
  });
  
  slide5.addText(idea.title, {
    x: x + 0.1, y: 1.95, w: 2.0, h: 0.35,
    fontSize: 13, bold: true, color: COLORS.white, fontFace: "Arial",
    align: "center"
  });
  
  slide5.addText(idea.desc, {
    x: x + 0.1, y: 2.35, w: 2.0, h: 0.6,
    fontSize: 10, color: COLORS.white, fontFace: "Arial",
    align: "center", transparency: 20
  });
});

// 产品触点
slide5.addText("多触点覆盖", {
  x: 0.5, y: 3.4, w: 9, h: 0.35,
  fontSize: 14, bold: true, color: COLORS.textPrimary, fontFace: "Arial"
});

const touchpoints = ["IDE内嵌", "Web工作台", "IM机器人", "CLI命令行", "API接口"];
touchpoints.forEach((tp, i) => {
  const x = 0.5 + i * 1.9;
  
  slide5.addShape(pres.shapes.RECTANGLE, {
    x: x, y: 3.85, w: 1.7, h: 0.5,
    fill: { color: "FEF3C7" },
    line: { color: "F59E0B", width: 1 }
  });
  
  slide5.addText(tp, {
    x: x, y: 3.85, w: 1.7, h: 0.5,
    fontSize: 11, color: COLORS.textPrimary, fontFace: "Arial",
    align: "center", valign: "middle"
  });
});

// Agentic理念说明
slide5.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 4.55, w: 9.0, h: 0.85,
  fill: { color: "ECFDF5" },
  line: { color: "10B981", width: 1 }
});

slide5.addText("💡 Agentic 核心理念：AI不仅是工具，更是能够主动规划、后台执行、主动预警的AI数字员工", {
  x: 0.7, y: 4.7, w: 8.6, h: 0.55,
  fontSize: 12, color: COLORS.textPrimary, fontFace: "Arial",
  valign: "middle"
});

// ============================================
// Slide 6: 技术架构
// ============================================
let slide6 = pres.addSlide();
slide6.background = { color: COLORS.white };

// 顶部色条
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 0.08,
  fill: { color: "8B5CF6" }
});

slide6.addText("⚙️ STEP 3: Agent Infra 技术架构", {
  x: 0.5, y: 0.25, w: 9, h: 0.5,
  fontSize: 24, bold: true, color: COLORS.textPrimary, fontFace: "Arial",
  margin: 0
});

slide6.addText("6层分层架构设计，支撑产品落地", {
  x: 0.5, y: 0.75, w: 9, h: 0.35,
  fontSize: 12, color: COLORS.textSecondary, fontFace: "Arial"
});

// 6层架构
const layers = [
  { name: "产品层", desc: "IDE、Web、IM、CLI", color: "3B82F6" },
  { name: "应用层", desc: "Coding Agent、Chatbot Agent...", color: "6366F1" },
  { name: "编排层", desc: "Multi-Agent协作、任务分解", color: "8B5CF6" },
  { name: "实现层", desc: "统一Agent SDK", color: "A855F7" },
  { name: "能力层", desc: "工具、记忆、知识、推理", color: "C084FC" },
  { name: "基础设施层", desc: "安全、可观测、模型网关", color: "E879F9" }
];

layers.forEach((layer, i) => {
  const y = 1.2 + i * 0.7;
  const w = 9 - i * 0.3;
  const x = 0.5 + i * 0.15;
  
  slide6.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: w, h: 0.6,
    fill: { color: layer.color },
    shadow: i === 0 ? makeShadow() : undefined
  });
  
  slide6.addText(layer.name, {
    x: x + 0.2, y: y, w: 1.5, h: 0.6,
    fontSize: 13, bold: true, color: COLORS.white, fontFace: "Arial",
    valign: "middle"
  });
  
  slide6.addText(layer.desc, {
    x: x + 1.8, y: y, w: w - 2.0, h: 0.6,
    fontSize: 11, color: COLORS.white, fontFace: "Arial",
    valign: "middle", transparency: 15
  });
});

// 底部说明
slide6.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 5.0, w: 9.0, h: 0.5,
  fill: { color: "F3E8FF" },
  line: { color: "8B5CF6", width: 1 }
});

slide6.addText("🏛️ 分层解耦：各层各司其职，产品触点与Agent逻辑解耦，灵活扩展", {
  x: 0.7, y: 5.0, w: 8.6, h: 0.5,
  fontSize: 11, color: COLORS.textPrimary, fontFace: "Arial",
  valign: "middle"
});

// ============================================
// Slide 7: 核心价值
// ============================================
let slide7 = pres.addSlide();
slide7.background = { color: COLORS.primary };

slide7.addText("核心价值", {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 28, bold: true, color: COLORS.white, fontFace: "Arial",
  align: "center"
});

slide7.addText("一个入口，智能路由，主动服务", {
  x: 0.5, y: 1.1, w: 9, h: 0.4,
  fontSize: 16, color: COLORS.accent, fontFace: "Arial",
  align: "center"
});

const values = [
  { icon: "🎯", title: "一个入口", desc: "告别工具切换，所有AI能力一站式获取" },
  { icon: "🔀", title: "智能路由", desc: "自动识别意图，匹配最佳Agent处理" },
  { icon: "🤖", title: "主动服务", desc: "不只是工具，更是主动规划的AI员工" },
  { icon: "🏢", title: "企业上下文", desc: "理解企业代码库、知识库、技术规范" },
  { icon: "📚", title: "最佳实践沉淀", desc: "团队知识共享，避免重复踩坑" },
  { icon: "🔒", title: "数据安全", desc: "私有化部署，合规保障" }
];

values.forEach((v, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.7 + col * 3.1;
  const y = 1.8 + row * 1.7;
  
  slide7.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: 2.9, h: 1.5,
    fill: { color: COLORS.white, transparency: 90 },
    line: { color: COLORS.white, width: 1, transparency: 80 }
  });
  
  slide7.addText(v.icon, {
    x: x, y: y + 0.15, w: 2.9, h: 0.5,
    fontSize: 28, align: "center"
  });
  
  slide7.addText(v.title, {
    x: x + 0.1, y: y + 0.65, w: 2.7, h: 0.35,
    fontSize: 14, bold: true, color: COLORS.white, fontFace: "Arial",
    align: "center"
  });
  
  slide7.addText(v.desc, {
    x: x + 0.1, y: y + 1.0, w: 2.7, h: 0.4,
    fontSize: 10, color: COLORS.white, fontFace: "Arial",
    align: "center", transparency: 25
  });
});

// ============================================
// Slide 8: 结束页
// ============================================
let slide8 = pres.addSlide();
slide8.background = { color: COLORS.primary };

// 装饰圆圈
slide8.addShape(pres.shapes.OVAL, {
  x: -2, y: 2, w: 6, h: 6,
  fill: { color: COLORS.secondary, transparency: 85 }
});
slide8.addShape(pres.shapes.OVAL, {
  x: 7, y: -1, w: 5, h: 5,
  fill: { color: COLORS.accent, transparency: 90 }
});

slide8.addText("Thank You", {
  x: 0.5, y: 1.8, w: 9, h: 0.8,
  fontSize: 48, bold: true, color: COLORS.white, fontFace: "Arial",
  align: "center"
});

slide8.addText("🚀 AI Studio - 企业AI工程师完整产品体系", {
  x: 0.5, y: 2.7, w: 9, h: 0.5,
  fontSize: 18, color: COLORS.accent, fontFace: "Arial",
  align: "center"
});

slide8.addText("从用户场景洞察到产品设计，再到技术架构实现\n构建企业级AI数字员工平台的完整方法论", {
  x: 0.5, y: 3.4, w: 9, h: 0.7,
  fontSize: 14, color: COLORS.white, fontFace: "Arial",
  align: "center", transparency: 20
});

// 底部链接
slide8.addText("📊 48个工作任务  ·  🤖 9种Agent类型  ·  🏛️ 6层架构设计  ·  100%场景覆盖", {
  x: 0.5, y: 4.6, w: 9, h: 0.4,
  fontSize: 12, color: COLORS.white, fontFace: "Arial",
  align: "center", transparency: 30
});

// 保存文件
pres.writeFile({ fileName: "AI-Studio-企业AI工程师产品体系.pptx" })
  .then(fileName => {
    console.log(`✅ PPT已创建: ${fileName}`);
  })
  .catch(err => {
    console.error("❌ 创建失败:", err);
  });

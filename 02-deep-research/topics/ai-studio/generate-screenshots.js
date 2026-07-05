// 截图生成脚本 - 将HTML示意图转为PNG图片
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateScreenshots() {
    const browser = await puppeteer.launch({ 
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 800, deviceScaleFactor: 2 }); // 2x for retina
    
    // 加载HTML文件
    const htmlPath = path.join(__dirname, 'docs/diagrams.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    
    const outputDir = path.join(__dirname, 'docs/images');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // 截图配置
    const diagrams = [
        { id: 'diagram-d3', name: '01-d3-conversation', desc: 'D3.js关系图开发对话' },
        { id: 'diagram-perf', name: '02-performance-comparison', desc: '性能优化对比' },
        { id: 'diagram-deploy', name: '03-deploy-flow', desc: '多平台部署流程' },
        { id: 'diagram-ppt', name: '04-ppt-preview', desc: 'PPT预览' },
        { id: 'diagram-stats', name: '05-project-stats', desc: '项目核心数据' },
        { id: 'diagram-agents', name: '06-agent-distribution', desc: 'Agent类型分布' },
        { id: 'diagram-review', name: '07-doc-review', desc: '文档审校对话' },
        { id: 'diagram-overview', name: '08-category-overview', desc: '场景分类总览' },
        { id: 'diagram-research', name: '09-agent-research', desc: 'Agent架构调研' },
        { id: 'diagram-memory', name: '10-memory-feature', desc: '记忆功能示意' },
        { id: 'diagram-duet', name: '11-duet-space', desc: 'Duet Space并行模式' },
        { id: 'diagram-skills', name: '12-skills-system', desc: 'Skills技能系统' }
    ];
    
    console.log('📸 开始生成截图...\n');
    
    for (const diagram of diagrams) {
        try {
            const element = await page.$(`#${diagram.id}`);
            if (element) {
                const outputPath = path.join(outputDir, `${diagram.name}.png`);
                await element.screenshot({ 
                    path: outputPath,
                    omitBackground: false
                });
                console.log(`✅ ${diagram.desc} -> ${diagram.name}.png`);
            } else {
                console.log(`❌ 未找到元素: ${diagram.id}`);
            }
        } catch (err) {
            console.log(`❌ 截图失败 ${diagram.id}: ${err.message}`);
        }
    }
    
    await browser.close();
    
    console.log('\n📁 所有截图已保存到 docs/images/');
    console.log('✅ 完成！');
}

generateScreenshots().catch(console.error);

/**
 * 网络关系图渲染模块
 * 绘制5列SVG关系图：场景大类 → 场景子类 → 工作任务 → Agent类型 / 业界产品
 * 工作任务同时连接Agent类型和业界产品
 */

// ================== 数据定义 ==================

// 任务数据
const taskData = {
    dev: {
        name: '研发场景',
        id: 'scene-dev',
        timePercent: 65,
        subcategories: {
            'AI编程': {
                id: 'subcat-ai-coding',
                timePercent: 42,
                tasks: [
                    { id: 'task-code-complete', name: '代码补全', timePercent: 18, agent: 'Coding', tech: 'LLM', products: ['Copilot', 'Cursor', '通义灵码', 'MarsCode'], example: '实时代码补全建议' },
                    { id: 'task-code-gen', name: '代码生成', timePercent: 12, agent: 'Coding', tech: 'LLM', products: ['Cursor', 'Claude Code', '文心快码'], example: '根据注释生成代码' },
                    { id: 'task-refactor', name: '代码重构', timePercent: 3, agent: 'Coding', tech: 'LLM', products: ['Cursor', '通义灵码'], example: '优化代码结构' },
                    { id: 'task-bugfix', name: 'Bug修复', timePercent: 4, agent: 'Coding', tech: 'LLM', products: ['Cursor', 'Devin'], example: '自动定位并修复Bug' },
                    { id: 'task-debug', name: '调试定位', timePercent: 3, agent: 'Coding', tech: 'LLM', products: ['Cursor', 'MarsCode'], example: '辅助定位问题根因' },
                    { id: 'task-tool-dev', name: '小工具开发', timePercent: 2, agent: 'Coding', tech: 'LLM', products: ['Replit', 'v0.dev'], example: '快速开发实用小工具' }
                ]
            },
            '代码审查': {
                id: 'subcat-code-review',
                timePercent: 5,
                tasks: [
                    { id: 'task-code-review', name: 'Code Review', timePercent: 3, agent: 'Workflow', tech: 'LLM', products: ['CodeRabbit', 'Codacy'], example: '自动审查代码质量' },
                    { id: 'task-security', name: '安全检测', timePercent: 1, agent: 'Workflow', tech: 'LLM', products: ['Snyk', 'SonarQube'], example: '检测安全漏洞' },
                    { id: 'task-lint', name: '代码规范', timePercent: 1, agent: 'Workflow', tech: 'LLM', products: ['Cursor', '通义灵码'], example: '代码格式化和规范检查' }
                ]
            },
            '需求与设计': {
                id: 'subcat-requirement',
                timePercent: 3,
                tasks: [
                    { id: 'task-prd', name: 'PRD解析', timePercent: 1, agent: 'Workflow', tech: 'RAG', products: ['Notion AI', '飞书文档'], example: '解析产品需求文档' },
                    { id: 'task-tech-plan', name: '技术方案', timePercent: 2, agent: 'Research', tech: 'WebSearch', products: ['Claude', 'Kimi', '秘塔搜索'], example: '生成技术方案文档' }
                ]
            },
            '测试': {
                id: 'subcat-test',
                timePercent: 5,
                tasks: [
                    { id: 'task-unit-test', name: '单测生成', timePercent: 3, agent: 'Coding', tech: 'LLM', products: ['Copilot', '通义灵码'], example: '自动生成单元测试' },
                    { id: 'task-test-case', name: '用例设计', timePercent: 1, agent: 'Workflow', tech: 'LLM', products: ['ChatGPT', 'Kimi'], example: '设计测试用例' },
                    { id: 'task-mock-data', name: 'Mock数据', timePercent: 1, agent: 'Coding', tech: 'LLM', products: ['ChatGPT', '通义千问'], example: '生成测试Mock数据' }
                ]
            },
            '技术文档': {
                id: 'subcat-tech-doc',
                timePercent: 4,
                tasks: [
                    { id: 'task-api-doc', name: 'API文档', timePercent: 2, agent: 'Workflow', tech: 'LLM', products: ['Mintlify', 'Readme'], example: '自动生成API文档' },
                    { id: 'task-code-comment', name: '代码注释', timePercent: 2, agent: 'Coding', tech: 'LLM', products: ['Copilot', '通义灵码'], example: '自动添加代码注释' }
                ]
            },
            '图表绘制': {
                id: 'subcat-diagram',
                timePercent: 2.5,
                tasks: [
                    { id: 'task-arch-diagram', name: '架构图', timePercent: 1, agent: 'Design', tech: '图表引擎', products: ['Eraser', '稿定AI'], example: '绘制系统架构图' },
                    { id: 'task-flow-diagram', name: '流程图', timePercent: 1, agent: 'Design', tech: '图表引擎', products: ['Mermaid'], example: '绘制业务流程图' },
                    { id: 'task-er-diagram', name: 'ER图', timePercent: 0.5, agent: 'Design', tech: 'LLM', products: ['dbdiagram'], example: '绘制数据库ER图' }
                ]
            },
            '数据分析': {
                id: 'subcat-data-analysis',
                timePercent: 3,
                tasks: [
                    { id: 'task-log-analysis', name: '日志分析', timePercent: 1.5, agent: 'Data', tech: 'SQL引擎', products: ['ChatGPT', '通义千问'], example: '分析系统日志' },
                    { id: 'task-perf-analysis', name: '性能分析', timePercent: 1, agent: 'Data', tech: 'SQL引擎', products: ['Julius'], example: '分析性能指标' },
                    { id: 'task-sql', name: 'SQL查询', timePercent: 0.5, agent: 'Data', tech: 'SQL引擎', products: ['Hex', 'ChatGPT'], example: '自动生成SQL' }
                ]
            },
            'DevOps': {
                id: 'subcat-devops',
                timePercent: 0.5,
                tasks: [
                    { id: 'task-cicd', name: 'CI/CD配置', timePercent: 0.5, agent: 'Workflow', tech: 'LLM', products: ['GitHub Actions'], example: '配置流水线和部署脚本' }
                ]
            }
        }
    },
    nondev: {
        name: '非研发场景',
        id: 'scene-nondev',
        timePercent: 35,
        subcategories: {
            '文档写作': {
                id: 'subcat-doc-writing',
                timePercent: 6,
                tasks: [
                    { id: 'task-blog', name: '博客/周报', timePercent: 2, agent: 'Chatbot', tech: 'LLM', products: ['Notion AI', '飞书文档', 'WPS AI'], example: '撰写技术博客和周报' },
                    { id: 'task-email', name: '邮件撰写', timePercent: 2, agent: 'Chatbot', tech: 'LLM', products: ['Gmail AI', 'Kimi'], example: '撰写工作邮件' },
                    { id: 'task-ppt', name: 'PPT生成', timePercent: 2, agent: 'Workflow', tech: '图表引擎', products: ['Gamma', 'WPS AI'], example: '生成演示文稿' }
                ]
            },
            '文档审查': {
                id: 'subcat-doc-review',
                timePercent: 3,
                tasks: [
                    { id: 'task-doc-review', name: '文档Review', timePercent: 1, agent: 'Workflow', tech: 'LLM', products: ['Claude', 'Kimi'], example: '审查文档质量' },
                    { id: 'task-doc-polish', name: '文档润色', timePercent: 1, agent: 'Chatbot', tech: 'LLM', products: ['Grammarly', 'WPS AI'], example: '润色文档表达' },
                    { id: 'task-translate', name: '文档翻译', timePercent: 1, agent: 'Chatbot', tech: 'LLM', products: ['DeepL', '有道翻译'], example: '技术文档翻译' }
                ]
            },
            '调研分析': {
                id: 'subcat-research',
                timePercent: 7,
                tasks: [
                    { id: 'task-tech-research', name: '技术调研', timePercent: 4, agent: 'Research', tech: 'WebSearch', products: ['Perplexity', '秘塔搜索'], example: '调研新技术方案' },
                    { id: 'task-competitor', name: '竞品分析', timePercent: 2, agent: 'Research', tech: 'WebSearch', products: ['Perplexity', 'Kimi'], example: '分析竞争产品' },
                    { id: 'task-data-collect', name: '数据采集', timePercent: 1, agent: 'Browser', tech: 'BrowserUse', products: ['Browser Use'], example: '采集网页数据' }
                ]
            },
            '会议效率': {
                id: 'subcat-meeting',
                timePercent: 3,
                tasks: [
                    { id: 'task-meeting-notes', name: '会议纪要', timePercent: 3, agent: 'Workflow', tech: 'LLM', products: ['Otter', '飞书妙记'], example: '自动生成会议纪要' }
                ]
            },
            '知识问答': {
                id: 'subcat-qa',
                timePercent: 8,
                tasks: [
                    { id: 'task-tech-qa', name: '技术问答', timePercent: 5, agent: 'Chatbot', tech: 'LLM', products: ['ChatGPT', 'Kimi', '讯飞星火'], example: '回答技术问题' },
                    { id: 'task-internal-qa', name: '内部知识', timePercent: 3, agent: 'Chatbot', tech: 'RAG', products: ['Glean', '腾讯混元'], example: '查询内部知识库' }
                ]
            },
            '图片生成': {
                id: 'subcat-image',
                timePercent: 1,
                tasks: [
                    { id: 'task-image-gen', name: '配图生成', timePercent: 0.5, agent: 'Design', tech: '图表引擎', products: ['Midjourney', '稿定AI'], example: '生成文章配图' },
                    { id: 'task-chart-beautify', name: '图表美化', timePercent: 0.5, agent: 'Design', tech: '图表引擎', products: ['Canva AI', '稿定AI'], example: '美化数据图表' }
                ]
            },
            '视频生成': {
                id: 'subcat-video',
                timePercent: 1,
                tasks: [
                    { id: 'task-demo-video', name: '演示视频', timePercent: 0.3, agent: 'Workflow', tech: 'LLM', products: ['Sora', '可灵AI'], example: '生成产品演示视频' },
                    { id: 'task-avatar', name: '数字人', timePercent: 0.3, agent: 'Workflow', tech: 'LLM', products: ['HeyGen', '即梦AI'], example: '生成数字人视频' },
                    { id: 'task-voiceover', name: '配音', timePercent: 0.4, agent: 'Workflow', tech: 'LLM', products: ['ElevenLabs', '讯飞星火'], example: 'AI语音合成配音' }
                ]
            },
            '学习成长': {
                id: 'subcat-learning',
                timePercent: 2,
                tasks: [
                    { id: 'task-learning', name: '技术学习', timePercent: 2, agent: 'Chatbot', tech: 'LLM', products: ['ChatGPT', 'Kimi', '豆包'], example: 'AI辅助学习新技术' }
                ]
            },
            '个人助理': {
                id: 'subcat-assistant',
                timePercent: 4,
                tasks: [
                    { id: 'task-schedule', name: '日程管理', timePercent: 1, agent: 'Background', tech: '调度器', products: ['Motion', '飞书文档'], example: '管理日程安排' },
                    { id: 'task-email-handle', name: '邮件处理', timePercent: 1.5, agent: 'Background', tech: '调度器', products: ['Superhuman'], example: '自动处理邮件' },
                    { id: 'task-desktop-auto', name: '桌面自动化', timePercent: 0.5, agent: 'Computer', tech: 'ComputerUse', products: ['Claude Computer'], example: '自动化桌面操作' },
                    { id: 'task-form-fill', name: '表单填写', timePercent: 0.5, agent: 'Browser', tech: 'BrowserUse', products: ['Browser Use'], example: '自动填写表单' },
                    { id: 'task-info-push', name: '信息推送', timePercent: 0.5, agent: 'Background', tech: '调度器', products: ['Feedly', '豆包'], example: '推送重要信息' }
                ]
            }
        }
    }
};

// Agent数据（覆盖率已重新计算确保总和为100%）
const agentData = {
    'Coding': { id: 'agent-coding', name: 'Coding Agent', icon: '💻', coverage: 47, techs: ['LLM', '代码索引'] },
    'Chatbot': { id: 'agent-chatbot', name: 'Chatbot Agent', icon: '💬', coverage: 15, techs: ['LLM', 'RAG'] },
    'Workflow': { id: 'agent-workflow', name: 'Workflow Agent', icon: '⚙️', coverage: 15, techs: ['LLM', '图表引擎'] },
    'Research': { id: 'agent-research', name: 'Research Agent', icon: '🔬', coverage: 8, techs: ['LLM', 'WebSearch'] },
    'Background': { id: 'agent-background', name: 'Background Agent', icon: '⏰', coverage: 4, techs: ['调度器', 'ComputerUse'] },
    'Design': { id: 'agent-design', name: 'Design Agent', icon: '🎨', coverage: 4, techs: ['图表引擎'] },
    'Data': { id: 'agent-data', name: 'Data Analysis Agent', icon: '📊', coverage: 3, techs: ['SQL引擎', 'LLM'] },
    'Browser': { id: 'agent-browser', name: 'Browser Use Agent', icon: '🌐', coverage: 2, techs: ['BrowserUse'] },
    'Computer': { id: 'agent-computer', name: 'Computer Use Agent', icon: '🖥️', coverage: 2, techs: ['ComputerUse'] }
};

// 技术实现数据
const techData = {
    'LLM': { id: 'tech-llm', name: 'LLM', desc: '大语言模型' },
    '代码索引': { id: 'tech-code-index', name: '代码索引', desc: '代码库索引分析' },
    'RAG': { id: 'tech-rag', name: 'RAG', desc: '检索增强生成' },
    'WebSearch': { id: 'tech-websearch', name: 'WebSearch', desc: '网页搜索' },
    'BrowserUse': { id: 'tech-browseruse', name: 'BrowserUse', desc: '浏览器自动化' },
    'ComputerUse': { id: 'tech-computeruse', name: 'ComputerUse', desc: '桌面自动化' },
    '调度器': { id: 'tech-scheduler', name: '调度器', desc: '任务调度' },
    '图表引擎': { id: 'tech-chart', name: '图表引擎', desc: '图表生成' },
    'SQL引擎': { id: 'tech-sql', name: 'SQL引擎', desc: 'SQL生成执行' }
};

// 业界产品数据（含官网链接）
// 海外产品
const productLinks = {
    'Copilot': 'https://github.com/features/copilot',
    'Cursor': 'https://cursor.sh',
    'Claude Code': 'https://claude.ai',
    'Claude': 'https://claude.ai',
    'ChatGPT': 'https://chat.openai.com',
    'Replit': 'https://replit.com',
    'Codeium': 'https://codeium.com',
    'Devin': 'https://devin.ai',
    'v0.dev': 'https://v0.dev',
    'CodeRabbit': 'https://coderabbit.ai',
    'Codacy': 'https://www.codacy.com',
    'Snyk': 'https://snyk.io',
    'SonarQube': 'https://www.sonarsource.com/products/sonarqube',
    'Diffblue': 'https://www.diffblue.com',
    'Notion AI': 'https://www.notion.so/product/ai',
    'Mintlify': 'https://mintlify.com',
    'Readme': 'https://readme.com',
    'Eraser': 'https://www.eraser.io',
    'Mermaid': 'https://mermaid.js.org',
    'dbdiagram': 'https://dbdiagram.io',
    'Julius': 'https://julius.ai',
    'Hex': 'https://hex.tech',
    'GitHub Actions': 'https://github.com/features/actions',
    'Gmail AI': 'https://workspace.google.com/products/gmail',
    'Gamma': 'https://gamma.app',
    'Beautiful.ai': 'https://www.beautiful.ai',
    'Grammarly': 'https://www.grammarly.com',
    'DeepL': 'https://www.deepl.com',
    'Perplexity': 'https://www.perplexity.ai',
    'Browser Use': 'https://browser-use.com',
    'Otter': 'https://otter.ai',
    'Fireflies': 'https://fireflies.ai',
    'Glean': 'https://www.glean.com',
    'Midjourney': 'https://www.midjourney.com',
    'DALL-E': 'https://openai.com/dall-e-3',
    'Canva AI': 'https://www.canva.com/ai-image-generator',
    'Sora': 'https://openai.com/sora',
    'HeyGen': 'https://www.heygen.com',
    'Synthesia': 'https://www.synthesia.io',
    'ElevenLabs': 'https://elevenlabs.io',
    'Motion': 'https://www.usemotion.com',
    'Superhuman': 'https://superhuman.com',
    'Feedly': 'https://feedly.com',
    'Claude Computer': 'https://claude.ai',
    // 国内产品
    '通义灵码': 'https://tongyi.aliyun.com/lingma',
    'MarsCode': 'https://www.marscode.cn',
    '文心快码': 'https://comate.baidu.com',
    'Kimi': 'https://kimi.moonshot.cn',
    '通义千问': 'https://tongyi.aliyun.com',
    '文心一言': 'https://yiyan.baidu.com',
    '豆包': 'https://www.doubao.com',
    '秘塔搜索': 'https://metaso.cn',
    '飞书文档': 'https://www.feishu.cn/product/docs',
    'WPS AI': 'https://ai.wps.cn',
    '稿定AI': 'https://www.gaoding.com/ai',
    '可灵AI': 'https://klingai.kuaishou.com',
    '即梦AI': 'https://jimeng.jianying.com',
    '有道翻译': 'https://fanyi.youdao.com',
    '讯飞星火': 'https://xinghuo.xfyun.cn',
    '腾讯混元': 'https://hunyuan.tencent.com',
    '飞书妙记': 'https://www.feishu.cn/product/minutes'
};

const productsData = Object.keys(productLinks);

// 技术到产品的映射
const techProductMapping = {
    'LLM': ['Claude', 'ChatGPT', 'Copilot', 'Cursor', 'Claude Code', 'Replit', 'CodeRabbit', 'Snyk', 'Notion AI', 'Mintlify', 'Gmail AI', 'Grammarly', 'Otter', 'Gamma', 'Sora', 'HeyGen', 'Loom'],
    '代码索引': ['Copilot', 'Cursor', 'Claude Code', 'CodeRabbit'],
    'RAG': ['Glean', 'Notion AI'],
    'WebSearch': ['Perplexity', 'Claude'],
    'BrowserUse': ['Browser Use'],
    'ComputerUse': ['Claude Computer'],
    '调度器': ['GitHub Actions', 'Motion', 'Superhuman', 'Feedly'],
    '图表引擎': ['Eraser', 'Mermaid', 'dbdiagram', 'Midjourney', 'Canva AI', 'Gamma'],
    'SQL引擎': ['Julius', 'Hex', 'ChatGPT']
};

// ================== 渲染配置 ==================

const config = {
    width: 1600,
    height: 1800,
    padding: { top: 80, right: 40, bottom: 40, left: 40 },
    columnWidth: 240,
    nodeHeight: 36,
    nodeGap: 8,
    columnGap: 20
};

// 列定义（5列布局）
const columns = [
    { id: 'scene', title: '场景大类', x: 0 },
    { id: 'subcat', title: '场景子类', x: 1 },
    { id: 'task', title: '工作任务', x: 2 },
    { id: 'agent', title: 'Agent类型', x: 3 },
    { id: 'product', title: '业界产品', x: 4 }
];

// 渐变色定义
const gradients = {
    scene: { start: '#FF5500', end: '#FF7733' },
    subcat: { start: '#E67E22', end: '#F39C12' },
    task: { start: '#11998e', end: '#38ef7d' },
    agent: { start: '#667eea', end: '#764ba2' },
    product: { start: '#f093fb', end: '#f5576c' }
};

// ================== 渲染函数 ==================

function renderNetworkGraph() {
    const container = document.getElementById('network-container');
    if (!container) return;
    
    // 收集所有数据
    const scenes = [];
    const subcats = [];
    const tasks = [];
    const agents = new Map();
    const techs = new Map();
    const products = new Map();
    
    // 连接关系
    const connections = [];
    
    // 处理场景数据
    let taskY = 0;
    
    Object.entries(taskData).forEach(([sceneKey, scene]) => {
        const sceneStartY = taskY;
        let sceneTaskCount = 0;
        
        Object.entries(scene.subcategories).forEach(([subcatName, subcat]) => {
            const subcatStartY = taskY;
            
            subcat.tasks.forEach(task => {
                // 添加任务
                tasks.push({
                    id: task.id,
                    name: task.name,
                    y: taskY,
                    timePercent: task.timePercent,
                    example: task.example,
                    agentType: task.agent,
                    products: task.products,
                    sceneId: scene.id,
                    subcatId: subcat.id
                });
                
                // 收集Agent
                if (!agents.has(task.agent)) {
                    agents.set(task.agent, {
                        ...agentData[task.agent],
                        taskIds: [],
                        techIds: new Set()
                    });
                }
                agents.get(task.agent).taskIds.push(task.id);
                
                // 添加任务到Agent连接
                connections.push({
                    from: task.id,
                    to: agentData[task.agent].id,
                    type: 'task-agent'
                });
                
                // 收集技术
                const taskTech = task.tech;
                if (!techs.has(taskTech)) {
                    techs.set(taskTech, {
                        ...techData[taskTech],
                        agentIds: new Set(),
                        productIds: new Set()
                    });
                }
                techs.get(taskTech).agentIds.add(agentData[task.agent].id);
                agents.get(task.agent).techIds.add(techData[taskTech].id);
                
                // 收集产品并建立任务到产品的直接关联
                task.products.forEach(productName => {
                    if (!products.has(productName)) {
                        products.set(productName, {
                            id: `product-${productName.toLowerCase().replace(/\s+/g, '-')}`,
                            name: productName,
                            taskIds: []  // 改为记录关联的任务ID
                        });
                    }
                    products.get(productName).taskIds.push(task.id);
                    
                    // 添加任务到产品的直接连接
                    connections.push({
                        from: task.id,
                        to: products.get(productName).id,
                        type: 'task-product'
                    });
                });
                
                taskY++;
                sceneTaskCount++;
            });
            
            // 添加子类
            subcats.push({
                id: subcat.id,
                name: subcatName,
                y: (subcatStartY + taskY - 1) / 2,
                timePercent: subcat.timePercent,
                taskCount: subcat.tasks.length,
                sceneId: scene.id,
                taskIds: subcat.tasks.map(t => t.id)
            });
            
            // 添加子类到任务连接
            subcat.tasks.forEach(task => {
                connections.push({
                    from: subcat.id,
                    to: task.id,
                    type: 'subcat-task'
                });
            });
        });
        
        // 添加场景
        scenes.push({
            id: scene.id,
            name: scene.name,
            y: (sceneStartY + taskY - 1) / 2,
            timePercent: scene.timePercent,
            subcatIds: Object.values(scene.subcategories).map(s => s.id)
        });
        
        // 添加场景到子类连接
        Object.values(scene.subcategories).forEach(subcat => {
            connections.push({
                from: scene.id,
                to: subcat.id,
                type: 'scene-subcat'
            });
        });
    });
    
    // 计算Agent Y坐标（根据关联任务平均值）
    const agentsList = [];
    agents.forEach((agent, key) => {
        const relatedTasks = tasks.filter(t => agent.taskIds.includes(t.id));
        const avgY = relatedTasks.reduce((sum, t) => sum + t.y, 0) / relatedTasks.length;
        agentsList.push({
            ...agent,
            key,
            y: avgY
        });
    });
    agentsList.sort((a, b) => a.y - b.y);
    
    // 重新分配Agent Y坐标避免重叠
    let agentY = 0;
    agentsList.forEach((agent, index) => {
        agent.displayY = agentY;
        agentY += 1.5;
    });
    
    // 计算Product Y坐标（根据关联任务的平均Y值）
    const productsList = [];
    products.forEach((product, key) => {
        const relatedTasks = tasks.filter(t => product.taskIds.includes(t.id));
        const avgY = relatedTasks.length > 0
            ? relatedTasks.reduce((sum, t) => sum + t.y, 0) / relatedTasks.length
            : productsList.length;
        productsList.push({
            ...product,
            key,
            y: avgY
        });
    });
    productsList.sort((a, b) => a.y - b.y);
    
    // 重新分配Product Y坐标 - 使用更紧凑的间距
    let productY = 0;
    const productSpacing = 0.85;  // 减小产品节点间距
    productsList.forEach((product, index) => {
        product.displayY = productY;
        productY += productSpacing;
    });
    
    // 计算SVG高度 - 确保足够容纳所有产品节点
    const productHeight = productsList.length * productSpacing * 1.3;
    const maxRows = Math.max(tasks.length, productHeight, agentsList.length * 2.5);
    const svgHeight = config.padding.top + maxRows * (config.nodeHeight + config.nodeGap) + config.padding.bottom + 100;
    
    // 计算实际内容宽度（5列 + 折叠按钮空间）
    const actualWidth = config.padding.left + config.padding.right + 5 * config.columnWidth + 4 * config.columnGap + 30;
    
    // 生成SVG（不再传递techsList）
    const svg = createSVG(svgHeight, actualWidth, scenes, subcats, tasks, agentsList, productsList, connections);
    
    // 添加缩放控件
    const zoomControls = `
        <div class="zoom-controls">
            <button class="zoom-btn" id="zoom-in" title="放大">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
            </button>
            <button class="zoom-btn" id="zoom-reset" title="重置">
                <span class="zoom-level">100%</span>
            </button>
            <button class="zoom-btn" id="zoom-out" title="缩小">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35M8 11h6"/>
                </svg>
            </button>
            <button class="zoom-btn" id="zoom-fit" title="适应窗口">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
            </button>
        </div>
    `;
    
    container.innerHTML = zoomControls + `<div class="svg-wrapper" id="svg-wrapper">${svg}</div>`;
    
    // 初始化缩放功能
    initZoomControls();
}

function createSVG(height, width, scenes, subcats, tasks, agents, products, connections) {
    const colWidth = (width - config.padding.left - config.padding.right) / 5;  // 5列布局
    
    // 计算列X坐标
    const getColX = (colIndex) => config.padding.left + colIndex * colWidth + colWidth / 2;
    
    // 计算Y坐标
    const getY = (index, scale = 1) => config.padding.top + index * (config.nodeHeight + config.nodeGap) * scale;
    
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="xMidYMin meet" style="max-width: 100%;">`;
    
    // 定义渐变
    svg += '<defs>';
    Object.entries(gradients).forEach(([key, colors]) => {
        svg += `
            <linearGradient id="grad-${key}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
            </linearGradient>
        `;
    });
    svg += '</defs>';
    
    // 绘制列标题
    svg += '<g class="column-titles">';
    columns.forEach((col, index) => {
        svg += `<text x="${getColX(index)}" y="40" text-anchor="middle" class="column-title" fill="#374151" font-size="14" font-weight="600">${col.title}</text>`;
    });
    svg += '</g>';
    
    // 绘制连接线
    svg += '<g class="connections">';
    
    // 场景到子类连接
    scenes.forEach(scene => {
        const fromX = getColX(0) + colWidth / 2 - 10;
        const fromY = getY(scene.y) + config.nodeHeight / 2;
        
        subcats.filter(s => scene.subcatIds.includes(s.id)).forEach(subcat => {
            const toX = getColX(1) - colWidth / 2 + 10;
            const toY = getY(subcat.y) + config.nodeHeight / 2;
            svg += createBezierPath(fromX, fromY, toX, toY, scene.id, subcat.id);
        });
    });
    
    // 子类到任务连接
    subcats.forEach(subcat => {
        const fromX = getColX(1) + colWidth / 2 - 10;
        const fromY = getY(subcat.y) + config.nodeHeight / 2;
        
        tasks.filter(t => subcat.taskIds.includes(t.id)).forEach(task => {
            const toX = getColX(2) - colWidth / 2 + 10;
            const toY = getY(task.y) + config.nodeHeight / 2;
            svg += createBezierPath(fromX, fromY, toX, toY, subcat.id, task.id);
        });
    });
    
    // 任务到Agent连接
    tasks.forEach(task => {
        const fromX = getColX(2) + colWidth / 2 - 10;
        const fromY = getY(task.y) + config.nodeHeight / 2;
        
        const agent = agents.find(a => a.key === task.agentType);
        if (agent) {
            const toX = getColX(3) - colWidth / 2 + 10;
            const toY = getY(agent.displayY, 2.5) + config.nodeHeight / 2;
            svg += createBezierPath(fromX, fromY, toX, toY, task.id, agent.id);
        }
    });
    
    // 任务到Product直接连接
    tasks.forEach(task => {
        const fromX = getColX(2) + colWidth / 2 - 10;
        const fromY = getY(task.y) + config.nodeHeight / 2;
        
        task.products.forEach(productName => {
            const product = products.find(p => p.name === productName);
            if (product) {
                const toX = getColX(4) - colWidth / 2 + 10;
                const toY = getY(product.displayY, 1.1) + config.nodeHeight / 2;
                svg += createBezierPath(fromX, fromY, toX, toY, task.id, product.id);
            }
        });
    });
    
    svg += '</g>';
    
    // 绘制节点
    const nodeWidth = colWidth - 20;
    
    // 场景节点 - 有子节点
    svg += '<g class="scene-nodes">';
    scenes.forEach(scene => {
        svg += createNode(getColX(0) - nodeWidth / 2, getY(scene.y), nodeWidth, config.nodeHeight, scene.name, 'scene', scene.id, `${scene.timePercent}%`, true, '');
    });
    svg += '</g>';
    
    // 子类节点 - 有子节点，父节点是scene
    svg += '<g class="subcat-nodes">';
    subcats.forEach(subcat => {
        svg += createNode(getColX(1) - nodeWidth / 2, getY(subcat.y), nodeWidth, config.nodeHeight, subcat.name, 'subcat', subcat.id, `${subcat.timePercent}%`, true, subcat.sceneId);
    });
    svg += '</g>';
    
    // 任务节点 - 父节点是subcat
    svg += '<g class="task-nodes">';
    tasks.forEach(task => {
        svg += createNode(getColX(2) - nodeWidth / 2, getY(task.y), nodeWidth, config.nodeHeight, task.name, 'task', task.id, `${task.timePercent}%`, false, task.subcatId);
    });
    svg += '</g>';
    
    // Agent节点
    svg += '<g class="agent-nodes">';
    agents.forEach(agent => {
        svg += createNode(getColX(3) - nodeWidth / 2, getY(agent.displayY, 2.5), nodeWidth, config.nodeHeight, `${agent.icon} ${agent.key}`, 'agent', agent.id, `${agent.coverage}%`, false, '');
    });
    svg += '</g>';
    
    // Product节点 - 使用更紧凑的缩放因子
    svg += '<g class="product-nodes">';
    products.forEach(product => {
        svg += createNode(getColX(4) - nodeWidth / 2, getY(product.displayY, 1.1), nodeWidth, config.nodeHeight, product.name, 'product', product.id, '', false, '');
    });
    svg += '</g>';
    
    svg += '</svg>';
    
    return svg;
}

function createBezierPath(x1, y1, x2, y2, fromId, toId) {
    const midX = (x1 + x2) / 2;
    const ctrlOffset = Math.min(Math.abs(x2 - x1) / 3, 80);
    
    return `<path 
        class="graph-connection" 
        d="M ${x1} ${y1} C ${x1 + ctrlOffset} ${y1}, ${x2 - ctrlOffset} ${y2}, ${x2} ${y2}" 
        fill="none" 
        stroke="#CBD5E1" 
        stroke-width="1.5"
        data-from="${fromId}"
        data-to="${toId}"
    />`;
}

function createNode(x, y, width, height, text, type, id, badge = '', hasChildren = false, parentId = '') {
    const radius = 6;
    const displayText = text.length > 14 ? text.substring(0, 12) + '...' : text;
    
    // 如果是产品节点，添加可点击链接区域
    const productUrl = type === 'product' ? productLinks[text] : null;
    
    // 折叠按钮 - 只有scene和subcat类型有折叠功能
    const canCollapse = (type === 'scene' || type === 'subcat') && hasChildren;
    const collapseBtn = canCollapse ? `
        <g class="collapse-btn" data-target="${id}" style="cursor: pointer;">
            <circle 
                cx="${x + width + 12}" 
                cy="${y + height / 2}" 
                r="8" 
                fill="white" 
                stroke="#94A3B8" 
                stroke-width="1"
            />
            <text 
                class="collapse-icon"
                x="${x + width + 12}" 
                y="${y + height / 2 + 1}" 
                text-anchor="middle" 
                dominant-baseline="middle" 
                fill="#475569" 
                font-size="12" 
                font-weight="bold"
            >−</text>
        </g>
    ` : '';
    
    if (type === 'product' && productUrl) {
        // 产品节点：背景可点击高亮，文字可点击跳转
        return `
            <g class="graph-node" data-id="${id}" data-type="${type}" data-url="${productUrl}" data-name="${text}" data-parent="${parentId}" style="cursor: pointer;">
                <rect 
                    class="node-bg"
                    x="${x}" 
                    y="${y}" 
                    width="${width}" 
                    height="${height}" 
                    rx="${radius}" 
                    ry="${radius}" 
                    fill="url(#grad-${type})"
                />
                <a class="product-link-area" href="${productUrl}" target="_blank" rel="noopener noreferrer">
                    <text 
                        class="node-text-link"
                        x="${x + width / 2}" 
                        y="${y + height / 2 + 1}" 
                        text-anchor="middle" 
                        dominant-baseline="middle" 
                        fill="white" 
                        font-size="12" 
                        font-weight="500"
                        style="cursor: pointer; text-decoration: underline; text-underline-offset: 2px;"
                    >${displayText} ↗</text>
                </a>
            </g>
        `;
    }
    
    // 其他节点：普通渲染
    return `
        <g class="graph-node" data-id="${id}" data-type="${type}" data-parent="${parentId}" style="cursor: pointer;">
            <rect 
                x="${x}" 
                y="${y}" 
                width="${width}" 
                height="${height}" 
                rx="${radius}" 
                ry="${radius}" 
                fill="url(#grad-${type})"
            />
            <text 
                x="${x + width / 2}" 
                y="${y + height / 2 + 1}" 
                text-anchor="middle" 
                dominant-baseline="middle" 
                fill="white" 
                font-size="12" 
                font-weight="500"
            >${displayText}</text>
            ${badge ? `<text 
                x="${x + width - 8}" 
                y="${y + 10}" 
                text-anchor="end" 
                fill="rgba(255,255,255,0.8)" 
                font-size="9" 
                font-weight="400"
            >${badge}</text>` : ''}
            ${collapseBtn}
        </g>
    `;
}

// ================== 缩放功能 ==================

let currentZoom = 1;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.1;

function initZoomControls() {
    const wrapper = document.getElementById('svg-wrapper');
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    const zoomReset = document.getElementById('zoom-reset');
    const zoomFit = document.getElementById('zoom-fit');
    
    if (!wrapper) return;
    
    zoomIn?.addEventListener('click', () => {
        setZoom(currentZoom + ZOOM_STEP);
    });
    
    zoomOut?.addEventListener('click', () => {
        setZoom(currentZoom - ZOOM_STEP);
    });
    
    zoomReset?.addEventListener('click', () => {
        setZoom(1);
    });
    
    zoomFit?.addEventListener('click', () => {
        fitToContainer();
    });
    
    // 鼠标滚轮缩放（按住Ctrl）
    wrapper.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
            setZoom(currentZoom + delta);
        }
    }, { passive: false });
    
    // 初始自适应
    setTimeout(() => fitToContainer(), 100);
}

function setZoom(zoom) {
    currentZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
    
    const wrapper = document.getElementById('svg-wrapper');
    const svg = wrapper?.querySelector('svg');
    const zoomLevel = document.querySelector('.zoom-level');
    
    if (svg) {
        svg.style.transform = `scale(${currentZoom})`;
        svg.style.transformOrigin = 'top left';
    }
    
    if (zoomLevel) {
        zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
    }
}

function fitToContainer() {
    const container = document.getElementById('network-container');
    const wrapper = document.getElementById('svg-wrapper');
    const svg = wrapper?.querySelector('svg');
    
    if (!container || !svg) return;
    
    // 获取SVG的原始尺寸
    const viewBox = svg.getAttribute('viewBox');
    if (!viewBox) return;
    
    const [, , svgWidth, svgHeight] = viewBox.split(' ').map(Number);
    const containerWidth = container.clientWidth - 40; // 减去padding
    
    // 计算适应宽度的缩放比例
    const fitZoom = containerWidth / svgWidth;
    
    setZoom(Math.min(fitZoom, 1)); // 不超过100%
}

// 导出数据供main.js使用
window.graphData = {
    taskData,
    agentData,
    techData,
    productsData,
    productLinks,
    techProductMapping
};

// 页面加载完成后渲染
document.addEventListener('DOMContentLoaded', function() {
    renderNetworkGraph();
});

// 窗口大小变化时重新适应
window.addEventListener('resize', () => {
    if (document.getElementById('svg-wrapper')) {
        fitToContainer();
    }
});

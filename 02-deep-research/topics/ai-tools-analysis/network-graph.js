// ==================== 产品链接数据 ====================
const productLinks = {
    // 编程助手
    'GitHub Copilot': 'https://github.com/features/copilot',
    'Cursor': 'https://cursor.sh',
    'Claude Code': 'https://claude.ai',
    'Devin': 'https://devin.ai',
    '通义灵码': 'https://tongyi.aliyun.com/lingma',
    'MarsCode': 'https://www.marscode.com',
    '文心快码': 'https://comate.baidu.com',
    'CodeGeeX': 'https://codegeex.cn',
    
    // 对话AI
    'ChatGPT': 'https://chat.openai.com',
    'Claude': 'https://claude.ai',
    'Gemini': 'https://gemini.google.com',
    'Perplexity': 'https://perplexity.ai',
    'Kimi': 'https://kimi.moonshot.cn',
    '通义千问': 'https://tongyi.aliyun.com',
    '豆包': 'https://www.doubao.com',
    '讯飞星火': 'https://xinghuo.xfyun.cn',
    '文心一言': 'https://yiyan.baidu.com',
    'DeepSeek': 'https://www.deepseek.com',
    
    // 办公文档
    'Notion AI': 'https://notion.so',
    'Grammarly': 'https://grammarly.com',
    'Gamma': 'https://gamma.app',
    'Microsoft Copilot': 'https://copilot.microsoft.com',
    '飞书文档': 'https://www.feishu.cn/product/docs',
    'WPS AI': 'https://ai.wps.cn',
    '钉钉AI': 'https://www.dingtalk.com',
    '金山文档AI': 'https://www.kdocs.cn',
    
    // 设计工具
    'Midjourney': 'https://midjourney.com',
    'DALL-E': 'https://openai.com/dall-e-3',
    'Canva AI': 'https://canva.com',
    'Figma AI': 'https://figma.com',
    '稿定AI': 'https://www.gaoding.com',
    '即时AI': 'https://js.design',
    '美图AI': 'https://www.meitu.com',
    
    // 视频生成
    'Sora': 'https://openai.com/sora',
    'HeyGen': 'https://heygen.com',
    'Runway': 'https://runwayml.com',
    'ElevenLabs': 'https://elevenlabs.io',
    '可灵AI': 'https://klingai.kuaishou.com',
    '即梦AI': 'https://jimeng.jianying.com',
    '剪映AI': 'https://www.capcut.cn',
    
    // 数据分析
    'Tableau AI': 'https://tableau.com',
    'Power BI': 'https://powerbi.microsoft.com',
    '帆软AI': 'https://www.fanruan.com',
    '网易有数': 'https://youdata.163.com',
    
    // 搜索调研
    '秘塔搜索': 'https://metaso.cn',
    '天工AI搜索': 'https://tiangong.cn',
    
    // 翻译
    'DeepL': 'https://deepl.com',
    '有道翻译': 'https://fanyi.youdao.com',
    '百度翻译': 'https://fanyi.baidu.com',
    
    // 会议工具
    'Otter.ai': 'https://otter.ai',
    'Fireflies': 'https://fireflies.ai',
    '飞书妙记': 'https://www.feishu.cn/product/minutes',
    '通义听悟': 'https://tingwu.aliyun.com',
    '讯飞会议': 'https://meeting.iflyrec.com',
    
    // 客服系统
    'Intercom': 'https://intercom.com',
    'Zendesk AI': 'https://zendesk.com',
    '智齿客服': 'https://www.sobot.com',
    '网易七鱼': 'https://qiyukf.com',
    '容联云': 'https://www.yuntongxun.com',
    
    // HR工具
    'HireVue': 'https://hirevue.com',
    '北森AI': 'https://www.beisen.com',
    'Moka': 'https://www.mokahr.com',
    
    // 财务工具
    '用友AI': 'https://www.yonyou.com',
    '金蝶AI': 'https://www.kingdee.com',
    
    // 法务工具
    '幂律智能': 'https://www.powerlaw.ai',
    '法狗狗': 'https://www.fagougou.com',
    
    // 销售工具
    'Salesforce Einstein': 'https://salesforce.com/einstein',
    'Gong': 'https://gong.io',
    '纷享销客': 'https://www.fxiaoke.com',
    '销售易': 'https://www.xiaoshouyi.com',
    
    // 流程自动化
    'Zapier': 'https://zapier.com',
    'Make': 'https://make.com',
    'UiPath': 'https://uipath.com',
    '集简云': 'https://www.jijyun.cn',
    '金数据': 'https://jinshuju.net'
};

// ==================== Agent数据 ====================
const agentData = {
    'Coding': {
        id: 'agent-coding',
        name: 'Coding Agent',
        icon: '💻',
        coverage: 15,
        description: '代码补全、生成、重构、调试',
        techs: ['LLM', '代码索引', 'AST分析'],
        roles: ['研发技术类', 'IT支持类']
    },
    'Chatbot': {
        id: 'agent-chatbot',
        name: 'Chatbot Agent',
        icon: '💬',
        coverage: 28,
        description: '对话问答、文档写作、翻译润色',
        techs: ['LLM', 'RAG', '多轮对话'],
        roles: ['全岗位通用']
    },
    'Workflow': {
        id: 'agent-workflow',
        name: 'Workflow Agent',
        icon: '⚙️',
        coverage: 25,
        description: '流程自动化、审批处理、任务调度',
        techs: ['流程引擎', 'RPA', '规则引擎'],
        roles: ['全岗位通用']
    },
    'Research': {
        id: 'agent-research',
        name: 'Research Agent',
        icon: '🔬',
        coverage: 8,
        description: '信息检索、深度调研、竞品分析',
        techs: ['搜索引擎', 'RAG', '知识图谱'],
        roles: ['销售类', '市场类', '法务类', '人事类']
    },
    'Design': {
        id: 'agent-design',
        name: 'Design Agent',
        icon: '🎨',
        coverage: 5,
        description: '图表绘制、海报设计、视频生成',
        techs: ['扩散模型', 'GAN', '多模态'],
        roles: ['市场类', '产品类']
    },
    'Data': {
        id: 'agent-data',
        name: 'Data Analysis Agent',
        icon: '📊',
        coverage: 12,
        description: '数据处理、报表生成、可视化分析',
        techs: ['SQL生成', '数据可视化', '统计分析'],
        roles: ['财务类', '销售类', '市场类', '产品类']
    },
    'Background': {
        id: 'agent-background',
        name: 'Background Agent',
        icon: '⏰',
        coverage: 4,
        description: '定时任务、日程管理、消息推送',
        techs: ['任务调度', '消息队列', '触发器'],
        roles: ['行政类', 'IT支持类', '财务类']
    },
    'Browser': {
        id: 'agent-browser',
        name: 'Browser Use Agent',
        icon: '🌐',
        coverage: 2,
        description: '网页自动化、数据采集、表单填写',
        techs: ['浏览器自动化', '网页解析', 'RPA'],
        roles: ['行政类', '市场类', '销售类']
    },
    'Computer': {
        id: 'agent-computer',
        name: 'Computer Use Agent',
        icon: '🖥️',
        coverage: 1,
        description: '桌面自动化、文件管理、GUI操作',
        techs: ['桌面RPA', '图像识别', '系统API'],
        roles: ['IT支持类']
    }
};

// ==================== Agent产品设计数据 ====================
const agentDesignData = {
    'Chatbot': {
        productName: '智能对话助手',
        productDesc: '企业级智能对话平台，支持多轮对话、知识问答、文档生成',
        modules: [
            '多轮对话引擎',
            '意图识别',
            '知识库RAG',
            '文档生成器',
            '多语言翻译',
            '会议纪要'
        ],
        scenes: [
            '需求分析、技术方案（研发）',
            '法律咨询、合规问答（法务）',
            '员工咨询、政策解读（HR）',
            '产品咨询、客服问答（客服）',
            '文案撰写、内容创作（市场）'
        ],
        techStack: [
            'LLM推理（GPT-4/Claude）',
            '向量数据库（Milvus）',
            'RAG框架（LangChain）',
            'WebSocket实时通信'
        ],
        keyFeatures: [
            '上下文管理 + 对话状态机',
            '向量检索 + Rerank重排序',
            '模板引擎 + 格式转换',
            '多租户 + 权限隔离'
        ]
    },
    'Workflow': {
        productName: '智能流程引擎',
        productDesc: '企业级流程自动化平台，支持可视化设计、规则引擎、系统集成',
        modules: [
            '可视化流程设计器',
            '规则引擎',
            '审批自动化',
            '任务调度',
            '系统连接器',
            '异常处理'
        ],
        scenes: [
            '代码审查、CI/CD流程（研发）',
            '费用报销、发票处理（财务）',
            '采购审批、合同管理（行政）',
            '入离职流程、绩效考核（HR）',
            '工单流转、投诉处理（客服）'
        ],
        techStack: [
            '流程引擎（Temporal/Airflow）',
            'BPMN可视化编辑器',
            '规则引擎（Drools）',
            'Webhook + API连接器'
        ],
        keyFeatures: [
            'BPMN2.0标准流程建模',
            '条件分支 + 并行网关',
            '人工节点 + 自动节点',
            '事件驱动 + 定时触发'
        ]
    },
    'Coding': {
        productName: '智能编程助手',
        productDesc: 'IDE集成编程助手，支持代码补全、生成、审查、测试',
        modules: [
            '代码补全引擎',
            '代码生成器',
            '代码审查器',
            '重构建议',
            '测试用例生成',
            'Bug诊断'
        ],
        scenes: [
            '代码补全、代码生成（AI编程）',
            'PR审查、规范检查（代码审查）',
            '单元测试、自动化测试（测试）',
            '运维脚本、自动化运维（IT支持）'
        ],
        techStack: [
            'LLM代码模型（CodeLlama）',
            'AST解析（Tree-sitter）',
            'LSP协议集成',
            '项目级代码索引'
        ],
        keyFeatures: [
            '项目级代码库RAG',
            '多语言语法理解',
            '增量补全 + 流式输出',
            'IDE插件架构'
        ]
    },
    'Data': {
        productName: '智能数据分析平台',
        productDesc: '企业级智能BI平台，支持自然语言查询、智能报表、可视化分析',
        modules: [
            'Text-to-SQL',
            '智能报表',
            '数据可视化',
            '异常检测',
            '预测分析',
            '数据解读'
        ],
        scenes: [
            '财务报表、预算分析（财务）',
            '销售报表、业绩预测（销售）',
            '营销效果、ROI分析（市场）',
            '产品数据、用户行为（产品）',
            '日志分析、性能分析（研发）'
        ],
        techStack: [
            'Text-to-SQL（DIN-SQL）',
            '可视化引擎（ECharts）',
            '数据连接器（多数据源）',
            '异常检测算法'
        ],
        keyFeatures: [
            'Schema理解 + SQL生成',
            '智能图表推荐',
            '自动数据解读',
            '多数据源适配'
        ]
    },
    'Research': {
        productName: '智能调研助手',
        productDesc: '企业级调研平台，支持多源检索、深度分析、报告生成',
        modules: [
            '多源搜索',
            '信息抽取',
            '自动摘要',
            '竞品监测',
            '报告生成',
            '知识图谱'
        ],
        scenes: [
            '线索挖掘、竞品分析（销售）',
            '行业研究、舆情监控（市场）',
            '法规检索、案例研究（法务）',
            '薪酬调研、人才市场（HR）'
        ],
        techStack: [
            '搜索引擎API',
            '网页解析（Jina）',
            '知识图谱（Neo4j）',
            '自动摘要（LLM）'
        ],
        keyFeatures: [
            '多源信息聚合',
            '结构化信息抽取',
            '实体关系识别',
            '自动报告生成'
        ]
    },
    'Design': {
        productName: '智能设计工作台',
        productDesc: '企业级设计平台，支持图像生成、视频制作、品牌资产管理',
        modules: [
            'AI图像生成',
            '模板设计',
            '视频生成',
            '品牌资产',
            '原型设计',
            '图表绘制'
        ],
        scenes: [
            '海报设计、视频脚本（市场）',
            '原型绘制、交互设计（产品）',
            '方案演示、销售物料（销售）'
        ],
        techStack: [
            '扩散模型（Stable Diffusion）',
            '视频生成（Runway）',
            '设计模板引擎',
            '品牌资产库'
        ],
        keyFeatures: [
            '文生图 + 图生图',
            '品牌规范约束',
            '模板智能填充',
            '多尺寸自适应'
        ]
    },
    'Background': {
        productName: '智能后台调度系统',
        productDesc: '企业级调度中心，支持定时任务、智能提醒、监控告警',
        modules: [
            '定时任务',
            '智能提醒',
            '消息推送',
            '监控告警'
        ],
        scenes: [
            '会议通知、日程提醒（行政）',
            '系统监控、告警处理（IT）',
            '定时报表、付款提醒（财务）',
            '面试提醒、培训通知（HR）'
        ],
        techStack: [
            '任务调度（Celery/APScheduler）',
            '消息队列（RabbitMQ）',
            '推送服务（FCM/APNs）',
            '监控系统（Prometheus）'
        ],
        keyFeatures: [
            'Cron表达式调度',
            '多渠道消息推送',
            '智能告警分级',
            '任务依赖管理'
        ]
    },
    'Browser': {
        productName: '浏览器自动化工具',
        productDesc: '智能浏览器代理，支持网页操作、数据采集、跨系统同步',
        modules: [
            '操作录制',
            '数据采集',
            '表单填写',
            '跨系统同步'
        ],
        scenes: [
            '采购询价、比价查询（行政）',
            '舆情抓取、竞品监测（市场）',
            '线索挖掘、信息录入（销售）'
        ],
        techStack: [
            '浏览器自动化（Playwright）',
            '网页解析（Cheerio）',
            '代理池管理',
            '反爬虫策略'
        ],
        keyFeatures: [
            '可视化操作录制',
            '智能元素定位',
            '并发任务执行',
            '异常自动重试'
        ]
    },
    'Computer': {
        productName: '桌面自动化代理',
        productDesc: '桌面RPA代理，支持GUI操作、文件管理、远程控制',
        modules: [
            'GUI操作引擎',
            '屏幕理解',
            '文件管理',
            '远程控制'
        ],
        scenes: [
            '远程协助、批量配置（IT支持）',
            '系统运维、备份恢复（IT运维）'
        ],
        techStack: [
            '桌面RPA（UiPath/PyAutoGUI）',
            '屏幕理解（GPT-4V）',
            '远程桌面（RDP/VNC）',
            '系统API调用'
        ],
        keyFeatures: [
            '图像识别定位',
            '键鼠操作模拟',
            '窗口管理',
            '进程控制'
        ]
    }
};

// 导出Agent设计数据
window.agentDesignData = agentDesignData;

// ==================== 角色数据 ====================
const roleData = {
    tech: {
        name: '研发技术类',
        id: 'role-tech',
        percentage: 20,
        icon: '👨‍💻',
        color: '#3B82F6',
        scenes: {
            'AI编程': {
                id: 'scene-coding',
                timePercent: 35,
                tasks: [
                    { id: 'task-code-complete', name: '代码补全', timePercent: 15, agent: 'Coding', products: ['GitHub Copilot', 'Cursor', '通义灵码'], example: '实时代码补全建议' },
                    { id: 'task-code-gen', name: '代码生成', timePercent: 10, agent: 'Coding', products: ['Cursor', 'Claude Code', 'MarsCode'], example: '根据注释生成函数' },
                    { id: 'task-refactor', name: '代码重构', timePercent: 5, agent: 'Coding', products: ['Cursor', 'GitHub Copilot'], example: '自动优化代码结构' },
                    { id: 'task-debug', name: 'Bug调试', timePercent: 5, agent: 'Coding', products: ['Cursor', 'Claude Code'], example: '智能定位和修复Bug' }
                ]
            },
            '代码审查': {
                id: 'scene-review',
                timePercent: 10,
                tasks: [
                    { id: 'task-pr-review', name: 'PR审查', timePercent: 6, agent: 'Workflow', products: ['GitHub Copilot', 'CodeGeeX'], example: '自动审查代码变更' },
                    { id: 'task-code-lint', name: '代码规范检查', timePercent: 4, agent: 'Workflow', products: ['GitHub Copilot'], example: '检查代码风格和规范' }
                ]
            },
            '需求设计': {
                id: 'scene-design',
                timePercent: 15,
                tasks: [
                    { id: 'task-req-analysis', name: '需求分析', timePercent: 8, agent: 'Chatbot', products: ['ChatGPT', 'Claude', 'Kimi'], example: '理解和拆解需求' },
                    { id: 'task-tech-design', name: '技术方案', timePercent: 7, agent: 'Chatbot', products: ['ChatGPT', 'Claude'], example: '生成技术方案文档' }
                ]
            },
            '测试': {
                id: 'scene-test',
                timePercent: 12,
                tasks: [
                    { id: 'task-unit-test', name: '单元测试', timePercent: 7, agent: 'Coding', products: ['Cursor', 'GitHub Copilot'], example: '自动生成测试用例' },
                    { id: 'task-auto-test', name: '自动化测试', timePercent: 5, agent: 'Coding', products: ['Cursor', 'Claude Code'], example: '生成端到端测试' }
                ]
            },
            '技术文档': {
                id: 'scene-doc',
                timePercent: 8,
                tasks: [
                    { id: 'task-api-doc', name: 'API文档', timePercent: 4, agent: 'Chatbot', products: ['ChatGPT', 'Notion AI'], example: '生成API接口文档' },
                    { id: 'task-readme', name: 'README', timePercent: 4, agent: 'Chatbot', products: ['ChatGPT', 'Claude'], example: '生成项目说明文档' }
                ]
            },
            '数据分析': {
                id: 'scene-data',
                timePercent: 8,
                tasks: [
                    { id: 'task-log-analysis', name: '日志分析', timePercent: 4, agent: 'Data', products: ['ChatGPT', '通义千问'], example: '分析系统日志' },
                    { id: 'task-sql', name: 'SQL查询', timePercent: 4, agent: 'Data', products: ['ChatGPT', 'Claude'], example: '生成复杂SQL' }
                ]
            },
            'DevOps': {
                id: 'scene-devops',
                timePercent: 7,
                tasks: [
                    { id: 'task-cicd', name: 'CI/CD', timePercent: 4, agent: 'Workflow', products: ['GitHub Copilot'], example: '配置自动化流水线' },
                    { id: 'task-deploy', name: '部署发布', timePercent: 3, agent: 'Workflow', products: ['GitHub Copilot'], example: '自动化部署脚本' }
                ]
            },
            '协作沟通': {
                id: 'scene-comm',
                timePercent: 5,
                tasks: [
                    { id: 'task-meeting', name: '技术会议', timePercent: 3, agent: 'Chatbot', products: ['飞书妙记', '通义听悟'], example: '会议纪要生成' },
                    { id: 'task-collab', name: '跨团队协作', timePercent: 2, agent: 'Chatbot', products: ['飞书文档', 'Notion AI'], example: '协作文档' }
                ]
            }
        }
    },
    finance: {
        name: '财务类',
        id: 'role-finance',
        percentage: 6,
        icon: '💰',
        color: '#10B981',
        scenes: {
            '日常核算': {
                id: 'scene-accounting',
                timePercent: 30,
                tasks: [
                    { id: 'task-voucher', name: '凭证录入', timePercent: 10, agent: 'Workflow', products: ['用友AI', '金蝶AI'], example: '智能识别票据录入' },
                    { id: 'task-reconcile', name: '银行对账', timePercent: 8, agent: 'Workflow', products: ['用友AI', '金蝶AI'], example: '自动匹配对账' },
                    { id: 'task-expense', name: '费用报销', timePercent: 7, agent: 'Workflow', products: ['钉钉AI', '飞书文档'], example: '报销单审核' },
                    { id: 'task-ledger', name: '账务处理', timePercent: 5, agent: 'Workflow', products: ['用友AI', '金蝶AI'], example: '自动记账' }
                ]
            },
            '报表分析': {
                id: 'scene-report',
                timePercent: 20,
                tasks: [
                    { id: 'task-fin-report', name: '财务报表', timePercent: 8, agent: 'Data', products: ['帆软AI', 'Power BI'], example: '自动生成三大报表' },
                    { id: 'task-budget', name: '预算分析', timePercent: 6, agent: 'Data', products: ['帆软AI', '网易有数'], example: '预算执行分析' },
                    { id: 'task-cost', name: '成本分析', timePercent: 6, agent: 'Data', products: ['帆软AI', 'Tableau AI'], example: '成本结构分析' }
                ]
            },
            '税务管理': {
                id: 'scene-tax',
                timePercent: 15,
                tasks: [
                    { id: 'task-invoice', name: '发票管理', timePercent: 6, agent: 'Workflow', products: ['用友AI', '金蝶AI'], example: '发票自动识别归档' },
                    { id: 'task-tax-declare', name: '税务申报', timePercent: 5, agent: 'Workflow', products: ['用友AI', '金蝶AI'], example: '自动生成申报表' },
                    { id: 'task-tax-plan', name: '税务筹划', timePercent: 4, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '税务政策咨询' }
                ]
            },
            '资金管理': {
                id: 'scene-fund',
                timePercent: 12,
                tasks: [
                    { id: 'task-cashflow', name: '现金流预测', timePercent: 6, agent: 'Data', products: ['帆软AI', 'Power BI'], example: '现金流预测分析' },
                    { id: 'task-payment', name: '付款审批', timePercent: 6, agent: 'Workflow', products: ['钉钉AI', '飞书文档'], example: '付款流程自动化' }
                ]
            },
            '审计合规': {
                id: 'scene-audit',
                timePercent: 10,
                tasks: [
                    { id: 'task-internal-audit', name: '内部审计', timePercent: 5, agent: 'Data', products: ['帆软AI'], example: '审计数据分析' },
                    { id: 'task-compliance', name: '合规检查', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '合规政策问答' }
                ]
            },
            '数据处理': {
                id: 'scene-excel',
                timePercent: 8,
                tasks: [
                    { id: 'task-excel', name: 'Excel处理', timePercent: 5, agent: 'Data', products: ['WPS AI', 'Microsoft Copilot'], example: 'Excel数据清洗' },
                    { id: 'task-viz', name: '数据可视化', timePercent: 3, agent: 'Data', products: ['帆软AI', 'Power BI'], example: '财务数据看板' }
                ]
            },
            '沟通协作': {
                id: 'scene-fin-comm',
                timePercent: 5,
                tasks: [
                    { id: 'task-biz-comm', name: '业务沟通', timePercent: 3, agent: 'Chatbot', products: ['飞书文档', '钉钉AI'], example: '跨部门财务沟通' },
                    { id: 'task-vendor', name: '供应商对账', timePercent: 2, agent: 'Workflow', products: ['用友AI'], example: '往来对账' }
                ]
            }
        }
    },
    admin: {
        name: '行政类',
        id: 'role-admin',
        percentage: 4,
        icon: '📋',
        color: '#F59E0B',
        scenes: {
            '日常行政': {
                id: 'scene-daily-admin',
                timePercent: 25,
                tasks: [
                    { id: 'task-reception', name: '来访接待', timePercent: 8, agent: 'Chatbot', products: ['钉钉AI', '飞书文档'], example: '访客预约管理' },
                    { id: 'task-meeting-room', name: '会议室管理', timePercent: 7, agent: 'Background', products: ['钉钉AI', '飞书文档'], example: '会议室预约' },
                    { id: 'task-supplies', name: '办公用品', timePercent: 5, agent: 'Workflow', products: ['钉钉AI'], example: '物资申领流程' },
                    { id: 'task-express', name: '快递收发', timePercent: 5, agent: 'Background', products: ['钉钉AI'], example: '快递通知提醒' }
                ]
            },
            '文档管理': {
                id: 'scene-doc-mgmt',
                timePercent: 20,
                tasks: [
                    { id: 'task-official-doc', name: '公文起草', timePercent: 8, agent: 'Chatbot', products: ['WPS AI', '飞书文档', 'Kimi'], example: '起草通知公告' },
                    { id: 'task-policy', name: '制度汇编', timePercent: 6, agent: 'Chatbot', products: ['WPS AI', 'Notion AI'], example: '整理公司制度' },
                    { id: 'task-archive', name: '档案管理', timePercent: 6, agent: 'Workflow', products: ['钉钉AI'], example: '档案归档检索' }
                ]
            },
            '采购管理': {
                id: 'scene-purchase',
                timePercent: 18,
                tasks: [
                    { id: 'task-vendor-mgmt', name: '供应商管理', timePercent: 6, agent: 'Workflow', products: ['钉钉AI', '用友AI'], example: '供应商评估' },
                    { id: 'task-inquiry', name: '采购询价', timePercent: 6, agent: 'Browser', products: ['Perplexity', '秘塔搜索'], example: '比价查询' },
                    { id: 'task-contract', name: '合同管理', timePercent: 6, agent: 'Workflow', products: ['钉钉AI', '飞书文档'], example: '合同审批流程' }
                ]
            },
            '资产管理': {
                id: 'scene-asset',
                timePercent: 12,
                tasks: [
                    { id: 'task-inventory', name: '资产盘点', timePercent: 6, agent: 'Workflow', products: ['钉钉AI', '用友AI'], example: '固定资产盘点' },
                    { id: 'task-asset-use', name: '资产领用', timePercent: 6, agent: 'Workflow', products: ['钉钉AI'], example: '资产借用归还' }
                ]
            },
            '会议活动': {
                id: 'scene-event',
                timePercent: 15,
                tasks: [
                    { id: 'task-meeting-org', name: '会议组织', timePercent: 5, agent: 'Background', products: ['飞书文档', '钉钉AI'], example: '会议邀请通知' },
                    { id: 'task-event-plan', name: '活动策划', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '团建活动方案' },
                    { id: 'task-minutes', name: '会议纪要', timePercent: 5, agent: 'Chatbot', products: ['飞书妙记', '通义听悟'], example: '自动生成纪要' }
                ]
            },
            '后勤保障': {
                id: 'scene-logistics',
                timePercent: 10,
                tasks: [
                    { id: 'task-vehicle', name: '车辆调度', timePercent: 5, agent: 'Background', products: ['钉钉AI'], example: '用车预约' },
                    { id: 'task-facility', name: '设施维护', timePercent: 5, agent: 'Workflow', products: ['钉钉AI'], example: '报修工单' }
                ]
            }
        }
    },
    it: {
        name: 'IT支持类',
        id: 'role-it',
        percentage: 5,
        icon: '🖥️',
        color: '#6366F1',
        scenes: {
            '技术支持': {
                id: 'scene-support',
                timePercent: 30,
                tasks: [
                    { id: 'task-ticket', name: '工单处理', timePercent: 12, agent: 'Workflow', products: ['智齿客服', '钉钉AI'], example: 'IT工单自动派发' },
                    { id: 'task-diagnose', name: '问题诊断', timePercent: 10, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '故障智能诊断' },
                    { id: 'task-remote', name: '远程协助', timePercent: 8, agent: 'Computer', products: ['UiPath'], example: '远程桌面操作' }
                ]
            },
            '系统运维': {
                id: 'scene-ops',
                timePercent: 25,
                tasks: [
                    { id: 'task-server', name: '服务器管理', timePercent: 10, agent: 'Coding', products: ['GitHub Copilot', 'Cursor'], example: '运维脚本编写' },
                    { id: 'task-db', name: '数据库运维', timePercent: 8, agent: 'Coding', products: ['ChatGPT', 'Claude'], example: 'SQL优化建议' },
                    { id: 'task-backup', name: '备份恢复', timePercent: 7, agent: 'Background', products: ['UiPath'], example: '定时备份任务' }
                ]
            },
            '安全管理': {
                id: 'scene-security',
                timePercent: 15,
                tasks: [
                    { id: 'task-security-policy', name: '安全策略', timePercent: 6, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '安全策略咨询' },
                    { id: 'task-vuln', name: '漏洞扫描', timePercent: 5, agent: 'Workflow', products: ['UiPath'], example: '安全扫描自动化' },
                    { id: 'task-permission', name: '权限管理', timePercent: 4, agent: 'Workflow', products: ['钉钉AI'], example: '权限审批流程' }
                ]
            },
            '资产管理': {
                id: 'scene-it-asset',
                timePercent: 12,
                tasks: [
                    { id: 'task-it-inventory', name: 'IT资产台账', timePercent: 6, agent: 'Workflow', products: ['钉钉AI', '用友AI'], example: '资产信息维护' },
                    { id: 'task-license', name: '软件许可', timePercent: 6, agent: 'Workflow', products: ['钉钉AI'], example: '许可证管理' }
                ]
            },
            '监控告警': {
                id: 'scene-monitor',
                timePercent: 10,
                tasks: [
                    { id: 'task-sys-monitor', name: '系统监控', timePercent: 5, agent: 'Background', products: ['钉钉AI'], example: '监控告警通知' },
                    { id: 'task-alert', name: '告警处理', timePercent: 5, agent: 'Workflow', products: ['钉钉AI'], example: '告警工单创建' }
                ]
            },
            '知识文档': {
                id: 'scene-it-doc',
                timePercent: 8,
                tasks: [
                    { id: 'task-ops-doc', name: '运维文档', timePercent: 4, agent: 'Chatbot', products: ['Notion AI', '飞书文档'], example: '运维手册编写' },
                    { id: 'task-it-faq', name: 'FAQ维护', timePercent: 4, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '常见问题整理' }
                ]
            }
        }
    },
    hr: {
        name: '人事类',
        id: 'role-hr',
        percentage: 4,
        icon: '👥',
        color: '#EC4899',
        scenes: {
            '招聘管理': {
                id: 'scene-recruit',
                timePercent: 25,
                tasks: [
                    { id: 'task-resume', name: '简历筛选', timePercent: 10, agent: 'Chatbot', products: ['Moka', '北森AI', 'ChatGPT'], example: 'AI简历初筛' },
                    { id: 'task-interview', name: '面试安排', timePercent: 6, agent: 'Background', products: ['钉钉AI', '飞书文档'], example: '面试日程协调' },
                    { id: 'task-candidate', name: '候选人评估', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '面试评价生成' },
                    { id: 'task-offer', name: 'Offer发放', timePercent: 4, agent: 'Workflow', products: ['Moka', '北森AI'], example: 'Offer审批流程' }
                ]
            },
            '员工关系': {
                id: 'scene-employee',
                timePercent: 20,
                tasks: [
                    { id: 'task-onboard', name: '入职办理', timePercent: 6, agent: 'Workflow', products: ['钉钉AI', '飞书文档'], example: '入职流程自动化' },
                    { id: 'task-regular', name: '转正管理', timePercent: 5, agent: 'Workflow', products: ['钉钉AI', '北森AI'], example: '转正审批' },
                    { id: 'task-consult', name: '员工咨询', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Kimi', '智齿客服'], example: 'HR政策问答' },
                    { id: 'task-offboard', name: '离职面谈', timePercent: 4, agent: 'Chatbot', products: ['ChatGPT'], example: '离职原因分析' }
                ]
            },
            '薪酬绩效': {
                id: 'scene-salary',
                timePercent: 18,
                tasks: [
                    { id: 'task-payroll', name: '薪资核算', timePercent: 7, agent: 'Workflow', products: ['北森AI', '用友AI'], example: '工资自动计算' },
                    { id: 'task-performance', name: '绩效考核', timePercent: 6, agent: 'Workflow', products: ['北森AI', '钉钉AI'], example: '绩效评估流程' },
                    { id: 'task-social', name: '社保公积金', timePercent: 5, agent: 'Workflow', products: ['用友AI', '金蝶AI'], example: '社保缴纳计算' }
                ]
            },
            '培训发展': {
                id: 'scene-training',
                timePercent: 15,
                tasks: [
                    { id: 'task-train-need', name: '培训需求', timePercent: 5, agent: 'Research', products: ['ChatGPT', 'Kimi'], example: '培训需求调研' },
                    { id: 'task-course', name: '课程开发', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Gamma'], example: '培训课件制作' },
                    { id: 'task-train-org', name: '培训组织', timePercent: 5, agent: 'Background', products: ['钉钉AI', '飞书文档'], example: '培训通知安排' }
                ]
            },
            '人事数据': {
                id: 'scene-hr-data',
                timePercent: 12,
                tasks: [
                    { id: 'task-hr-report', name: '人事报表', timePercent: 5, agent: 'Data', products: ['帆软AI', '北森AI'], example: '人力数据报表' },
                    { id: 'task-turnover', name: '离职分析', timePercent: 4, agent: 'Data', products: ['帆软AI', 'Power BI'], example: '离职率分析' },
                    { id: 'task-talent', name: '人才盘点', timePercent: 3, agent: 'Research', products: ['北森AI'], example: '人才画像分析' }
                ]
            },
            '制度流程': {
                id: 'scene-hr-policy',
                timePercent: 10,
                tasks: [
                    { id: 'task-policy-write', name: '制度编写', timePercent: 5, agent: 'Chatbot', products: ['WPS AI', '飞书文档'], example: '人事制度起草' },
                    { id: 'task-policy-qa', name: '政策解读', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '劳动法规咨询' }
                ]
            }
        }
    },
    sales: {
        name: '销售类',
        id: 'role-sales',
        percentage: 20,
        icon: '💼',
        color: '#EF4444',
        scenes: {
            '客户开发': {
                id: 'scene-customer',
                timePercent: 25,
                tasks: [
                    { id: 'task-lead', name: '线索挖掘', timePercent: 8, agent: 'Research', products: ['Perplexity', '秘塔搜索', 'Salesforce Einstein'], example: '潜在客户搜索' },
                    { id: 'task-visit', name: '客户拜访', timePercent: 7, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '拜访话术准备' },
                    { id: 'task-need-research', name: '需求调研', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Claude'], example: '客户需求分析' },
                    { id: 'task-demo', name: '方案演示', timePercent: 5, agent: 'Design', products: ['Gamma', 'Canva AI'], example: '演示PPT制作' }
                ]
            },
            '商务谈判': {
                id: 'scene-negotiation',
                timePercent: 20,
                tasks: [
                    { id: 'task-quote', name: '报价制作', timePercent: 8, agent: 'Chatbot', products: ['WPS AI', '飞书文档'], example: '报价单生成' },
                    { id: 'task-contract-nego', name: '合同谈判', timePercent: 6, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '谈判策略建议' },
                    { id: 'task-bid', name: '招投标', timePercent: 6, agent: 'Chatbot', products: ['WPS AI', 'ChatGPT'], example: '标书编写' }
                ]
            },
            '客户管理': {
                id: 'scene-crm',
                timePercent: 18,
                tasks: [
                    { id: 'task-crm', name: 'CRM维护', timePercent: 7, agent: 'Workflow', products: ['Salesforce Einstein', '纷享销客'], example: '客户信息录入' },
                    { id: 'task-followup', name: '客户跟进', timePercent: 6, agent: 'Background', products: ['Salesforce Einstein', '销售易'], example: '跟进提醒' },
                    { id: 'task-segment', name: '客户分层', timePercent: 5, agent: 'Data', products: ['Salesforce Einstein', '纷享销客'], example: '客户价值分析' }
                ]
            },
            '销售支持': {
                id: 'scene-sales-support',
                timePercent: 15,
                tasks: [
                    { id: 'task-compete', name: '竞品分析', timePercent: 6, agent: 'Research', products: ['Perplexity', '秘塔搜索'], example: '竞争对手研究' },
                    { id: 'task-case', name: '案例整理', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Notion AI'], example: '成功案例编写' },
                    { id: 'task-sales-tool', name: '销售工具', timePercent: 4, agent: 'Design', products: ['Canva AI', 'Gamma'], example: '销售物料制作' }
                ]
            },
            '数据分析': {
                id: 'scene-sales-data',
                timePercent: 12,
                tasks: [
                    { id: 'task-sales-report', name: '销售报表', timePercent: 5, agent: 'Data', products: ['帆软AI', 'Power BI'], example: '业绩报表生成' },
                    { id: 'task-forecast', name: '业绩预测', timePercent: 4, agent: 'Data', products: ['Salesforce Einstein', '帆软AI'], example: '销售预测分析' },
                    { id: 'task-funnel', name: '漏斗分析', timePercent: 3, agent: 'Data', products: ['Salesforce Einstein'], example: '转化漏斗分析' }
                ]
            },
            '内部协作': {
                id: 'scene-sales-collab',
                timePercent: 10,
                tasks: [
                    { id: 'task-sales-meeting', name: '销售会议', timePercent: 5, agent: 'Chatbot', products: ['飞书妙记', '通义听悟'], example: '会议纪要' },
                    { id: 'task-resource', name: '资源协调', timePercent: 5, agent: 'Workflow', products: ['钉钉AI', '飞书文档'], example: '内部协作流程' }
                ]
            }
        }
    },
    marketing: {
        name: '市场类',
        id: 'role-marketing',
        percentage: 8,
        icon: '📣',
        color: '#8B5CF6',
        scenes: {
            '内容创作': {
                id: 'scene-content',
                timePercent: 25,
                tasks: [
                    { id: 'task-copywriting', name: '文案撰写', timePercent: 10, agent: 'Chatbot', products: ['ChatGPT', 'Claude', 'Kimi', '豆包'], example: '营销文案创作' },
                    { id: 'task-wechat', name: '公众号运营', timePercent: 6, agent: 'Chatbot', products: ['ChatGPT', 'Kimi', 'WPS AI'], example: '公众号文章' },
                    { id: 'task-video-script', name: '视频脚本', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '短视频脚本' },
                    { id: 'task-poster', name: '海报设计', timePercent: 4, agent: 'Design', products: ['Midjourney', 'Canva AI', '稿定AI'], example: '营销海报制作' }
                ]
            },
            '品牌推广': {
                id: 'scene-brand',
                timePercent: 20,
                tasks: [
                    { id: 'task-brand-plan', name: '品牌策划', timePercent: 7, agent: 'Chatbot', products: ['ChatGPT', 'Claude'], example: '品牌策略文档' },
                    { id: 'task-pr', name: 'PR稿件', timePercent: 7, agent: 'Chatbot', products: ['ChatGPT', 'WPS AI'], example: '新闻稿撰写' },
                    { id: 'task-sentiment', name: '舆情监控', timePercent: 6, agent: 'Browser', products: ['Perplexity', '秘塔搜索'], example: '品牌舆情监测' }
                ]
            },
            '活动策划': {
                id: 'scene-event-mkt',
                timePercent: 18,
                tasks: [
                    { id: 'task-online-event', name: '线上活动', timePercent: 6, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '活动方案策划' },
                    { id: 'task-offline-event', name: '线下活动', timePercent: 6, agent: 'Chatbot', products: ['ChatGPT', 'Notion AI'], example: '展会策划' },
                    { id: 'task-live', name: '直播策划', timePercent: 6, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '直播脚本' }
                ]
            },
            '数字营销': {
                id: 'scene-digital',
                timePercent: 15,
                tasks: [
                    { id: 'task-seo', name: 'SEO优化', timePercent: 5, agent: 'Research', products: ['Perplexity', 'ChatGPT'], example: '关键词优化' },
                    { id: 'task-sem', name: 'SEM投放', timePercent: 5, agent: 'Data', products: ['ChatGPT'], example: '广告投放分析' },
                    { id: 'task-social', name: '社媒运营', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '社交媒体内容' }
                ]
            },
            '数据分析': {
                id: 'scene-mkt-data',
                timePercent: 12,
                tasks: [
                    { id: 'task-mkt-effect', name: '效果分析', timePercent: 5, agent: 'Data', products: ['帆软AI', 'Power BI'], example: '营销效果报表' },
                    { id: 'task-portrait', name: '用户画像', timePercent: 4, agent: 'Data', products: ['帆软AI'], example: '用户画像分析' },
                    { id: 'task-roi', name: 'ROI分析', timePercent: 3, agent: 'Data', products: ['帆软AI', 'Power BI'], example: '投放ROI计算' }
                ]
            },
            '市场调研': {
                id: 'scene-mkt-research',
                timePercent: 10,
                tasks: [
                    { id: 'task-industry', name: '行业研究', timePercent: 5, agent: 'Research', products: ['Perplexity', '秘塔搜索', 'Kimi'], example: '行业报告分析' },
                    { id: 'task-compete-mkt', name: '竞品监测', timePercent: 5, agent: 'Browser', products: ['Perplexity', '秘塔搜索'], example: '竞品动态追踪' }
                ]
            }
        }
    },
    product: {
        name: '产品类',
        id: 'role-product',
        percentage: 6,
        icon: '📱',
        color: '#14B8A6',
        scenes: {
            '需求管理': {
                id: 'scene-req',
                timePercent: 25,
                tasks: [
                    { id: 'task-req-collect', name: '需求收集', timePercent: 7, agent: 'Chatbot', products: ['飞书文档', 'Notion AI'], example: '需求整理归类' },
                    { id: 'task-req-analyze', name: '需求分析', timePercent: 8, agent: 'Chatbot', products: ['ChatGPT', 'Claude', 'Kimi'], example: '需求优先级分析' },
                    { id: 'task-prd', name: '需求文档', timePercent: 6, agent: 'Chatbot', products: ['Notion AI', '飞书文档', 'WPS AI'], example: 'PRD文档编写' },
                    { id: 'task-req-review', name: '需求评审', timePercent: 4, agent: 'Chatbot', products: ['飞书妙记', '通义听悟'], example: '评审纪要整理' }
                ]
            },
            '产品设计': {
                id: 'scene-pd',
                timePercent: 22,
                tasks: [
                    { id: 'task-feature', name: '功能设计', timePercent: 8, agent: 'Chatbot', products: ['ChatGPT', 'Claude'], example: '功能方案设计' },
                    { id: 'task-prototype', name: '原型绘制', timePercent: 7, agent: 'Design', products: ['Figma AI', '即时AI'], example: '低保真原型' },
                    { id: 'task-interaction', name: '交互设计', timePercent: 7, agent: 'Design', products: ['Figma AI', '即时AI'], example: '交互流程图' }
                ]
            },
            '项目跟进': {
                id: 'scene-pm',
                timePercent: 18,
                tasks: [
                    { id: 'task-progress', name: '进度跟踪', timePercent: 7, agent: 'Workflow', products: ['飞书文档', '钉钉AI'], example: '项目进度更新' },
                    { id: 'task-risk', name: '风险管理', timePercent: 6, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '风险识别分析' },
                    { id: 'task-launch', name: '上线管理', timePercent: 5, agent: 'Workflow', products: ['飞书文档', '钉钉AI'], example: '上线检查清单' }
                ]
            },
            '数据分析': {
                id: 'scene-pd-data',
                timePercent: 15,
                tasks: [
                    { id: 'task-pd-report', name: '产品数据', timePercent: 6, agent: 'Data', products: ['帆软AI', 'Power BI'], example: '产品核心指标' },
                    { id: 'task-behavior', name: '行为分析', timePercent: 5, agent: 'Data', products: ['帆软AI', '网易有数'], example: '用户行为分析' },
                    { id: 'task-ab', name: 'A/B测试', timePercent: 4, agent: 'Data', products: ['帆软AI'], example: '实验结果分析' }
                ]
            },
            '用户研究': {
                id: 'scene-ur',
                timePercent: 12,
                tasks: [
                    { id: 'task-interview-ur', name: '用户访谈', timePercent: 5, agent: 'Chatbot', products: ['飞书妙记', '通义听悟'], example: '访谈记录整理' },
                    { id: 'task-survey', name: '问卷调研', timePercent: 4, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '问卷设计分析' },
                    { id: 'task-compete-pd', name: '竞品分析', timePercent: 3, agent: 'Research', products: ['Perplexity', '秘塔搜索'], example: '竞品功能对比' }
                ]
            },
            '文档沟通': {
                id: 'scene-pd-doc',
                timePercent: 8,
                tasks: [
                    { id: 'task-pd-doc', name: '产品文档', timePercent: 4, agent: 'Chatbot', products: ['Notion AI', '飞书文档'], example: '产品手册' },
                    { id: 'task-pd-meeting', name: '会议纪要', timePercent: 4, agent: 'Chatbot', products: ['飞书妙记', '通义听悟'], example: '产品会议纪要' }
                ]
            }
        }
    },
    service: {
        name: '客服类',
        id: 'role-service',
        percentage: 8,
        icon: '🎧',
        color: '#F97316',
        scenes: {
            '在线咨询': {
                id: 'scene-consult',
                timePercent: 35,
                tasks: [
                    { id: 'task-product-qa', name: '产品咨询', timePercent: 15, agent: 'Chatbot', products: ['智齿客服', '网易七鱼', 'Intercom'], example: '智能客服问答' },
                    { id: 'task-order', name: '订单查询', timePercent: 10, agent: 'Chatbot', products: ['智齿客服', '网易七鱼'], example: '订单状态查询' },
                    { id: 'task-guide', name: '使用指导', timePercent: 10, agent: 'Chatbot', products: ['智齿客服', 'ChatGPT'], example: '产品使用帮助' }
                ]
            },
            '投诉处理': {
                id: 'scene-complaint',
                timePercent: 20,
                tasks: [
                    { id: 'task-accept', name: '客诉受理', timePercent: 8, agent: 'Workflow', products: ['智齿客服', '网易七鱼'], example: '投诉工单创建' },
                    { id: 'task-locate', name: '问题定位', timePercent: 6, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '问题原因分析' },
                    { id: 'task-solution', name: '解决方案', timePercent: 6, agent: 'Research', products: ['ChatGPT', '智齿客服'], example: '解决方案推荐' }
                ]
            },
            '售后支持': {
                id: 'scene-aftersale',
                timePercent: 18,
                tasks: [
                    { id: 'task-return', name: '退换货', timePercent: 7, agent: 'Workflow', products: ['智齿客服', '钉钉AI'], example: '退换货流程' },
                    { id: 'task-repair', name: '维修服务', timePercent: 6, agent: 'Workflow', products: ['智齿客服'], example: '报修工单' },
                    { id: 'task-tech-support', name: '技术支持', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', '智齿客服'], example: '技术问题解答' }
                ]
            },
            '工单管理': {
                id: 'scene-ticket-svc',
                timePercent: 12,
                tasks: [
                    { id: 'task-ticket-create', name: '工单创建', timePercent: 4, agent: 'Workflow', products: ['智齿客服', 'Zendesk AI'], example: '智能工单分类' },
                    { id: 'task-ticket-flow', name: '工单流转', timePercent: 4, agent: 'Workflow', products: ['智齿客服', 'Zendesk AI'], example: '工单自动派发' },
                    { id: 'task-escalate', name: '升级处理', timePercent: 4, agent: 'Workflow', products: ['智齿客服'], example: '工单升级规则' }
                ]
            },
            '知识管理': {
                id: 'scene-kb',
                timePercent: 10,
                tasks: [
                    { id: 'task-faq', name: 'FAQ维护', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Kimi', '智齿客服'], example: 'FAQ内容更新' },
                    { id: 'task-script', name: '话术优化', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Claude'], example: '客服话术优化' }
                ]
            },
            '质量管理': {
                id: 'scene-qa-svc',
                timePercent: 5,
                tasks: [
                    { id: 'task-qc', name: '质检抽查', timePercent: 3, agent: 'Data', products: ['智齿客服', '网易七鱼'], example: '对话质量分析' },
                    { id: 'task-csat', name: '满意度', timePercent: 2, agent: 'Data', products: ['智齿客服', '帆软AI'], example: '满意度数据分析' }
                ]
            }
        }
    },
    legal: {
        name: '法务类',
        id: 'role-legal',
        percentage: 2,
        icon: '⚖️',
        color: '#64748B',
        scenes: {
            '合同管理': {
                id: 'scene-contract',
                timePercent: 30,
                tasks: [
                    { id: 'task-contract-draft', name: '合同起草', timePercent: 10, agent: 'Chatbot', products: ['幂律智能', 'ChatGPT', 'Claude'], example: '合同模板生成' },
                    { id: 'task-contract-review', name: '合同审核', timePercent: 12, agent: 'Chatbot', products: ['幂律智能', '法狗狗', 'ChatGPT'], example: 'AI合同审查' },
                    { id: 'task-contract-nego', name: '合同谈判', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Kimi'], example: '条款修改建议' },
                    { id: 'task-contract-archive', name: '合同归档', timePercent: 3, agent: 'Workflow', products: ['钉钉AI', '飞书文档'], example: '合同电子归档' }
                ]
            },
            '法律咨询': {
                id: 'scene-legal-consult',
                timePercent: 20,
                tasks: [
                    { id: 'task-biz-legal', name: '业务咨询', timePercent: 8, agent: 'Chatbot', products: ['幂律智能', 'ChatGPT', 'Kimi'], example: '法律问题解答' },
                    { id: 'task-risk-assess', name: '风险评估', timePercent: 7, agent: 'Research', products: ['幂律智能', 'Perplexity'], example: '法律风险分析' },
                    { id: 'task-legal-opinion', name: '法律意见', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'Claude'], example: '法律意见书' }
                ]
            },
            '知识产权': {
                id: 'scene-ip',
                timePercent: 15,
                tasks: [
                    { id: 'task-trademark', name: '商标注册', timePercent: 5, agent: 'Research', products: ['Perplexity', '秘塔搜索'], example: '商标查询检索' },
                    { id: 'task-patent', name: '专利申请', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', '幂律智能'], example: '专利文书撰写' },
                    { id: 'task-infringement', name: '侵权处理', timePercent: 5, agent: 'Research', products: ['幂律智能', 'Perplexity'], example: '侵权证据收集' }
                ]
            },
            '诉讼仲裁': {
                id: 'scene-litigation',
                timePercent: 12,
                tasks: [
                    { id: 'task-case-mgmt', name: '案件管理', timePercent: 4, agent: 'Workflow', products: ['幂律智能', '钉钉AI'], example: '案件进度跟踪' },
                    { id: 'task-evidence', name: '证据收集', timePercent: 4, agent: 'Research', products: ['Perplexity', '秘塔搜索'], example: '证据资料检索' },
                    { id: 'task-pleading', name: '文书起草', timePercent: 4, agent: 'Chatbot', products: ['幂律智能', 'ChatGPT'], example: '诉讼文书撰写' }
                ]
            },
            '合规管理': {
                id: 'scene-compliance',
                timePercent: 15,
                tasks: [
                    { id: 'task-compliance-review', name: '合规审查', timePercent: 6, agent: 'Research', products: ['幂律智能', 'Perplexity'], example: '合规性检查' },
                    { id: 'task-policy-build', name: '制度建设', timePercent: 5, agent: 'Chatbot', products: ['ChatGPT', 'WPS AI'], example: '合规制度起草' },
                    { id: 'task-legal-train', name: '培训宣贯', timePercent: 4, agent: 'Chatbot', products: ['ChatGPT', 'Gamma'], example: '法律培训课件' }
                ]
            },
            '文档管理': {
                id: 'scene-legal-doc',
                timePercent: 8,
                tasks: [
                    { id: 'task-legal-doc', name: '法律文档', timePercent: 4, agent: 'Chatbot', products: ['Notion AI', '飞书文档'], example: '法律文档管理' },
                    { id: 'task-law-update', name: '法规更新', timePercent: 4, agent: 'Research', products: ['Perplexity', '秘塔搜索'], example: '法规动态追踪' }
                ]
            }
        }
    }
};

// 导出数据供其他模块使用
window.productLinks = productLinks;
window.agentData = agentData;
window.roleData = roleData;

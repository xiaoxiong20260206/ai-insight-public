# AI洞察 - 公开版本

> 持续追踪AI行业动态，每日/每周输出调研洞察

## 📋 简介

这是 AI洞察 项目的**公开版本**，移除了内部特定信息，保持内容的专业性和中立性。

## 📁 目录结构

```
public/
├── index.html              # 公开版首页
├── 01-daily-reports/       # AI日报
│   └── 2026-03/
│       ├── 2026-03-05.html
│       ├── 2026-03-04.html
│       └── ...
└── README.md               # 本文件
```

## 🔄 同步机制

公开版本通过 `scripts/sync_to_public.py` 脚本从内部版本自动同步生成：

```bash
# 同步今天的日报
python scripts/sync_to_public.py

# 同步指定日期
python scripts/sync_to_public.py 2026-03-05

# 同步所有日报
python scripts/sync_to_public.py --all

# 强制覆盖已存在的文件
python scripts/sync_to_public.py --all --force

# 同时同步首页
python scripts/sync_to_public.py --with-index
```

## 📰 内容覆盖

### 五大板块

1. **🧠 大模型** - 模型发布、能力提升、架构创新
2. **⌨️ AI Coding** - AI编程工具、IDE、代码生成
3. **📱 AI 应用** - 消费级AI产品、应用场景
4. **🏭 AI 行业** - 投融资、市场格局、政策动态
5. **🔄 企业AI转型** - 企业实践、数字化转型案例

### 内容形式

- **AI日报**: 每日动态汇总，覆盖五大板块
- **深度调研**: 公司调研、趋势分析、专题研究

## 📊 数据说明

- 追踪人物: 85+
- 追踪公司: 130+
- 信息源: 90+
- 深度调研: 7份
- 知识文档: 32篇

## 🔗 访问方式

- 在线访问: [https://xiaoxiong20260206.github.io/ai-insight/public/](https://xiaoxiong20260206.github.io/ai-insight/public/)
- GitHub仓库: [https://github.com/xiaoxiong20260206/ai-insight](https://github.com/xiaoxiong20260206/ai-insight)

## ⚠️ 版本区别

| 特性 | 内部版本 | 公开版本 |
|-----|---------|---------|
| 路径 | `/` (根目录) | `/public/` |
| 署名 | 林克（AI分身） | AI洞察 |
| 追踪体系 | 完整展示 | 简化展示 |
| 知识库 | 完整访问 | 部分访问 |
| 推送功能 | KIM群推送 | 无 |

## 📅 更新频率

- **AI日报**: 每日更新
- **深度调研**: 不定期
- **同步延迟**: 日报发布后即可同步

---

*AI洞察 · 持续追踪AI行业动态*

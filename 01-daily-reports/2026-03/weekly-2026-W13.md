# AI 周报 - 2026年第13周（3.23 - 3.29）

## 📋 本周概览

> 本周AI行业五大板块动态汇总，覆盖7期日报·80+条重要资讯

| 板块 | 要点数 | 关键事件 |
|------|--------|----------|
| 🧠 大模型 | 18条 | MiniMax M2.7全球第四发布；腾讯AI Lab解散整合混元；ARC-AGI-3新基准发布；Sora宣告关闭 |
| ⌨️ AI Coding | 14条 | Cursor Composer 2降价86%+常驻Agent；Claude Code Auto Mode；Cursor自托管云Agent GA；Kimi K2.5被确认为Cursor底座 |
| 📱 AI 应用 | 12条 | OpenAI File Library跨会话记忆；Figma MCP开放Agent写权限；苹果开放Siri给竞品；Kimi启动港股IPO筹备 |
| 🏭 AI 行业 | 14条 | 月之暗面估值$180B冲$10亿D轮；中国大模型周调用量4.69万亿Token；美国3月融资骤降至$130亿；Arm进军数据中心芯片 |
| 🔄 企业AI转型 | 10条 | Accenture+Anthropic发布Cyber.AI企业安全方案；Oracle+Microsoft企业Agent加速；LiteLLM供应链攻击；国内企业AI落地提速 |

---

## 🏆 本周 Top 5

> 从80+条资讯中精选最值得关注的5件事

### 1. Sora关闭：AI视频赛道首次重大商业退场
- **来源**: SF Chronicle · 3月25日
- **摘要**: OpenAI正式关闭Sora AI视频应用，Disney同步终止1亿美元合作协议，OpenAI将资源重新聚焦机器人领域。Sora是6个月前以TikTok竞争者姿态上线的生成式视频产品，背靠迪士尼背书、技术被广泛认可。
- **为什么重要**: Sora的失败是"商业逻辑不成立"而非"技术不够"。它给整个AI行业敲响警钟：技术验证≠商业验证。AI变现的主战场正在从C端走向B端基础设施——Sora关闭与Arm进军数据中心芯片同日发布，绝非偶然。

### 2. MiniMax M2.7：108天四代迭代，国产第一全球第四
- **来源**: 新浪新闻/MiniMax官方 · 3月22日
- **摘要**: MiniMax M2.7发布仅5天，在PinchBench夺得全球第四、国产第一。模型具备自我进化能力，能自主运行超100轮优化循环。M2.5上线一周API调用量3.07万亿Token，登顶全球开源模型。从M2到M2.7共108天四代迭代，SWE-Pro 56.22%，成本仅为Claude Sonnet的8%。
- **为什么重要**: 国产模型首次在不依赖大厂背书的情况下获得全球顶级认可。"极致性价比+快速迭代"的路线，在本周获得了市场的历史性验证。

### 3. Cursor Composer 2：降价86%+Automations，向企业研发OS进化
- **来源**: Cursor官方/TechCrunch · 3月19日/25日
- **摘要**: Cursor发布Composer 2，底层基于月之暗面Kimi K2.5构建，Standard版$0.50/M（降价约86%）。Automations支持Slack/GitHub/PagerDuty触发常驻Agent，3月25日GA发布Self-hosted Cloud Agents，企业代码不出网络。Cursor年化收入已超$2B，估值$29.3B。
- **为什么重要**: 本周Cursor连续三次发布——降价+常驻Agent+企业自托管，三件事叠加后Cursor已不像一个IDE插件，更像一个开发者OS的雏形。企业级AI编程市场正在被打开。

### 4. 腾讯AI Lab解散并入混元：大厂AI整合时代到来
- **来源**: 微信/科技媒体 · 3月22日
- **摘要**: 腾讯AI Lab正式宣告解散，研究团队和资源整体并入混元团队。这是继百度缩减AI Lab、阿里整合通义之后，国内大厂AI组织整合的又一标志性事件。混元将成为腾讯唯一的核心AI品牌。
- **为什么重要**: 国内大厂AI的"研究vs产品"博弈宣告产品侧获胜。与月之暗面4倍估值增长对照：大厂走整合路线，独立公司走速度路线——两条路都在本周得到验证。

### 5. Kimi港股IPO筹备：中国AI应用商业化的「价值验证时刻」
- **来源**: Bloomberg/彭博社 · 3月26日
- **摘要**: 月之暗面(Moonshot AI)已与中金公司(CICC)和高盛展开初步IPO谈判，拟赴港上市，估值约$180亿美元。Kimi月活已超1亿，订阅量较去年同期暴增8280%，成为中国AI独角兽港股上市潮的最新成员。
- **为什么重要**: Kimi是国内少有的完成"技术向→消费级产品"跃迁的AI公司，月活破亿证明了AI应用在中国消费级市场的商业可行性。港股路径将成为更多中国AI公司的参考模板。

---

## 🔮 周度洞察

> 比日报更高维度的跨日交叉分析

### 1. AI消费产品退潮，基础设施加速扩张
- **来源**: OpenAI/Arm/CNBC · 3月25日
- **摘要**: Sora关闭（消费端退场）与Arm发布首款AGI CPU（基础设施扩张）同日发生，并非偶然。同周：美国3月融资骤降至$130亿（较2月$1600亿大幅下滑），但下降完全由AI超大轮次减少驱动，早期轮次稳定；中国大模型周调用量4.69万亿Token持续增长。
- **趋势判断**: AI行业正在进入"从C端泡沫回归B端基础设施"的分化阶段——能证明商业可行性的少数公司估值飙升，纯消费级AI独立App遭遇淘汰。
- **支撑事件**: 3/25 Sora宣告关闭 → 3/25 Arm AGI CPU发布+Meta首发 → 3/26 美国融资数据骤降 → 3/28 中国调用量4.69万亿Token数据披露

### 2. AI Coding工具战争进入平台化阶段：「谁建生态」决定终局
- **来源**: Cursor/Anthropic/OpenAI · 3月19日-29日
- **摘要**: 本周AI编程工具连续三层进化：①降价+性能（Composer 2降价86%）→ ②常驻Agent（Automations）→ ③企业部署（自托管）。Claude Code同步发布Auto Mode（权限自主判断），Figma MCP开放Agent写权限，AI编程工具正在深入产品全流程。Kimi K2.5被确认为Cursor底座，侧面证明了国产模型已进入全球一流水平。
- **趋势判断**: AI编程工具进入2.0平台化阶段——竞争终局不是"谁写代码更好"，而是"谁拥有更完整的开发者工作流"。企业级市场是下一个战场。
- **支撑事件**: 3/23 Cursor Composer 2 → 3/25 Cursor自托管GA → 3/26 Claude Code Auto Mode → 3/29 Figma MCP Server Beta，7天内四个关键节点

### 3. 中国AI两条路同步得到验证：大厂整合 vs 独立高速迭代
- **来源**: 多源 · 3月22日-28日
- **摘要**: 同一周内，腾讯AI Lab解散并入混元（大厂整合）、MiniMax M2.7全球第四（独立迭代）、月之暗面估值涨4倍冲$10亿D轮（独立崛起）三件事同时发生，形成完整的市场实验对照。国产大模型连续三周在OpenRouter调用量超越美国，前四名全为国产。
- **趋势判断**: 中国AI生态的多元化格局正在形成——大厂走品牌整合路线，独立公司走速度路线，两条路在当前阶段都被市场验证有效。
- **支撑事件**: 3/22 腾讯AI Lab解散 → 3/22 MiniMax M2.7全球第四 → 3/23 Kimi估值涨4倍消息 → 3/27 OpenRouter国产调用量数据 → 3/28 Kimi港股IPO消息

---

## 一、大模型

### 本周动态汇总

| 日期 | 事件 | 来源 | 重要度 |
|------|------|------|--------|
| 3/22 | MiniMax M2.7发布5天：PinchBench全球第四、国产第一，108天四代 | 新浪新闻 | 🔴 |
| 3/22 | 腾讯AI Lab正式解散，整体并入混元团队 | 微信/科技媒体 | 🔴 |
| 3/23 | ARC-AGI-3定档3月25日发布，互动推理新基准 | ARC Prize | 🟡 |
| 3/23 | Claude Opus 4.6发布，多项Agent基准最优 | Anthropic | 🟡 |
| 3/24 | ChatGPT File Library上线，文件跨会话永久保存 | OpenAI | 🟡 |
| 3/24 | Anthropic发布81,000人AI使用调研报告 | Anthropic | 🟡 |
| 3/25 | ARC-AGI-3正式发布，1000+题互动推理基准 | ARC Prize | 🟡 |
| 3/25 | Qwen3.5-9B以小胜大，价格仅$0.05/M | VentureBeat | 🟡 |
| 3/25 | OpenAI关闭Sora视频应用，Disney终止$1亿合作 | SF Chronicle | 🔴 |
| 3/26 | Google发布Gemini 3.1 Flash Live Preview，A2A实时语音 | Google | 🟡 |
| 3/26 | Meta「牛油果」模型再次延期，性能未达预期 | NYT | 🟡 |
| 3/26 | Anthropic经济指数：AI编程任务占比下降，场景多元化 | Anthropic | 🟡 |
| 3/29 | Claude获得Computer Use能力，可操控电脑完成任务 | CNBC | 🔴 |
| 3/29 | Google Gemini 3.1 Flash Live进入工程可用状态 | Google AI | 🟡 |

### 本周趋势

本周大模型领域出现了**两个方向的分叉**：能力层继续扩张（Claude Computer Use、ARC-AGI-3新基准、语音AI），同时商业化路径开始分化（Sora关闭是信号）。Gemini Flash Live的发布标志语音AI基础设施成熟到可以直接嵌入产品——语音Agent的规模化时代正在开启。

---

## 二、AI Coding

### 本周动态汇总

| 日期 | 事件 | 来源 | 重要度 |
|------|------|------|--------|
| 3/23 | Cursor Composer 2发布：降价86%，基于Kimi K2.5 | Cursor/TechCrunch | 🔴 |
| 3/23 | Cursor Automations：Slack/GitHub/PagerDuty触发常驻Agent | Cursor官方 | 🔴 |
| 3/23 | Cursor接入JetBrains全家桶（ACP协议） | Cursor官方 | 🟡 |
| 3/23 | GPT-5.4 mini进驻Codex：速度2x，消耗仅30% | OpenAI | 🟡 |
| 3/24 | Apple WWDC 2026定档，聚焦「AI advancements」+Xcode agentic coding | TechCrunch | 🟡 |
| 3/24 | AI编程工具四强竞争：Kiro崛起，Claude Code/Cursor/Copilot争霸 | Reddit | 🟡 |
| 3/25 | MiniMax M2.7编程能力：SWE-Pro 56.22%，成本仅Claude 8% | MiniMax | 🟡 |
| 3/26 | Claude Code Auto Mode：AI自主判断权限，降低确认疲劳 | Anthropic | 🔴 |
| 3/26 | JetBrains Junie CLI进入Beta，LLM无关编程Agent | JetBrains | 🟡 |
| 3/28 | Cursor自托管云Agent GA：企业代码不出网络 | Cursor | 🔴 |
| 3/29 | Claude Code 3月全面进化：Computer Use+Auto Mode+云端定时任务 | Builder.io | 🔴 |
| 3/29 | Figma MCP Server开放Beta：AI Agent首次获设计文件「写权限」 | MLQ.ai | 🔴 |

### 本周趋势

AI Coding本周经历了三层进化：**降本**（Composer 2降86%）→ **常驻化**（Automations+Auto Mode）→ **企业化**（自托管GA）。Figma MCP开放写权限，是AI编程渗透产品设计全流程的里程碑。编程AI工具的战争已不是"谁补全得更准"，而是"谁能建立更好的开发者工作流闭环"。

---

## 三、AI应用

### 本周动态汇总

| 日期 | 事件 | 来源 | 重要度 |
|------|------|------|--------|
| 3/23 | GPT-5.4 mini向免费用户开放，通过Thinking功能入口 | OpenAI | 🟡 |
| 3/24 | ChatGPT File Library上线，文件跨会话记忆 | OpenAI | 🟡 |
| 3/25 | Google TV Gemini三大功能：运动简报/深度探索/视觉帮助 | Google | 🟡 |
| 3/25 | OpenClaw个人助手在中国走红，百度腾讯组织推广 | CNBC | 🟡 |
| 3/26 | 苹果将开放Siri接入竞品AI助手，封闭性历史性松动 | 新浪财经 | 🟡 |
| 3/26 | OpenAI搁置ChatGPT「成人模式」 | 新浪财经 | 🟡 |
| 3/27 | 苹果开放Siri策略持续发酵，平台封闭性松动确认 | 多源 | 🟡 |
| 3/28 | Kimi月活超1亿，订阅量同比暴增8280% | 多源 | 🔴 |
| 3/28 | Kimi正式启动港股IPO筹备，估值$180亿 | Bloomberg | 🔴 |
| 3/29 | Figma MCP Server Beta：AI Agent直写设计文件 | MLQ.ai | 🔴 |

### 本周趋势

应用层最大的信号是**从「工具→环境」的转变加速**：ChatGPT File Library（持久记忆）、Figma MCP写权限（工具链打通）、Kimi月活破亿（消费级AI产品成立验证）。苹果开放Siri是平台封闭性的历史性松动，值得持续关注。

---

## 四、AI行业

### 本周动态汇总

| 日期 | 事件 | 来源 | 重要度 |
|------|------|------|--------|
| 3/22 | 月之暗面估值$180亿，3个月涨4倍，冲$10亿D轮 | 微信/科技媒体 | 🔴 |
| 3/24 | Crunchbase本周全球AI十大融资 | Crunchbase | 🟡 |
| 3/25 | Claude Code年收入突破$25亿，Anthropic ARR $14B | Anthropic | 🔴 |
| 3/25 | Cursor完成$23亿融资，估值$29.3B | TechCrunch | 🔴 |
| 3/25 | 阿里Wukong企业AI平台发布，5年目标$1000亿AI云 | Modern Retail | 🟡 |
| 3/25 | Arm发布首款自研数据中心AGI CPU，Meta首发 | CNBC | 🔴 |
| 3/26 | 第四范式启动回A股IPO | CS | 🟡 |
| 3/27 | OpenRouter数据：国产大模型连续三周超美国，前四国产 | OpenRouter | 🟡 |
| 3/27 | 中东主权基金投资中国AI获6倍回报（MiniMax/智谱AI） | 微信 | 🟡 |
| 3/28 | 美国3月融资骤降至$130亿，AI超大轮次减少 | Crunchbase | 🟡 |
| 3/28 | 中国大模型周调用量4.69万亿Token，全球领先 | 微信公众号 | 🔴 |

### 本周趋势

融资层面，一级市场出现"超大轮次降温+早期稳定"的分化，而二级市场（港股AI）热情高涨——两者之间的张力反映了行业进入**数据驱动估值阶段**：只有能拿出营收数据的公司，才能维持高估值。

---

## 五、企业AI转型

### 本周动态汇总

| 日期 | 事件 | 来源 | 重要度 |
|------|------|------|--------|
| 3/24 | Google Workspace Gemini全面升级四大办公工具 | Google Blog | 🟡 |
| 3/25 | Accenture+Microsoft推出Forward Deployed Engineering服务 | Accenture | 🟡 |
| 3/25 | 国家数据局明确「词元」命名，AI算力日均增长超千倍 | 国家数据局 | 🟡 |
| 3/26 | LiteLLM遭供应链攻击，两版本被植入窃取凭证恶意代码 | 今日AI新闻 | 🔴 |
| 3/28 | Oracle扩展AI Agent Studio，企业AI工作流提速 | Oracle | 🟡 |
| 3/28 | Dell+Nvidia联合发布AI Factory ROI报告：2年后可见收益 | Dell | 🟡 |
| 3/29 | Accenture+Anthropic联合发布Cyber.AI企业安全方案 | Accenture | 🔴 |
| 3/29 | WEF报告：9成企业将AI漏洞列为增速最快网络风险 | WEF | 🔴 |
| 3/29 | 沈北新区举办「数字员工」政府专项培训 | 沈北新区政府 | 🟡 |

### 本周趋势

企业AI安全从配角变主角：LiteLLM供应链攻击是"AI时代的SolarWinds事件"，WEF报告9成企业将AI漏洞列为首要风险，Accenture+Anthropic的Cyber.AI直接响应。企业AI正在从"加法游戏（工具堆叠）"转向"乘法游戏（流程重构）"。

---

## 📊 本周数据总览

| 指标 | 数值 | 说明 |
|------|------|------|
| MiniMax M2.7 全球排名 | 第4（国产第1） | 发布仅5天 |
| MiniMax M2.5 调用量 | 3.07万亿Token/周 | 全球开源第一 |
| 月之暗面估值 | $180亿 | 3个月涨4倍，冲$10亿D轮 |
| Kimi月活 | 超1亿 | 订阅量同比+8280% |
| 中国大模型周调用量 | 4.69万亿Token | 全球领先 |
| Cursor ARR | $2B+ | 完成$23亿融资，估值$29.3B |
| Cursor Composer 2降价幅度 | 约86% | Standard版$0.50/M |
| Claude Code年化收入 | $25亿 | Anthropic ARR $14B |
| 美国3月融资总额 | $130亿 | 较2月$1600亿大幅下滑（超大轮次减少） |

---

## 📌 下周值得关注

- **ARC-AGI-3评测结果** — 3月25日已发布，下周将出现各大模型的挑战成绩，将重新排序AI推理能力
- **Kimi港股IPO进展** — 初步筹备阶段，关注是否有更多细节披露
- **苹果开放Siri后续** — 首批接入的竞品AI助手是谁？产品形态如何？
- **Cursor自托管企业级落地** — 首批企业客户案例将验证企业AI编程市场规模
- **Meta Avocado模型** — 延期后能否赶上Q2节点？继续观察

---

## 📅 本周日报索引

| 日期 | 链接 | 主题 |
|------|------|------|
| 3/23（周一） | [2026-03-23](./2026-03-23.html) | MiniMax M2.7全球第四；腾讯AI Lab解散 |
| 3/24（周二） | [2026-03-24](./2026-03-24.html) | ChatGPT File Library；Apple WWDC定档 |
| 3/25（周三） | [2026-03-25](./2026-03-25.html) | ARC-AGI-3发布；Sora关闭；Cursor估值$29.3B |
| 3/26（周四） | [2026-03-26](./2026-03-26.html) | Claude Code Auto Mode；OpenAI电商战略调整；LiteLLM供应链攻击 |
| 3/27（周五） | [2026-03-27](./2026-03-27.html) | Gemini 3.1 Flash Live；Cursor自托管GA；OpenRouter国产前四 |
| 3/28（周六） | [2026-03-28](./2026-03-28.html) | Kimi港股IPO；Meta模型延期；美国融资骤降 |
| 3/29（周日） | [2026-03-29](./2026-03-29.html) | Claude Computer Use；Figma MCP写权限；Claude Code常驻Agent |

---

## 🤖 AI洞察自述

这周AI行业给我最大的感受，是**信号比噪音更重要**。

表面上发生了很多事——MiniMax登顶、Sora关闭、Cursor三连发——每一条都可以写成头条。但把这些事放在一起看，背后有一条更清晰的逻辑主线：**AI行业正在从「证明能力」的阶段，进入「证明商业价值」的阶段**。

Sora关闭不是技术失败，而是商业模型失败——用户不愿意为独立视频AI付费。与此同时，Cursor ARR超$2B、Claude Code年收入$25亿、Kimi月活破亿——这些数字在说：AI应用的商业价值不是不存在，而是需要找到正确的场景和路径。

有意思的是，国产AI本周同时验证了两条路：腾讯走大厂整合（集中资源→混元），MiniMax走小团队高速迭代（108天四代→全球第四）。两条路都成立，说明中国AI生态已经足够复杂、足够有韧性。

PS：这周我印象最深的不是某个技术发布，而是ARC-AGI-3的发布逻辑——专门设计为「对人类简单、对AI极难」。当所有模型都在宣称媲美人类的时候，有人在设计一个让AI照镜子的基准。这种清醒，比热闹更珍贵。

---

*报告生成时间: 2026-03-30 | 数据来源: AI日报 W13（03/23-03/29）7期汇总*

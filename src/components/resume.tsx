import styles from './resume.module.css'

type Project = {
  name: string
  context?: string
  description: string
  techStack?: string[]
  highlights?: string[]
  links?: Array<{ label: string; href: string }>
  credentials?: Array<{ label: string; value: string }>
  note?: string
}

type ProfessionalSkill = {
  name: string
  items: string[]
}

const professionalSkills: ProfessionalSkill[] = [
  { name: '前端开发', items: ['9 年前端开发经验；熟悉 JavaScript、TypeScript、React、Next.js、Vue，理解 Vue 和 React 框架原理。'] },
  { name: '后端与部署', items: ['NestJS、MySQL、Redis、JWT、OAuth、WebSocket、Prisma、Spring Boot、Go、go-zero。', '熟悉 Linux、Nginx、PM2，以及 GitHub Actions / Cloudflare CI/CD。'] },
  {
    name: '前端工程化',
    items: [
      '可编写第三方包的 tsd 类型声明；可从 0 到 1 基于 Verdaccio 建设内部公共组件库。',
      '熟悉 npm、Yarn、pnpm、Webpack、Vite、Tailwind、Redux、MobX、Jotai、Ant Design、Element UI、ECharts 与 CI/CD 部署。',
      '具备前端工程组织、资源加载和线上问题定位经验：包括 Monorepo（Turborepo）、CDN external、chunk 大小控制，以及通过环境变量切换主题、站点图片和语言。',
      '使用图片懒加载与 PWA CacheFirst 提升访问速度；通过 GitHub Actions 完成校验、构建和生产发布，并由 Cloudflare Pages 提供 CDN 分发、PWA 提供本地缓存与离线能力。',
    ],
  },
  { name: '桌面与跨端', items: ['Electron + React；了解 Electron Main / Preload / Renderer 分层、IPC 与 SQLite。', '微信小程序、uni-app 与 Android Kotlin 开发。'] },
]

const technologies = [
  { label: 'Next.js', href: 'https://nextjs.org/' },
  { label: 'NestJS', href: 'https://nestjs.com/' },
  { label: 'Socket.IO', href: 'https://socket.io/' },
  { label: 'React 框架：UmiJS', href: 'https://umijs.org/' },
  { label: '微信小程序', href: 'https://developers.weixin.qq.com/miniprogram/dev/framework/' },
  { label: '基于 Vue 的多端开发：uni-app', href: 'https://zh.uniapp.dcloud.io/tutorial/' },
  { label: 'Chrome 插件框架：Plasmo', href: 'https://www.plasmo.com/' },
  { label: '基于 tRPC、Prisma、Next.js 的全栈框架：T3 Stack', href: 'https://create.t3.gg/en/introduction' },
]

const projects: Project[] = [
  {
    name: '游戏站点及语聊业务',
    context: '还行科技 · 全栈开发 / 前端小组负责人 · 2023.11—2026.11',
    techStack: ['Next.js', 'React', 'TypeScript', 'PWA', 'Go-zero', 'MySQL', 'Redis'],
    description: '面向中东、美国、菲律宾等海外市场，提供语音直播、实时互动与社交娱乐服务，负责游戏站点及语聊平台的前端研发和 Go-zero 后端业务。',
    highlights: [
      '实现 KeepAliveContainer：Layout 缓存频繁切换页面 10 分钟，恢复页面组件、滚动位置、本地状态与已加载图片，避免每次切换 Tab 完整卸载和重复渲染。',
      '完成 WebSocket 二进制协议的认证、心跳与断线重连，实时推送余额、订单、未读消息及活动弹窗等状态；后端通过独立 Comet WebSocket 服务承担长连接和推送。',
      '优化首屏与资源加载：图片采用浏览器 HTTP 缓存和 PWA CacheFirst Runtime Cache；仅预取高频首屏资源，游戏卡片默认懒加载，首屏可见图片才使用 eager / priority。',
      '使用 Webpack 按 React、数据层、Firebase、MUI、图标等拆包，将部分大依赖设为 CDN external；通过 GitHub Actions 发布静态产物至 Cloudflare Pages，由全球 CDN 与 Service Worker 协同分发和缓存。',
      '开发海外广告落地页与 Facebook 广告归因，完成 Pixel 初始化、PageView 上报与广告点击标识采集。',
      '后端将 HTTP API、WebSocket 长连接和 gRPC 路由拆分为独立进程；结合 MySQL + GORM/GORM Gen、Redis、进程内缓存、Cron 及独立消费者，处理游戏日志、支付订单、奖金与用户事件。',
    ],
    links: [
      { label: 'Sada', href: 'https://sada.mobi/' },
      { label: 'Domi Chat', href: 'https://domi.chat/' },
    ],
  },
  {
    name: 'A股量化分析信号平台（独立项目）',
    techStack: ['Next.js', 'React', 'TypeScript', 'NestJS', 'MySQL', 'Redis', 'BullMQ', 'MCP', 'Auth0'],
    description: '覆盖行情与 K 线分析、趋势/动量/风险展示、策略研究、历史统计与 AI 分析，累计用户 200+、会员 50+。',
    highlights: [
      '处理千万级、十年期 K 线数据：远端以 Parquet 交付，DuckDB 流式完成 Schema、重复键、数值与交易日范围校验；按交易日每 5,000 行多值 UPSERT MySQL，并以 (tsCode, tradeDate) 唯一键保证幂等。',
      '每日计算趋势、阶段、位置、动量、波动率与风险等量价研究特征，并支持复权、财务基本面和板块分析；自主开发 MCP 工具，结合 Auth0 OAuth 2.1 接入 Agent、ChatGPT 与 Workbuddy 生态。',
      '将会员等级、功能权限和 AI 调用额度分离建模；以实时权限检查、事务扣次和额度流水保障一致性。BullMQ + Redis 处理异步 AI 任务，通过全局并发上限、Lua 原子预占和数据库行锁避免服务过载、任务丢失与重复计费。',
    ],
    links: [{ label: '项目体验', href: 'https://trading-front.pages.dev/' }],
    credentials: [
      { label: '体验账号', value: '88888@163.com' },
      { label: '密码', value: 'abc8888' },
    ],
    note: '使用 Kotlin 开发轻量 Android WebView 容器，处理安全策略、内外链路由、生命周期恢复、返回栈与 Release 签名管理。',
  },
  {
    name: 'DeepSeek Harness 桌面 Agent 客户端',
    techStack: ['Electron', 'React', 'TypeScript', 'Node.js', 'SQLite'],
    description: '基于 Electron Main / Preload / Renderer 架构开发 DeepSeek Harness 桌面客户端，通过 IPC 连接界面与本地运行能力，覆盖安全隔离与本地配置管理。',
    highlights: [
      '集成 DeepSeek Harness 运行时和会话界面，支持多账号配置隔离、插件管理与 SQLite 本地数据持久化，并具备 Windows / macOS 构建打包实践。',
      '启动完整 DeepSeek Harness runtime，插件优先复用标准 DSH / Cordis 机制：可原生加载的 DSH 插件直接复用。',
      '需要 Robbot 账号、权限、本地存储或桌面能力时通过 Robbot adapter 接入；仅在无法复用 DSH 插件模型时实现 Robbot 原生插件。',
    ],
    links: [{ label: 'GitHub 仓库', href: 'https://github.com/robbot-labs/robbot' }],
  },
  { name: '泰山啤酒小程序', description: '千万用户级啤酒商城，日流水达百万元。', note: '微信搜索“泰山原浆啤酒”即可体验。' },
  { name: '低代码商城设计器', description: '可视化搭建商城页面的低代码设计器。', links: [{ label: '在线体验（部署在 Vercel，需网络代理）', href: 'https://dcode-editor.vercel.app/#/' }, { label: 'GitHub 仓库', href: 'https://github.com/huiruo/dcode-editor' }] },
  { name: 'Web Clipper Chrome 扩展', description: '一键识别网页文章并导出 Markdown。', links: [{ label: 'GitHub 仓库', href: 'https://github.com/huiruo/web-clipper-extension' }] },
  { name: '企业即时通讯与协作 App', description: '基于 Electron 与 React 开发，支持企业私有化部署。', links: [{ label: 'WorkPlus', href: 'https://www.workplus.io/' }] },
]

const ExternalLink = ({ href, children }: React.PropsWithChildren<{ href: string }>) => (
  <a className={styles.link} href={href} target="_blank" rel="noreferrer">{children}</a>
)

export const Resume = () => (
  <div className={styles.resume}>
    <section className={styles.section} aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={styles.heading}>专业技能</h2>
      <div className={styles.skillGrid}>
        {professionalSkills.map(({ name, items }) => (
          <section key={name} className={styles.skillCategory} aria-label={name}>
            <h3>{name}</h3>
            <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        ))}
      </div>
    </section>

    <section className={styles.section} aria-labelledby="technologies-heading">
      <h2 id="technologies-heading" className={styles.heading}>常用框架与技术</h2>
      <ul className={styles.list}>
        {technologies.map(({ label, href }) => <li key={href}><ExternalLink href={href}>{label}</ExternalLink></li>)}
        <li>熟悉 CI/CD 流水线、Cloudflare、Docker、Supabase 等基础设施与云服务。</li>
      </ul>
    </section>

    <section className={styles.section} aria-labelledby="projects-heading">
      <h2 id="projects-heading" className={styles.heading}>参与项目</h2>
      <ul className={styles.projects}>
        {projects.map(({ name, context, description, techStack, highlights, links, credentials, note }) => (
          <li key={name} className={styles.project}>
            <h3>{name}</h3>
            {context && <p className={styles.context}>{context}</p>}
            {techStack && <p className={styles.techStack}><span>技术栈</span>{techStack.join(' · ')}</p>}
            <p>{description}</p>
            {highlights && <ul className={styles.highlights}>{highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
            {note && <p className={styles.note}>{note}</p>}
            {links && <div className={styles.links}>{links.map(({ label, href }) => <ExternalLink key={href} href={href}>{label}</ExternalLink>)}</div>}
            {credentials && <dl className={styles.credentials}>{credentials.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
          </li>
        ))}
      </ul>
    </section>
  </div>
)

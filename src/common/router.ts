export interface ISidebar {
  href: string
  label: string
  type?: 'category' | 'link'
  items?: ISidebar[]
}

export const sidebar: ISidebar[] = [
  {
    label: 'Html css',
    href: '/css',
    type: 'category',
    items: [
      { href: "/css/flex", label: "flex" },
      { href: "/css/basis", label: "basis" },
      { href: "/css/layout", label: "layout" },
      { href: "/css/horiz_vert", label: "horizontal vertical" },
      { href: "/css/grid", label: "grid" },
      { href: "/css/margin", label: "margin" },
      { href: "/css/jsDom", label: "jsDom" },
      { href: "/css/gradient", label: "gradient" },
      { href: "/css/transform", label: "transform" },
      { href: "/css/transition", label: "transition" },
      { href: "/css/animation", label: "animation" },
      { href: "/css/requestAnimationFrame", label: "requestAnimationFrame" },
      { href: "/css/vueAnimation", label: "Vue Animation" },
      {
        label: 'WebGL',
        href: '/webGL',
        type: 'category',
        items: [
          { href: "/webGL/readme", label: "WebGL" },
          { href: "/webGL/matrix", label: "Transformation Matrix" },
        ]
      },
    ]
  },
  {
    label: 'Js',
    href: '/js',
    type: 'category',
    items: [
      { href: "/js/eventLoop", label: "Event Loop" },
      { href: "/js/nodejseventLoop", label: "Nodejs Event Loop" },
      { href: "/js/vite", label: "Vite" },
      { href: "/js/nodejs", label: "Nodejs" },
      { href: "/js/asyncPromise", label: "Async Promise" },
      { href: "/js/webpack1", label: "webpack 基本原理" },
      { href: "/js/webpack2", label: "微前端" },
      { href: "/js/throttleDebounce", label: "Throttle Debounce" },
      {
        label: 'jsBase',
        href: '/jsBase',
        type: 'category',
        items: [
          { href: "/jsBase/arrayMethods", label: "Array Methods" },
          { href: "/jsBase/string", label: "String" },
          { href: "/jsBase/stringMapSet", label: "String Map Set" },
          { href: "/jsBase/loop", label: "loop" },
          { href: "/jsBase/for-of", label: "for-of" },
          { href: "/jsBase/for-in-values", label: "for-in-实现深拷贝-values" },
          { href: "/jsBase/keys-getOwnPropertyNames", label: "keys-getOwnPropertyNames-defineProperty" },
          { href: "/jsBase/prototype", label: "prototype" },
          { href: "/jsBase/dataTypes", label: "数据类型-类型转换" },
          { href: "/jsBase/symbol", label: "数据类型-symbol" },
          { href: "/jsBase/this", label: "this" },
          { href: "/jsBase/bindCall", label: "bind call apply and Execute fn" },
          { href: "/jsBase/reflect", label: "reflect" },
          { href: "/jsBase/operator", label: "operator" },
          { href: "/jsBase/es6Es7", label: "es6 es7" },
          { href: "/jsBase/deep-copy", label: "deep shallow copy" },
          { href: "/jsBase/higherOrderFn", label: "高阶函数-柯里化" },
          { href: "/jsBase/inheritance", label: "Inheritance" },
          { href: "/jsBase/others", label: "others" },
          { href: "/jsBase/regular", label: "regular" },
        ]
      },
      {
        label: 'Promise',
        href: '/promise',
        type: 'category',
        items: [
          { href: "/promise/basics", label: "Promise basics" },
          { href: "/promise/generator", label: "generator" },
          { href: "/promise/promise", label: "promise具体实现" },
          { href: "/promise/async-await", label: "async-await" },
          { href: "/promise/axios", label: "axios" },
        ]
      },
      {
        label: 'ts',
        href: '/ts',
        type: 'category',
        items: [
          { href: "/ts/typeScript", label: "TypeScript" },
          { href: "/ts/interfaceType", label: "Interface type" },
          { href: "/ts/keyof", label: "Keyof" },
          { href: "/ts/generics", label: "Generics record" },
          { href: "/ts/decorator", label: "Decorator" },
          { href: "/ts/decorator2", label: "Decorator 2" },
          { href: "/ts/example", label: "Example" },
        ]
      },
    ],
  },
  {
    label: 'React',
    href: '/react',
    type: 'category',
    items: [
      { href: "/react/readme", label: "Readme" },
      { href: "/react/react17Render", label: "React17Render" },
      { href: "/react/renderBuildFiberTree", label: "render build fiberTree" },
      { href: "/react/renderCompleteWork", label: "render CompleteWork" },
      { href: "/react/renderDiff", label: "Render Diff" },
      { href: "/react/commit", label: "React commit" },
      { href: "/react/reactComponent", label: "react component" },
      { href: "/react/setStateRenderAndHooks", label: "SetStateRender Hooks" },
      { href: "/react/effectHooks", label: "effect hooks" },
      { href: "/react/router", label: "router" },
      { href: "/react/reactSsr", label: "React SSR" },
      { href: "/react/reactApi", label: "React api" },
      { href: "/react/context", label: "React context" },
      { href: "/react/redux", label: "Redux" },
      { href: "/react/mobox", label: "Mobox" },
    ],
  },
  {
    label: 'Vue',
    href: '/vue',
    type: 'category',
    items: [
      { href: "/vue/readme", label: "Readme" },
      { href: "/vue/vupPro", label: "Vue" },
      { href: "/vue/v-for", label: "V-for nextTick" },
      { href: "/vue/computed", label: "Computed watch" },
      { href: "/vue/vueCode", label: "Vue Code" },
      { href: "/vue/compiler-baseCompile", label: "Compiler-baseCompile" },
      { href: "/vue/compiler-render", label: "Compiler-render" },
      { href: "/vue/compiler-genCodeFn", label: "Compiler GenCode Fn" },
      { href: "/vue/runtimeGenVnode", label: "Runtime vNode构建" },
      { href: "/vue/runtimeRender", label: "Runtime Render" },
      { href: "/vue/trackDataTrigger", label: "Track Data Trigger" },
      { href: "/vue/reactiveAndEffect", label: "Reactive And Effect" },
      { href: "/vue/patch-diff", label: "Patch-diff" },
    ],
  },
  {
    label: 'Web optimization',
    href: '/web-optimi',
    type: 'category',
    items: [
      { href: "/web-optimi/optimization", label: "Optimization" },
      { href: "/web-optimi/react", label: "React Vue" },
      { href: "/web-optimi/intl", label: "Intl" },
    ],
  },
  {
    label: 'Parsing interpretation compilation',
    href: '/parsing-inte-co',
    type: 'category',
    items: [
      { href: "/parsing-inte-co/parsesAST", label: "Parses->AST->Bytecode" },
      { href: "/parsing-inte-co/closureMemory", label: "Closure-Memory Life Cycle" },
      { href: "/parsing-inte-co/babelConvertsEs6", label: "Babel converts es6" },
      { href: "/parsing-inte-co/verdaccio", label: "Verdaccio" },
      { href: "/parsing-inte-co/pre-analysis", label: "Pre-analysis-variable" },
      { href: "/parsing-inte-co/scope", label: "Scope" },
      { href: "/parsing-inte-co/contextFunction", label: "Execution context-function call stack" },
      {
        label: 'Js Modules',
        href: '/jsModules',
        type: 'category',
        items: [
          { href: "/jsModules/esm", label: "Esm" },
          { href: "/jsModules/cjs", label: "Cjs" },
          { href: "/jsModules/cjsEsm", label: "Cjs esm differences" },
          { href: "/jsModules/modulesClosures", label: "Modules and Closures" },
          { href: "/jsModules/commonJSImport", label: "ESM and CommonJS import" },
        ]
      },
    ],
  },
  {
    label: 'Http-browser',
    href: '/http-browser',
    type: 'category',
    items: [
      { href: "/http-browser/webRenderingProcess", label: "Web rendering process" },
      { href: "/http-browser/browserCache", label: "Browser cache" },
      { href: "/http-browser/compatibility", label: "Browser compatibility" },
      { href: "/http-browser/TCPIP", label: "TCP-IP-Handshake" },
      { href: "/http-browser/httpsEncryption", label: "Https-encryption" },
      { href: "/http-browser/httpMessage", label: "Http message" },
      { href: "/http-browser/httpJsStreamSee", label: "http-jsStream-see" },
      { href: "/http-browser/crossDomain", label: "Reverse/forward proxy" },
      { href: "/http-browser/token-cookie-session", label: "Token-cookie-session" },
      { href: "/http-browser/eventsBubblingCapture", label: "Events Bubbling Capture" },
      { href: "/http-browser/webSecurity", label: "Web security:XSS/CSRF" },
      { href: "/http-browser/renderingProcess", label: "Browser rendering process" },
      { href: "/http-browser/serviceWorkers", label: "Service Workers" },
      { href: "/http-browser/webAssembly", label: "WebAssembly" },
      { href: "/http-browser/webComponents", label: "Web Components" },
      { href: "/http-browser/DNS", label: "DNS" },
      { href: "/http-browser/WebSocket", label: "WebSocket" },
      { href: "/http-browser/socks5", label: "Socks5-Shadowsocks" },
    ]
  },
  // {
  //   label: 'Dashboard',
  //   href: '/dashboard',
  // },
  {
    label: 'Algorithm',
    href: '/algorithm',
    type: 'category',
    items: [
      { href: "/algorithm/twoSum", label: "twoSum" },
      { href: "/algorithm/twoDivide", label: "twoDivide" },
      { href: "/algorithm/threeSum", label: "threeSum" },
    ]
  },
]

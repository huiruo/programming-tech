export interface ISidebar {
  href: string
  label: string
  type?: 'category' | 'link'
  items?: ISidebar[]
}

export const sidebar: ISidebar[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
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
    ]
  },
  {
    label: 'Js',
    href: '/js',
    type: 'category',
    items: [
      { href: "/js/eventLoop", label: "Event Loop" },
      { href: "/js/vite", label: "vite" },
      { href: "/js/nodejs1", label: "nodejs1" },
      { href: "/js/asyncPromise", label: "Async Promise" },
      { href: "/js/webpack1", label: "webpack1" },
      { href: "/js/webpack2", label: "webpack2" },
      {
        label: 'jsBase',
        href: '/jsBase',
        type: 'category',
        items: [
          { href: "/jsBase/arrayMethods", label: "Array Methods" },
          { href: "/jsBase/stringMapSet", label: "String Map Set" },
          { href: "/jsBase/loop", label: "loop" },
          { href: "/jsBase/for-of", label: "for-of" },
          { href: "/jsBase/for-in-values", label: "for-in-实现深拷贝-values" },
          { href: "/jsBase/keys-getOwnPropertyNames", label: "keys-getOwnPropertyNames-defineProperty" },
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
]

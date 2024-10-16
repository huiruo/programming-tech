export interface ISidebar {
  href: string
  label: string
  type?: 'category' | 'link'
  items?: ISidebar[]
}

export const sidebar: ISidebar[] = [
  {
    label: 'dashboard',
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
    label: 'html css',
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
]

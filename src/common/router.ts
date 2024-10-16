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
]

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
    label: 'trader',
    href: '/trader',
    type: 'category',
    items: [
      { href: "/trader/invest", label: "invest" },
    ]
  },
  {
    label: 'Algorithm',
    href: '/algorithm',
    type: 'category',
    items: [
      { href: "/algorithm/twoSum", label: "twoSum" },
    ]
  },
]

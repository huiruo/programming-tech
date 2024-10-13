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
    label: 'crypto',
    href: '/crypto',
    type: 'category',
    items: [
      { href: "/crypto/btcAddress", label: "Btc Address" },
      { href: "/crypto/meme", label: "Meme trade" },
      { href: "/crypto/tech1", label: "tech1" },
    ]
  },
]

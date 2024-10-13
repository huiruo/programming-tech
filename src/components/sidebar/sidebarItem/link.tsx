import { ISidebar } from "@/common/router";
import Link from "next/link";

interface Props {
  item: ISidebar;
  index: number;
  activePath: string;
}

export const ItemLink = ({ item, activePath }: Props) => {

  const { href, label } = item

  return <li>
    <Link
      href={href}
      style={{
        color: activePath === href ? '#ec4899' : 'inherit'
      }}
    >
      {label}
    </Link>
  </li>
}

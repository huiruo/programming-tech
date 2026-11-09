import clsx from "clsx";
import Link from "next/link";
import { type CSSProperties } from "react";
import { ISidebar } from "@/common/router";
import { isSamePath } from "../utils";
import styles from "../sidebar.module.css";

interface Props {
  item: ISidebar;
  activePath: string;
  depth: number;
  onNavigate?: () => void;
}

export const ItemLink = ({ item, activePath, depth, onNavigate }: Props) => (
  <li>
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isSamePath(item.href, activePath) ? "page" : undefined}
      className={clsx(styles.link, isSamePath(item.href, activePath) && styles.linkActive)}
      style={{ "--sidebar-depth": depth } as CSSProperties}
    >
      {item.label}
    </Link>
  </li>
);

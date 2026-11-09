import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
import { SidebarItem } from ".";
import { ISidebar } from "@/common/router";
import { isActiveSidebarItem } from "../utils";
import styles from "../sidebar.module.css";

interface Props {
  activePath: string;
  item: ISidebar;
  depth: number;
  forceExpanded?: boolean;
  onNavigate?: () => void;
}

export const ItemCategory = ({
  item,
  activePath,
  depth,
  forceExpanded = false,
  onNavigate,
}: Props) => {
  const isActive = isActiveSidebarItem(item, activePath);
  const [expanded, setExpanded] = useState(isActive);
  const isExpanded = forceExpanded || expanded;

  useEffect(() => {
    if (isActive) setExpanded(true);
  }, [isActive]);

  return (
    <li className={styles.categoryItem}>
      <button
        className={clsx(styles.categoryButton, isActive && styles.categoryActive)}
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={isExpanded}
        style={{ "--sidebar-depth": depth } as CSSProperties}
      >
        <span>{item.label}</span>
        <ChevronRight
          className={clsx(styles.chevron, isExpanded && styles.chevronExpanded)}
          size={16}
          aria-hidden="true"
        />
      </button>

      {isExpanded && item.items && (
        <ul className={styles.nestedList}>
          {item.items.map((cell, index) => (
            <SidebarItem
              key={cell.href}
              item={cell}
              activePath={activePath}
              index={index}
              depth={depth + 1}
              forceExpanded={forceExpanded}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

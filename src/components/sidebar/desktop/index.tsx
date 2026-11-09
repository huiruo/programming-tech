'use client';

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ISidebar } from "@/common/router";
import { SidebarItem } from "../sidebarItem";
import styles from "../sidebar.module.css";

interface Props {
  activePath: string;
  sidebar: ISidebar[];
  onNavigate?: () => void;
}

const filterSidebar = (items: ISidebar[], keyword: string): ISidebar[] => {
  if (!keyword) return items;

  return items.reduce<ISidebar[]>((result, item) => {
    const labelMatches = item.label.toLowerCase().includes(keyword);
    const filteredItems = filterSidebar(item.items ?? [], keyword);

    if (labelMatches || filteredItems.length > 0) {
      result.push({ ...item, items: labelMatches ? item.items : filteredItems });
    }

    return result;
  }, []);
};

export function DocSidebarDesktop({ activePath, sidebar, onNavigate }: Props) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSidebar = useMemo(
    () => filterSidebar(sidebar, normalizedQuery),
    [normalizedQuery, sidebar],
  );

  return (
    <nav className={styles.sidebarNav} aria-label="知识库导航">
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarEyebrow}>Programming Tech</span>
        <strong>知识库导航</strong>
      </div>

      <label className={styles.searchBox}>
        <Search size={16} aria-hidden="true" />
        <span className={styles.srOnly}>搜索文章</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索文章或专题"
          type="search"
        />
      </label>

      {filteredSidebar.length > 0 ? (
        <ul className={styles.sidebarList}>
          {filteredSidebar.map((item, index) => (
            <SidebarItem
              key={item.href}
              item={item}
              activePath={activePath}
              index={index}
              depth={0}
              forceExpanded={Boolean(normalizedQuery)}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.emptyState}>没有匹配的文章</p>
      )}
    </nav>
  );
}

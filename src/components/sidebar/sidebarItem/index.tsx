import { ISidebar } from "@/common/router";
import { ItemCategory } from "./category";
import { ItemLink } from "./link";

interface Props {
  activePath: string;
  item: ISidebar;
  index: number;
  depth: number;
  forceExpanded?: boolean;
  onNavigate?: () => void;
}

export const SidebarItem = ({ item, activePath, depth, forceExpanded, onNavigate }: Props) => {
  if (item.type === "category") {
    return (
      <ItemCategory
        item={item}
        activePath={activePath}
        depth={depth}
        forceExpanded={forceExpanded}
        onNavigate={onNavigate}
      />
    );
  }

  return <ItemLink item={item} activePath={activePath} depth={depth} onNavigate={onNavigate} />;
};

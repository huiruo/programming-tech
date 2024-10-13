'use client';

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Box } from "@mui/system"
import { useDrawerContext } from './drawerContext';
import './index.css'

interface IDrawer {
  anchor: 'left' | 'right'
  children: React.ReactNode;
  onClose?: () => void
  id: string
  width?: number
}

const renderAnchor = (anchor: 'left' | 'right') => {
  switch (anchor) {
    case "left":
      return "drawer-left";
    case "right":
      return "drawer-right";
    default:
      return "drawer-left";
  }
};

export const Drawer = ({ onClose, anchor, id, children, width }: IDrawer) => {
  const { drawers, closeDrawer } = useDrawerContext();
  const visible = drawers[id];
  const [opened, setOpened] = useState(visible);
  const [active, setActive] = useState(visible);

  useEffect(() => {
    if (visible) {
      setOpened(true);
    }

    /**
     * Delay the external state so that it is set only after the component is mounted, 
     * so that the transition effect takes effect.
    */
    requestAnimationFrame(() => {
      setActive(visible);
    });
  }, [visible]);

  const onCloseDrawer = () => {
    closeDrawer(id);
    onClose && onClose()
  }

  if (!opened && !visible) {
    return null;
  }

  return (
    <div className={clsx(renderAnchor(anchor), 'drawer', active && 'active')}>
      <div className={'drawer-mask'} onClick={onCloseDrawer} />
      <Box sx={{
        position: 'relative',
        width: width ? `${width}px` : '340px',
        height: '100%',
        // backgroundColor: '#1f2937',
        borderRight: '1px solid #151e22'
      }}>
        {children}
      </Box>
    </div>
  );
}

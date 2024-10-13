import { useState, useCallback } from 'react';

export const useMultiDrawerState = () => {
  const [drawers, setDrawers] = useState<{ [key: string]: boolean }>({});

  const openDrawer = useCallback((id: string) => {
    setDrawers(prev => ({ ...prev, [id]: true }));
  }, []);

  const closeDrawer = useCallback((id: string) => {
    setDrawers(prev => ({ ...prev, [id]: false }));
  }, []);

  const toggleDrawer = useCallback((id: string) => {
    setDrawers(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return { drawers, openDrawer, closeDrawer, toggleDrawer };
};
'use client'

import React, { createContext, useContext } from 'react';
import { useMultiDrawerState } from './useMultiDrawerState';

type DrawerContextType = ReturnType<typeof useMultiDrawerState>;

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const drawerState = useMultiDrawerState();

  return (
    <DrawerContext.Provider value={drawerState}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }

  return context;
};
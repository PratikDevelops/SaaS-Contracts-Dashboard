import React, { createContext, useContext, useEffect, useState } from 'react';

const UIContext = createContext();

export function UIProvider({children}){
  const [isDark, setIsDark] = useState(()=> localStorage.getItem('dark') === '1');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(()=>{
    if(isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('dark', isDark ? '1' : '0');
  },[isDark]);

  return <UIContext.Provider value={{isDark, setIsDark, sidebarOpen, setSidebarOpen}}>{children}</UIContext.Provider>
}

export const useUI = () => useContext(UIContext);

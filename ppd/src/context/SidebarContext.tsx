import { createContext, useState,  } from "react";
import type { ReactNode } from "react";
import type  { SidebarContextType } from "../types";

export const SidebarContext = createContext <SidebarContextType | null>  (null);

interface SidebarProviderProps {
  children: ReactNode;
}


function SidebarProvider({children } : SidebarProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, openSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;

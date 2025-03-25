import React from "react";
import Header from "../components/root/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/root/AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SidebarProvider>
        <Header />
        <AppSidebar />
        <main className="pt-14 bg-slate-50 w-full">{children}</main>
      </SidebarProvider>
    </>
  );
};

export default Layout;

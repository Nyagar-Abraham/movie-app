import Navbar from "@/components/shared/Navbar";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <section className="relative flex-1 ">{children}</section>;
};

export default Layout;

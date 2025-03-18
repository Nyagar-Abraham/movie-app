import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <section className="relative flex-1 ">{children}</section>;
};

export default Layout;

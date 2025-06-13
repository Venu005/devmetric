import Navbar from "@/components/common-components/NavBar";
import React from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
}
const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default HomeLayout;

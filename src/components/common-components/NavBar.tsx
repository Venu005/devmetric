import React from "react";
import { Sun } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const menuItems = [
    { label: "Templates", value: "templates" },
    { label: "Pricing", value: "pricing" },
    { label: "AI Tools", value: "ai-tools" },
  ];

  return (
    <nav className="sticky z-10 top-0 ">
      <div className="max-w-4xl mx-auto px-5 py-2">
        <div className="bg-white backdrop-blur-md rounded-4xl shadow-sm border border-gray-200/50">
          <div className="flex justify-between items-center h-16 px-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 sm:pl-6">
                <span className="text-gray-800 font-semibold text-lg">
                  DevFolio
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-2 border border-gray-200/60 rounded-2xl px-3 py-1 bg-white/50 backdrop-blur-sm">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={`/${item.value}`}
                  className="px-2.5 py-1.5 rounded-2xl text-sm font-medium transition-all duration-200 cursor-pointer text-gray-600 hover:text-violet-600 hover:bg-violet-50/50 border border-transparent"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-violet-600 transition-colors">
                <Sun size={20} />
              </button>
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

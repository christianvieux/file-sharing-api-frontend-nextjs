"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Upload, Download } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home
    },
    {
      name: "Upload",
      href: "/upload",
      icon: Upload
    },
    {
      name: "Download",
      href: "/download",
      icon: Download
    }
  ];

  return (
    <nav className="flex justify-center py-4 border-b border-primary/20">
      <div className="flex gap-8 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center px-4 py-2 rounded-md transition-colors duration-200 hover:bg-primary-light/10 ${
                isActive 
                  ? "text-accent font-medium" 
                  : "text-foreground hover:text-primary-light"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
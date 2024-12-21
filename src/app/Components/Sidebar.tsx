'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, SearchCode, Shield, HelpCircle, LogOut, Settings, Menu, ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navigationItems: NavItem[] = [
  {
    icon: <Heart className="w-5 h-5" />,
    label: "AI Code Review",
    href: "/code-review"
  },
  {
    icon: <Shield className="w-5 h-5" />,
    label: "Cloud Security",
    href: "/security"
  },
  {
    icon: <SearchCode className="w-5 h-5" />,
    label: "How to Use",
    href: "/how-to-use"
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    href: "/settings"
  }
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('Select User');

  const names = ['Srajit', 'Utkarsh', 'CodeAnt AI'];

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const NavigationContent = () => (
    <>
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {item.icon}
                <span className="text-gray-700">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 py-2 border-t">
        <ul className="space-y-1">
          <li>
            <Link
              href="/support"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-gray-700">Support</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );

  const SearchWithDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 flex justify-between items-center"
      >
        <span className="text-gray-500">{selectedName}</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>
      
      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-50">
          {names.map((name) => (
            <button
              key={name}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setSelectedName(name);
                setIsDropdownOpen(false);
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const DesktopSidebar = () => (
    <div className={`hidden md:flex flex-col fixed top-0 left-0 h-screen bg-white w-64 py-4 border-r ${className}`}>
      <div className="px-4 mb-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/codelogo.png"
            alt="CodeAnt AI"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-bold text-xl italic">CodeAnt AI</span>
        </Link>
      </div>

      <div className="px-4 mb-6">
        <SearchWithDropdown />
      </div>
      <NavigationContent />
    </div>
  );
  
  const MobileSidebar = () => (
    <div className="md:hidden">
      <Sheet>
        <div className="flex justify-between items-center p-4 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/codelogo.png"
              alt="CodeAnt AI"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-xl italic">CodeAnt AI</span>
          </Link>
          <SheetTrigger asChild>
            <button className="p-2" aria-label="Open navigation menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
        </div>
        <SheetContent side="top" className="w-full h-[50vh] pt-6">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          
          <div className="px-4 mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/codelogo.png"
                alt="CodeAnt AI"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-bold text-xl italic">CodeAnt AI</span>
            </Link>
          </div>
          
          <div className="px-4 mb-6">
            <SearchWithDropdown />
          </div>
          
          <NavigationContent />
        </SheetContent>
      </Sheet>
    </div>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;
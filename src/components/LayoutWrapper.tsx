"use client";


import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface LayoutWrapperProps {
    children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen relative">
            {/* Mobile Menu Button */}
            <Button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 h-10 w-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md"
                size="icon"
                variant="outline"
                aria-label="Toggle Sidebar"
            >
                <Menu className="h-5 w-5" />
            </Button>

            {/* Layout Container */}
            
            
                    {/* Sidebar */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            {/* Main Content */}
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
};

export default LayoutWrapper;

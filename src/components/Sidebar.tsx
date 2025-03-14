import { Button } from "@/components/ui/button"; 
import Link from "next/link";
import React from "react";

// Extend the Window interface to include showDirectoryPicker
declare global {
    interface Window {
        showDirectoryPicker?: () => Promise<unknown>;
    }
}

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
    
    const handleNewChat = () => {
        // Open file picker for PDFs
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/pdf"; // Only allow PDF files
        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL, "_blank"); // Open the selected PDF in a new tab
            }
        };
        input.click();
    };

    const handleNewFolder = async () => {
        // Open directory picker (requires secure context like HTTPS)
        if (window.showDirectoryPicker) {
            try {
                const dirHandle = await window.showDirectoryPicker();
                console.log("Selected folder:", dirHandle); // Handle folder selection
            } catch (err) {
                console.error("Error selecting folder:", err);
            }
        } else {
            alert("Your browser does not support the directory picker.");
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 h-screen bg-[#1C1C1C] text-white flex flex-col
                transform transition-transform duration-300 ease-in-out lg:transform-none font-sans
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                {/* Logo */}
                <div className="p-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold tracking-tight">
                            Talk2PDF
                        </span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                        aria-label="Close Sidebar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="px-3 space-y-2">
                    <button
                        onClick={handleNewChat}
                        className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span>New Chat</span>
                    </button>

                    <button
                        onClick={handleNewFolder}
                        className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span>New Folder</span>
                    </button>
                </div>

                {/* Chat History Section */}
                <div className="flex-1 overflow-y-auto my-4">
                    <div className="text-center space-y-4">
                        <h1 className="text-xl font-semibold text-violet-500">
                            Sign in for free to save your chat history
                        </h1>
                        <Button className="px-8 py-3 text-lg bg-violet-500 hover:bg-violet-600 text-white transition-colors">
                            Sign Up
                        </Button>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex flex-col space-y-4">
                        {/* Language Selector */}
                        <div className="flex items-center space-x-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM15.917 9h-1.946c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9z" clipRule="evenodd" />
                            </svg>
                            <span>EN</span>
                        </div>

                        {/* AI Scholar Link */}
                        <Link href="/ai-scholar" className="flex items-center space-x-2 text-sm hover:text-purple-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                            </svg>
                            <span>AI Scholar</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

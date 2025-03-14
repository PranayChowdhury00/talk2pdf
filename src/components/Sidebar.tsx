import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";
import React, { useState } from "react";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
    const [folders, setFolders] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    const handleNewChat = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/pdf";
        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL, "_blank");
            }
        };
        input.click();
    };

    const handleNewFolder = () => {
        setIsModalOpen(true);
    };

    const createFolder = () => {
        if (newFolderName.trim() !== "") {
            setFolders([...folders, newFolderName.trim()]);
            setNewFolderName("");
            setIsModalOpen(false);
        }
    };

    const deleteFolder = (index: number) => {
        const updatedFolders = folders.filter((_, i) => i !== index);
        setFolders(updatedFolders);
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
            <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 h-screen bg-[#1C1C1C] text-white flex flex-col
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
                        <span>New Chat (Open PDF)</span>
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

                {/* Folder List */}
                <div className="flex-1 overflow-y-auto my-4 px-4">
                    <h3 className="text-lg font-semibold">Folders</h3>
                    <ul className="mt-2 space-y-2">
                        {folders.map((folder, index) => (
                            <li key={index} className="flex justify-between items-center p-2 bg-gray-700 rounded-lg text-white">
                                <span>📂 {folder}</span>
                                <button 
                                    onClick={() => deleteFolder(index)} 
                                    className="text-red-400 hover:text-red-600 transition"
                                >
                                    🗑️
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chat History Section */}
                <div className="p-4 border-t border-white/10">
                    <h1 className="text-xl font-semibold text-violet-500 text-center">
                        Sign in for free to save your chat history
                    </h1>
                    <Button className="w-full mt-4 px-8 py-3 text-lg bg-violet-500 hover:bg-violet-600 text-white transition-colors">
                        Sign Up
                    </Button>
                </div>
            </div>

            {/* Folder Name Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Folder</DialogTitle>
                    </DialogHeader>
                    <Input
                        type="text"
                        placeholder="Enter folder name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                    />
                    <DialogFooter>
                        <Button onClick={createFolder}>Create</Button>
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Sidebar;

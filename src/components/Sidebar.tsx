"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  File,
  FolderPlus,
  Loader2,
  LogIn,
  MonitorCog,
  Moon,
  Sun,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
// Next auth
// import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import UserInfo from "./UserInfo";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [folders, setFolders] = React.useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);
  const router = useRouter();

  // Add mounting check
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleNewChat = () => {
    setIsUploading(true);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");

        router.push("/chat");
      }
      setIsUploading(false);
    };
    input.oncancel = () => {
      setIsUploading(false);
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

  // =====
  // const { data: session } = useSession();
  const { status } = useSession();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 h-screen bg-white dark:bg-[#171717] text-gray-900 dark:text-gray-100 flex flex-col border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300 ease-in-out lg:transform-none
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo and Theme Toggle */}
        <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight">Talk2PDF</span>
          </Link>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-gray-200 dark:border-gray-800"
                >
                  {mounted &&
                    (theme === "system" ? (
                      <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
                    ) : theme === "dark" ? (
                      <Moon className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                      <Sun className="h-[1.2rem] w-[1.2rem]" />
                    ))}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-gray-200 dark:border-gray-800"
              >
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <MonitorCog className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden h-8 w-8"
              aria-label="Close Sidebar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 space-y-2">
          <Button
            onClick={handleNewChat}
            className="w-full justify-start bg-violet-600 hover:bg-violet-700 text-white"
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            <span>New Chat (Open PDF)</span>
          </Button>
          <Button
            onClick={handleNewFolder}
            variant="outline"
            className="w-full justify-start border-gray-200 dark:border-gray-800"
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            <span>New Folder</span>
          </Button>
        </div>

        {/* Folder List */}
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-lg font-semibold mb-2">Folders</h3>
          <ul className="space-y-2">
            {folders.length > 0 ? (
              folders.map((folder, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <File className="mr-2 h-4 w-4 text-violet-500" />
                    <span>{folder}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                    onClick={() => deleteFolder(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete folder</span>
                  </Button>
                </li>
              ))
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                No folders created yet
              </div>
            )}
          </ul>
        </div>

        {/* User info and login Section */}

        {status === "authenticated" ? (
          <div>
            <UserInfo></UserInfo>
          </div>
        ) : (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-center text-violet-500 dark:text-violet-400 font-semibold mb-4">
              Sign in for free to save your chat history
            </h2>
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full cursor-pointer">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Folder Name Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Enter folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createFolder();
              }
            }}
            className="dark:bg-gray-800 dark:border-gray-700"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={createFolder}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Sidebar;

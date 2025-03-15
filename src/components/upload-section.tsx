"use client";

import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadToCloudinary, getPDFText } from "@/lib/cloudinary";
import { useChat } from "ai/react";
import { Input } from "./ui/input";

export default function UploadSection() {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [pdfText, setPdfText] = useState<string>("");
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat",
        body: { pdfText },
    });

    const onDrop = (acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
    });

    const handleUpload = async () => {
        try {
            setUploading(true);
            for (const file of files) {
                const url = await uploadToCloudinary(file);
                const text = await getPDFText(url);
                setPdfText((prev) => prev + "\n" + text);
            }
            setFiles([]);
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("Error uploading files. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl p-6 gap-6">
            <div className="w-full border-2 border-dashed rounded-lg bg-white shadow-md p-6">
                {/* Drag & Drop Area */}
                <div
                    {...getRootProps()}
                    className={`w-full p-10 text-center cursor-pointer rounded-md ${
                        isDragActive
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-300"
                    } border-2 border-dashed transition`}
                >
                    <input {...getInputProps()} />
                    <UploadCloud className="mx-auto mb-4 h-10 w-10 text-gray-500" />
                    {isDragActive ? (
                        <p className="text-blue-600">Drop the PDF here...</p>
                    ) : (
                        <p className="text-gray-500">
                            Drag & drop a PDF here, or click to select one
                        </p>
                    )}
                </div>

                {/* Uploaded Files List */}
                {files.length > 0 && (
                    <div className="mt-4">
                        <ul className="w-full text-left">
                            {files.map((file, index) => (
                                <li
                                    key={index}
                                    className="p-2 bg-gray-100 rounded-md my-2 text-sm"
                                >
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                        <Button
                            onClick={handleUpload}
                            className="mt-4 w-full"
                            disabled={uploading}
                        >
                            {uploading ? "Processing..." : "Process PDFs"}
                        </Button>
                    </div>
                )}
            </div>

            {/* Chat Section */}
            {pdfText && (
                <div className="w-full bg-white rounded-lg shadow-md p-6">
                    <div className="space-y-4 mb-4">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex ${
                                    m.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`p-3 rounded-lg ${
                                        m.role === "user"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100"
                                    } max-w-[80%]`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask a question about the PDF..."
                            className="flex-1"
                        />
                        <Button type="submit">Send</Button>
                    </form>
                </div>
            )}
        </div>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadSection() {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] }, // Accept only PDFs
    });

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl p-6 border-2 border-dashed rounded-lg bg-white shadow-md">
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
                <ul className="mt-4 w-full text-left">
                    {files.map((file, index) => (
                        <li
                            key={index}
                            className="p-2 bg-gray-100 rounded-md my-2 text-sm"
                        >
                            {file.name}
                        </li>
                    ))}
                </ul>
            )}

            {/* Upload Button */}
            {files.length > 0 && (
                <Button className="mt-4 w-full">Upload PDFs</Button>
            )}
        </div>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadSection() {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Handle file drop
    const onDrop = (acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [".pdf"] },
    });

    // Function to upload files to Supabase Storage
    const uploadFiles = async () => {
        setUploading(true);
        setError(null);

        const uploadedPaths: string[] = [];

        for (const file of files) {
            const filePath = `pdfs/${Date.now()}_${file.name}`; // Unique filename

            const { error } = await supabase.storage
                .from("pdfs")
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: true,
                });

            if (error) {
                setError(`Failed to upload ${file.name}: ${error.message}`);
                setUploading(false);
                return;
            }

            // Generate public URL
            const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pdfs/${filePath}`;
            uploadedPaths.push(publicUrl);
        }

        setUploadedUrls(uploadedPaths);
        setFiles([]); // Clear uploaded files
        setUploading(false);
    };

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
                <Button
                    className="mt-4 w-full"
                    onClick={uploadFiles}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload PDFs"}
                </Button>
            )}

            {/* Uploaded Files URLs */}
            {uploadedUrls.length > 0 && (
                <div className="mt-4 w-full">
                    <h3 className="text-gray-700">Uploaded PDFs:</h3>
                    <ul className="text-sm text-blue-600">
                        {uploadedUrls.map((url, index) => (
                            <li key={index}>
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {url}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Error Message */}
            {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
    );
}

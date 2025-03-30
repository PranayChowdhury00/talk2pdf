"use client";

import { initialMessages } from "@/lib/utils";
import { usePDF } from "@/provider/pdfContext";
import { useRef, useState } from "react";
import { ChatLine } from "./chat-line";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

// Message Type (Since we're not using the external package)
export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

export function Chat() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { pdfText } = usePDF();

    // Send Message to AI Model (Replace with your API)
    const fetchAIResponse = async (userMessage: string) => {
        try {
            const prompt = pdfText
                ? `Based on the following PDF content:\n\n${pdfText}\n\nAnswer the following question:\n${userMessage}`
                : userMessage;

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: prompt }),
            });

            if (!response.ok) throw new Error("Failed to get AI response");

            const data = await response.json();
            return data.reply || "Sorry, I am unable to process that.";
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "Error processing your request.";
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Create new user message
        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        // Add user message to chat
        setMessages((prev) => [...prev, newUserMessage]);
        setInput("");
        setIsLoading(true);

        // Get AI Response
        const aiResponse = await fetchAIResponse(input);

        // Add AI message
        const newAIMessage: Message = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: aiResponse,
        };
        setMessages((prev) => [...prev, newAIMessage]);
        setIsLoading(false);
    };

    return (
        <div className="rounded-2xl border h-[95vh] flex flex-col justify-between">
            <div className="p-6 overflow-auto" ref={containerRef}>
                {messages.map(({ id, role, content }: Message) => (
                    <ChatLine
                        key={id}
                        role={role}
                        content={content}
                        sources={[]}
                    />
                ))}
            </div>

            <form onSubmit={handleSubmit} className="p-4 flex clear-both">
                <Input
                    value={input}
                    placeholder="Type to chat with AI..."
                    onChange={(e) => setInput(e.target.value)}
                    className="mr-2"
                />

                <Button type="submit" className="w-24" disabled={isLoading}>
                    {isLoading ? <Spinner /> : "Ask"}
                </Button>
            </form>
        </div>
    );
}

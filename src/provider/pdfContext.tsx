"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface PDFContextType {
    pdfText: string;
    setPdfText: (text: string) => void;
}

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export const PDFProvider = ({ children }: { children: ReactNode }) => {
    const [pdfText, setPdfText] = useState("");

    return (
        <PDFContext.Provider value={{ pdfText, setPdfText }}>
            {children}
        </PDFContext.Provider>
    );
};

export const usePDF = () => {
    const context = useContext(PDFContext);
    if (!context) {
        throw new Error("usePDF must be used within a PDFProvider");
    }
    return context;
};

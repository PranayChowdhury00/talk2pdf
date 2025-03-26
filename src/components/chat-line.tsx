import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
// import { Message } from "ai/react";
import { formattedText } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Message } from "./chat";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Balancer from "react-wrap-balancer";

const convertNewLines = (text: string) =>
    text.split("\n").map((line, i) => (
        <span key={i}>
            {line}
            <br />
        </span>
    ));

interface ChatLineProps extends Partial<Message> {
    sources: string[];
}

interface CustomComponents {
    a: React.ElementType; // Define a custom component type for links
}

export function ChatLine({
    role = "assistant",
    content,
    sources,
}: ChatLineProps) {
    if (!content) {
        return null;
    }
    const formattedMessage = convertNewLines(content);

    const customComponents: CustomComponents = {
        a: ({ ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
        ),
    };

    return (
        <div>
            <Card className="mb-2">
                <CardHeader>
                    <CardTitle
                        className={
                            role != "assistant"
                                ? "text-amber-500 dark:text-amber-200"
                                : "text-blue-500 dark:text-blue-200"
                        }
                    >
                        {role == "assistant" ? "AI" : "You"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                    <Balancer>{formattedMessage}</Balancer>
                </CardContent>
                <CardFooter>
                    <CardDescription className="w-full">
                        {sources && sources.length ? (
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                {sources.map((source, index) => (
                                    <AccordionItem
                                        value={`source-${index}`}
                                        key={index}
                                    >
                                        <AccordionTrigger>{`Source ${
                                            index + 1
                                        }`}</AccordionTrigger>
                                        <AccordionContent>
                                            <ReactMarkdown
                                                components={customComponents}
                                            >
                                                {formattedText(source)}
                                            </ReactMarkdown>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                            <></>
                        )}
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formattedText } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Balancer from "react-wrap-balancer";
import { Message } from "./chat";
import { Fragment } from "react";

const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
      <Fragment key={i}>
          {line}
          <br />
      </Fragment>
  ));

interface ChatLineProps extends Partial<Message> {
  sources?: string[];
}

export function ChatLine({
  role = "assistant",
  content,
  sources = [],
}: ChatLineProps) {
  if (!content) return null;

  const formattedMessage = convertNewLines(content);

  const customComponents = {
      a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
          <a {...props} target="_blank" rel="noopener noreferrer" />
      ),
  };

  return (
      <div>
          <Card className="mb-2">
              <CardHeader>
                  <CardTitle
                      className={
                          role === "assistant"
                              ? "text-blue-500 dark:text-blue-200"
                              : "text-amber-500 dark:text-amber-200"
                      }
                  >
                      {role === "assistant" ? "AI" : "You"}
                  </CardTitle>
              </CardHeader>

              <CardContent className="text-sm">
                  <Balancer>{formattedMessage}</Balancer>
              </CardContent>

              {sources.length > 0 && (
                  <CardFooter>
                      <CardDescription className="w-full">
                          <Accordion
                              type="single"
                              collapsible
                              className="w-full"
                          >
                              {sources.map((source, index) => (
                                  <AccordionItem
                                      value={`source-${index}`}
                                      key={`source-${source}-${index}`}
                                  >
                                      <AccordionTrigger>
                                          {`Source ${index + 1}`}
                                      </AccordionTrigger>
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
                      </CardDescription>
                  </CardFooter>
              )}
          </Card>
      </div>
  );
}

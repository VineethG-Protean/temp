/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChatMessage, INTENTTYPE_MESSAGE } from "@/lib/types";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CheckCheck, Copy, ThumbsDown, ThumbsUp, Volume2Icon } from "lucide-react";
import { useState } from "react";

function getMessageContent(content: string | Blob | INTENTTYPE_MESSAGE): string {
  if (typeof content === "string") {
    return content;
  }
  if (typeof content === "object" && content !== null && "message" in content) {
    return (content.message as string).replace("/\n/", "");
  }
  return "";
}

interface MarkdownRendererProps {
  message: ChatMessage;
  styles?: {
    content: string;
    title_1: string;
  };
  onReadResponse: (response: string) => void;
  handleLikeDislikeMessage: (id: number, type: "like" | "dislike") => void;
}

export default function MarkdownRenderer({
  message,
  styles,
  onReadResponse,
  handleLikeDislikeMessage,
}: MarkdownRendererProps) {
  const [textCopied, setTextCopied] = useState<boolean>(false);

  const handleTextCopy = (message: string) => {
    navigator.clipboard.writeText(message);
    setTextCopied(true);

    setTimeout(() => {
      setTextCopied(false);
    }, 2500);
  };
  return (
    <div>
      <Markdown
        className={cn(
          "markdown-container ptn-font-light ptn-overflow-x-auto ptn-max-w-full ptn-text-lg",
          styles?.content, styles?.title_1 
        )}
        remarkPlugins={[remarkGfm]}
        components={{
          table(props) {
            const { node, ...rest } = props;
            return (
              <table
                className="ptn-w-full ptn-table-auto ptn-border-collapse ptn-my-2"
                {...rest}
              />
            );
          },
          th(props) {
            const { node, ...rest } = props;
            return (
              <th
                className="ptn-text-left ptn-bg-[#EEE7E1] ptn-p-2 ptn-font-bold ptn-text-xs ptn-min-w-[150px]"
                {...rest}
              />
            );
          },
          td(props) {
            const { node, ...rest } = props;
            return (
              <td
                className="ptn-text-left ptn-p-2 ptn-text-xs ptn-min-w-[150px] ptn-bg-white"
                {...rest}
              />
            );
          },
          hr(props){
            const {node, ...rest} = props;
            return (
              <hr className="ptn-my-4" {...rest} />
            )
          },
          a(props){
            const {node, ...rest} = props;
            return (
              <a target="_blank" {...rest}/>
            )
          }
        }}
      >
        {getMessageContent(message.content)}
      </Markdown>
      <div className="ptn-flex ptn-gap-2 ptn-items-center ptn-mt-2 3xl:ptn-gap-3">
        {message.sender === "bot" && (
          <div className="ptn-flex ptn-gap-4 ptn-items-center ptn-py-2">
            {message.metadata?.liked ? (
              <ThumbsUp
                className={`ptn-stroke-1 ptn-h-4 ptn-w-4 ptn-cursor-pointer 3xl:ptn-h-5 3xl:ptn-w-5 ptn-text-green-700`}
              />
            ) : (
              <ThumbsUp
                className={`ptn-stroke-1 ptn-h-4 ptn-w-4 ptn-cursor-pointer 3xl:ptn-h-5 3xl:ptn-w-5 hover:ptn-text-green-700 ${styles?.title_1}`}
                onClick={() => handleLikeDislikeMessage(message.id, "like")}
              />
            )}
            <ThumbsDown
              className={`ptn-stroke-1 ptn-h-4 ptn-w-4 ptn-cursor-pointer 3xl:ptn-h-5 3xl:ptn-w-5 ${
                styles?.title_1
              } hover:ptn-text-destructive ${
                message.metadata?.disliked ? "ptn-text-red-600" : ""
              }`}
              onClick={() => handleLikeDislikeMessage(message.id, "dislike")}
            />
            {textCopied ? (
              <CheckCheck
                className={`ptn-stroke-1 ptn-h-4 ptn-w-4 ptn-cursor-pointe 3xl:ptn-h-5 3xl:ptn-w-5 ${styles?.title_1} hover:ptn-text-blue-400`}
                onClick={() =>
                  handleTextCopy(
                    (message.content as INTENTTYPE_MESSAGE).message as string
                  )
                }
              />
            ) : (
              <Copy
                className={`ptn-stroke-1 ptn-h-4 ptn-w-4 ptn-cursor-pointer 3xl:ptn-h-5 3xl:ptn-w-5 ${styles?.title_1} hover:ptn-text-blue-400`}
                onClick={() =>
                  handleTextCopy(
                    (message.content as INTENTTYPE_MESSAGE).message as string
                  )
                }
              />
            )}
            <Volume2Icon
              className={`ptn-stroke-1 ptn-h-4 ptn-w-4 ptn-cursor-pointer 3xl:ptn-h-5 3xl:ptn-w-5 ${styles?.title_1} hover:ptn-text-yellow-500`}
              onClick={() =>
                onReadResponse((message.content as INTENTTYPE_MESSAGE).message as string)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

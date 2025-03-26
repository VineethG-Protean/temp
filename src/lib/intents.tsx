import React from "react";

import MarkdownRenderer from "@/components/bot-components/markdown-renderer";
import { ChatMessage, INTENTS } from "./types";

export const INTENT_COMPONENT_MAP: Record<
  INTENTS,
  React.FC<{
    message: ChatMessage;
    onSendIntent?: (intent: string) => void;
    styles?: {
      content: string;
      title_1: string;
    };
    onReadResponse?: (response: string) => void;
    handleLikeDislikeMessage?: (id: number, type: "like" | "dislike") => void;
  }>
> = {
  default: ({ message, styles, onReadResponse, handleLikeDislikeMessage }) => (
    <MarkdownRenderer
      message={message}
      styles={styles}
      onReadResponse={onReadResponse!}
      handleLikeDislikeMessage={handleLikeDislikeMessage!}
    />
  ),
};

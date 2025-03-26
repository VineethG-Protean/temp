import { useMessageRenderer } from "@/lib/hooks/useMessageRenderer";
import { ChatMessage } from "@/lib/types";

export default function Content({
  message,
  onSendIntent,
  styles,
  handleLikeDislikeMessage,
  onReadResponse
}: {
  message: ChatMessage;
  onSendIntent?: (intent: string) => void;
  styles?: {
    content: string;
    title_1: string;
  };
  onReadResponse: (response: string) => void;
  handleLikeDislikeMessage: (id: number, type: "like" | "dislike") => void;
}) {
  const { Component } = useMessageRenderer(message);
  return (
    <Component
      message={message}
      onSendIntent={onSendIntent}
      styles={styles}
      handleLikeDislikeMessage={handleLikeDislikeMessage}
      onReadResponse={onReadResponse}
    />
  );
}

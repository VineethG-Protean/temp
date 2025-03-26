import { useMemo } from "react";
import { ChatMessage, INTENTTYPE_MESSAGE, INTENTS } from "../types";
import { INTENT_COMPONENT_MAP } from "../intents";

export function useMessageRenderer(message: ChatMessage) {
  const { content } = message;
  const intent = (content as INTENTTYPE_MESSAGE).intentType;
  const Component = useMemo(() => {
    return (
      INTENT_COMPONENT_MAP[intent as INTENTS] || INTENT_COMPONENT_MAP.default
    );
  }, [intent]);

  return { Component, intent };
}

import { JSX } from "react";

export type INTENTS = "default";
export type INTENTTYPE_MESSAGE = {
  intentType: INTENTS;
  message: string  | Record<string, number| string>;
  metadata?: { [key: string]: string };
};

export type LANGUAGE = {
  title: string;
  lang: string;
  code: string;
  icon: string;
  selected: boolean;
};

export type QUERIES = {
  title: string;
  intent: string;
  icon: JSX.Element;
}[];


export type ChatMessage = {
  id: number;
  content: string | INTENTTYPE_MESSAGE | Blob;
  sender: "user" | "bot" | "system";
  timestamp: Date;
  type: "text" | "audio";
  metadata?: {
    liked: boolean;
    disliked: boolean;
  };
};

export type QUICK_QUERIES = {
  title: string;
  intent: string;
  icon: JSX.Element;
}[]; 

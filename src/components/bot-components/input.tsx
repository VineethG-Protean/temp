import { useEffect, useState } from "react";
import { Input as _Input } from "@/components/ui/input";
import { useAtom, useAtomValue } from "jotai";

import translate from "@/assets/translate.png";
import translateDark from "@/assets/translate_dark.png";

import VoiceWithTranscript from "../bot-components/voice-with-transcript";
import { cn } from "@/lib/utils";
import { MicAccessStateATOM, SelectLanguageStateATOM } from "@/lib/atoms";

interface InputProps {
  theme?: "light" | "dark";
  bot_type: string;
  onSendResponse: ({
    content,
  }: {
    type: "text" | "audio";
    content: string | Blob;
  }) => void;
  styles?: {
    title_1: string;
  };
}

export default function Input({ bot_type, onSendResponse, styles, theme }: InputProps) {
  const [selectLanguage, setSelectLanguage] = useAtom(SelectLanguageStateATOM);
  const isListening = useAtomValue(MicAccessStateATOM);
  const [text, setText] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendIntent();
    }
  };

  const handleSendIntent = () => {
    if (text) {
      onSendResponse({ type: "text", content: text });
      setText("");
    }
  };

  useEffect(() => {
    if (!isListening) {
      if (text) {
        handleSendIntent();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  return (
    <div className="ptn-relative ptn-w-full ptn-rounded-md ptn-py-3 ptn-pl-4 ptn-flex ptn-items-center ptn-z-20 ptn-gap-2 3xl:ptn-gap-4">
      <img
        src={theme === "dark" ? translateDark : translate}
        className="ptn-h-6 ptn-w-7 ptn-cursor-pointer 3xl:ptn-h-7 3xl:ptn-w-9"
        onClick={() => setSelectLanguage(!selectLanguage)}
      />
      <_Input
        placeholder={`Ask ${bot_type} Bot a question...`}
        value={text ?? ""}
        onChange={(e) => setText(e.target.value)}
        className={cn(
          "ptn-w-full ptn-bg-transparent",
          `${styles?.title_1}`
        )}
        autoFocus
        onKeyDown={handleKeyDown}
      />
      <div className="ptn-flex ptn-items-center ptn-justify-end ptn-px-4">
        <VoiceWithTranscript
          setTranscript={setText}
          onCancel={() => setText("")}
          styles={{
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            input: styles?.title_1!,
          }}
        />
      </div>
    </div>
  );
}

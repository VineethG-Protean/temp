import { ChatMessage, QUICK_QUERIES } from "@/lib/types";
import WavesurferPlayer from "@wavesurfer/react";
import { useEffect, useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import QuickQueries from "./quick-queries";
import Content from "./content";
import { cn } from "@/lib/utils";
import Loader from "./loader";
import { MicAccessStateATOM, SelectLanguageStateATOM } from "@/lib/atoms";

import nps_logo from "@/assets/nps_logo.png";

interface ResponsesProps {
  bot_image: string;
  bot_type: string;
  responses: ChatMessage[];
  loading: boolean;
  queries: QUICK_QUERIES;
  styles?: {
    user_text?: string;
    bubble?: string;
    background?: string;
    title_1?: string;
    title_2?: string;
    content?: string;
    loader: string;
  };
  onSendIntent?: (intent: string) => void;
  onUpdateResponse: (response: ChatMessage[]) => void;
  onReadResponse: (response: string) => void;
}

export default function Responses({
  bot_image,
  bot_type,
  responses,
  loading,
  styles,
  queries,
  onSendIntent,
  onUpdateResponse,
  onReadResponse,
}: ResponsesProps) {
  const isMicOpen = useAtomValue(MicAccessStateATOM);
  const selectLanguage = useAtomValue(SelectLanguageStateATOM);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [wavesurfers, setWavesurfers] = useState<{ [key: string]: any }>({});
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [audioURLs, setAudioURLs] = useState<{ [key: string]: string }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasAutoScrolled = useRef(false);
  const setSelectLanguage = useSetAtom(SelectLanguageStateATOM);

  useEffect(() => {
    const newAudioURLs: { [key: string]: string } = {};
    responses.forEach((res) => {
      if (res.type === "audio" && res.content instanceof Blob) {
        newAudioURLs[res.id] = URL.createObjectURL(res.content);
      }
    });
    setAudioURLs(newAudioURLs);
    return () => {
      Object.values(newAudioURLs).forEach(URL.revokeObjectURL);
    };
  }, [responses]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onReady = (id: number, ws: any) => {
    setWavesurfers((prev) => ({ ...prev, [id]: ws }));
  };

  const onPlayPause = (id: number) => {
    if (playingAudioId && playingAudioId !== id) {
      wavesurfers[playingAudioId]?.pause();
    }
    wavesurfers[id]?.playPause();
    setPlayingAudioId(id);
  };

  const handleLikeDislikeMessage = (id: number, type: "like" | "dislike") => {
    const updatedResponse = responses.map((message) => {
      if (message.id === id) {
        return {
          ...message,
          metadata: {
            liked: type === "like" ? true : false,
            disliked: type === "dislike" ? true : false,
          },
        };
      }
      return message;
    });
    onUpdateResponse(updatedResponse);
  };

  useEffect(() => {
    if (hasAutoScrolled.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (responses.length > 1) {
      hasAutoScrolled.current = true;
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [responses]);

  return (
    <div
      className={cn(
        `ptn-overflow-y-auto ptn-flex-1 ptn-space-y-4 ptn-px-4 ptn-relative ptn-z-30 ptn-scrollbar-hide ptn-rounded-3xl ${
          responses.length === 0
            ? "ptn-h-full ptn-flex ptn-flex-col ptn-justify-between"
            : ""
        }`,
        styles?.background
      )}
      onClick={() => setSelectLanguage(false)}
    >
      <div className="ptn-h-[340px] 3xl:ptn-h-[340px] ptn-flex ptn-flex-col ptn-justify-center ptn-items-center">
        {bot_type == "NPS" ? (
          <img
            src={nps_logo}
            alt=""
            className="ptn-h-40 ptn-w-40 md:ptn-h-44 md:ptn-w-44"
          />
        ) : (
          <img
            src={bot_image}
            alt=""
            className="ptn-h-32 ptn-w-32 md:ptn-h-28 md:ptn-w-28 3xl:ptn-w-48 3xl:ptn-h-48"
          />
        )}
        <p
          className={cn(
            "bot-fonts ptn-mt-4 ptn-text-2xl md:ptn-text-3xl ptn-font-thin ptn-text-center 3xl:ptn-mt-6",
            styles?.title_1
          )}
        >
          Welcome to {bot_type} Support.
        </p>
        <p
          className={cn(
            "bot-fonts ptn-mt-0.5 ptn-text-xl md:ptn-text-2xl ptn-font-thin ptn-text-center",
            styles?.title_2
          )}
        >
          How may I help you?
        </p>
      </div>
      {!isMicOpen && !selectLanguage && responses.length === 0 && (
        <div className="ptn-flex ptn-flex-col ptn-gap-2 ptn-items-center ptn-py-2">
          <QuickQueries
            queries={queries}
            onSendIntent={onSendIntent!}
            styles={{
              background: styles?.title_2,
              text: styles?.title_1,
            }}
          />
        </div>
      )}
      {responses.map((message) => {
        return (
          <div
            key={message.id}
            className="ptn-flex ptn-flex-col ptn-w-full ptn-group"
          >
            {message.sender === "system" && (
              <p className="ptn-text-xs 3xl:ptn-text-lg ptn-font-medium ptn-mb-2 ptn-text-muted ptn-text-center ptn-italic">
                {message.content as string}
              </p>
            )}
            {message.sender === "user" && (
              <p className="bot-fonts ptn-font-thin ptn-text-sm 3xl:ptn-text-base ptn-mb-1 ptn-text-muted">
                You
              </p>
            )}
            <div className="ptn-flex ptn-flex-col ptn-gap-0.5 ptn-w-full">
              <div
                className={`ptn-break-words prose ptn-leading-6 prose-p:ptn-my-0 prose-li:ptn-list-decimal prose-li:ptn-ml-8 ${
                  message.sender === "user"
                    ? `ptn-p-4 3xl:ptn-p-5 ptn-rounded-2xl ${styles?.bubble} ptn-border ptn-w-fit`
                    : "ptn-w-full"
                }`}
              >
                {message.type === "text" ? (
                  message.sender === "bot" ? (
                    <Content
                      message={message}
                      onSendIntent={onSendIntent}
                      styles={{
                        content: styles!.content!,
                        title_1: styles!.title_1!,
                      }}
                      handleLikeDislikeMessage={handleLikeDislikeMessage}
                      onReadResponse={onReadResponse}
                    />
                  ) : message.sender === "user" ? (
                    <p
                      className={cn(
                        "bot-fonts ptn-font-light ptn-text-lg",
                        styles?.user_text
                      )}
                    >
                      {message.content as string}
                    </p>
                  ) : null
                ) : message.type === "audio" && audioURLs[message.id] ? (
                  <WavesurferPlayer
                    height={40}
                    width={200}
                    waveColor=""
                    url={audioURLs[message.id]}
                    onReady={(ws) => onReady(message.id, ws)}
                    onPlay={() => setPlayingAudioId(message.id)}
                    onPause={() => setPlayingAudioId(null)}
                    onClick={() => onPlayPause(message.id)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
      {!loading && responses.length !== 0 && (
        <img src={bot_image} className="ptn-h-10 ptn-w-10" />
      )}
      {loading && (
        <Loader bot_image={bot_image} loader_color={styles!.loader} />
      )}
      {responses.length !== 0 && <div ref={messagesEndRef} />}
    </div>
  );
}

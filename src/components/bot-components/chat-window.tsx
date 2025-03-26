import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";

import Header from "./header";
import Responses from "./responses";
import VoiceListeningUI from "./voice-listening-ui";
import AudioPlayer from "./audio-player";
import Languages from "./languages";
import Input from "./input";
import ChatBubble from "./chat-bubble";
import InitialScreen from "./initial-screen";

import { ChatMessage, INTENTTYPE_MESSAGE, QUERIES } from "@/lib/types";
import { pan } from "@/api/chat";
import {
  AudioPlayerStateATOM,
  MicAccessStateATOM,
  SelectLanguageStateATOM,
  UrlWindowStateATOM,
} from "@/lib/atoms";
import RestartSession from "./restart-alert";
import UrlWindow from "./url-window";
// import { useLocation } from "react-router";
// import Localization from "./localization";

interface ChatWindowProps {
  bot_image: string;
  bot_type: string;
  styles: {
    base: string;
    background: string;
    bubble: string;
    content: string;
    title_1: string;
    title_2: string;
    title_3: string;
    user_text: string;
    loader: string;
    input?: string;
    option?: string;
  };
  theme: "light" | "dark";
  QUERIES: QUERIES;
  bubble_message: string;
}

export default function ChatWindow({
  bot_type,
  styles,
  bot_image,
  theme,
  QUERIES,
  bubble_message,
}: ChatWindowProps) {
  // const path = useLocation();
  const isMicOpen = useAtomValue(MicAccessStateATOM);
  const [isAudioPlaying, setIsAudioPlaying] = useAtom(AudioPlayerStateATOM);
  const selectLanguage = useAtomValue(SelectLanguageStateATOM);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<ChatMessage[]>([]);
  const [next, setNext] = useState<boolean>(false);
  const [diloagState, setDiloagState] = useState<boolean>(false);
  const [readMessage, setReadMessage] = useState<string>("");
  const [code, setLanguageCode] = useState<string>("en-IN");
  const [isUrlOPen, setUrlState] = useAtom(UrlWindowStateATOM);

  const handleSendResponse = ({
    type,
    content,
  }: {
    type: "text" | "audio";
    content: string | INTENTTYPE_MESSAGE | Blob;
  }) => {
    const userMessage: ChatMessage = {
      id: responses.length + 1,
      content,
      sender: "user",
      timestamp: new Date(),
      type,
    };
    setResponses((prev) => [...prev, userMessage]);
    sendChatPAN({ content });
  };

  const sendChatPAN = async ({
    content,
  }: {
    content: string | INTENTTYPE_MESSAGE | Blob;
  }) => {
    setLoading(true);
    try {
      const { message } = await pan(content as string, code);
      setResponses((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: message.join(" "),
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        },
      ]);
    } catch {
      setResponses((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "Oh no... something went wrong. Please contact support!",
          sender: "bot",
          timestamp: new Date(),
          type: "text",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleUnload = () => {
      window.parent.postMessage(
        { status: "closed", message: "Popup is closed" },
        "*"
      );
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // useEffect(() => {
  //   if (path && path.pathname.includes("/bot")) {
  //     setIsOpen(true);
  //   } else {
  //     setIsOpen(false);
  //   }
  // }, [path]);

  const handleMinimize = () => {
    // if(path && path.pathname.includes("/bot")){
    //   window.parent.postMessage(
    //     { status: "closed", message: "Popup is closed" },
    //     "*"
    //   );
    // }else{
    setIsOpen(false);
    // }
  };

  const handleRestartSession = () => {
    setResponses([]);
    setDiloagState(false);
  };

  const handleReadResponse = (e: string) => {
    setIsAudioPlaying(true);
    setReadMessage(e);
  };

  return (
    <>
      {isOpen && (
        <div
          className="ptn-fixed ptn-w-full ptn-h-full ptn-z-[999998]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className={`ptn-z-[999999] ptn-fixed ptn-bottom-0 ptn-right-0 md:ptn-bottom-4 md:ptn-right-4 ptn-p-2 ptn-transition-all ptn-shadow-2xl bot-fonts ${
          isOpen
            ? `ptn-h-full sm:ptn-h-[90%] ptn-w-full sm:ptn-w-[480px] ptn-rounded-3xl ptn-flex ptn-flex-col ptn-justify-between ${
                styles!.base
              }`
            : "ptn-w-0 ptn-h-0"
        }`}
      >
        {isOpen && (
          <>
            {next ? (
              isUrlOPen?.state ? (
                <UrlWindow
                  onClose={(state) => setUrlState({ url: "", state })}
                />
              ) : (
                <>
                  <Header
                    bot_image={bot_image}
                    bot_type={bot_type}
                    handleRestartSession={() => setDiloagState(!diloagState)}
                    setIsOpen={handleMinimize}
                    styles={styles}
                  />
                  <Responses
                    bot_image={bot_image}
                    bot_type={bot_type}
                    queries={QUERIES}
                    styles={styles}
                    responses={responses}
                    loading={loading}
                    onSendIntent={(intent: string) =>
                      handleSendResponse({ type: "text", content: intent })
                    }
                    onUpdateResponse={(responses) => setResponses(responses)}
                    onReadResponse={handleReadResponse}
                  />
                  <div
                    className={`ptn-w-full ptn-transition-all ptn-duration-300 ${
                      isMicOpen
                        ? "ptn-h-[200px] 3xl:ptn-h-[240px] ptn-opacity-100"
                        : "ptn-h-0 ptn-opacity-0"
                    }`}
                  >
                    <VoiceListeningUI theme="light" styles={styles} />
                  </div>
                  <div
                    className={`ptn-w-full ptn-transition-all ptn-duration-300 ${
                      isAudioPlaying
                        ? "ptn-h-[200px] 3xl:ptn-h-[240px] ptn-opacity-100"
                        : "ptn-h-0 ptn-opacity-0"
                    }`}
                  >
                    <AudioPlayer styles={styles} message={readMessage} />
                  </div>
                  <div
                    className={`ptn-w-full ptn-transition-all ptn-duration-300 ptn-z-10 ${
                      selectLanguage
                        ? "ptn-h-[200px] 3xl:ptn-h-[240px] ptn-opacity-100"
                        : "ptn-h-0 ptn-opacity-0"
                    }`}
                  >
                    <Languages
                      onSelectLanguage={setLanguageCode}
                      styles={styles}
                    />
                  </div>
                  <Input
                    bot_type={bot_type}
                    styles={styles}
                    theme={theme}
                    onSendResponse={handleSendResponse}
                  />
                </>
              )
            ) : (
              <InitialScreen
                bot_image={bot_image}
                bot_type={bot_type}
                styles={styles}
                goNext={() => setNext(true)}
              />
            )}
          </>
        )}
        <RestartSession
          state={diloagState}
          onClose={() => setDiloagState(!diloagState)}
          styles={styles}
          restartSession={handleRestartSession}
        />
        {/* <Localization/> */}
      </div>

      <ChatBubble
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        text={bubble_message}
      >
        <img
          src={bot_image}
          alt=""
          className="ptn-h-14 ptn-w-14 md:ptn-w-20 md:ptn-h-20 3xl:ptn-w-28 3xl:ptn-h-28"
        />
      </ChatBubble>
    </>
  );
}

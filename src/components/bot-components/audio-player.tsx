import { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue} from "jotai";

import { CircleX, Pause, Play, RotateCcw, RotateCw } from "lucide-react";

import { textToVoiceAPI } from "@/api/chat";
import voice from "@/assets/voice.png";
import { cn } from "@/lib/utils";
import { AudioPlayerStateATOM, LanguageCodeATOM } from "@/lib/atoms";

interface AudioPlayerProps {
  message: string;
  styles?: {
    title_1: string;
  };
}

export default function AudioPlayer({ message, styles }: AudioPlayerProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useAtom(AudioPlayerStateATOM);
  const [isPlaying, setIsPlaying] = useState(false);
  const languageCode = useAtomValue(LanguageCodeATOM);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [prevUrl, setPrevUrl] = useState<string>("");
  const [prevCode, setPrevCode] = useState<string | null>(null);

  const handleConvertTextToVoice = async () => {
    try {
      setIsLoading(true);
      setPrevCode(languageCode);
      const response = await textToVoiceAPI({
        text: message,
        languageCode,
      });
      setIsLoading(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const byteCharacters = atob(response.fileUrl);
      const byteArrays = [];
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }
      const byteArray = new Uint8Array(byteArrays);
      const blob = new Blob([byteArray], { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(blob);
      setPrevUrl(audioUrl)
      handleLoadAudio(audioUrl, isAudioPlaying);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleLoadAudio = (audioUrl:string, auto_play:boolean) => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });
    if(auto_play){
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    }
  }

  useEffect(() => {
    if (message && isAudioPlaying && languageCode !== prevCode) handleConvertTextToVoice();

    // return () => {
    //   if (audioRef.current) {
    //     audioRef.current.pause();
    //     audioRef.current = null;
    //   }
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, languageCode, isAudioPlaying]);

  useEffect(() => {
    if (prevUrl) {
      handlePlay();
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handlePlay = () => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(console.error);
  };

  const handlePause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleReset = () => {
    if( !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
  }

  const handleSkipBack = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 3
    );
  };
  
  const handleSkipForwards = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 3);
  };
  return (
    <div className="ptn-w-full ptn-h-[200px] 3xl:ptn-h-[240px] ptn-flex ptn-flex-col ptn-items-center ptn-justify-between ptn-px-4 ptn-py-6 3xl:ptn-py-10 ptn-relative">
      <img
        src={voice}
        alt=""
        className="ptn-h-full ptn-w-full ptn-object-contain ptn-object-center ptn-absolute ptn-top-0"
      />
      {!isLoading ? (
        <>
          <CircleX
            className={cn(
              "ptn-stroke-1 ptn-h-5 ptn-w-5 ptn-absolute ptn-top-4 ptn-right-4 ptn-cursor-pointer",
              styles?.title_1
            )}
            onClick={() => [
              setIsAudioPlaying(false),
              handlePause(),
              handleReset(),
            ]}
          />
          <div className="ptn-mt-4 ptn-flex ptn-flex-col ptn-items-center ptn-justify-center ptn-gap-2">
            <p
              className={cn(
                "bot-fonts ptn-font-light ptn-text-center ptn-text-3xl",
                styles?.title_1
              )}
            >
              Verbalizing the message...
            </p>
            <p className="bot-fonts ptn-font-light ptn-text-center ptn-text-sm ptn-text-ellipsis ptn-overflow-hidden ptn-w-[200px] ptn-whitespace-nowrap ptn-text-muted 3xl:ptn-text-lg">
              {message}
            </p>
          </div>
        </>
      ) : (
        <div className="ptn-h-full ptn-w-full ptn-flex ptn-justify-center ptn-items-center backdrop:ptn-blur-md">
          <p
            className={cn(
              "bot-fonts ptn-font-thin ptn-text-xs ptn-italic 3xl:ptn-text-lg",
              styles?.title_1
            )}
          >
            Generating your audio message...hang tight!
          </p>
        </div>
      )}

      <div className="ptn-flex ptn-justify-between ptn-items-center ptn-w-[200px] ptn-z-10">
        {!isLoading && (
          <RotateCcw
            className={cn(
              "ptn-stroke-1 ptn-h-5 ptn-w-5 ptn-cursor-pointer",
              styles?.title_1
            )}
            onClick={handleSkipBack}
          />
        )}
        {!isLoading &&
          (!isPlaying ? (
            <Play
              className={cn(
                "ptn-stroke-1 ptn-h-5 ptn-w-5 ptn-cursor-pointer",
                styles?.title_1
              )}
              onClick={() => handlePlay()}
            />
          ) : (
            <Pause
              className={cn(
                "ptn-stroke-1 ptn-h-5 ptn-w-5 ptn-cursor-pointer",
                styles?.title_1
              )}
              onClick={() => handlePause()}
            />
          ))}
        {!isLoading && (
          <RotateCw
            className={cn(
              "ptn-stroke-1 ptn-h-5 ptn-w-5 ptn-cursor-pointer",
              styles?.title_1
            )}
            onClick={handleSkipForwards}
          />
        )}
      </div>
    </div>
  );
}

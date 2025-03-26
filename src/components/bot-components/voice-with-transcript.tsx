import { Mic, XCircle } from "lucide-react";
import { useAtom } from "jotai";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { MicAccessStateATOM } from "@/lib/atoms";

interface VoiceProps {
  setTranscript: (text: string) => void;
  onCancel: () => void;
  styles?: {
    input: string;
  };
}

export default function VoiceWithTranscript({ setTranscript, onCancel, styles }: VoiceProps) {
  const [isMicOpen, setIsMicOpen] = useAtom(MicAccessStateATOM);
  const cancel = useRef<boolean>(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  const handleStartTranscripting = () => {
    cancel.current = true;
    setIsMicOpen(true);
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleCancelTranscripting = () => {
      SpeechRecognition.stopListening();
      resetTranscript();
      setIsMicOpen(false);
      onCancel();
  };
 
  useEffect(() => {
    if (!isMicOpen) {
        if(cancel.current){
          setTranscript("");
          resetTranscript();
        }
    } else {
      setTranscript(transcript);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMicOpen, transcript]);

  return (
    <div>
      {isMicOpen ? (
        <div
          onClick={handleCancelTranscripting}
          className="ptn-flex ptn-justify-center ptn-p-2.5 ptn-rounded-full ptn-items-center ptn-bg-destructive ptn-cursor-pointer"
        >
          <XCircle className="ptn-h-5 ptn-w-5 ptn-text-white ptn-stroke-1" />
        </div>
      ) : (
        <Mic
          className={cn(
            "ptn-h-5 ptn-w-5 ptn-cursor-pointer ptn-stroke-1",
            styles?.input
          )}
          onClick={handleStartTranscripting}
        />
      )}
    </div>
  );
}
import { ArrowRight } from "lucide-react";
import { useSetAtom } from "jotai";

import voice from "@/assets/voice.png";
import voice_light from "@/assets/voice_light.png";
import { cn } from "@/lib/utils";
import { MicAccessStateATOM } from "@/lib/atoms";

interface VoiceListeningProps{
  theme: "light" | "dark",
  styles?: {
    title_1:string,
    title_2: string,
  }
}

export default function VoiceListeningUI({theme,styles}: VoiceListeningProps){
    const setMicAccessState = useSetAtom(MicAccessStateATOM)
    return (
      <div className="ptn-w-full ptn-h-[200px] 3xl:ptn-h-[240px] ptn-flex ptn-flex-col ptn-items-center ptn-justify-between ptn-px-4 ptn-py-6 3xl:ptn-py-10 ptn-relative">
        <img
          src={theme === "light" ? voice : voice_light}
          alt=""
          className="ptn-h-full ptn-w-full ptn-object-contain ptn-object-center ptn-absolute ptn-top-0"
        />
        <div className="ptn-mt-2">
          <p
            className={cn(
              "bot-fonts ptn-font-light ptn-text-center ptn-text-3xl",
              styles?.title_1
            )}
          >
            I am listening...
          </p>
          <p className="bot-fonts ptn-font-light ptn-text-center ptn-text-muted ptn-mt-1 ptn-text-sm 3xl:ptn-text-lg">
            Say something
          </p>
        </div>

        <div
          className="ptn-rounded-full ptn-z-10 ptn-p-2.5 ptn-bg-green-700 ptn-cursor-pointer hover:ptn-bg-green-800"
          onClick={() => setMicAccessState(false)}
        >
          <ArrowRight className="ptn-h-5 ptn-w-5 ptn-text-white ptn-stroke-1" />
        </div>
      </div>
    );
}
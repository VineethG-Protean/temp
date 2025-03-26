import { cn } from "@/lib/utils";
import { Minus, RotateCcw } from "lucide-react";

interface HeaderProps {
  bot_image: string;
  bot_type: string;
  setIsOpen: (state: boolean) => void;
  handleRestartSession: () => void;
  styles?: {
    title_2: string;
  };
}

export default function Header({
  bot_image,
  bot_type,
  setIsOpen,
  handleRestartSession,
  styles,
}: HeaderProps) {
  return (
    <div className="ptn-relative">
      <div className="ptn-flex ptn-justify-center ptn-items-center ptn-gap-2 ptn-py-2">
        <img src={bot_image} alt="" className="ptn-w-8 ptn-h-8" />
        <p
          className={cn(
            "bot-fonts ptn-font-light ptn-reset-p",
            styles?.title_2
          )}
        >
          {bot_type} Support Agent
        </p>
      </div>

      <div className="ptn-flex ptn-gap-4 ptn-absolute ptn-top-3.5 ptn-right-4 2xl:ptn-top-3">
        <Minus
          className="ptn-h-4 ptn-w-4 ptn-cursor-pointer ptn-text-muted 3xl:ptn-w-5 3xl:ptn-h-5"
          xlinkTitle="minimize"
          onClick={() => setIsOpen(false)}
        />
        <RotateCcw
          className="ptn-h-4 ptn-w-4 ptn-cursor-pointer ptn-text-muted 3xl:ptn-w-5 3xl:ptn-h-5"
          onClick={handleRestartSession}
        />
      </div>
    </div>
  );
}

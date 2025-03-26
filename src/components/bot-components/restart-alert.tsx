import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface RestartSessionProps {
  state: boolean;
  onClose: () => void;
  styles: {
    base: string;
  };
  restartSession: () => void;
}

export default function RestartSession({
  state,
  onClose,
  styles,
  restartSession,
}: RestartSessionProps) {
  return (
    state && (
      <div className="ptn-absolute ptn-inset-0 ptn-m-auto ptn-flex ptn-items-center ptn-justify-center ptn-z-50">
        <div
          className={cn(
            "ptn-w-full ptn-max-w-[380px] ptn-p-4 3xl:ptn-p-6 ptn-rounded-2xl ptn-shadow-lg",
            styles.base
          )}
        >
          <div className="ptn-flex ptn-justify-between ptn-items-center">
            <p className="bot-fonts ptn-font-medium ptn-text-xl">Start new chat</p>
            <X
              className="ptn-h-4 ptn-w-4 3xl:ptn-h-5 3xl:ptn-w-5 ptn-cursor-pointer"
              onClick={onClose}
            />
          </div>

          <div className="ptn-flex ptn-flex-col ptn-gap-3 ptn-mt-2">
            <p className="bot-fonts ptn-font-light ptn-text-nps_text_muted/120 ptn-leading-5">
              Starting a new chat will delete the current chat instance. You
              will lose current chat progress. Continue?
            </p>
            <div className="ptn-flex ptn-gap-1.5 ptn-mt-1">
              <div className="bot-fonts ptn-p-3 ptn-text-sm ptn-border ptn-rounded-2xl ptn-cursor-pointer" onClick={onClose}>
                NO, CANCEL
              </div>
              <div className="bot-fonts ptn-p-3 ptn-text-sm ptn-border ptn-rounded-2xl ptn-bg-black ptn-text-white ptn-cursor-pointer" onClick={restartSession}>YES, START NEW CHAT</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
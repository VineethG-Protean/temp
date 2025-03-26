import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import "../../../i18n";

interface InitialScreenProps {
  bot_image: string;
  bot_type: string;
  goNext: () => void;
  styles?: {
    background?: string;
    title_1?: string;
    title_2?: string;
    title_3?: string;
  };
}

export default function InitialScreen({
  bot_image,
  bot_type,
  goNext,
  styles,
}: InitialScreenProps) {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "ptn-h-full ptn-w-full ptn-relative ptn-flex ptn-flex-col ptn-gap-4 ptn-justify-center ptn-items-center ptn-rounded-xl",
        styles!.background
      )}
    >
      <div className="ptn-flex ptn-flex-col ptn-justify-center ptn-items-center ptn-absolute ptn-top-1/2 -ptn-translate-y-1/2 ptn-mt-6">
        <img
          src={bot_image}
          alt=""
          className="ptn-h-28 ptn-w-28 3xl:ptn-h-32 3xl:ptn-w-32"
        />

        <div className="ptn-z-10 ptn-mt-4">
          {/* <p
            className={cn(
              "ptn-text-6xl 3xl:ptn-text-7xl ptn-text-center",
              styles!.title_1
            )}
          >
            नमस्ते
          </p> */}
          <div
            className={cn(
              "ptn-text-7xl ptn-flex ptn-justify-center [text-wrap:balance]",
              styles?.title_1
            )}
          >
            <span className="ptn-inline-flex ptn-flex-col ptn-h-[106px] ptn-overflow-hidden">
              <ul className="ptn-block ptn-animate-text-slide ptn-leading-tight [&_li]:ptn-block ptn-text-center">
                <li className="bot-fonts ptn-h-[100px] 3xl:ptn-h-[100px] ptn-flex ptn-justify-center ptn-items-center">
                  Namaste
                </li>
                <li className="bot-fonts ptn-h-[110px] ptn-flex ptn-justify-center ptn-items-center">
                  नमस्ते
                </li>
                <li className="bot-fonts ptn-h-[110px] ptn-flex ptn-justify-center ptn-items-center">
                  ನಮಸ್ಕಾರ
                </li>
                <li className="bot-fonts ptn-h-[110px] ptn-flex ptn-justify-center ptn-items-center">
                  નમસ્તે
                </li>
                <li className="bot-fonts ptn-h-[110px] ptn-flex ptn-justify-center ptn-items-center">
                  నమస్కారం
                </li>
                <li className="bot-fonts ptn-h-[110px] ptn-flex ptn-justify-center ptn-items-center">
                  வணக்கம்
                </li>
                <li className="bot-fonts ptn-h-[110px] ptn-flex ptn-justify-center ptn-items-center">
                  নমস্কার
                </li>
              </ul>
            </span>
          </div>
          <p
            className={cn(
              "bot-fonts ptn-font-thin ptn-text-2xl ptn-text-center -ptn-mt-4 3xl:-ptn-mt-2",
              styles!.title_1
            )}
          >
            {t("welcome", { value: bot_type })}
          </p>
          <p
            className={cn(
              "bot-fonts ptn-font-thin ptn-text-center ptn-text-proteanplus_text_muted ptn-text-lg",
              styles!.title_2
            )}
          >
            Powered by Protean Plus
          </p>
        </div>
      </div>

      <Button
        className="ptn-rounded-3xl ptn-z-10 ptn-absolute ptn-bottom-14 ptn-right-1/2 ptn-translate-x-1/2"
        onClick={goNext}
      >
        Ask {bot_type} Agent
      </Button>
    </div>
  );
}

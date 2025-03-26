import { CheckCircle2, CircleX, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAtom, useSetAtom } from "jotai";
import { AllLanguagesATOM, LanguageCodeATOM, LANGUAGES, SelectLanguageStateATOM } from "@/lib/atoms";

interface LanguagesProps {
  onSelectLanguage?: (lang: string) => void;
  styles?: {
    base?: string;
    title_1?: string;
    input?: string;
    option?: string;
  };
}

export default function Languages({
  styles,
  onSelectLanguage,
}: LanguagesProps) {
  const setSelectLanguageState = useSetAtom(SelectLanguageStateATOM);
  const [languages, setLanguages] = useAtom(AllLanguagesATOM);
  const [enableSearch, setEnableSearch] = useState<boolean>(false);
  const setLanguageCode = useSetAtom(LanguageCodeATOM);

  const handleSelectLanguage = (code: string) => {
    setLanguages((prev) =>
      prev.map((lang) => ({
        ...lang,
        selected: lang.code === code,
      }))
    );
    setLanguageCode(code);
    setSelectLanguageState(false);
    onSelectLanguage?.(code);
  };

  const handleSearchLanguage = (language: string) => {
    if (!language || language === "") {
      setLanguages(LANGUAGES);
      return;
    }
    setLanguages((prev) =>
      prev.filter((lang) =>
        lang.lang.toLowerCase().includes(language.trim().toLowerCase())
      )
    );
  };

  return (
    <div
      className={cn(
        "ptn-flex ptn-flex-col ptn-gap-4 ptn-px-4 ptn-h-[200px] 3xl:ptn-h-[240px] ptn-overflow-y-auto ptn-scrollbar-hide",
        styles?.base
      )}
    >
      {!enableSearch ? (
        <div
          className={cn(
            "ptn-py-4 3xl:ptn-py-5 ptn-flex ptn-items-center ptn-justify-between ptn-w-full ptn-sticky ptn-top-0",
            styles?.base
          )}
        >
          <p className={cn("bot-fonts ptn-text-xl ptn-font-light", styles?.title_1)}>Select Language</p>
          <Search
            className={cn(
              "ptn-h-4 ptn-w-4 3xl:ptn-h-5 3xl:ptn-w-5 ptn-cursor-pointer hover:ptn-scale-125 ptn-duration-100 ptn-transition-transform ptn-stroke-1",
              styles?.title_1
            )}
            onClick={() => setEnableSearch(true)}
          />
        </div>
      ) : (
        <div
          className={cn(
            "ptn-py-3 3xl:ptn-py-4 ptn-flex ptn-items-center ptn-justify-between ptn-gap-4 ptn-w-full ptn-sticky ptn-top-0",
            styles?.base
          )}
        >
          <Input
            placeholder="Search language"
            className={cn(
              "ptn-w-full ptn-px-2 ptn-bg-transparent",
              styles?.input
            )}
            onChange={(e) => handleSearchLanguage(e.target.value)}
            autoFocus
          />
          <CircleX
            className={cn(
              "ptn-h-5 ptn-w-5 ptn-cursor-pointer hover:ptn-scale-125 ptn-duration-100 ptn-transition-transform ptn-stroke-1",
              styles?.input
            )}
            onClick={() => {
              setEnableSearch(false);
              setLanguages(languages);
            }}
          />
        </div>
      )}

      {languages.map((value, index) => (
        <div
          key={index}
          className="ptn-flex ptn-justify-between ptn-items-center ptn-cursor-pointer"
          onClick={() => handleSelectLanguage(value.code)}
        >
          <div className="ptn-flex ptn-gap-4 ptn-items-center">
            {/* <img
              src={india}
              alt=""
              className="ptn-h-8 ptn-w-8 ptn-rounded-full 3xl:ptn-h-10 3xl:ptn-w-10"
            /> */}
            <p className="ptn-h-8 ptn-w-8 ptn-rounded-full 3xl:ptn-h-10 3xl:ptn-w-10 ptn-border ptn-flex ptn-justify-center ptn-items-center ptn-text-xs ptn-font-light ptn-bg-nps_accent_2 ptn-text-black">{value.icon}</p>
            <p className={cn("bot-fonts ptn-font-light 3xl:ptn-text-lg",styles?.option)}>{value.title}</p>
          </div>
          {value.selected && (
            <CheckCircle2 className={cn("ptn-h-5 ptn-w-5 ptn-stroke-1 ptn-text-green-700", styles?.option)} />
          )}
        </div>
      ))}
    </div>
  );
}

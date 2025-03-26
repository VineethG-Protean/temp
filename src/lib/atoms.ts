import { atom } from "jotai";
import { LANGUAGE } from "./types";

export const LANGUAGES = [
  {
    title: "English",
    lang: "English",
    code: "en-IN",
    icon: "Aa",
    selected: true,
  },
  {
    title: "हिन्दी",
    lang: "Hindi",
    code: "hi",
    icon: "अ",
    selected: false,
  },
  {
    title: "বাংলা",
    lang: "Bengali",
    code: "bn",
    icon: "অ",
    selected: false,
  },
  {
    title: "ગુજરાતી",
    lang: "Gujarati",
    code: "gu",
    icon: "અ",
    selected: false,
  },
  {
    title: "ಕನ್ನಡ",
    lang: "Kannada",
    code: "kn",
    icon: "ಅ",
    selected: false,
  },
  {
    title: "മലയാളം",
    lang: "Malayalam",
    code: "ml",
    icon: "അ",
    selected: false,
  },
  {
    title: "मराठी",
    lang: "Marathi",
    code: "mr",
    icon: "अ",
    selected: false,
  },
  {
    title: "ਪੰਜਾਬੀ",
    lang: "Punjabi",
    code: "pa",
    icon: "ੳ",
    selected: false,
  },
  {
    title: "தமிழ்",
    lang: "Tamil",
    code: "ta",
    icon: "அ",
    selected: false,
  },
  {
    title: "తెలుగు",
    lang: "Telugu",
    code: "te",
    icon: "అ",
    selected: false,
  },
  {
    title: "اردو",
    lang: "Urdu",
    code: "ur",
    icon: "الف",
    selected: false,
  },
];

export const AllLanguagesATOM = atom<LANGUAGE[]>(LANGUAGES);
export const LanguageCodeATOM = atom<string>("en");
export const SelectLanguageStateATOM = atom<boolean>(false);
export const MicAccessStateATOM = atom<boolean>(false);
export const AudioPlayerStateATOM = atom<boolean>(false);
export const UrlWindowStateATOM = atom<{ url: string; state: boolean }>();

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to {{value}} Support",
        change_language: "Change Language",
      },
    },
    hi: {
      translation: {
        welcome: "{{value}} सहायता में आपका स्वागत है",
        change_language: "Changer de langue",
      },
    },
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;

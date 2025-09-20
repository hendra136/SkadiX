import en from './en.json';
import es from './es.json';
import nl from './nl.json';
import fr from './fr.json';

export const translations = {
  en,
  es,
  nl,
  fr
};

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

export type LanguageCode = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
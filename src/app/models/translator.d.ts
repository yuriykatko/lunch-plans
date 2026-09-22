// Ambient types for the experimental browser Translator API (not yet in lib.dom.d.ts).
interface Translator {
  translate(text: string): Promise<string>;
}

interface TranslatorCreateOptions {
  sourceLanguage: string;
  targetLanguage: string;
}

interface Window {
  Translator?: {
    create(options: TranslatorCreateOptions): Promise<Translator>;
  };
}

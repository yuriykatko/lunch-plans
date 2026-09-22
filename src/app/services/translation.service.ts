import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private translator?: Translator;

  // Must be called from a user gesture (e.g. click handler): create() may prompt a model download.
  public async translateText(text: string): Promise<string> {
    const translator = this.translator ?? (await this.initialize());
    return translator ? String(await translator.translate(text)) : text;
  }

  private async initialize(): Promise<Translator | undefined> {
    const translateAPI = window.Translator;

    if (translateAPI) {
      this.translator = await translateAPI.create({
        sourceLanguage: 'es',
        targetLanguage: 'en',
      });
    }

    return this.translator;
  }
}

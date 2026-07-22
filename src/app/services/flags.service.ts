import { Inject, Injectable, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { isPlatformServer } from '@angular/common';

const IS_EMOJI_DISPLAYED_KEY = makeStateKey<boolean>('isEmojiDisplayed');

@Injectable({ providedIn: 'root' })
export class FlagsService {
  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  async getIsEmojiDisplayed(): Promise<boolean> {
    if (this.transferState.hasKey(IS_EMOJI_DISPLAYED_KEY)) {
      return this.transferState.get(IS_EMOJI_DISPLAYED_KEY, false);
    }

    if (isPlatformServer(this.platformId)) {
      const { flagsClient } = await import('@vercel/flags-core');
      const result = await flagsClient.evaluate('isEmojiDisplayed', false);
      const value = result.value ?? false;
      this.transferState.set(IS_EMOJI_DISPLAYED_KEY, value);
      return value;
    }

    return false;
  }
}

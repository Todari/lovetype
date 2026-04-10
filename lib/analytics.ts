import { sendGAEvent } from '@next/third-parties/google';

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams) {
  sendGAEvent('event', eventName, params ?? {});
}

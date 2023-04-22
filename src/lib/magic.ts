import { Magic } from 'magic-sdk';

import { magicPublishableKey } from '@/constant/env';

const createMagic = (key: string) => {
  return typeof window !== 'undefined' && new Magic(key);
};

export const magic = createMagic(magicPublishableKey);

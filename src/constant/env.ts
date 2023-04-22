export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const sibServer = process.env.SENDINBLUE_SERVER ?? '';
export const sibPort = process.env.SENDINBLUE_PORT ?? 587;
export const sibLogin = process.env.SENDINBLUE_LOGIN ?? '';
export const sibKey = process.env.SENDINBLUE_KEY ?? '';

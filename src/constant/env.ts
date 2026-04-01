export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true';

export const resendApiKey = process.env.RESEND_API_KEY ?? '';
export const resendFromEmail = process.env.RESEND_FROM_EMAIL ?? '';
export const emailRecipients =
  process.env.EMAIL_RECIPIENTS ??
  process.env.NEXT_PUBLIC_EMAIL_RECIPIENTS ??
  '';

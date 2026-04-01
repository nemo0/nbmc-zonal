import ejs from 'ejs';
import { Resend } from 'resend';

import type { IIndividualCamper } from '@/components/Partials/IndividualForm';

import { emailRecipients, resendApiKey, resendFromEmail } from '@/constant/env';

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function getAdditionalRecipients() {
  if (!emailRecipients) {
    return [];
  }

  try {
    const parsed = JSON.parse(emailRecipients);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((recipient): recipient is string => typeof recipient === 'string')
      .map((recipient) => recipient.trim())
      .filter(Boolean);
  } catch (error) {
    console.error(
      'Invalid EMAIL_RECIPIENTS JSON. Expected a JSON array.',
      error
    );
    return [];
  }
}

const sendEmail = (
  receiver: string,
  subject: string,
  camper: IIndividualCamper | Record<string, unknown>,
  template: string
) => {
  void (async () => {
    try {
      if (!resend) {
        console.error('Missing RESEND_API_KEY. Skipping email send.');
        return;
      }

      if (!resendFromEmail) {
        console.error('Missing RESEND_FROM_EMAIL. Skipping email send.');
        return;
      }

      const additionalRecipients = getAdditionalRecipients();
      const receivers = Array.from(
        new Set(
          [receiver, ...additionalRecipients].map((value) => value.trim())
        )
      ).filter(Boolean);

      const html = await ejs.renderFile(template, { camper });
      const { data, error } = await resend.emails.send({
        from: resendFromEmail,
        to: receivers,
        subject,
        html,
      });

      if (error) {
        console.error('Failed to send email with Resend:', error);
        return;
      }

      console.log('Message sent:', data?.id ?? 'unknown');
    } catch (error) {
      console.error(error);
    }
  })();
};

export default sendEmail;

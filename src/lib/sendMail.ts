import ejs from 'ejs';
import nodemailer from 'nodemailer';

import { IIndividualCamper } from '@/components/Partials/IndividualForm';

import {
  mailRecipients,
  sibKey,
  sibLogin,
  sibPort,
  sibServer,
} from '@/constant/env';

const transport = nodemailer.createTransport({
  host: sibServer,
  port: Number(sibPort),
  auth: {
    user: sibLogin,
    pass: sibKey,
  },
});

const sendEmail = (
  receiver: string,
  subject: string,
  camper: IIndividualCamper | any,
  template: string
) => {
  ejs.renderFile(
    template,
    { camper }, // Pass the camper object to the template
    (err: any, data: any) => {
      if (err) {
        console.log(err);
      } else {
        const emailReceivers = JSON.parse(mailRecipients);
        const receivers = [receiver, ...emailReceivers];

        const mailOptions = {
          from: 'subhachanda88@gmail.com',
          to: receivers,
          subject: subject,
          html: data,
        };

        transport.sendMail(mailOptions, (error: any, info: any) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
        });
      }
    }
  );
};

export default sendEmail;

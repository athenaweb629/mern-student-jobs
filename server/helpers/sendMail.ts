/* eslint-disable no-console */
import sgMail from '@sendgrid/mail';
import * as emailData from '../utils/emailData';

export default function sendMail(type: String, email: String, token: String): void {
  const props = {
    email,
    token,
  };

  if (type === 'reset') {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send(emailData.emailDataResetPassword(props)).then(() => {
      console.log('Email sent');
    }).catch((e) => {
      console.log(e);
    });
  } else if (type === 'activate') {
    const data = emailData.emailDataActivation(props);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send(data).then(() => {
      console.log('Email sent');
    }).catch((e) => {
      console.log(e);
    });
  }
}

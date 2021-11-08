import sgMail from '@sendgrid/mail';

export default async (type: string, email: string, token: string): Promise<void> => {
  const subject = type === 'reset' ? 'Reset your password' : 'Account Activation Link';

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    sgMail.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      html: `
        <h1>Please use the following link to ${subject.includes('activate') ? 'activate' : 'reset'} your account</h1>
        <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
        <hr />
        <p>This email may containe sensetive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `,
    });

    console.log('Email sent');
  } catch (error) {
    console.log(error);
  }
};

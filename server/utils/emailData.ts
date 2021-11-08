export const emailDataActivation = (props) => ({
  from: process.env.EMAIL_FROM,
  to: props.email,
  subject: 'Account activation link',
  html: `
          <h1>Please use the following to activate your account</h1>
                  <p>${process.env.CLIENT_URL}/users/activate/${props.token}</p>
                  <hr />
                  <p>This email may containe sensetive information</p>
                  <p>${process.env.CLIENT_URL}</p>
      `,
});

export const emailDataResetPassword = (props) => ({
  from: process.env.EMAIL_FROM,
  to: props.email,
  subject: 'Reset your password',
  html: `
        <h1>Please use the following to reset your account</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${props.token}</p>
                <hr />
                <p>This email may containe sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
    `,
});

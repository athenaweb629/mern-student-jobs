import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const Copyright = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      Your Website
    </Link>{' '}
    {new Date().getFullYear()}.
  </Typography>
);

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
					  backgroundImage: 'url(https://source.unsplash.com/random)',
					  backgroundRepeat: 'no-repeat',
					  backgroundColor: (t) => (t.palette.mode === 'light'
            ? t.palette.grey[50]
            : t.palette.grey[900]),
					  backgroundSize: 'cover',
					  backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? 'Sign up' : 'Sign in'}
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {isSignup && (
              <>
                <TextField margin="normal" required fullWidth id="firstName" label="First Name" name="firstName" autoComplete="fname" autoFocus />
                <TextField margin="normal" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lame" />
              </>
            )}
            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#top" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Button onClick={() => setIsSignup((prevIsSignup) => !prevIsSignup)}>
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Auth;

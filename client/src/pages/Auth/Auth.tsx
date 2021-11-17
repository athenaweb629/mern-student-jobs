import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, Paper, Box, Grid, Typography, Snackbar, Alert } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation, LoginRequest, useResetPasswordMutation, ResetPasswordRequest } from '../../app/services/auth';
import useAuth from '../../hooks/useAuth';
import Input from './Input';

const Auth = () => {
	const { user: isUserLoggedIn } = useAuth();
	const [login] = useLoginMutation();
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();

	const [isSignup, setIsSignup] = useState(!location.pathname.includes('login'));
	const [form, setForm] = React.useState<LoginRequest>({ username: '', password: '', });
	const [showPassword, setShowPassword] = useState(false);
	const [resetPassword, setResetPassword] = useState(false);

	useEffect(() => {
		if (isUserLoggedIn) history.push('/');
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const user = await login(form).unwrap();

			dispatch(setCredentials(user));

			history.push('/');
		} catch (err) {
			// TODO: Napraviti da ovo radi
			<Snackbar autoHideDuration={6000}>
				<Alert severity='error' sx={{ width: '100%' }}>
					Error!
				</Alert>
			</Snackbar>;
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
	};

	const changeAuthType = () => {
		history.push(isSignup ? '/login' : '/register');

		setIsSignup((prevIsSignup: boolean) => !prevIsSignup);
		setResetPassword(false);
	};

	const handleSignIn = () => {
		history.push('/login');
		setResetPassword(false);
		setIsSignup(false);
	};

	const handleResetPassword = () => {
		history.push('/resetPassword');
		setIsSignup(false);
		setResetPassword(true);
	};

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: 'url(https://source.unsplash.com/random)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light'
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlined />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{resetPassword ? 'Reset your password' : (isSignup ? 'Sign Up' : 'Sign In')}
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1, width: '65%' }}>
						<Grid container spacing={2}>
							{isSignup && (
								<>
									<Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
									<Input name='lastName' label='Last Name' handleChange={handleChange} half />
								</>
							)}
							{!resetPassword && (
								<>
									<Input name='email' label='Email Address' handleChange={handleChange} type='email' />
									<Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={() => setShowPassword(!showPassword)} />
								</>
							)}
							{resetPassword && (
								<>
									<Input name='resetPassword' label='Email' handleChange={handleChange} type='email' />
								</>
							)}

							{isSignup && 	<Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							{resetPassword ? 'Reset your password' : (isSignup ? 'Sign Up' : 'Sign In')}
						</Button>
						<Grid container>
							<Grid item xs>
								{resetPassword ? <Button onClick={handleSignIn}>Sign in</Button> : (
									<Button
										onClick={handleResetPassword}>Forgot password?
									</Button>
								)}

							</Grid>
							<Grid item>
								<Button
									onClick={changeAuthType}>
									{resetPassword ? 'Sign Up' : (isSignup ? 'Sign In' : 'Sign Up')}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Auth;

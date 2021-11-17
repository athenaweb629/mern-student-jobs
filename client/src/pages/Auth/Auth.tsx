import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, Paper, Box, Grid, Typography, Snackbar, Alert } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation, LoginRequest, useRegisterMutation, useResetPasswordMutation } from '../../app/services/auth';
import useAuth from '../../hooks/useAuth';

import Input from './Input';
import path from '../../constants/path';

const Auth = () => {
	const user = useAuth();
	const [resetPassword] = useResetPasswordMutation();
	const [login] = useLoginMutation();
	const [register] = useRegisterMutation();
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();

	const [isSignup, setIsSignup] = useState(!location.pathname.includes('login'));
	const [form, setForm] = React.useState<LoginRequest>({ email: '', password: '', firstName: '', lastName: '' });

	const [showPassword, setShowPassword] = useState(false);
	const [isResettingPassword, setIsResettingPassword] = useState(false);

	useEffect(() => {
		if (user) history.push(path.BASE);
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			let userData;
			if (isSignup) {
				const name = `${form.firstName} ${form.lastName}`;
				userData =	await register({ name, email: form.email, password: form.password }).unwrap();
			} else {
				userData = await login(form).unwrap();
			}
			dispatch(setCredentials(userData));

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
		setIsResettingPassword(false);
	};

	const handleSignIn = () => {
		history.push('/login');
		setIsResettingPassword(false);
		setIsSignup(false);
	};

	const handleForgotPassword = () => {
		history.push('/forgot-password');
		setIsSignup(false);
		setIsResettingPassword(true);
	};

	const handleResetPassword = () => {
		resetPassword({ email: form.email });
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
						{isResettingPassword ? 'Reset your password' : (isSignup ? 'Sign Up' : 'Sign In')}
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
							{!isResettingPassword && (
								<>
									<Input name='email' label='Email Address' handleChange={handleChange} type='email' />
									<Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={() => setShowPassword(!showPassword)} />
								</>
							)}
							{isResettingPassword && (
								<>
									<Input name='isResettingPassword' label='Email' handleChange={handleChange} type='email' />
								</>
							)}

							{isSignup && 	<Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							onClick={handleResetPassword}>
							{isResettingPassword ? 'Reset your password' : (isSignup ? 'Sign Up' : 'Sign In')}
						</Button>
						<Grid container>
							<Grid item xs>
								{isResettingPassword ? <Button onClick={handleSignIn}>Sign in</Button> : (
									<Button
										onClick={handleForgotPassword}>Forgot password?
									</Button>
								)}

							</Grid>
							<Grid item>
								<Button
									onClick={changeAuthType}>
									{isResettingPassword ? 'Sign Up' : (isSignup ? 'Sign In' : 'Sign Up')}
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

import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, Paper, Box, Grid, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLoginMutation, LoginRequest, useRegisterMutation } from '../../app/services/auth';
import { setCredentials } from '../../features/auth/authSlice';
import useAuth from '../../hooks/useAuth';
import path from '../../constants/path';
import Input from './Input';

export interface IErrorMessages { name: string[]; password: string[]; confirmPassword: string[]; email: string[] }

type Param = 'name' | 'password' | 'confirmPassword' | 'email';

const Auth = () => {
	const user = useAuth();
	const [login] = useLoginMutation();
	const [register] = useRegisterMutation();
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();

	const [isSignup, setIsSignup] = useState(
		!location.pathname.includes('login')
	);
	const [form, setForm] = useState<LoginRequest>({ email: '', password: '', name: '', confirmPassword: '', });
	const [errorMessage, setErrorMessage] = useState<IErrorMessages>({ name: [], email: [], password: [], confirmPassword: [], });
	const [showPassword, setShowPassword] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	useEffect(() => {
		if (user) history.push(path.BASE);
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage({ name: [], email: [], password: [], confirmPassword: [] });

		if (isSignup && form.password !== form.confirmPassword) {
			setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage, confirmPassword: ['Passwords must match'], password: ['Passwords must match'], }));

			return;
		}

		try {
			let userData;

			if (isSignup) {
				userData = await register(form).unwrap();
			} else {
				userData = await login(form).unwrap();
			}

			dispatch(setCredentials(userData));

			history.push('/');
		} catch (err: any) {
			const errorMessages: IErrorMessages = { name: [], password: [], confirmPassword: [], email: [] };

			err?.data?.errors?.forEach(({ param, msg }: { param: Param, msg: string }) => {
				errorMessages[param] = [...errorMessages[param], msg];
			});

			setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage, ...errorMessages }));
		}
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
	};

	const changeAuthType = () => {
		history.push(isSignup ? '/login' : '/register');

		setIsSignup((prevIsSignup: boolean) => !prevIsSignup);
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
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlined />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{isSignup ? 'Sign up' : 'Sign in'}
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						onClick={handleClick}
						sx={{ mt: 1, width: '65%' }}>
						<Grid container spacing={2}>
							{isSignup && (
								<Input
									name='name'
									label='Full Name'
									handleChange={handleChange}
									errorMessage={errorMessage.name[0]}
									autoFocus
								/>
							)}
							<Input
								name='email'
								label='Email Address'
								handleChange={handleChange}
								errorMessage={errorMessage.email[0]}
								type='email'
							/>
							<Input
								name='password'
								label='Password'
								handleChange={handleChange}
								errorMessage={typeof errorMessage.password === 'string' ? errorMessage.password : errorMessage.password[0]}
								type={showPassword ? 'text' : 'password'}
								handleShowPassword={() => setShowPassword(!showPassword)}
							/>
							{isSignup && (
								<Input
									name='confirmPassword'
									label='Repeat Password'
									handleChange={handleChange}
									errorMessage={errorMessage.confirmPassword[0]}
									type='password'
								/>
							)}
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							{isSignup ? 'Sign Up' : 'Sign In'}
						</Button>
						<Grid container>
							<Grid item xs>
								<Button>Forgot password?</Button>
							</Grid>
							<Grid item>
								<Button onClick={changeAuthType}>
									{isSignup
										? 'Already have an account? Sign in'
										: "Don't have an account? Sign Up"}
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

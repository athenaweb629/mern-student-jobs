import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, Paper, Box, Grid, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LockOutlined, School as SchoolIcon, Business as BusinessIcon } from '@mui/icons-material';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useLoginMutation, LoginRequest, useRegisterMutation, useResetPasswordMutation, useForgotPasswordMutation } from '../../app/services/auth';
import { setCredentials } from '../../features/auth/authSlice';
import CustomizedSnackbars from '../../components/Snackbar';
import paths from '../../constants/paths';
import useAuth from '../../hooks/useAuth';
import Input from './Input';

export interface IErrorMessages { name: string[]; password: string[]; confirmPassword: string[]; email: string[] }
type Param = 'name' | 'password' | 'confirmPassword' | 'email';
type TypeState = 'login' | 'register' | 'forgot-password' | 'reset-password'

const Auth = () => {
	const [currentAuthState, setCurrentAuthState] = useState<TypeState>('login');
	const [form, setForm] = useState<LoginRequest>({ email: '', password: '', name: '', confirmPassword: '', userType: 'student' });
	const [errorMessage, setErrorMessage] = useState<IErrorMessages>({ name: [], email: [], password: [], confirmPassword: [], });
	const [alertMessage, setAlertMessage] = useState('');
	const [snackbarType, setSnackbarType] = useState('error');
	const [showPassword, setShowPassword] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [open, setOpen] = useState(false);

	const [forgotPassword] = useForgotPasswordMutation();
	const [resetPassword] = useResetPasswordMutation();
	const [login] = useLoginMutation();
	const [register] = useRegisterMutation();
	const dispatch = useDispatch();
	const location = useLocation();
	const token: any = useParams();
	const history = useHistory();
	const user = useAuth();

	useEffect(() => {
		if (location.pathname.includes('login')) {
			setCurrentAuthState('login');
		} else if (location.pathname.includes('register')) {
			setCurrentAuthState('register');
		} else if (location.pathname.includes('forgot-password')) {
			setCurrentAuthState('forgot-password');
		} else if (location.pathname.includes('reset-password')) {
			setCurrentAuthState('reset-password');
		}
	}, [location.pathname]);

	const handleUserType = (event: any, newUserType: any) => {
		setForm((prevForm) => ({ ...prevForm, userType: newUserType }));
	};

	useEffect(() => {
		if (user) history.push(paths.BASE);
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage({ name: [], email: [], password: [], confirmPassword: [] });

		if (currentAuthState === 'register' && form.password !== form.confirmPassword) {
			setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage, confirmPassword: ['Passwords must match'], password: ['Passwords must match'] }));

			return;
		}

		try {
			let userData;

			if (currentAuthState === 'register') {
				userData = await register(form).unwrap();

				setOpen(true);
				setSnackbarType('success');
				setAlertMessage('Account created. Please confirm it via e-mail and then log in.');
				history.push(paths.LOGIN);
			} else {
				userData = await login(form).unwrap();
				dispatch(setCredentials(userData));

				history.push(paths.BASE);
			}
		} catch (err: any) {
			const errorMessages: IErrorMessages = { name: [], password: [], confirmPassword: [], email: [] };

			if (err.data.message || err.data.email) {
				setOpen(true);
				setSnackbarType('error');
				setAlertMessage(err?.data?.message || err?.data?.email);
			} else {
				err?.data?.errors?.forEach(({ param, msg }: { param: Param, msg: string }) => {
					errorMessages[param] = [...errorMessages[param], ` ${msg}.`];
				});

				setErrorMessage((prevErrorMessage) => ({ ...prevErrorMessage, ...errorMessages }));
			}
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
	};

	const handleChangeReset = (event: React.FormEvent<HTMLInputElement>) => {
		setNewPassword(event.currentTarget.value);
	};

	const handleSubmitForgotPassword = () => {
		if (currentAuthState === 'forgot-password') {
			setOpen(true);
			setSnackbarType('success');
			setAlertMessage('Password reset link has been sent to your e-mail');
			forgotPassword({ email: form.email });
		} else if (currentAuthState === 'reset-password') {
			resetPassword({ password: newPassword, token: token.token });

			history.push(paths.LOGIN);
		}
	};

	return (
		<Grid container component='main' sx={{ height: '100vh' }}>
			<CustomizedSnackbars open={open} setOpen={setOpen} alertMessage={alertMessage} type={snackbarType} />
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} sx={{ backgroundImage: 'url(https://source.unsplash.com/random)', backgroundRepeat: 'no-repeat', backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], backgroundSize: 'cover', backgroundPosition: 'center' }} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlined />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{currentAuthState === 'forgot-password' || currentAuthState === 'reset-password' ? 'Reset your password' : (currentAuthState === 'register' ? 'Sign Up' : 'Sign In')}
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1, width: '65%' }}>
						<Grid container spacing={2} sx={{ width: '100%' }}>
							{currentAuthState === 'register' && (
								<Grid item xs={12} sm={12} sx={{ marginTop: '5px' }}>
									<Box display="flex" justifyContent="center">
										<ToggleButtonGroup value={form.userType} exclusive onChange={handleUserType} color="primary" aria-label="user type">
											<ToggleButton value="student" aria-label="student">
												Student <SchoolIcon sx={{ marginLeft: '10px' }} />
											</ToggleButton>
											<ToggleButton value="company" aria-label="company">
												Company <BusinessIcon sx={{ marginLeft: '10px' }} />
											</ToggleButton>
										</ToggleButtonGroup>
									</Box>
								</Grid>
							)}
							{currentAuthState === 'register' && <Input name='name' label={form.userType === 'company' ? 'Company Name' : 'Full Name'} handleChange={handleChange} errorMessage={errorMessage.name[0]} autoFocus />}
							{(currentAuthState === 'register' || currentAuthState === 'login' || currentAuthState === 'forgot-password') && <Input name='email' label='Email Address' handleChange={handleChange} errorMessage={errorMessage.email[0]} type='email' />}
							{(currentAuthState === 'register' || currentAuthState === 'login') && <Input name='password' label='Password' handleChange={handleChange} errorMessage={typeof errorMessage.password === 'string' ? errorMessage.password : errorMessage.password[0]} type={showPassword ? 'text' : 'password'} handleShowPassword={() => setShowPassword(!showPassword)} />}
							{currentAuthState === 'register' && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} errorMessage={errorMessage.confirmPassword[0]} type='password' />}
							{currentAuthState === 'reset-password' && (
								<>
									<Input name='newPassword' label='New Password' handleChange={handleChangeReset} type='password' />
									<Input name='confirmPassword' label='Repeat Password' handleChange={handleChangeReset} type='password' />
								</>
							)}
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							onClick={handleSubmitForgotPassword}>
							{currentAuthState === 'forgot-password' || currentAuthState === 'reset-password' ? 'Reset your password' : (currentAuthState === 'register' ? 'Sign Up' : 'Sign In')}
						</Button>
						<Grid container>
							<Grid item xs>
								{currentAuthState === 'forgot-password' ? <Button onClick={() => history.push(paths.LOGIN)}>Sign in</Button> : (
									<Button onClick={() => history.push(paths.FORGOT_PASSWORD)}>Forgot password?</Button>
								)}
							</Grid>
							<Grid item>
								<Button onClick={() => history.push(currentAuthState === 'register' ? paths.LOGIN : paths.REGISTER)}>
									{currentAuthState === 'register' ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
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

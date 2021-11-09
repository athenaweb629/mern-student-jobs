import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, Paper, Box, Grid, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

import Input from './Input';

interface TypeForm {
  firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const initialState: TypeForm = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

const Auth = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [isSignup, setIsSignup] = useState(!location.pathname.includes('login'));
	const [form, setForm] = useState(initialState);
	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
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
				<Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlined />
					</Avatar>
					<Typography component="h1" variant="h5">
						{isSignup ? 'Sign up' : 'Sign in'}
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '65%' }}>
						<Grid container spacing={2}>
							{isSignup && (
								<>
									<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
									<Input name="lastName" label="Last Name" handleChange={handleChange} half />
								</>
							)}
							<Input name="email" label="Email Address" handleChange={handleChange} type="email" />
							<Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
							{ isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
						</Grid>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							{ isSignup ? 'Sign Up' : 'Sign In' }
						</Button>
						<Grid container>
							<Grid item xs>
								<Button>Forgot password?</Button>
							</Grid>
							<Grid item>
								<Button onClick={() => {
									navigate(isSignup ? '/login' : '/register');
									setIsSignup((prevIsSignup) => !prevIsSignup);
								}}>
									{ isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
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

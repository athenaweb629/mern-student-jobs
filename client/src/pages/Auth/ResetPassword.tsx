import React, { useState, useEffect } from 'react';
import { Avatar, Button, CssBaseline, Paper, Box, Grid, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useHistory, useParams } from 'react-router-dom';

import { useResetPasswordMutation } from '../../app/services/auth';
import useAuth from '../../hooks/useAuth';

import Input from './Input';
import path from '../../constants/path';

export interface IErrorMessages { name: string[]; password: string[]; confirmPassword: string[]; email: string[] }

const ResetPassword = () => {
	const user = useAuth();
	const currentToken:any = useParams();
	const [resetPassword] = useResetPasswordMutation();
	const history = useHistory();
	const [newPassword, setNewPassword] = useState('');

	useEffect(() => {
		if (user) history.push(path.BASE);
	}, []);

	const handleChangeReset = (event: React.FormEvent<HTMLInputElement>) => {
		setNewPassword(event.currentTarget.value);
	};

	const handleResetPassword = () => {
		const props: any = { password: newPassword, token: currentToken.token };
		resetPassword(props);
		history.push('/login');
		// setIsForgotPassword((prevIsFrogotPassword: boolean) => !prevIsFrogotPassword);
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
						Reset your password
					</Typography>
					<Box
						component='form'
						noValidate
						sx={{ mt: 1, width: '65%' }}>
						<Grid container spacing={2}>
							<Input name='newPassword' label='New Password' handleChange={handleChangeReset} type='password' />
							<Input name='confirmPassword' label='Repeat Password' handleChange={handleChangeReset} type='password' />
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							onClick={handleResetPassword}>
							Reset your password
						</Button>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default ResetPassword;

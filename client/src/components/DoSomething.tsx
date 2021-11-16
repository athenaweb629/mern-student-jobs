import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

import { useProtectedMutation } from '../app/services/auth';

const DoSomething = () => {
	const [doSomething] = useProtectedMutation();
	const [message, setMessage] = useState('Loading...');

	const handleClick = async () => {
		const response = await doSomething().unwrap();

		console.log(response.message);
		setMessage(response.message);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<Button onClick={handleClick} type="button" sx={{ ml: 1 }}>Authorized Action</Button>
			<Typography variant="subtitle1" color="primary" sx={{ ml: 2 }}>{message}</Typography>
		</div>
	);
};

export default DoSomething;

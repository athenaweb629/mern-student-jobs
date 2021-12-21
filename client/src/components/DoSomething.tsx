import React from 'react';
import { Button } from '@mui/material';

import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useProtectedMutation } from '../app/services/auth';

// import { logout } from '../features/auth/authSlice';

const DoSomething = () => {
	// const [doSomething] = useProtectedMutation();
	// const [message, setMessage] = useState('Loading...');
	// const dispatch = useDispatch();
	const history = useHistory();

	// const handleClick = async () => {
	// 	try {
	// 		const response = await doSomething().unwrap();

	// 		setMessage(response.message);
	// 	} catch (error: any) {
	// 		if (error.data.name === 'TokenExpiredError') {
	// 			dispatch(logout());
	// 			history.push('/login');
	// 		}
	// 	}
	// };

	const initiateChat = () => {
		history.push('/chat?userOneName=adrianhajdin&userOneId=1234&userTwoName=Iolap&userTwoId=5678');
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			{/* <Button onClick={handleClick} type="button" sx={{ ml: 1 }}>Authorized Action</Button>
			<Typography variant="subtitle1" color="primary" sx={{ ml: 2 }}>{message}</Typography> */}

			 <Button onClick={initiateChat} type="button" sx={{ ml: 1 }}>Initiate Chat</Button>
		</div>
	);
};

export default DoSomething;

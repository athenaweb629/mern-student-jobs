import { Button } from '@mui/material';

import { useHistory } from 'react-router-dom';

const DoSomething = () => {
	const history = useHistory();

	const initiateChat = () => {
		history.push('/chat?userOneName=adrianhajdin&userOneId=1234&userTwoName=mandeep&userTwoId=09876');
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			 <Button onClick={initiateChat} type="button" sx={{ ml: 1 }}>Initiate Chat</Button>
		</div>
	);
};

export default DoSomething;

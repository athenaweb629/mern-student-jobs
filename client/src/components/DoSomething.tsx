import { Button } from '@mui/material';

import { useHistory } from 'react-router-dom';

const DoSomething = () => {
	const history = useHistory();

	const initiateChat = () => {
		history.push('/chat?userOneName=adrianhajdin&userOneId=1234&userTwoName=Iolap&userTwoId=5678');
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			 <Button onClick={initiateChat} type="button" sx={{ ml: 1 }}>Initiate Chat</Button>
		</div>
	);
};

export default DoSomething;

import { useState } from 'react';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import { Box } from '@mui/material';

const Chat = () => {
	const [username, setUsername] = useState('');

	function createDirectChat(credentials) {
		getOrCreateChat(
			credentials,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		);
	}

	const renderChatForm = (credentials) => (
		<div>
			<input
				placeholder='Username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<button type="button" onClick={() => createDirectChat(credentials)}>
				Create
			</button>
		</div>
	);

	// todo: rest api create user

	return (
		<ChatEngine
			height='87vh'
			userName='adrianhajdin'
			userSecret='123123'
			projectID='ccd21d32-1026-457e-be7d-c6bf3e84b5ca'
			renderNewChatForm={(credentials) => renderChatForm(credentials)}
		/>
	);
};

export default Chat;

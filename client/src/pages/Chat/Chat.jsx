import { useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

const projectId = 'ccd21d32-1026-457e-be7d-c6bf3e84b5ca';
const privateKey = '2204c45b-bcde-4bd1-bc65-f4ed65f53052';

const Chat = () => {
	const { search } = useLocation();
	let { userOneName, userOneId, userTwoName, userTwoId } = queryString.parse(search);

	console.log(userOneName, userOneId, userTwoName, userTwoId);

	if (!userOneName) {
		userOneName = 'adrianhajdin';
	}

	const getOrCreateChatUser = async (username) => {
		if (userOneName) {
			axios.put('https://api.chatengine.io/users/', {
				username,
				secret: '123123'
			}, {
				headers: {
					'PRIVATE-KEY': privateKey
				}
			});
		}
	};

	const getOrCreateChat = async () => {
		axios.put('https://api.chatengine.io/chats/', {
			usernames: [userOneName, userTwoName],
			title: 'Job Offer',
			is_direct_chat: true
		}, {
			headers: {
				'Project-ID': projectId,
				'User-Name': userOneName,
				'User-Secret': 123123,
			}
		});
	};

	useEffect(() => {
		getOrCreateChatUser(userOneName)
			.then((data) => {
				console.log(data);
			});

		getOrCreateChatUser(userTwoName)
			.then((data) => {
				console.log(data);
			});

		getOrCreateChat()
			.then((data) => {
				console.log(data);
			});
	}, []);

	// const getMyChats = async () => {
	// 	axios.post('https://api.chatengine.io/chats/', {
	// 		title: 'Surprise Party',
	// 		is_direct_chat: false
	// 	}, {
	// 		headers: {
	// 			'Project-ID': 'project_id',
	// 			'User-Name': 'user_name',
	// 			'User-Secret': 'user_secret',
	// 		}
	// 	});
	// };

	// maybe
	// POSTAdd Chat Member
	// https://api.chatengine.io/chats/{{chat_id}}/people/

	if (!userOneName) return null;

	return (
		<div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'ProximaNovaSemibold' }}>
			<ChatEngine
				height='80vh'
				userName={userOneName}
				userSecret='123123'
				projectID={projectId}
				renderNewChatForm={() => null}
				// renderNewChatForm={(credentials) => renderChatForm(credentials)}
			/>
		</div>
	);
};

export default Chat;

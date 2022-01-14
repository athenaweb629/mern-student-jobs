import { useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

import { Sidebar } from '../../components';
import useAuth from '../../hooks/useAuth';

const projectId = 'ccd21d32-1026-457e-be7d-c6bf3e84b5ca';
const privateKey = '2204c45b-bcde-4bd1-bc65-f4ed65f53052';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	background: '#FFFFFF',
	boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
	borderRadius: '20px',
}));

const Chat = () => {
	const { search } = useLocation();
	const { company } = queryString.parse(search);
	const { name } = useAuth();

	const getOrCreateChatUser = async (username) => {
		if (username) {
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
		if (company) {
			axios.put('https://api.chatengine.io/chats/', {
				usernames: [name, company],
				title: `${company} & {name}`,
				is_direct_chat: true
			}, {
				headers: {
					'Project-ID': projectId,
					'User-Name': name,
					'User-Secret': 123123,
				}
			});
		} else {
			axios.put('https://api.chatengine.io/chats/', {
				headers: {
					'Project-ID': projectId,
					'User-Name': name,
					'User-Secret': 123123,
				}
			});
		}
	};

	useEffect(() => {
		Promise.all([getOrCreateChatUser(name), getOrCreateChatUser(company)])
			.then(() => {
				console.log(`Users ${name} and ${company} have been created.`);

				getOrCreateChat()
					.then(() => {
						console.log('Chat has been created');
					});
			});
	}, []);

	if (!name) return null;

	return (
		<Box sx={{ flexGrow: 1, m: '30px' }}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={5} md={4} lg={3}>
					<Item><Sidebar /></Item>
				</Grid>
				<Grid item xs={12} sm={7} md={8} lg={9}>
					<div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'ProximaNovaSemibold' }}>
						<ChatEngine
							height='80vh'
							userName={name}
							userSecret='123123'
							projectID={projectId}
							renderNewChatForm={() => null}
							// renderNewChatForm={(credentials) => renderChatForm(credentials)}
						/>
					</div>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Chat;

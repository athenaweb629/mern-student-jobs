import React from 'react';
import { Typography, Button, CardActions, CardContent, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useHistory } from 'react-router-dom';

import { companyLogo } from '../assets/images';
import ReadOnly from './Editor/ReadOnly';

import useAuth from '../hooks/useAuth';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	background: '#FFFFFF',
	boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
	borderRadius: '20px',
}));

const JobOffer = ({ post }: any) => {
	const history = useHistory();
	const user = useAuth();

	const initiateChat = (author: any) => {
		history.push(`/chat?company=${author.name}`);
	};

	return (
		<>
			<Item sx={{ padding: '30px' }}>
				<Box display="flex">
					<Box display="flex" alignItems="center">
						<img src={companyLogo} width="50px" height="50px" />
					</Box>
					<Box display="flex" flexDirection="column">
						<Box display="flex" alignItems="center" justifyContent="flex-start">
							<Typography variant="h5" sx={{ color: 'text.primary', margin: '0 10px' }}>{post.title}</Typography>

							<Typography variant="subtitle1" sx={{ color: 'text.secondary', margin: '0 10px' }}>20 hours ago</Typography>
						</Box>
						<Box display="flex" alignItems="center" justifyContent="flex-start">
							<Typography sx={{ color: 'text.primary', margin: '0 10px' }}> at {post.author.name}</Typography>

							<Typography variant="subtitle1" sx={{ margin: '0 10px' }}>Company / IT</Typography>
						</Box>
					</Box>
				</Box>
				<CardContent sx={{ textAlign: 'start', padding: 0, margin: '10px 0' }}>
					<Box sx={{ maxHeight: '300px', overflowY: 'auto', }}>
						<ReadOnly description={post.description} />
					</Box>
				</CardContent>
				{post.author.name !== user?.name && (
					<CardActions>
						<Button sx={{ background: '#0058a2', textTransform: 'none', color: 'white', '&:hover': { color: '#0058a2' }, fontSize: '14px', padding: '2px 10px' }} onClick={() => initiateChat(post.author)}>
							Apply to this job
						</Button>
					</CardActions>
				)}
			</Item>
			<br />
		</>
	);
};

export default JobOffer;

import React from 'react';
import { Typography, Button, CardActions, CardContent, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useHistory } from 'react-router-dom';

import { companyLogo } from '../assets/images';
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
		history.push(`/chat?userOneName=${user?.email}&userTwoName=${author}`);
	};

	console.log(post);

	return (
		<>
			<Item sx={{ padding: '30px' }}>
				<Box display="flex">
					<Box display="flex" alignItems="center">
						<img src={companyLogo} width="50px" height="50px" />
					</Box>
					<Box display="flex" flexDirection="column">
						<Box display="flex" alignItems="center" justifyContent="center">
							<Typography variant="h6" sx={{ color: 'text.primary', margin: '0 10px' }}>{post.author}</Typography>
							<Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>20 hours ago</Typography>
						</Box>
						<Box display="flex" alignItems="center" justifyContent="flex-start">
							<Typography variant="subtitle1" sx={{ margin: '0 10px' }}>Company / IT</Typography>
						</Box>
					</Box>
				</Box>
				<CardContent sx={{ textAlign: 'start', padding: 0, margin: '10px 0' }}>
					<Typography gutterBottom variant="h5" sx={{ color: 'text.primary', }}>{post.title}</Typography>
					<Typography variant="body1" color="text.secondary">{post.description}</Typography>
				</CardContent>
				{/* <CardMedia component="img" height="400" image={images[i]} alt="green iguana" /> */}
				{user?.email !== post.author && (
					<CardActions>
						<Button size="small" color="primary" onClick={() => initiateChat(post.author)}>
							Apply (initiate chat between {user?.email} & {post.author})
						</Button>
					</CardActions>
				)}
			</Item>
			<br />
		</>
	);
};

export default JobOffer;
import { Typography, CircularProgress, Button, CardActions, CardContent, CardMedia, Box, Paper } from '@mui/material';

import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useGetPostsQuery } from '../app/services/auth';

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

const images = [
	'https://beapythondev.files.wordpress.com/2020/01/canva-software-developer-working.jpg?w=800',
	'https://res.cloudinary.com/springboard-images/image/upload/w_1080,c_limit,q_auto,f_auto,fl_lossy/wordpress/2020/03/software-developer-job-1230x503.png',
	'https://insights.dice.com/wp-content/uploads/2018/03/cropped-shutterstock_699634498.jpg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKqO7_lnax6tYCZEEmC21XhZqiCdMy-EPSi_2cmE_DlHyXQgP7MFiNgklzaww2uV7zkA&usqp=CAU',
	'https://thumbs.dreamstime.com/b/female-developer-programmer-working-coding-program-software-computer-writing-website-development-database-technology-199665893.jpg'
];

const Main = () => {
	const { data: posts, isLoading } = useGetPostsQuery();
	const history = useHistory();
	const user = useAuth();
	if (isLoading) return <CircularProgress />;

	const initiateChat = (author: any) => {
		history.push(`/chat?userOneName=${user?.name}&userOneId=${user?.token}&userTwoName=${author}&userTwoId=78947393789`);
	};
	console.log(user);
	return (
		<>
			{posts?.map((post: any, i: number) => (
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
						<CardMedia component="img" height="400" image={images[i]} alt="green iguana" />
						{
							user?.email !== post.author && (
								<CardActions>
									<Button size="small" color="primary" onClick={() => initiateChat(post.author)}>
										Apply
									</Button>
								</CardActions>
							)
						}

					</Item>
					<br />
				</>
			))}
		</>
	);
};

export default Main;

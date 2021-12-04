import { Typography, CircularProgress } from '@mui/material';
import { useGetPostsQuery } from '../app/services/auth';

const Main = () => {
	const { data: posts, isLoading } = useGetPostsQuery();

	if (isLoading) return <CircularProgress />;

	return (
		<div>
			{posts?.map((post: any) => (
				<div style={{ border: '1px solid black' }}>
					<Typography variant="h6">{post.title}</Typography>
					<Typography variant="body2">{post.description}</Typography>
					<Typography variant="body2">{post.level}</Typography>
					<Typography variant="body2">{post.availability}</Typography>
					<Typography variant="body2">{post.author}</Typography>
				</div>
			))}
		</div>
	);
};

export default Main;

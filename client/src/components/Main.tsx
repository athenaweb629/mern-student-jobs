import { CircularProgress, } from '@mui/material';

import { useGetPostsQuery } from '../app/services/auth';
import JobOffer from './JobOffer';

const Main = () => {
	const { data: posts, isLoading } = useGetPostsQuery();

	if (isLoading) return <CircularProgress />;

	return (
		<>
			{posts?.map((post: any, i: number) => (
				<JobOffer post={post} key={i} />
			))}
		</>
	);
};

export default Main;

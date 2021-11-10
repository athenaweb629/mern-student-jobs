import { Grid, Stack, Box, Button } from '@mui/material';
import { useProtectedMutation } from '../../app/services/auth';

const ProtectedComponent = () => {
	const [attemptAccess, { data, error, isLoading }] = useProtectedMutation();

	return (
		<Grid>
			<Stack>
				<Box>
					<Button onClick={() => attemptAccess()}>
						Make an authenticated request
					</Button>
				</Box>
				<Box>
					{data ? (
						<>
							Data:
							<pre>{JSON.stringify(data, null, 2)}</pre>
						</>
					) : error ? (
						<>
							Error: <pre>{JSON.stringify(error, null, 2)}</pre>
						</>
					) : null}
				</Box>
			</Stack>
		</Grid>
	);
};

export default ProtectedComponent;

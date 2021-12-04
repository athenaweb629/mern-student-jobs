import { Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Sidebar, Main as MainView, CreatePost } from '../../components';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	background: '#FFFFFF',
	boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
	borderRadius: '20px',
}));

const Main = () => (
	<Box sx={{ flexGrow: 1, m: '30px' }}>
		<Grid container spacing={3}>
			<Grid item xs={12} sm={5} md={4} lg={3}>
				<Item><Sidebar /></Item>
			</Grid>
			<Grid item xs={12} sm={7} md={8} lg={9}>
				<Item><CreatePost /></Item>
				<br />
				<Item><MainView /></Item>
			</Grid>
		</Grid>
	</Box>
);

export default Main;

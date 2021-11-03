import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Navbar, Sidebar, Main } from './components';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  background: '#FFFFFF',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
  borderRadius: '20px',
}));

const App = () => (
  <>
    <Navbar />
    <Box sx={{ flexGrow: 1, m: '30px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={2}>
          <Item><Sidebar /></Item>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Item><Main /></Item>
        </Grid>
      </Grid>
    </Box>
  </>
);

export default App;

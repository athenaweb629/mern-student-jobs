import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './App';
import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: 'ProximaNovaSemibold',
  },
  palette: {
    text: {
      primary: '#1b1d1f',
    },
    primary: {
      main: '#0058a2',
    },
    secondary: {
      main: '#e1bb00',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);

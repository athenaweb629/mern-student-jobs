import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import { Auth } from './pages';
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
    test
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
);

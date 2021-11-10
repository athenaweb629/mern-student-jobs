import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './app/store';
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
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />} />
					<Route path='/login' element={<Auth />} />
					<Route path='/register' element={<Auth />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</ThemeProvider>,
	document.getElementById('root')
);

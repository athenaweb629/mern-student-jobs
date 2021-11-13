import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './App';
import { Auth } from './pages';
import './index.css';
import PrivateRoute from './utils/PrivateRoute';

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
				<Switch>
					<PrivateRoute exact path='/' component={App} />
					<Route exact path='/login' component={Auth} />
					<Route exact path='/register' component={Auth} />
				</Switch>
			</BrowserRouter>
		</Provider>
	</ThemeProvider>,
	document.getElementById('root')
);

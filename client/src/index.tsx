import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import path from './constants/path';
import PrivateRoute from './utils/PrivateRoute';
import { store } from './app/store';
import { Auth } from './pages';
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
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<PrivateRoute exact path={path.BASE} component={App} />
					<Route exact path={path.LOGIN} component={Auth} />
					<Route exact path={path.REGISTER} component={Auth} />
				</Switch>
			</BrowserRouter>
		</Provider>
	</ThemeProvider>,
	document.getElementById('root')
);

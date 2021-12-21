import { useLocation, Switch, Route } from 'react-router-dom';
import { Main, Auth, Chat } from './pages';

import path from './constants/path';
import PrivateRoute from './utils/PrivateRoute';
import { store } from './app/store';

import { Navbar } from './components';

const App = () => {
	const location = useLocation();
	console.log(location.pathname);

	return (
		<div>
			{(location.pathname !== path.LOGIN && location.pathname !== path.REGISTER && location.pathname !== path.FORGOT_PASSWORD) && <Navbar />}

			<Switch>
				<PrivateRoute exact path={path.BASE} component={Main} />
				<Route exact path={path.LOGIN} component={Auth} />
				<Route exact path={path.REGISTER} component={Auth} />
				<PrivateRoute exact path={path.CHAT} component={Chat} />
			</Switch>
		</div>
	);
};

export default App;

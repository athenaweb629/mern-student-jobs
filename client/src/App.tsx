import { useLocation, Switch, Route } from 'react-router-dom';

import { Main, Auth, Chat } from './pages';
import PrivateRoute from './utils/PrivateRoute';
import paths from './constants/paths';
import { Navbar } from './components';

const App = () => {
	const location = useLocation();

	return (
		<div>
			{(location.pathname !== paths.LOGIN && location.pathname !== paths.REGISTER && location.pathname !== paths.FORGOT_PASSWORD && !location.pathname.startsWith(paths.RESET_PASSWORD.slice(0, 14))) && <Navbar />}

			<Switch>
				<Route exact path={paths.LOGIN} component={Auth} />
				<Route exact path={paths.RESET_PASSWORD} component={Auth} />
				<Route exact path={paths.REGISTER} component={Auth} />
				<Route exact path={paths.FORGOT_PASSWORD} component={Auth} />
				<PrivateRoute exact path={paths.BASE} component={Main} />
				<PrivateRoute exact path={paths.CHAT} component={Chat} />
			</Switch>
		</div>
	);
};

export default App;

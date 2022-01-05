import { Redirect, Route, RouteProps } from 'react-router-dom';

import paths from '../constants/paths';
import useAuth from '../hooks/useAuth';

const PrivateRoute = (props: RouteProps) => {
	const user = useAuth();

	if (user) return <Route {...props} />;

	return <Redirect to={paths.LOGIN} />;
};

export default PrivateRoute;

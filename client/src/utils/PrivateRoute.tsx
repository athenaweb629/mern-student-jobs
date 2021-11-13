import { Redirect, Route, RouteProps } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const PrivateRoute = (props: RouteProps) => {
	const { user } = useAuth();

	if (user) return <Route {...props} />;

	return <Redirect to='/login' />;
};

export default PrivateRoute;

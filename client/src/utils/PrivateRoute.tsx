import { Redirect, Route, RouteProps } from 'react-router-dom';
import useAuth from '../hooks/userAuth';

const PrivateRoute = ({ ...routeProps }: RouteProps) => {
	const { user } = useAuth();
	if (user) return <Route {...routeProps} />;

	return <Redirect to='/login' />;
};

export default PrivateRoute;

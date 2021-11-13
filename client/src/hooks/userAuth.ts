import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, setCredentials } from '../features/auth/authSlice';

const useAuth = () => {
	const dispatch = useDispatch();
	const userFromState = useSelector(selectCurrentUser);
	if (!userFromState) {
		const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '');
		dispatch(setCredentials(user));
		return useMemo(() => ({ user }), [user]);
	}
	return useMemo(() => ({ user: userFromState }), [userFromState]);
};

export default useAuth;

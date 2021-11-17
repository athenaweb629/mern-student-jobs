import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../features/auth/authSlice';

const useAuth = () => {
	const user = useSelector(selectCurrentUser);

	return useMemo(() => user, [user]);
};

export default useAuth;

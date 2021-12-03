import jwt from 'jsonwebtoken';

export const isAuthTokenExpired = (user) => {
	jwt.verify(user?.token, process.env.SECRET, (err) => {
		if (err) return true;

		return false;
	});

	return true;
};

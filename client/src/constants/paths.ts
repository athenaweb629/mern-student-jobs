export default {
	BASE: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	CHAT: '/chat',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password/:token',
	CONFIRM_ACCOUNT: '/confirm-account/:token',

	api: {
		LOGIN: '/user/login',
		REGISTER: '/user/register',
		CONFIRM_ACCOUNT: '/user/confirm-account',
		AUTHORIZED_ACTION: '/user/authorizedAction',
		RESEND_EMAIL: '/user/resend-email',
		RESET_PASSWORD: '/user/reset-password',
		FORGOT_PASSWORD: '/user/forgot-password',
		POSTS: '/posts',
	},

	build: (path:string, ...params:Array<any>):string => {
		params.reverse();

		return path.replace(/(:\w+)/g, () => params.pop());
	},
};

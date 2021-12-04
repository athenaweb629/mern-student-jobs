export default {
	BASE: '/',
	LOGIN: '/login',
	REGISTER: '/register',

	api: {
		LOGIN: '/user/login',
		REGISTER: '/user/register',
		CONFIRM_ACCOUNT: '/user/confirmAccount/:token',
		AUTHORIZED_ACTION: '/user/authorizedAction',
		RESEND_EMAIL: '/user/resendEmail',
		POSTS: '/posts',
	},

	build: (path:string, ...params:Array<any>):string => {
		params.reverse();

		return path.replace(/(:\w+)/g, () => params.pop());
	},
};

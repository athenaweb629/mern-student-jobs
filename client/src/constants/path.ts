export default {

	BASE: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	FORGOT_PASSWORD: '/forgot-password',

	api: {
		LOGIN: '/user/login',
		REGISTER: '/user/register',
		CONFIRM_ACCOUNT: '/user/confirmAccount/:token',
		RESEND_EMAIL: '/user/resendEmail',
		RESET_PASSWORD: '/user/reset-password/:token',
	},

	build: (path:string, ...params:Array<any>):string => {
		params.reverse();
		return path.replace(/(:\w+)/g, () => params.pop());
	},
};

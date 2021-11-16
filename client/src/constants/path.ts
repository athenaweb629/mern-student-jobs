export default {

	BASE: '/',
	LOGIN: '/login',
	REGISTER: '/register',

	api: {
		LOGIN: '/user/login',
		REGISTER: '/user/register',
		CONFIRM_ACCOUNT: '/user/confirmAccount/:token',
		RESEND_EMAIL: '/user/resendEmail',
	},

	build: (path:string, ...params:Array<any>):string => {
		params.reverse();
		return path.replace(/(:\w+)/g, () => params.pop());
	},
};

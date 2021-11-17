interface IRegex { [key: string]: any }

const regExp :IRegex = { email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
	password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
	name: /^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/
};

const isValid = (value:string, name:string):boolean => {
	if (value.match(regExp[name])) {
		return true;
	}
	return false;
};

export default isValid;

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 13,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		indent: [2, 'tab', { SwitchCase: 1, VariableDeclarator: 1 }],
		'import/no-unresolved': 0,
		'import/extensions': 0,
		'linebreak-style': 0,
		'no-console': 0,
		'consistent-return': 0,
		'object-curly-newline': 0,
		'comma-dangle': 0,
		'no-tabs': 0,
	},
};

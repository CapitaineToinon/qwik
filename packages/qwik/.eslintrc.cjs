module.exports = {
	extends: ['../../.eslintrc.cjs', 'plugin:qwik/recommended'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
		ecmaVersion: 2021,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
}

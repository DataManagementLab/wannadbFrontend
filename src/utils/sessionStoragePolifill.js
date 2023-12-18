const localStoragePolyfill = (() => {
	let store = {};

	return {
		getItem: (key) => store[key] || null,
		setItem: (key, value) => {
			store[key] = value.toString();
		},
		removeItem: (key) => {
			delete store[key];
		},
		clear: () => {
			store = {};
		},
	};
})();

// eslint-disable-next-line no-undef
global.sessionStorage = localStoragePolyfill;

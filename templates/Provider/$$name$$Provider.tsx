import React, { ReactNode } from 'react';

const $$name$$Context = React.createContext({
	test: () => {},
});

export function useTest() {
	const context = React.useContext($$name$$Context);
	if (!context) {
		throw new Error('useTest must be used within a $$name$$Provider');
	}
	return context.test;
}

interface Props {
	children: ReactNode;
}

export function $$name$$Provider({ children }: Props) {
	const test = () => {
		console.log('test');
	};

	return (
		<$$name$$Context.Provider
			value={{
				test: test,
			}}
		>
			{children}
		</$$name$$Context.Provider>
	);
}

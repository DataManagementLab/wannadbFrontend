/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, ReactNode } from 'react';
import '../index.scss';
import { useGetFromLS, useStoreInLS } from './StorageProvider';

const UserContext = React.createContext({
	isLoggedIn: false,
	getUsername: (): string => {
		return '';
	},
	logOut: (): void => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	login: (_username: string): void => {},
});

/**
 * Hook to get the logged in status of the user
 * @returns {boolean} the logged in status of the user
 */
export function useLoggedIn() {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error('useLoggedIn must be used within a PlayingProvider');
	}
	return context.isLoggedIn;
}

/**
 * React hook to get the username of the logged in user
 * @returns {function} a function to get the username of the logged in user
 */
export function useGetUsername() {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error('useGetUsername must be used within a PlayingProvider');
	}
	return context.getUsername;
}

/**
 * Hook to get the logout function
 * @returns {function} the logout function
 */
export function useLogOut() {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error('useLogOut must be used within a PlayingProvider');
	}
	return context.logOut;
}

/**
 * Hook to get the login function
 * @returns {function} the login function
 */
export function useLogin() {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error('useLogin must be used within a PlayingProvider');
	}
	return context.login;
}

interface Props {
	children: ReactNode;
}

/**
 * The provider for the user context
 * @param children - the children of the component
 */
export function UserProvider({ children }: Props) {
	const [username, setUsername] = React.useState('');
	const [loggedIn, setLoggedIn] = React.useState(false);

	const storeInLS = useStoreInLS();
	const getFromLS = useGetFromLS();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		const name = getFromLS('wannadbuser');
		if (name && name !== '') {
			setUsername(name);
			setLoggedIn(true);
		}
	});

	const login = (username: string) => {
		setUsername(username);
		setLoggedIn(true);
		storeInLS('wannadbuser', username);
	};

	const logOut = () => {
		setLoggedIn(false);
		setUsername('');
		storeInLS('wannadbuser', '');
	};

	const getUsername = (): string => {
		return username;
	};

	return (
		<UserContext.Provider
			value={{
				isLoggedIn: loggedIn,
				getUsername: getUsername,
				logOut: logOut,
				login: login,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

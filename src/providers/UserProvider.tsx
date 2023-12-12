/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode } from 'react';
import '../index.scss';

const UserContext = React.createContext({
	isLoggedIn: (): boolean => {
		return false;
	},
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
	const login = (username: string) => {
		sessionStorage.setItem('wannadbuser', username);
	};

	const logOut = () => {
		sessionStorage.removeItem('wannadbuser');
		sessionStorage.removeItem('user-token');
	};

	const getUsername = (): string => {
		return sessionStorage.getItem('wannadbuser') || '';
	};

	const isLoggedIn = (): boolean => {
		return sessionStorage.getItem('user-token') !== null;
	};

	return (
		<UserContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				getUsername: getUsername,
				logOut: logOut,
				login: login,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

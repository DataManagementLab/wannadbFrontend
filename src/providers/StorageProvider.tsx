/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, useEffect } from 'react';
import '../index.scss';

const StorageContext = React.createContext({
	cookieAllowed: false,
	acceptCookies: () => {},
	rejectCookies: () => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	storeInLS: (_name: string, _value: string) => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	getFromLS: (_name: string): any => {},
});

/**
 * Hook to get whether cookies are allowed
 * @returns A boolean indicating whether cookies are allowed
 */
export function useCookieAllowed() {
	const context = React.useContext(StorageContext);
	if (!context) {
		throw new Error(
			'useCookieAllowed must be used within a PlayingProvider'
		);
	}
	return context.cookieAllowed;
}

/**
 * Hook to accept cookies
 * @returns A function to accept cookies
 */
export function useAcceptCookie() {
	const context = React.useContext(StorageContext);
	if (!context) {
		throw new Error(
			'useAcceptCookie must be used within a PlayingProvider'
		);
	}
	return context.acceptCookies;
}

/**
 * Hook to reject cookies
 * @returns A function to reject cookies
 */
export function useRejectCookies() {
	const context = React.useContext(StorageContext);
	if (!context) {
		throw new Error(
			'useRejectCookies must be used within a PlayingProvider'
		);
	}
	return context.rejectCookies;
}

/**
 * Hook to store data in local storage
 * @returns A function to store data in local storage
 */
export function useStoreInLS() {
	const context = React.useContext(StorageContext);
	if (!context) {
		throw new Error('useStoreInLS must be used within a PlayingProvider');
	}
	return context.storeInLS;
}

/**
 * Hook to get data from local storage
 * @returns A function to get data from local storage
 */
export function useGetFromLS() {
	const context = React.useContext(StorageContext);
	if (!context) {
		throw new Error('useGetFromLS must be used within a PlayingProvider');
	}
	return context.getFromLS;
}

interface Props {
	children: ReactNode;
}

/**
 * The storage provider component
 * @param children The children of the component
 */
export function StorageProvider({ children }: Props) {
	const [cookieAllowed, setCookieAllowed] = React.useState(false);
	const [display, setDisplay] = React.useState(true);

	useEffect(() => {
		if (localStorage.getItem('cookie-allowed') === 'true') {
			setCookieAllowed(true);
			setDisplay(false);
		}
	}, []);

	const acceptCookies = () => {
		setCookieAllowed(true);
		setDisplay(false);
		localStorage.setItem('cookie-allowed', 'true');
	};

	const rejectCookies = () => {
		setCookieAllowed(false);
		setDisplay(false);
		localStorage.clear();
	};

	const storeInLS = (name: string, value: string) => {
		if (!cookieAllowed) {
			return;
		}
		localStorage.setItem(name, value);
	};

	const getFromLS = (name: string): string | null => {
		return localStorage.getItem(name);
	};

	return (
		<>
			<StorageContext.Provider
				value={{
					cookieAllowed,
					acceptCookies,
					rejectCookies,
					storeInLS,
					getFromLS,
				}}
			>
				{children}
			</StorageContext.Provider>
			{display && (
				<>
					<div className="bg"></div>
					<div className="container settingsBox">
						<div className="display">
							<div className="displayText">Cookies</div>
						</div>
						<p className="description">
							This website uses cookies to enhance the user
							experience.
						</p>
						<div className="btnBox">
							<button onClick={rejectCookies}>Reject</button>
							<button onClick={acceptCookies}>Accept</button>
						</div>
					</div>
					<style>{`
                        .bg {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba(0, 0, 0, 0.5);
                            z-index: 100;
                        }
                        .container {
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background-color: var(--bg-color);
                            padding: 20px;
                            border-radius: 10px;
                            z-index: 101;
                        }
                        .settingsBox {
                            width: 450px;
                        }
                        .display {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 20px;
                        }
                        .displayText {
                            width: 100%;
                            text-align: center;
                            color: var(--text-color);
                            font-size: 1.5rem;
                        }
                        .description{
                            width: 100%;
                            text-align: center;
                        }
                        .btnBox {
                            display: flex;
                            justify-content: center;
                        }
                        button {
                            background-color: var(--bg-color);
                            color: var(--text-color);
                            border: 2px solid var(--text-color);
                            padding: 10px;
                            border-radius: 5px;
                            cursor: pointer;
                            margin-right: 10px;
                        }
                        button:hover {
                            background-color: var(--text-color);
                            color: var(--bg-color);
                        }
                    `}</style>
				</>
			)}
		</>
	);
}

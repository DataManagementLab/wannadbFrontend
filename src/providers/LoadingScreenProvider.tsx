/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';

const LoadingScreenContext = React.createContext({
	setLoadingScreen: (
		_loading: boolean,
		_heading = 'Loading...',
		_info = 'Please wait',
		_id = '',
		_force = false
	) => {},
	setLoadingScreenLock: (_lock: boolean) => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useSetLoadingScreen() {
	const context = React.useContext(LoadingScreenContext);
	if (!context) {
		throw new Error(
			'useSetLoadingScreen must be used within a LoadingScreenProvider'
		);
	}
	return context.setLoadingScreen;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSetLoadingScreenLock() {
	const context = React.useContext(LoadingScreenContext);
	if (!context) {
		throw new Error(
			'useSetLoadingScreenLock must be used within a LoadingScreenProvider'
		);
	}
	return context.setLoadingScreenLock;
}

interface Props {
	children: ReactNode;
}

/**
 * A provider to show a loading screen
 */
export function LoadingScreenProvider({ children }: Props) {
	const [loading, setLoading] = React.useState(false);
	const [lock, setLock] = React.useState(false);
	const [heading, setHeading] = React.useState('');
	const [info, setInfo] = React.useState('');
	const [id, setId] = React.useState('');

	const setLoadingScreen = (
		loading: boolean,
		heading = 'Loading...',
		info = 'Please wait',
		id = '',
		force = false
	) => {
		if (lock && !force) return;
		setLoading(loading);
		setHeading(heading);
		setInfo(info);
		setId(id);
	};

	const setLoadingScreenLock = (lock: boolean) => {
		setLock(lock);
	};

	return (
		<LoadingScreenContext.Provider
			value={{
				setLoadingScreen: setLoadingScreen,
				setLoadingScreenLock: setLoadingScreenLock,
			}}
		>
			{loading && <LoadingScreen heading={heading} info={info} id={id} />}
			{children}
		</LoadingScreenContext.Provider>
	);
}

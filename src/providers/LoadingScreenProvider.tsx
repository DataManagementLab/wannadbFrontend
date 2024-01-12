/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';

const LoadingScreenContext = React.createContext({
	setLoadingScreen: (
		_loading: boolean,
		_heading = 'Loading...',
		_info = 'Please wait'
	) => {},
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

interface Props {
	children: ReactNode;
}

/**
 * A provider to show a loading screen
 */
export function LoadingScreenProvider({ children }: Props) {
	const [loading, setLoading] = React.useState(false);
	const [heading, setHeading] = React.useState('');
	const [info, setInfo] = React.useState('');

	const setLoadingScreen = (
		loading: boolean,
		heading = 'Loading...',
		info = 'Please wait'
	) => {
		setLoading(loading);
		setHeading(heading);
		setInfo(info);
	};

	return (
		<LoadingScreenContext.Provider
			value={{
				setLoadingScreen: setLoadingScreen,
			}}
		>
			{loading && <LoadingScreen heading={heading} info={info} />}
			{children}
		</LoadingScreenContext.Provider>
	);
}

/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, useEffect } from 'react';
import '../index.scss';
import { useGetFromLS, useStoreInLS } from './StorageProvider';

const ThemeContext = React.createContext({
	isDarkTheme: true,
	toggleTheme: () => {},
});

/**
 * Hook to get the dark theme status
 * @returns {boolean} the dark theme status
 */
export function useIsDarkTheme() {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error('useIsDarkTheme must be used within a PlayingProvider');
	}
	return context.isDarkTheme;
}

/**
 * Hook to get the toggle theme function
 * @returns {function} a function to toggle the theme
 */
export function useToggleTheme() {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error('useToggleTheme must be used within a PlayingProvider');
	}
	return context.toggleTheme;
}

interface Props {
	children: ReactNode;
}

/**
 * The provider for the theme
 * @param children The children of the component
 */
export function ThemeProvider({ children }: Props) {
	const [isDarkTheme, setDarkThemeState] = React.useState(false);

	const storeInLS = useStoreInLS();
	const getFromLS = useGetFromLS();

	const setDarkTheme = (value: boolean) => {
		setDarkThemeState(value);
		storeInLS('dark-theme', value.toString());
		if (value) {
			document.documentElement.setAttribute('data-theme', 'dark');
			return;
		}
		document.documentElement.setAttribute('data-theme', 'light');
	};

	useEffect(() => {
		const darkTheme = getFromLS('dark-theme');
		if (darkTheme) {
			setDarkTheme(darkTheme === 'true');
		} else {
			// get user's system theme
			const systemTheme = window.matchMedia(
				'(prefers-color-scheme: dark)'
			);
			setDarkTheme(systemTheme.matches);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleTheme = () => {
		setDarkTheme(!isDarkTheme);
	};

	return (
		<ThemeContext.Provider
			value={{
				isDarkTheme: isDarkTheme,
				toggleTheme: toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

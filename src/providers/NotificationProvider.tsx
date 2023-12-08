/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode } from 'react';
import '../index.scss';
import UserNotification from '../components/UserNotification/UserNotification';

const NotificationContext = React.createContext({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	show: (_heading: string, _info: string) => {},
});

/**
 * Hook to get the showNotification function
 * @returns A function to show a notification to the user
 */
export function useShowNotification() {
	const context = React.useContext(NotificationContext);
	if (!context) {
		throw new Error(
			'useShowNotification must be used within a NotificationProvider'
		);
	}
	return context.show;
}

interface Props {
	children: ReactNode;
}

/**
 * The notification provider
 * @param children The children of the component
 */
export function NotificationProvider({ children }: Props) {
	const [visible, setVisible] = React.useState(false);
	const [heading, setHeading] = React.useState('');
	const [info, setInfo] = React.useState('');

	// Display the notification
	const show = (pHeading: string, pInfo: string) => {
		setHeading(pHeading);
		setInfo(pInfo);
		setVisible(true);
	};

	// Close the notification
	const close = () => {
		setVisible(false);
		setHeading('');
		setInfo('');
	};

	return (
		<>
			<NotificationContext.Provider
				value={{
					show: show,
				}}
			>
				{children}
			</NotificationContext.Provider>
			{visible && (
				<UserNotification
					onClose={close}
					heading={heading}
					info={info}
				></UserNotification>
			)}
		</>
	);
}

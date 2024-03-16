/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, useState } from 'react';
import '../index.scss';
import UserNotification from '../components/UserNotification/UserNotification';
import ChoiceNotification from '../components/ChoiceNotification/ChoiceNotification';
import { MyAudio, usePlayAudio } from './AudioProvider';

const NotificationContext = React.createContext({
	showNotification: (
		_heading: string,
		_info: string,
		_buttonText?: string
	) => {},
	showChoice: (
		_heading: string,
		_info: string,
		_onAccept: () => void,
		_onReject: () => void,
		_acceptText?: string,
		_rejectText?: string
	) => {},
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
	return context.showNotification;
}

/**
 * Hook to get the showChoice function
 * @returns A function to show a choice notification to the user
 */
export function useShowChoiceNotification() {
	const context = React.useContext(NotificationContext);
	if (!context) {
		throw new Error(
			'useShowChoiceNotification must be used within a NotificationProvider'
		);
	}
	return context.showChoice;
}

interface Props {
	children: ReactNode;
}

/**
 * The notification provider
 * @param children The children of the component
 */
export function NotificationProvider({ children }: Props) {
	const [element, setElement] = useState<JSX.Element>();

	const [visible, setVisible] = useState(false);
	const playSound = usePlayAudio();

	// Display the notification
	const showNotification = (
		pHeading: string,
		pInfo: string,
		btnText = 'Close'
	) => {
		setElement(
			<UserNotification
				onClose={close}
				heading={pHeading}
				info={pInfo}
				btnText={btnText}
			></UserNotification>
		);
		setVisible(true);
		playSound(MyAudio.POP);
	};

	// Display a choice dialog
	const showChoice = (
		pHeading: string,
		pInfo: string,
		pOnAccept: () => void,
		pOnReject: () => void,
		pAcceptText = 'Yes',
		pRejectText = 'No'
	) => {
		setElement(
			<ChoiceNotification
				heading={pHeading}
				info={pInfo}
				onAccept={() => {
					pOnAccept();
					close();
				}}
				onReject={() => {
					pOnReject();
					close();
				}}
				acceptText={pAcceptText}
				rejectText={pRejectText}
			></ChoiceNotification>
		);
		setVisible(true);
		playSound(MyAudio.POP);
	};

	// Close the notification
	const close = () => {
		setVisible(false);
	};

	return (
		<>
			<NotificationContext.Provider
				value={{
					showNotification: showNotification,
					showChoice: showChoice,
				}}
			>
				{children}
			</NotificationContext.Provider>
			<>{visible && element}</>
		</>
	);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react';
import DocbaseViewer from '../components/DocbaseViewer/DocbaseViewer';
import DocBase from '../types/DocBase';
import { useSetLoadingScreen } from './LoadingScreenProvider';
import APIService from '../utils/ApiService';
import { useShowNotification } from './NotificationProvider';

const DocBaseTaskContext = React.createContext({
	isDocbaseTaskRunning: (): boolean => {
		return false;
	},
	startDocbaseTask: (
		_taskId: string,
		_basename: string,
		_attList: string[]
	) => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export function useIsDocbaseTaskRunning() {
	const context = React.useContext(DocBaseTaskContext);
	if (!context) {
		throw new Error(
			'useIsDocbaseTaskRunning must be used within a DocBaseTaskProvider'
		);
	}
	return context.isDocbaseTaskRunning;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStartDocbaseTask() {
	const context = React.useContext(DocBaseTaskContext);
	if (!context) {
		throw new Error(
			'useStartDocbaseTask must be used within a DocBaseTaskProvider'
		);
	}
	return context.startDocbaseTask;
}

interface Props {
	children: ReactNode;
}

/**
 * A provider to run docbase tasks
 */
export function DocBaseTaskProvider({ children }: Props) {
	const setLoadingScreen = useSetLoadingScreen();
	const showNotification = useShowNotification();

	const [isRunning, setIsRunning] = React.useState(false);
	const [docBase, setDocBase] = React.useState<DocBase | undefined>(
		undefined
	);

	const startDocbaseTask = (
		taskId: string,
		basename: string,
		attList: string[]
	) => {
		sessionStorage.setItem('docbaseId', taskId);
		setLoadingScreen(
			true,
			'Creating Docbase ' + basename + '...',
			'Please wait...',
			taskId
		);
		setIsRunning(true);

		const updateInterval = setInterval(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			APIService.getTaskStatus(taskId).then((res): any => {
				console.log(res);
				if (res == undefined || res.state === 'FAILURE') {
					setLoadingScreen(false);
					showNotification(
						'Error',
						'Failed to create Docbase ' + basename
					);
					sessionStorage.removeItem('docbaseId');
					setDocBase(undefined);
					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				}

				if (res.state === 'SUCCESS') {
					setLoadingScreen(false);
					const docBase = new DocBase(basename, attList);
					for (const nugget of res.meta.document_base_to_ui.msg
						.nuggets) {
						console.log(nugget);
						try {
							docBase.addNugget(
								nugget.document.name,
								nugget.document.text,
								nugget.start_char,
								nugget.end_char
							);
						} catch (error) {
							showNotification(
								'Error',
								'Something went wrong translating the nuggets.'
							);
						}
					}
					sessionStorage.removeItem('docbaseId');
					setDocBase(docBase);
					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				}

				// set info msg
				/* let info = res.meta.message + ' (' + res.state + ')...';
				if (res.meta.message === '' || res.meta.message === 1) {
					info = res.state + '...';
				} */

				let info = res.state;

				if (res.meta.status !== undefined) {
					info = res.meta.status;
				}

				info += info.endsWith('...') ? '' : '...';

				// update loading screen
				setLoadingScreen(
					true,
					'Creating Docbase ' + basename + '...',
					info,
					taskId
				);
			});
		}, 1000);
	};

	const isDocbaseTaskRunning = () => {
		return isRunning;
	};

	const onClose = () => {
		setDocBase(undefined);
	};

	return (
		<DocBaseTaskContext.Provider
			value={{
				isDocbaseTaskRunning: isDocbaseTaskRunning,
				startDocbaseTask: startDocbaseTask,
			}}
		>
			{docBase && <DocbaseViewer docBase={docBase} onClose={onClose} />}
			{children}
		</DocBaseTaskContext.Provider>
	);
}

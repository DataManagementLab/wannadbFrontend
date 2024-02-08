/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useEffect } from 'react';
import DocbaseViewer from '../components/DocbaseViewer/DocbaseViewer';
import DocBase from '../types/DocBase';
import {
	useSetLoadingScreen,
	useSetLoadingScreenLock,
} from './LoadingScreenProvider';
import APIService from '../utils/ApiService';
import { useShowNotification } from './NotificationProvider';
import Logger from '../utils/Logger';
import { MyAudio, usePlayAudio } from './AudioProvider';
import InteractiveDocBaseViewer from '../components/InteractiveDocBaseViewer/InteractiveDocBaseViewer';

const DocBaseTaskContext = React.createContext({
	isDocbaseTaskRunning: (): boolean => {
		return false;
	},
	createDocbaseTask: (
		_organizationId: number,
		_baseName: string,
		_documentIDs: number[],
		_attributes: string[]
	) => {},
	updateDocbaseAttributesTask: (
		_organizationId: number,
		_baseName: string,
		_attributes: string[]
	) => {},
	loadDocbaseTask: (_organizationId: number, _baseName: string) => {},
	startInteractiveTablePopulation: (
		_organizationId: number,
		_baseName: string
	) => {},
	getOrderedNuggets: (
		_organizationId: number,
		_baseName: string,
		_documentName: string,
		_documentContent: string
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
export function useCreateDocbaseTask() {
	const context = React.useContext(DocBaseTaskContext);
	if (!context) {
		throw new Error(
			'useCreateDocbaseTask must be used within a DocBaseTaskProvider'
		);
	}
	return context.createDocbaseTask;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUpdateDocbaseAttributesTask() {
	const context = React.useContext(DocBaseTaskContext);
	if (!context) {
		throw new Error(
			'useUpdateDocbaseAttributesTask must be used within a DocBaseTaskProvider'
		);
	}
	return context.updateDocbaseAttributesTask;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLoadDocbaseTask() {
	const context = React.useContext(DocBaseTaskContext);
	if (!context) {
		throw new Error(
			'useLoadDocbaseTask must be used within a DocBaseTaskProvider'
		);
	}
	return context.loadDocbaseTask;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStartInteractiveTablePopulation() {
	const context = React.useContext(DocBaseTaskContext);
	if (!context) {
		throw new Error(
			'useStartInteractiveTablePopulation must be used within a DocBaseTaskProvider'
		);
	}
	return context.startInteractiveTablePopulation;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGetOrderedNuggets() {
	const context = React.useContext(DocBaseTaskContext);
	if (!context) {
		throw new Error(
			'useGetOrderedNuggets must be used within a DocBaseTaskProvider'
		);
	}
	return context.getOrderedNuggets;
}

interface Props {
	children: ReactNode;
}

/**
 * A provider to run docbase tasks
 */
export function DocBaseTaskProvider({ children }: Props) {
	const setLoadingScreen = useSetLoadingScreen();
	const setLoadingScreenLock = useSetLoadingScreenLock();
	const showNotification = useShowNotification();
	const playAudio = usePlayAudio();

	const intervalTime = 1000;

	const [isRunning, setIsRunning] = React.useState(false);
	const [useInteractiveViewer, setUseInteractiveViewer] =
		React.useState(false);
	const [docBase, setDocBase] = React.useState<DocBase | undefined>(
		undefined
	);

	useEffect(() => {
		Logger.log('DocBaseTaskProvider mounted');
		const type = sessionStorage.getItem('docbasetask-type');
		const taskId = sessionStorage.getItem('docbaseId');
		if (
			type === 'interactiveTablePopulation' &&
			taskId !== null &&
			!isRunning
		) {
			const organizationId = parseInt(
				sessionStorage.getItem('organizationId') || '0'
			);
			const baseName = sessionStorage.getItem('docbaseName') || '';
			startInteractiveTablePopulation(organizationId, baseName, taskId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const createDocbaseTask = async (
		organizationId: number,
		baseName: string,
		documentIDs: number[],
		attributes: string[]
	) => {
		if (isRunning) {
			Logger.warn(
				'Docbase task is already running, cannot start another'
			);
			return;
		}

		// start the task
		const taskId = await APIService.createDocumentBase(
			organizationId,
			baseName,
			documentIDs,
			attributes
		);

		if (taskId == undefined) {
			showNotification('Error', 'Failed to create Docbase ' + baseName);
			return;
		}

		Logger.log('Task: Create Docbase ' + baseName);
		Logger.log('Task ID: ' + taskId);

		sessionStorage.setItem('docbaseId', taskId);
		setLoadingScreen(
			true,
			'Creating Docbase ' + baseName + '...',
			'Please wait...',
			taskId
		);

		setLoadingScreenLock(true);
		setIsRunning(true);

		const updateInterval = setInterval(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			APIService.getTaskStatus(taskId).then((res): any => {
				Logger.log(res);
				if (
					res == undefined ||
					res.state.toUpperCase().trim() === 'FAILURE'
				) {
					setLoadingScreenLock(false);
					setLoadingScreen(false);
					playAudio(MyAudio.ERROR);

					showNotification(
						'Error',
						'Failed to create Docbase ' + baseName
					);
					sessionStorage.removeItem('docbaseId');
					setDocBase(undefined);
					setUseInteractiveViewer(false);

					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				}

				if (res.state === 'SUCCESS') {
					setLoadingScreenLock(false);
					setLoadingScreen(false);
					playAudio(MyAudio.SUCCESS);

					const docBase = new DocBase(
						baseName,
						organizationId,
						attributes
					);
					try {
						const nuggets =
							res.meta.document_base_to_ui.msg.nuggets ||
							res.meta.document_base_to_ui.nuggets;

						for (const nugget of nuggets) {
							docBase.addNugget(
								nugget.document.name,
								nugget.document.text,
								nugget.start_char,
								nugget.end_char
							);
						}
					} catch (error) {
						Logger.error(error);

						showNotification(
							'Error',
							'Something went wrong transforming the nuggets.'
						);
					}
					sessionStorage.removeItem('docbaseId');
					setDocBase(docBase);
					setUseInteractiveViewer(false);

					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				}

				let info = res.state;

				if (res.meta.status !== undefined && res.meta.status !== '') {
					info = res.meta.status;
				}

				info += info.endsWith('...') ? '' : '...';

				// update loading screen
				setLoadingScreen(
					true,
					'Creating Docbase ' + baseName + '...',
					info,
					taskId,
					true
				);
			});
		}, intervalTime);
	};

	const updateDocbaseAttributesTask = async (
		organizationId: number,
		baseName: string,
		attributes: string[]
	) => {
		if (isRunning) {
			Logger.warn(
				'Docbase task is already running, cannot start another'
			);
			return;
		}

		// start the task
		const taskId = await APIService.updateDocumentBaseAttributes(
			organizationId,
			baseName,
			attributes
		);

		if (taskId == undefined) {
			showNotification('Error', 'Failed to update Docbase ' + baseName);
			return;
		}

		Logger.log('Task: Update Attributes Docbase ' + baseName);
		Logger.log('Task ID: ' + taskId);

		sessionStorage.setItem('docbaseId', taskId);
		setLoadingScreen(
			true,
			'Updating Docbase ' + baseName + '...',
			'Please wait...',
			taskId
		);

		setLoadingScreenLock(true);
		setIsRunning(true);

		const updateInterval = setInterval(() => {
			// TODO use type
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			APIService.getTaskStatus(taskId).then((res): any => {
				Logger.log(res);
				if (
					res == undefined ||
					res.state.toUpperCase().trim() === 'FAILURE'
				) {
					setLoadingScreenLock(false);
					setLoadingScreen(false);
					playAudio(MyAudio.ERROR);

					showNotification(
						'Error',
						'Failed to update Docbase ' + baseName
					);
					sessionStorage.removeItem('docbaseId');
					setDocBase(undefined);
					setUseInteractiveViewer(false);

					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				}

				if (res.state === 'SUCCESS') {
					setLoadingScreenLock(false);
					setLoadingScreen(false);
					playAudio(MyAudio.SUCCESS);

					const docBase = new DocBase(
						baseName,
						organizationId,
						attributes
					);
					for (const nugget of res.meta.document_base_to_ui.msg
						.nuggets) {
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
					setUseInteractiveViewer(false);

					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				}

				let info = res.state;

				if (res.meta.status !== undefined) {
					info = res.meta.status;
				}

				info += info.endsWith('...') ? '' : '...';

				// update loading screen
				setLoadingScreen(
					true,
					'Updating Docbase ' + baseName + '...',
					info,
					taskId,
					true
				);
			});
		}, intervalTime);
	};

	const loadDocbaseTask = async (
		organizationId: number,
		baseName: string
	) => {
		if (isRunning) {
			Logger.warn(
				'Docbase task is already running, cannot start another'
			);
			return;
		}

		// start the task
		const taskId = await APIService.loadDocumentBase(
			organizationId,
			baseName
		);

		if (taskId == undefined) {
			showNotification('Error', 'Failed to load Docbase ' + baseName);
			return;
		}

		Logger.log('Task: Load Docbase ' + baseName);
		Logger.log('Task ID: ' + taskId);

		sessionStorage.setItem('docbaseId', taskId);
		setLoadingScreen(
			true,
			'Loading Docbase ' + baseName + '...',
			'Please wait...',
			taskId
		);

		setLoadingScreenLock(true);
		setIsRunning(true);

		const updateBody = () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			APIService.getTaskStatus(taskId).then((res): any => {
				Logger.log(res);
				if (
					res == undefined ||
					res.state.toUpperCase().trim() === 'FAILURE'
				) {
					setLoadingScreenLock(false);
					setLoadingScreen(false);
					playAudio(MyAudio.ERROR);

					showNotification(
						'Error',
						'Failed to load Docbase ' + baseName
					);
					sessionStorage.removeItem('docbaseId');
					setDocBase(undefined);
					setUseInteractiveViewer(false);

					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				}

				if (res.state === 'SUCCESS') {
					setLoadingScreenLock(false);
					setLoadingScreen(false);
					Logger.log(res);

					const docBase = new DocBase(
						baseName,
						organizationId,
						res.meta.document_base_to_ui.msg.attributes ?? []
					);
					try {
						Logger.log(res.meta.document_base_to_ui.msg.nuggets);
						for (const nugget of res.meta.document_base_to_ui.msg
							.nuggets) {
							docBase.addNugget(
								nugget.document.name,
								nugget.document.text,
								nugget.start_char,
								nugget.end_char
							);
						}
					} catch (error) {
						Logger.error(error);
						showNotification(
							'Error',
							'Something went wrong translating the nuggets.'
						);
					}
					sessionStorage.removeItem('docbaseId');
					setDocBase(docBase);
					setUseInteractiveViewer(false);

					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				}

				let info = res.state;

				if (res.meta.status !== undefined && res.meta.status !== '') {
					info = res.meta.status;
				}

				info += info.endsWith('...') ? '' : '...';

				// update loading screen
				setLoadingScreen(
					true,
					'Loading Docbase ' + baseName + '...',
					info,
					taskId,
					true
				);
			});
		};
		updateBody();
		const updateInterval = setInterval(updateBody, intervalTime);
	};

	const startInteractiveTablePopulation = async (
		organizationId: number,
		baseName: string,
		providedTaskId: string | undefined = undefined
	) => {
		if (isRunning) {
			Logger.warn(
				'Docbase task is already running, cannot start another'
			);
			return;
		}

		let taskId: string | undefined;
		if (providedTaskId !== undefined) {
			taskId = providedTaskId;
		} else {
			// start the task
			taskId = await APIService.interactiveTablePopulation(
				organizationId,
				baseName
			);
		}

		if (taskId == undefined) {
			showNotification('Error', 'Failed to load Docbase ' + baseName);
			return;
		}

		Logger.log('Task: Start interactive table population ' + baseName);
		Logger.log('Task ID: ' + taskId);

		sessionStorage.setItem(
			'docbasetask-type',
			'interactiveTablePopulation'
		);
		sessionStorage.setItem('docbaseId', taskId);
		sessionStorage.setItem('docbaseName', baseName);
		sessionStorage.setItem('organizationId', organizationId.toString());
		setLoadingScreen(
			true,
			'Loading Docbase ' + baseName + '...',
			'Please wait...',
			taskId
		);

		setLoadingScreenLock(true);
		setIsRunning(true);

		const updateBody = () => {
			if (taskId == undefined) {
				return;
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			APIService.getTaskStatus(taskId).then((res): any => {
				Logger.log(res);
				if (
					res == undefined ||
					res.state.toUpperCase().trim() === 'FAILURE'
				) {
					setLoadingScreenLock(false);
					setLoadingScreen(false);
					playAudio(MyAudio.ERROR);

					showNotification(
						'Session Expired',
						'Your session has expired. You can rerun the task.'
					);
					sessionStorage.removeItem('docbaseId');
					setDocBase(undefined);
					setUseInteractiveViewer(false);

					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				} else if (
					res.meta.feedback_request_to_ui !== undefined &&
					res.meta.feedback_request_to_ui.attribute !== undefined
				) {
					setLoadingScreenLock(false);
					setLoadingScreen(false);
					Logger.log(res);

					const att = res.meta.feedback_request_to_ui.attribute.name;
					let attList: string[] = [];
					if (att) {
						attList = [att];
					}

					const docBase = new DocBase(
						baseName,
						organizationId,
						attList
					);
					try {
						Logger.log(res.meta.document_base_to_ui.msg.nuggets);
						for (const nugget of res.meta.document_base_to_ui.msg
							.nuggets) {
							docBase.addNugget(
								nugget.document.name,
								nugget.document.text,
								nugget.start_char,
								nugget.end_char
							);
						}
					} catch (error) {
						Logger.error(error);
						showNotification(
							'Error',
							'Something went wrong translating the nuggets.'
						);
					}
					//sessionStorage.removeItem('docbaseId');
					setDocBase(docBase);
					setUseInteractiveViewer(true);
					//setIsRunning(false);
					//clearInterval(updateInterval);
					//return;
				} else {
					let info = res.state;

					if (
						res.meta.status !== undefined &&
						res.meta.status !== ''
					) {
						info = res.meta.status;
					}

					info += info.endsWith('...') ? '' : '...';

					// update loading screen
					setLoadingScreen(
						true,
						'Start Interactive Table Population...',
						info,
						taskId,
						true
					);
				}
			});
		};
		updateBody();
		const updateInterval = setInterval(updateBody, intervalTime);
	};

	const getOrderedNuggets = async (
		organizationId: number,
		baseName: string,
		documentName: string,
		documentContent: string
	) => {
		if (isRunning) {
			Logger.warn(
				'Docbase task is already running, cannot start another'
			);
			return;
		}

		const taskId = await APIService.getOrderedNuggets(
			organizationId,
			baseName,
			documentName,
			documentContent
		);

		if (taskId == undefined) {
			showNotification(
				'Error',
				'Could not get ordered nuggets for ' + documentName
			);
			return;
		}

		Logger.log('Task: Get ordered nuggets ' + baseName);
		Logger.log('Task ID: ' + taskId);

		sessionStorage.setItem('docbaseId', taskId);
		/* setLoadingScreen(
			true,
			'Loading Docbase ' + baseName + '...',
			'Please wait...',
			taskId
		); */

		//setLoadingScreenLock(true);
		setIsRunning(true);

		const updateBody = () => {
			if (taskId == undefined) {
				return;
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			APIService.getTaskStatus(taskId).then((res): any => {
				Logger.log(res);

				if (
					res == undefined ||
					res.state.toUpperCase().trim() === 'FAILURE'
				) {
					setLoadingScreenLock(false);
					setLoadingScreen(false);
					playAudio(MyAudio.ERROR);

					showNotification(
						'Error',
						'Something went wrong getting ordered nuggets.'
					);
					sessionStorage.removeItem('docbaseId');

					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				} else if (res.state.toUpperCase().trim() === 'SUCCESS') {
					setLoadingScreenLock(false);
					setLoadingScreen(false);
					Logger.log(res);
					Logger.log(JSON.stringify(res));

					/* const att = res.meta.feedback_request_to_ui.attribute.name;
					let attList: string[] = [];
					if (att) {
						attList = [att];
					}

					const docBase = new DocBase(
						baseName,
						organizationId,
						attList
					);
					try {
						Logger.log(res.meta.document_base_to_ui.msg.nuggets);
						for (const nugget of res.meta.document_base_to_ui.msg
							.nuggets) {
							docBase.addNugget(
								nugget.document.name,
								nugget.document.text,
								nugget.start_char,
								nugget.end_char
							);
						}
					} catch (error) {
						Logger.error(error);
						showNotification(
							'Error',
							'Something went wrong translating the nuggets.'
						);
					} */
					sessionStorage.removeItem('docbaseId');
					//setDocBase(docBase);
					setIsRunning(false);
					clearInterval(updateInterval);
					return;
				}
			});
		};
		updateBody();
		const updateInterval = setInterval(updateBody, intervalTime);
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
				createDocbaseTask: createDocbaseTask,
				loadDocbaseTask: loadDocbaseTask,
				updateDocbaseAttributesTask: updateDocbaseAttributesTask,
				startInteractiveTablePopulation:
					startInteractiveTablePopulation,
				getOrderedNuggets: getOrderedNuggets,
			}}
		>
			{docBase && !useInteractiveViewer && (
				<DocbaseViewer docBase={docBase} onClose={onClose} />
			)}
			{docBase && useInteractiveViewer && (
				<InteractiveDocBaseViewer docBase={docBase} onClose={onClose} />
			)}
			{children}
		</DocBaseTaskContext.Provider>
	);
}

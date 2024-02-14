import { useState } from 'react';
import NuggetDocument from '../../types/NuggetDocument';
import './CustomNuggetEditor.scss';
import { useShowNotification } from '../../providers/NotificationProvider';
import APIService from '../../utils/ApiService';
import DocBase from '../../types/DocBase';
import Logger from '../../utils/Logger';

interface Props {
	doc: NuggetDocument;
	docBase: DocBase;
}

/**
 * Displays a NuggetDocuments content and highlights the nuggets
 * @param param0 The nuggget document to display
 * @returns
 */
function CustomNuggetEditor({ doc, docBase }: Props) {
	const showNotification = useShowNotification();

	const [selectionStart, setSelectionStart] = useState(-1);
	const [selectionEnd, setSelectionEnd] = useState(-1);
	const [text, setText] = useState('');
	const [id] = useState(Math.random().toString(36).substring(7));

	const handleConfirm = () => {
		if (selectionStart === -1 || selectionEnd === -1 || text.length === 0) {
			showNotification(
				'No text selected',
				'Please select some text with your mouse'
			);
			return;
		}
		console.log('Selected Text:', text);

		setSelectionStart(-1);
		setSelectionEnd(-1);
		setText('');

		const interactiveTaskId = sessionStorage.getItem('docbaseId');
		if (interactiveTaskId === null) {
			Logger.error('No interactive task id found');
			return;
		}
		APIService.confirmCustomNugget(
			docBase.organizationId,
			docBase.name,
			doc.name,
			doc.content,
			text,
			selectionStart,
			selectionEnd,
			interactiveTaskId
		).then((res) => {
			if (res === undefined) {
				showNotification('Error', 'Failed to confirm nugget');
				return;
			}

			const taskId = res;
			const interval = setInterval(() => {
				APIService.getTaskStatus(taskId).then((res) => {
					Logger.log('Confirm nugget start*****' + interval);
					Logger.log(res);
					Logger.log('Confirm nugget end*****');
					if (
						res == undefined ||
						res.state.toUpperCase().trim() === 'FAILURE'
					) {
						showNotification('Error', 'Failed to confirm nugget');
						clearInterval(interval);
						return;
					} else if (res.state.toUpperCase().trim() === 'SUCCESS') {
						// TODO
						showNotification('Success', 'Nugget confirmed');

						clearInterval(interval);
					}
				});
			}, 1000);
		});
	};

	const handleTextSelection = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const textarea = document.getElementById('myTextarea' + id) as any;
		if (!textarea) return;

		setSelectionStart(textarea.selectionStart);
		setSelectionEnd(textarea.selectionEnd);
		setText(
			textarea.value.substring(
				textarea.selectionStart,
				textarea.selectionEnd
			)
		);

		// get mouse position
		/* const selection = window.getSelection();
		if (selection) {
			console.log('Selection:', selection);
			const range = selection.getRangeAt(0);
			const rect = range.getBoundingClientRect();
			// set botton position of the confirm button to the top position of the selected text
			const confirmButton = document.getElementById(
				'confirm-button' + id
			);
			if (confirmButton) {
				console.log('Setting confirm button position');
				confirmButton.setAttribute(
					'style',
					`top: ${rect.top}px; left: ${rect.right}px; position: absolute;`
				);
			}
		} */
	};

	return (
		<div>
			<textarea
				className="nugget-editor-textarea"
				id={'myTextarea' + id}
				value={doc.content}
				onMouseUp={handleTextSelection}
				readOnly
				style={{
					height: doc.content.split('\n').length * 40 + 'px',
				}}
			/>
			<p>
				<i>
					Select the text you want to use as a nugget with your mouse
					and click the confirm button
				</i>
			</p>
			<button
				className="btn"
				id={'confirm-button' + id}
				onClick={handleConfirm}
			>
				<i className="bi bi-check-lg icon mr"></i>
				Confirm Selection
			</button>
		</div>
	);
}
export default CustomNuggetEditor;

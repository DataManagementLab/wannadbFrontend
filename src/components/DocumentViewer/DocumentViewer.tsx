import { useEffect, useState } from 'react';
import './DocumentViewer.scss';
import MyDocument from '../../types/MyDocument';
import {
	useShowNotification,
	useShowChoiceNotification,
} from '../../providers/NotificationProvider';
import APIService from '../../utils/ApiService';

interface Props {
	onClose: () => void;
	editable?: boolean;
	document: MyDocument;
}

/**
 * A component to view a file
 * @param document The name of the file to view
 * @param onClose A function to close the file viewer
 */
function DocumentViewer({ onClose, document, editable }: Props) {
	const [text, setText] = useState(document.content);
	const [unsaved, setUnsaved] = useState(false);

	const showNotification = useShowNotification();
	const showChoiceNotification = useShowChoiceNotification();

	useEffect(() => {
		if (text !== document.content) {
			setUnsaved(true);
		} else {
			setUnsaved(false);
		}
	}, [document.content, text]);

	const close = () => {
		if (!unsaved || !editable) {
			onClose();
			return;
		}
		showChoiceNotification(
			'Unsaved changes',
			'You have unsaved changes. Are you sure you want to close the document (changes will be lost) ?',
			() => {
				onClose();
			},
			() => {}
		);
	};

	const onUpdate = () => {
		if (text === document.content) {
			showNotification(
				'No changes made',
				'No changes were made to the document'
			);
			setUnsaved(false);
			return;
		}

		APIService.updateDocumentContent(document.id, text).then((status) => {
			if (status) {
				showNotification(
					'Document saved',
					'The document was updated successfully'
				);
				document.content = text;
				setUnsaved(false);
			} else {
				showNotification(
					'Error',
					'An error occurred while updating the document'
				);
			}
		});
	};

	return (
		<div>
			<div className="background" onClick={close}></div>
			<div className="DocumentViewer">
				<h1>{document.name}</h1>
				<textarea
					className="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					spellCheck={false}
					readOnly={!editable}
				></textarea>
				<div className="hor">
					<button className="btn" onClick={close}>
						Close
					</button>
					{editable && (
						<button className="btn" onClick={onUpdate}>
							Save{unsaved ? '*' : ''}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default DocumentViewer;

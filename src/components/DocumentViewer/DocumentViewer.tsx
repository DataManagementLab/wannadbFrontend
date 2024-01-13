import { useState } from 'react';
import './DocumentViewer.scss';
import MyDocument from '../../types/MyDocument';
import { useShowNotification } from '../../providers/NotificationProvider';
import APIService from '../../utils/ApiService';

interface Props {
	onClose: () => void;
	document: MyDocument;
}

/**
 * A component to view a file
 * @param document The name of the file to view
 * @param onClose A function to close the file viewer
 */
function DocumentViewer({ onClose, document }: Props) {
	const [text, setText] = useState(document.content);

	const showNotification = useShowNotification();

	const onUpdate = () => {
		if (text === document.content) {
			showNotification(
				'No changes made',
				'No changes were made to the document'
			);
			return;
		}

		APIService.updateDocumentContent(document.id, text).then((status) => {
			if (status) {
				showNotification(
					'Document updated',
					'The document was updated successfully'
				);
				document.content = text;
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
			<div className="background" onClick={onClose}></div>
			<div className="DocumentViewer">
				<h1>{document.name}</h1>
				<textarea
					className="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				></textarea>
				<div className="hor">
					<button className="btn" onClick={onUpdate}>
						Update
					</button>
					<button className="btn" onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

export default DocumentViewer;

import { useState } from 'react';
import './DocumentViewer.scss';
import MyDocument from '../../types/MyDocument';

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

	return (
		<div>
			<div className="background" onClick={onClose}></div>
			<div className="DocumentViewer">
				<h1>{document.name}</h1>
				<textarea
					className="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					readOnly
				></textarea>
				<button className="btn" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
}

export default DocumentViewer;

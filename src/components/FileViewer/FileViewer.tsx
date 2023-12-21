import { useState } from 'react';
import './FileViewer.scss';

interface Props {
	onClose: () => void;
	file: File;
}

/**
 * A component to view a file
 * @param filename The name of the file to view
 * @param onClose A function to close the file viewer
 */
function FileViewer({ onClose, file }: Props) {
	const [text, setText] = useState('');
	file.text().then((text) => setText(text));

	return (
		<div>
			<div className="background" onClick={onClose}></div>
			<div className="FileViewer">
				<h1>{file.name}</h1>
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

export default FileViewer;

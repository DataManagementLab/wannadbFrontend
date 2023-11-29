import { useEffect, useState } from 'react';
import './FileViewer.scss';
import APIService from '../../utils/ApiService';
import { useGetUsername } from '../../providers/UserProvider';

function FileViewer({ filename, onClose }) {
	const [text, setText] = useState('');

	const getUsername = useGetUsername();

	const close = () => {
		onClose();
	};

	useEffect(() => {
		if (text != '') {
			return;
		}
		APIService.getFileContent(getUsername(), filename).then((res) => {
			setText(res);
		});
	});

	return (
		<div>
			<div className="background" onClick={close}></div>
			<div className="FileViewer">
				<h1>{filename}</h1>
				<textarea className="text" value={text} readOnly></textarea>
				<button className="btn" onClick={close}>
					Close
				</button>
			</div>
		</div>
	);
}

export default FileViewer;

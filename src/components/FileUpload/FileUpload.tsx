import { ChangeEvent, useState } from 'react';
import APIService from '../../utils/ApiService';
import './FileUpload.scss';
import { useShowNotification } from '../../providers/NotificationProvider';

/**
 * A component where the user can upload files
 */
function FileUpload() {
	const [files, setFiles] = useState<File[]>([]);
	const [stagedFiles, setstagedFiles] = useState<File[]>([]);

	const showNotification = useShowNotification();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		// Get the selected file
		const selectedFiles = event.target.files;
		if (selectedFiles === null) return;
		console.log(selectedFiles);
		// Read the file content
		/* const reader = new FileReader();
		reader.onload = () => {
			// Set the file content to state
			setFile(selectedFiles);
			//setFileName(selectedFiles.name);
		};
		reader.readAsText(selectedFiles); */
		setstagedFiles([...selectedFiles, ...Array.from(stagedFiles)]);
	};

	const addFile = () => {
		setFiles([...files, ...stagedFiles]);
		setstagedFiles([]);
	};

	const discardFiles = () => {
		setstagedFiles([]);
	};

	const removeFile = (index: number) => {
		const newFiles = [...files];
		newFiles.splice(index, 1);
		setFiles(newFiles);
	};

	const handleUpload = () => {
		if (files.length === 0) return;
		console.log(files);
		APIService.upload(files).then((res) => {
			showNotification('File upload', res);

			setFiles([]);
		});
	};

	return (
		<div className="FileUpload">
			<div className="hor">
				<input
					type="file"
					onChange={handleFileChange}
					accept=".txt"
					multiple={true}
				/>
				<button
					className="btn"
					style={{ marginLeft: '-50px' }}
					onClick={addFile}
				>
					Add
				</button>
				<button className="btn" onClick={discardFiles}>
					Discard
				</button>
			</div>
			<ul className="stagedFiles">
				{files.map((file, index) => (
					<li className="file" key={index}>
						{file.name}
						<button
							className="btn"
							style={{ marginLeft: '20px' }}
							onClick={() => removeFile(index)}
						>
							Remove
						</button>
					</li>
				))}
			</ul>
			<div className="ver">
				<button
					className="btn uploadFile"
					style={{ width: '200px' }}
					onClick={handleUpload}
					disabled={files.length === 0}
				>
					Upload File
				</button>
			</div>
		</div>
	);
}
export default FileUpload;

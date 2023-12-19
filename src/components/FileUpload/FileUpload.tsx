import { ChangeEvent, useState } from 'react';
import APIService from '../../utils/ApiService';
import './FileUpload.scss';
import {
	useShowNotification,
	useShowChoiceNotification,
} from '../../providers/NotificationProvider';

/**
 * A component where the user can upload files
 */
function FileUpload() {
	const [files, setFiles] = useState<File[]>([]);
	const [stagedFiles, setstagedFiles] = useState<File[]>([]);

	const showNotification = useShowNotification();
	const showChoiceNotification = useShowChoiceNotification();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		// Get the selected file
		const selectedFiles = event.target.files;
		if (selectedFiles === null) return;
		setstagedFiles([...selectedFiles, ...Array.from(stagedFiles)]);
	};

	const addFile = (force: boolean = false) => {
		if (stagedFiles.length === 0) {
			return;
		}
		if (!force) {
			for (const stagedFile of stagedFiles) {
				for (const file of files) {
					if (
						file.name === stagedFile.name &&
						file.size === stagedFile.size &&
						file.lastModified === stagedFile.lastModified
					) {
						showChoiceNotification(
							'File upload',
							`The file ${stagedFile.name} is already in the list. Do you want to add it anyway?`,
							() => addFile(true),
							() => {},
							'Yes',
							'No'
						);
						return;
					}
				}
			}
		}

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
					onClick={() => addFile()}
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
				{files.length > 0 && (
					<button
						className="btn uploadFile"
						style={{ width: '200px' }}
						onClick={handleUpload}
						disabled={files.length === 0}
					>
						Upload File
					</button>
				)}
			</div>
		</div>
	);
}
export default FileUpload;

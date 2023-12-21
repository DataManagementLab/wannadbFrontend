import { ChangeEvent, useState } from 'react';
import APIService from '../../utils/ApiService';
import './FileUpload.scss';
import {
	useShowNotification,
	useShowChoiceNotification,
} from '../../providers/NotificationProvider';
import { useGetOrganizations } from '../../providers/OrganizationProvider';

/**
 * A component where the user can upload files
 */
function FileUpload() {
	const [files, setFiles] = useState<File[]>([]);
	const [stagedFiles, setstagedFiles] = useState<File[]>([]);
	const [selectedOrg, setSelectedOrg] = useState(-1);

	const showNotification = useShowNotification();
	const showChoiceNotification = useShowChoiceNotification();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		// Get the selected file
		const selectedFiles = event.target.files;
		if (selectedFiles === null) return;
		setstagedFiles([...selectedFiles, ...Array.from(stagedFiles)]);
	};

	const getOrganizations = useGetOrganizations();

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
		APIService.upload(files, selectedOrg).then((res) => {
			showNotification('File upload', res);
			setFiles([]);
		});
	};

	if (getOrganizations().length === 0) {
		return (
			<p>
				<i>
					You have to be a member of an organization to upload files.
					You can create a new organization{' '}
					<a href="/organization/create">here</a>.
				</i>
			</p>
		);
	}

	return (
		<div className="FileUpload">
			{getOrganizations().length === 1 && (
				<p>
					<b>Organization:</b> {getOrganizations()[0].name}
				</p>
			)}
			{getOrganizations().length > 1 && (
				<div className="hor mb">
					<p>
						<b>Select a Organization:</b>
					</p>
					<select
						className="btn"
						style={{
							width: '200px',
							marginLeft: '20px',
						}}
						name="organization"
						id="organization"
						onChange={(e) => {
							console.log(e.target.value);
							const name = e.target.value;
							const organization = getOrganizations().find(
								(org) => org.name === name
							);
							if (organization === undefined) return;
							setSelectedOrg(organization.id);
						}}
					>
						{getOrganizations().map((organization) => (
							<option
								value={organization.name}
								key={organization.id}
								selected={organization.id === selectedOrg}
							>
								{organization.name}
							</option>
						))}
					</select>
				</div>
			)}
			<div className="hor mb">
				<input
					type="file"
					onChange={handleFileChange}
					accept=".txt"
					multiple={true}
				/>
			</div>
			<div className="hor mb">
				<button className="btn" onClick={() => addFile()}>
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

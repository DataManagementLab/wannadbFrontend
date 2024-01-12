import { useState } from 'react';
import './MyFiles.scss';
import MyDocument from '../../types/MyDocument';
import DocumentViewer from '../DocumentViewer/DocumentViewer';

interface Props {
	documents: MyDocument[];
}

/**
 * A component to list all the files of the user and view, delete them
 * @param documents A list of documents to display
 */
function MyFiles({ documents }: Props) {
	const [viewDocument, setViewDocument] = useState<MyDocument | undefined>(
		undefined
	);

	if (documents.length == 0) {
		return (
			<div className="MyFiles">
				<i>No files uploaded</i>
			</div>
		);
	}

	return (
		<>
			{viewDocument && (
				<DocumentViewer
					document={viewDocument}
					onClose={() => {
						setViewDocument(undefined);
					}}
				/>
			)}
			<div className="MyFiles">
				{documents.map((document) => (
					<div className="file hor" key={document.id}>
						<p className="name">
							{document.name.split('.')[0]}
							<span className="db">
								{document.name.split('.')[1] != undefined
									? '.' + document.name.split('.')[1]
									: ''}
							</span>
						</p>
						<i
							className="bi bi-eye icon"
							onClick={() => {
								setViewDocument(document);
							}}
						>
							{/* View */}
						</i>
					</div>
				))}
			</div>
		</>
	);
}

export default MyFiles;

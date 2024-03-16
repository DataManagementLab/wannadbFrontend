import NuggetDocument from '../../types/NuggetDocument';
import NuggetText from '../NuggetText/NuggetText';
import './NuggetDocumentViewer.scss';
import DocBase from '../../types/DocBase';
import CustomNuggetEditor from '../CustomNuggetEditor/CustomNuggetEditor';
import { useState } from 'react';

interface Props {
	docBase: DocBase;
	doc: NuggetDocument;
	interactive?: boolean;
}

/**
 * This displays a NuggetDocument
 * @param doc The NuggetDocument to display
 */
function NuggetDocumentViewer({ docBase, doc, interactive = false }: Props) {
	const [customNugget, setCustomNugget] = useState<boolean>(false);

	return (
		<div className="ver">
			<p>
				<b>
					Document: <i>{doc.name}</i>
				</b>
			</p>
			{!customNugget ? (
				<NuggetText
					doc={doc}
					interactive={interactive}
					docBase={docBase}
				/>
			) : (
				<CustomNuggetEditor doc={doc} docBase={docBase} />
			)}
			{interactive && (
				<button
					className="btn"
					onClick={() => setCustomNugget(!customNugget)}
					style={{
						width: '300px',
					}}
				>
					{customNugget
						? 'Select suggested nugget'
						: 'Select custom nugget'}
				</button>
			)}
		</div>
	);
}
export default NuggetDocumentViewer;

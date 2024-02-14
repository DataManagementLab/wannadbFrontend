import NuggetDocument from '../../types/NuggetDocument';
import Icon from '../Icon/Icon';
import NuggetText from '../NuggetText/NuggetText';
import './NuggetDocumentViewer.scss';
import { useGetOrderedNuggets } from '../../providers/DocBaseTaskProvider';
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
	const getOrderedNuggets = useGetOrderedNuggets();
	const [customNugget, setCustomNugget] = useState<boolean>(false);

	return (
		<div className="ver">
			<p>
				<b>
					Document: <i>{doc.name}</i>
				</b>
				{!interactive && (
					<Icon
						cls="bi bi-info-circle ml"
						style={{
							//TODO
							display: 'none',
						}}
						onClicked={() => {
							getOrderedNuggets(
								docBase.organizationId,
								docBase.name,
								doc.name,
								doc.content
							);
						}}
					>
						Get more information about this document
					</Icon>
				)}
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

import { useUpdateDocbaseAttributesTask } from '../../providers/DocBaseTaskProvider';
import DocBase from '../../types/DocBase';
import AttributeAdder from '../AttributeAdder/AttributeAdder';
import NuggetDocumentViewer from '../NuggetViewer/NuggetDocumentViewer';
import './DocbaseViewer.scss';

interface Props {
	docBase: DocBase;
	onClose: () => void;
}

/**
 * A popup that displays a DocBases
 * @param docBase The docbase to view
 */
function DocbaseViewer({ docBase, onClose }: Props) {
	const updateDocbaseAttributesTask = useUpdateDocbaseAttributesTask();

	return (
		<>
			<div
				className="background"
				style={{
					zIndex: 100,
				}}
			></div>
			<div className="closeBtn" onClick={onClose}>
				<i className="bi bi-x-lg"></i>
			</div>
			<div className="DocbaseViewer">
				<h1>
					DocBase: <i>{docBase.name}</i>
				</h1>
				<h2>Attributes</h2>
				<AttributeAdder
					rerunAble={true}
					onListChange={(list: string[]) => {
						docBase.attributes = list;
					}}
					initialList={docBase.attributes}
					onRerun={(list: string[]) => {
						updateDocbaseAttributesTask(
							docBase.organizationId,
							docBase.name,
							list
						);
						onClose();
					}}
				></AttributeAdder>
				<h2>Documents</h2>
				{docBase.docs.map((doc, index) => {
					return (
						<NuggetDocumentViewer
							key={index}
							doc={doc}
							docBase={docBase}
						/>
					);
				})}
				<button className="btn mb ml mt" onClick={onClose}>
					Close
				</button>
			</div>
		</>
	);
}
export default DocbaseViewer;

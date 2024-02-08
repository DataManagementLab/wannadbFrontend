import NuggetDocument from '../../types/NuggetDocument';
import Icon from '../Icon/Icon';
import NuggetText from '../NuggetText/NuggetText';
import './NuggetDocumentViewer.scss';
import { useGetOrderedNuggets } from '../../providers/DocBaseTaskProvider';
import DocBase from '../../types/DocBase';

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
			<NuggetText doc={doc} interactive={interactive} docBase={docBase} />
		</div>
	);
}
export default NuggetDocumentViewer;

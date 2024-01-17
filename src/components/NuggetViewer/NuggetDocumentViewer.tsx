import NuggetDocument from '../../types/NuggetDocument';
import NuggetText from '../NuggetText/NuggetText';
import './NuggetDocumentViewer.scss';

interface Props {
	doc: NuggetDocument;
}

/**
 * This displays a NuggetDocument
 * @param doc The NuggetDocument to display
 */
function NuggetDocumentViewer({ doc }: Props) {
	return (
		<div className="ver">
			<p>
				<b>
					Document: <i>{doc.name}</i>
				</b>
			</p>
			<NuggetText doc={doc} />
		</div>
	);
}
export default NuggetDocumentViewer;

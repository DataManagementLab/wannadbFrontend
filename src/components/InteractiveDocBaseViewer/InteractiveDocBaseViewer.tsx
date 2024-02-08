import DocBase from '../../types/DocBase';
import NuggetDocumentViewer from '../NuggetViewer/NuggetDocumentViewer';
import './InteractiveDocBaseViewer.scss';

interface Props {
	docBase: DocBase;
	onClose: () => void;
}

/**
 * A popup that displays a DocBases
 * @param docBase The docbase to view
 */
function InteractiveDocBaseViewer({ docBase }: Props) {
	return (
		<>
			<div
				className="background"
				style={{
					zIndex: 100,
				}}
			></div>

			<div className="InteractiveDocBaseViewer">
				<h1>Interactive Table Population Editor</h1>
				<h2>
					DocBase: <i>{docBase.name}</i>
				</h2>

				<h2>Documents</h2>
				{docBase.docs.map((doc, index) => {
					return (
						<NuggetDocumentViewer
							key={index}
							doc={doc}
							interactive={true}
							docBase={docBase}
						/>
					);
				})}
				<div className="buffer"></div>
			</div>
			<div className="infobar">
				<p>
					<i>Attribute</i>: <b>{docBase.attributes.join(', ')}</b>
				</p>
			</div>
		</>
	);
}
export default InteractiveDocBaseViewer;

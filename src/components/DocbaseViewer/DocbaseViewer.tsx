import DocBase from '../../types/DocBase';
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
				<h1>{docBase.name}</h1>
				<h2>Attributes</h2>
				<ul className="ver">
					{docBase.attributes.map((attribute, index) => {
						return (
							<li key={index}>
								<b>{attribute}</b>
							</li>
						);
					})}
				</ul>
				<h2>Documents</h2>
				{docBase.docs.map((doc, index) => {
					return <NuggetDocumentViewer key={index} doc={doc} />;
				})}
				<button className="btn mb" onClick={onClose}>
					Close
				</button>
			</div>
		</>
	);
}
export default DocbaseViewer;

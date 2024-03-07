import React, { useEffect } from 'react';
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
	const [timeRemaining, setTimer] = React.useState(180);
	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

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
				<p
					style={{
						width: '50%',
					}}
				>
					Here you can confirm the nuggets that should be used for the
					DocBase. Below you can see what attribute is currently in
					use. Click on all nuggets that are associated with the
					attribute by clicking on the checkbox next to the nugget. Or
					you can also select a custom nugget by clicking 'Select
					custom nugget' and then highlighting the text with your
					mouse and clicking 'Confirm Selection'.
				</p>
				<p
					style={{
						width: '50%',
					}}
				>
					This process will take 3 minutes. You will not be able to
					leave this page until the process is complete. After 3
					minutes the process will be automatically completed. If you
					have not finished confirming the nuggets, you will have to
					start over.
				</p>
				<h2>
					DocBase: <i>{docBase.name}</i>
				</h2>
				<h3>Time Remaining:</h3>
				<p>{timeRemaining}</p>
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

import { useEffect, useState } from 'react';
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
	const [timeRemaining, setTimer] = useState(180);
	useEffect(() => {
		const timeLeftStorage = sessionStorage.getItem('itp-time');

		let timeLeft = 180;
		if (timeLeftStorage !== null) {
			timeLeft = parseInt(timeLeftStorage);
		}
		setTimer(timeLeft);
		const interval = setInterval(() => {
			const oldTime = sessionStorage.getItem('itp-time');
			if (oldTime === null) {
				clearInterval(interval);
				return;
			}
			const newTime = parseInt(oldTime) - 1;
			sessionStorage.setItem('itp-time', newTime.toString());

			setTimer(newTime);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const parseTime = (seconds: number) => {
		let minutes = Math.floor(seconds / 60);
		let remainingSeconds = seconds % 60;
		if (minutes < 0) {
			minutes = 0;
		}
		if (remainingSeconds < 0) {
			remainingSeconds = 0;
		}
		let secondsString = remainingSeconds.toString();
		if (secondsString.length === 1) {
			secondsString = '0' + secondsString;
		}

		return `${minutes}:${secondsString}`;
	};

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
					<i>Attribute:</i> <b>{docBase.attributes.join(', ')}</b>
				</p>
				<p>
					<i>Time Remaining:</i> <b>{parseTime(timeRemaining)}</b>
				</p>
			</div>
		</>
	);
}
export default InteractiveDocBaseViewer;

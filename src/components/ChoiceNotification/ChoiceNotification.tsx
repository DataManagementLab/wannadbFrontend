import './ChoiceNotification.scss';

interface Props {
	heading: string;
	info: string;
	onAccept: () => void;
	onReject: () => void;
	acceptText: string;
	rejectText: string;
}

/**
 * A notification that is displayed to the user
 * @param heading The heading of the notification
 * @param info More information about the notification
 * @param onClose The function to call when the notification is closed
 */
function ChoiceNotification({
	heading,
	info,
	onAccept,
	onReject,
	acceptText = 'Yes',
	rejectText = 'No',
}: Props) {
	return (
		<div>
			<div className="background" onClick={onReject}></div>
			<div className="ChoiceNotification">
				<h1>{heading}</h1>
				<p>{info}</p>
				<div className="choiceBtns">
					<button onClick={onReject}>{rejectText}</button>
					<button onClick={onAccept}>{acceptText}</button>
				</div>
			</div>
		</div>
	);
}
export default ChoiceNotification;

import './UserNotification.scss';

interface Props {
	heading: string;
	info: string;
	onClose: () => void;
	btnText?: string;
}

/**
 * A notification that is displayed to the user
 * @param heading The heading of the notification
 * @param info More information about the notification
 * @param onClose The function to call when the notification is closed
 */
function UserNotification({
	heading,
	info,
	onClose,
	btnText = 'Close',
}: Props) {
	return (
		<div>
			<div className="background" onClick={onClose}></div>
			<div className="UserNotification">
				<h1>{heading}</h1>
				<p>{info}</p>
				<button onClick={onClose}>{btnText}</button>
			</div>
		</div>
	);
}
export default UserNotification;

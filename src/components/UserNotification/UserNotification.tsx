import './UserNotification.scss';

interface Props {
	heading: string;
	info: string;
	onClose: () => void;
}

/**
 * A notification that is displayed to the user
 * @param heading The heading of the notification
 * @param info More information about the notification
 * @param onClose The function to call when the notification is closed
 */
function UserNotification({ heading, info, onClose }: Props) {
	return (
		<div className="background" onClick={onClose}>
			<div className="UserNotification">
				<h1>{heading}</h1>
				<p>{info}</p>
				<button>Close</button>
			</div>
		</div>
	);
}
export default UserNotification;

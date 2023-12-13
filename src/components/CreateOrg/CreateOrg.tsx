import { Link, useNavigate } from 'react-router-dom';
import './CreateOrg.scss';
import '../../styles/form.scss';
import { useGetUsername, useLoggedIn } from '../../providers/UserProvider';
import { useEffect, useState } from 'react';
import APIService from '../../utils/ApiService';
import { useShowNotification } from '../../providers/NotificationProvider';

/**
 * A page to create an organization
 */
function CreateOrg() {
	const [errorMessage, setErrorMessage] = useState(' ');
	const [name, setName] = useState('');

	const navigate = useNavigate();
	const showNotification = useShowNotification();

	const getUserName = useGetUsername();
	const isLoggedIn = useLoggedIn();

	const [username] = useState(getUserName());

	const onCreateOrg = () => {
		if (name === '') {
			setErrorMessage('Organization name cannot be empty');
			return;
		}
		if (name.length > 20) {
			setErrorMessage(
				'Organization name cannot be longer than 20 characters'
			);
			return;
		}
		if (name.length < 3) {
			setErrorMessage(
				'Organization name cannot be shorter than 3 characters'
			);
			return;
		}
		APIService.createOrganization(name).then((id) => {
			if (!id) {
				setErrorMessage('Organization already exists');
				return;
			}
			showNotification(
				'Organization created!',
				'Organization ' + name + ' created successfully. (' + id + ')'
			);
			navigate('/profile');
		});
	};

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn, username]);

	return (
		<div className="CreateOrg myForm">
			<h1>
				wanna<span className="db">db</span> <br />
				<i>CREATE ORGANIZATION</i>
			</h1>
			<div>
				<p className="errorMsg">{errorMessage}</p>
				<input
					type="text"
					placeholder="Organization Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<button className="btn" onClick={onCreateOrg}>
					Create
				</button>
				<Link className="btn" to="/profile">
					Back
				</Link>
			</div>
		</div>
	);
}
export default CreateOrg;

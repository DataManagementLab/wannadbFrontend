import { useNavigate } from 'react-router-dom';
import './CreateOrg.scss';
import '../../styles/form.scss';
import { useGetUsername, useLoggedIn } from '../../providers/UserProvider';
import { useEffect, useState } from 'react';
import APIService from '../../utils/ApiService';
import { useShowNotification } from '../../providers/NotificationProvider';
import getRandomOrgName from '../../data/getRandomOrgName';

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

	const [randomOrgName] = useState(getRandomOrgName());

	const [username] = useState(getUserName());

	const onCreateOrg = () => {
		if (name === '') {
			setErrorMessage('Organization name cannot be empty');
			return;
		}
		if (name.length > 30) {
			setErrorMessage(
				'Organization name cannot be longer than 30 characters'
			);
			return;
		}
		if (name.length < 3) {
			setErrorMessage(
				'Organization name cannot be shorter than 3 characters'
			);
			return;
		}
		if (name.toLowerCase().endsWith('org')) {
			setErrorMessage('Organization name cannot end with "Org"');
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
				<p
					style={{
						textAlign: 'center',
						fontSize: '14px',
						marginTop: '0',
					}}
				>
					<i>
						No idea?
						<br />
						Why not try
						<span
							style={{ cursor: 'pointer', fontWeight: 'bold' }}
							onClick={() => setName(randomOrgName)}
						>
							{randomOrgName}
						</span>
					</i>
				</p>
				<input
					type="text"
					placeholder="Organization Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<button className="btn" onClick={onCreateOrg}>
					Create
				</button>
				<button
					className="btn"
					onClick={() => {
						window.history.back();
					}}
				>
					Back
				</button>
			</div>
		</div>
	);
}
export default CreateOrg;

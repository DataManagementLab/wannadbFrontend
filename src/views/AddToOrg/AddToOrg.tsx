import { useNavigate, useParams } from 'react-router-dom';
import './AddToOrg.scss';
import '../../styles/form.scss';
import { useEffect, useState } from 'react';
import Organization from '../../types/Organization';
import { useLoggedIn } from '../../providers/UserProvider';
import { useUpdateOrganizations } from '../../providers/OrganizationProvider';
import APIService from '../../utils/ApiService';
import { useShowNotification } from '../../providers/NotificationProvider';

/**
 * A page to add a member to an organization.
 */
function AddToOrg() {
	const [organization, setOrganization] = useState<Organization>(
		new Organization('Error', -1)
	);
	const [errorMessage, setErrorMessage] = useState(' ');
	const [username, setUsername] = useState('');
	const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>(
		[]
	);

	const navigate = useNavigate();
	const isLoggedIn = useLoggedIn();

	const updateOrganizations = useUpdateOrganizations();
	const showNotification = useShowNotification();
	const { id } = useParams();

	useEffect(() => {
		if (!isLoggedIn || !id) {
			navigate('/');
		}
		updateOrganizations().then((orgs) => {
			const org = id
				? orgs.find((org) => org.id === parseInt(id))
				: undefined;
			if (!org) {
				navigate('/');
				return;
			}
			setOrganization(org);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = () => {
		APIService.addMemberToOrganization(organization.id, username)
			.then((msg) => {
				if (msg === '') {
					showNotification('Success', 'Member added successfully');
					window.history.back();
					return;
				}
				setErrorMessage(msg);
			})
			.catch((err) => {
				setErrorMessage(err.response.data.message);
			});
	};

	const onChange = (value: string) => {
		setUsername(value);
		if (value.length < 3) {
			setUsernameSuggestions([]);
			return;
		} else if (value.length === 3) {
			APIService.getUserNameSuggestion(value).then((suggestions) => {
				setUsernameSuggestions(suggestions);
			});
		}
	};

	const filterSuggestions = (suggestions: string[]) => {
		return suggestions.filter(
			(suggestion, index) =>
				suggestion.toLowerCase().includes(username.toLowerCase()) &&
				index < 5
		);
	};

	return (
		<div className="AddToOrg myForm">
			<h1>
				wanna<span className="db">db</span>
				<br />
				<i>ADD MEMBER {organization.name.toUpperCase()}</i>
			</h1>
			<div>
				<p className="errorMsg">{errorMessage}</p>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => onChange(e.target.value)}
				/>
				{usernameSuggestions.length > 0 && (
					<div className="suggestions">
						{filterSuggestions(usernameSuggestions).map(
							(suggestion) => (
								<button
									className="suggestion btn"
									onClick={() => {
										setUsername(suggestion);
										setUsernameSuggestions([]);
									}}
								>
									{suggestion}
								</button>
							)
						)}
					</div>
				)}
				<button className="btn" onClick={onSubmit}>
					Add
				</button>

				<button
					className="btn"
					onClick={() => {
						// go back to last page
						window.history.back();
					}}
				>
					Back
				</button>
			</div>
		</div>
	);
}
export default AddToOrg;

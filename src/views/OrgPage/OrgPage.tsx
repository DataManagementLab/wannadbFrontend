import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoggedIn, useGetUsername } from '../../providers/UserProvider';
import './OrgPage.scss';
import { useUpdateOrganizations } from '../../providers/OrganizationProvider';
import Organization from '../../types/Organization';
import { useShowChoiceNotification } from '../../providers/NotificationProvider';
import APIService from '../../utils/ApiService';
import Navbar from '../../components/Navbar/Navbar';

/**
 * A page that displays information about an organization.
 */
function OrgPage() {
	const [organization, setOrganization] = useState<Organization>(
		new Organization('Error', -1)
	);
	const [members, setMembers] = useState<string[]>([]);

	const navigate = useNavigate();
	const isLoggedIn = useLoggedIn();

	const updateOrganizations = useUpdateOrganizations();
	const getUsername = useGetUsername();
	const showChoice = useShowChoiceNotification();

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

			// Get members
			APIService.getMembersForOrganization(org.id).then((members) => {
				if (!members) {
					console.error('Failed to get members for org ' + org.id);
					return;
				}
				setMembers(members);
			});
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="OrgPage">
			<Navbar />
			<div className="content">
				<h1>
					{organization.name.slice(0, -2)}
					<span className="db">{organization.name.slice(-2)}</span>
				</h1>
				<p>
					<i>
						Organization ID: <b>{organization.id}</b>
					</i>
				</p>
				{getUsername() + 'Org' !== organization.name && (
					<>
						<i
							className="bi bi-plus-lg icon"
							onClick={() => {
								navigate(
									'/organization/add/' + organization.id
								);
							}}
						>
							{/*ADD MEMBER*/}
						</i>
						<i
							className="bi bi-box-arrow-left icon ml"
							onClick={() => {
								showChoice(
									'Leave Organization',
									'Are you sure you want to leave ' +
										organization.name +
										'?',
									() => {
										APIService.leaveOrganization(
											organization.id
										).then(() => {
											updateOrganizations();
											navigate('/profile');
										});
									},
									() => {},
									'Leave',
									'Cancel'
								);
							}}
						>
							{/* Leave */}
						</i>
					</>
				)}
				<h2>Member{members.length > 1 ? 's' : ''}</h2>
				<ul
					style={{
						fontSize: '1.2rem',
					}}
				>
					{members.map((member) => (
						<li className="mb" key={member}>
							{member}
						</li>
					))}
				</ul>
				<button
					className="btn mt"
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

export default OrgPage;

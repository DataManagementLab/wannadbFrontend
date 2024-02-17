import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoggedIn, useGetUsername } from '../../providers/UserProvider';
import './OrgPage.scss';
import { useUpdateOrganizations } from '../../providers/OrganizationProvider';
import Organization from '../../types/Organization';
import { useShowChoiceNotification } from '../../providers/NotificationProvider';
import APIService from '../../utils/ApiService';
import Navbar from '../../components/Navbar/Navbar';
import MyDocument from '../../types/MyDocument';
import MyFiles from '../../components/MyFiles/MyFiles';
import { useSetLoadingScreen } from '../../providers/LoadingScreenProvider';
import FileUpload from '../../components/FileUpload/FileUpload';
import DocBaseOverview from '../../components/DocBaseOverview/DocBaseOverview';
import Icon from '../../components/Icon/Icon';
import Logger from '../../utils/Logger';

/**
 * A page that displays information about an organization.
 */
function OrgPage() {
	const [organization, setOrganization] = useState<Organization>(
		new Organization('Error', -1)
	);
	const [members, setMembers] = useState<string[]>([]);
	const [documents, setDocuments] = useState<MyDocument[]>([]);
	const [render, setRender] = useState<boolean>(false);
	const [counter, setCounter] = useState(0);

	const navigate = useNavigate();
	const isLoggedIn = useLoggedIn();

	const updateOrganizations = useUpdateOrganizations();
	const getUsername = useGetUsername();
	const showChoice = useShowChoiceNotification();
	const setLoadingScreen = useSetLoadingScreen();

	const { id } = useParams();

	useEffect(() => {
		if (!isLoggedIn || !id) {
			navigate('/');
		}
		setLoadingScreen(true, 'Loading organization...');
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
					Logger.error('Failed to get members for org ' + org.id);
					return;
				}
				setMembers(members);
			});
			APIService.getDocumentForOrganization(org.id).then((docs) => {
				setDocuments(docs);
				setLoadingScreen(false);
				setRender(true);
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
						<Icon
							cls="bi bi-plus-lg icon"
							onClicked={() => {
								navigate(
									'/organization/add/' + organization.id
								);
							}}
						>
							Add Member
						</Icon>
						<Icon
							cls="bi bi-door-closed icon ml"
							onClicked={() => {
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
							Leave Organization
						</Icon>
					</>
				)}
				<h2>Member{members.length > 1 ? 's' : ''}</h2>
				<ul>
					{members.map((member) => (
						<li className="my-list-item" key={member}>
							{member}
						</li>
					))}
				</ul>
				<h2>Document{documents.length > 1 ? 's' : ''}</h2>
				<MyFiles documents={documents} />
				<h2>
					Upload
					<i
						className="bi bi-question-circle icon helpIcon"
						onClick={() => {
							navigate('/help#q1');
						}}
					></i>
				</h2>
				<FileUpload
					organizationProp={organization}
					afterUpload={() => {
						// refresh documents
						APIService.getDocumentForOrganization(
							organization.id
						).then((docs) => {
							setDocuments(docs);
							setCounter(counter + 1);
						});
					}}
				></FileUpload>
				<h2>
					Docbase
					<i
						className="bi bi-question-circle icon helpIcon"
						onClick={() => {
							navigate('/help#q2');
						}}
					></i>
				</h2>
				{render && (
					<DocBaseOverview
						organizationProp={organization}
						counter={counter}
					/>
				)}
				<button
					className="btn"
					style={{ marginBottom: '100px', marginTop: '50px' }}
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

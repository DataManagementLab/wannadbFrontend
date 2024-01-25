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
					console.error('Failed to get members for org ' + org.id);
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
				<ul>
					{members.map((member) => (
						<li className="my-list-item" key={member}>
							{member}
						</li>
					))}
				</ul>
				<h2>Document{documents.length > 1 ? 's' : ''}</h2>
				<MyFiles documents={documents} />
				<h2>Upload</h2>
				<FileUpload
					organizationProp={organization}
					afterUpload={() => {
						// refresh documents
						APIService.getDocumentForOrganization(
							organization.id
						).then((docs) => {
							setDocuments(docs);
						});
					}}
				></FileUpload>
				<h2>Docbase</h2>
				{render && <DocBaseOverview organizationProp={organization} />}
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

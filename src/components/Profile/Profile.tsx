import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Profile.scss';
import { useEffect, useState } from 'react';
import {
	useGetUsername,
	useLogOut,
	useLoggedIn,
} from '../../providers/UserProvider';
import MyFiles from '../MyFiles/MyFiles';
import { useShowChoiceNotification } from '../../providers/NotificationProvider';
import Organization from '../../utils/Organization';
import {
	useGetOrganizations,
	useUpdateOrganizations,
} from '../../providers/OrganizationProvider';

/**
 * The profile page component
 */
function Profile() {
	const navigate = useNavigate();
	const showChoice = useShowChoiceNotification();

	const getUserName = useGetUsername();
	const isLoggedIn = useLoggedIn();
	const logOut = useLogOut();

	const [username] = useState(getUserName());
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [fileNames, setFileNames] = useState<string[]>([]);

	const getOrganizations = useGetOrganizations();
	const updateOrganizations = useUpdateOrganizations();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/');
		}
		updateOrganizations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoggedIn, username]);

	return (
		<div className="Profile">
			<Navbar />
			<div className="content">
				<h1 className="title">
					{username.slice(0, -2)}
					<span className="db">{username.slice(-2)}</span>
				</h1>
				<h2>
					<span className="db">My</span>Organizations
				</h2>
				{getOrganizations().length === 0 && (
					<p>
						<i>You are not a member of any organization.</i>
					</p>
				)}

				<div className="orgs">
					{getOrganizations().length > 0 &&
						getOrganizations().map((org: Organization) => (
							<li key={org.id} className="orgItem">
								<p key={org.id + 'Name'}>{org.name}</p>
								<i className="bi bi-eye icon">{/*VIEW*/}</i>
								{getUserName() + 'Org' !== org.name && (
									<>
										<i className="bi bi-plus-lg icon">
											{/*ADD MEMBER*/}
										</i>
										<i
											className="bi bi-box-arrow-left icon"
											onClick={() => {
												showChoice(
													'Leave Organization',
													'Are you sure you want to leave ' +
														org.name +
														'?',
													() => {
														// TODO: Leave organization
														console.log('Leave');
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
							</li>
						))}
					<Link
						className="btn create"
						to="/organization/create"
						style={{ marginTop: '25px' }}
					>
						Create New
					</Link>
				</div>
				<h2>
					<span className="db">My</span>Files
				</h2>
				<MyFiles fileNames={fileNames} />
				<div
					className="ver"
					style={{ width: '200px', marginTop: '25px' }}
				>
					<button
						className="btn"
						onClick={() => {
							logOut();
							navigate('/');
						}}
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
}

export default Profile;

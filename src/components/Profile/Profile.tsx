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
import APIService from '../../utils/ApiService';

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

	const [fileNames] = useState<string[]>([]);

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
					<span className="db">My</span>Organization
					{getOrganizations().length !== 1 && 's'}
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
								<p
									key={org.id + 'Name'}
									onClick={() => {
										navigate('/organization/' + org.id);
									}}
									style={{ cursor: 'pointer' }}
								>
									{org.name}
									<span
										style={{
											opacity: '0.2',
											fontWeight: '200',
										}}
									>
										{'#' + org.id}
									</span>
								</p>
								<i
									className="bi bi-eye icon"
									onClick={() => {
										navigate('/organization/' + org.id);
									}}
								>
									{/*VIEW*/}
								</i>
								{getUserName() + 'Org' !== org.name && (
									<>
										<i
											className="bi bi-plus-lg icon"
											onClick={() => {
												navigate(
													'/organization/add/' +
														org.id
												);
											}}
										>
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
														APIService.leaveOrganization(
															org.id
														).then(() => {
															updateOrganizations();
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

import { Link, useNavigate } from 'react-router-dom';
import APIService from '../../utils/ApiService';
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
	const [fileNames, setFileNames] = useState<string[]>([]);
	const [organizationName, setOrganizationName] = useState<string>('');

	const getFiles = () => {
		APIService.getFileNames(username).then((res) => {
			setFileNames(res);
		});
	};

	const getOrganizationName = () => {
		APIService.getOrganization(username).then((res) => {
			setOrganizationName(res);
		});
	};

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/');
		}
		getFiles();
		getOrganizationName();
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
				</h2>
				{organizationName !== '' ? (
					<p>
						<b>{organizationName}</b>
					</p>
				) : (
					<p>
						<i>You are not a member of any organization.</i>
					</p>
				)}

				<div className="orgBtns">
					{organizationName !== '' ? (
						<>
							{/* //TODO */}
							<button className="btn">View</button>
							<button className="btn">Add Member</button>
							<button
								className="btn"
								onClick={() => {
									showChoice(
										'Leave Organization',
										'Are you sure you want to leave ' +
											organizationName +
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
								Leave
							</button>
						</>
					) : (
						<>
							<Link className="btn" to="/organization/create">
								Create New
							</Link>
						</>
					)}
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

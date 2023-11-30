import { useNavigate } from 'react-router-dom';
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

/**
 * The profile page component
 */
function Profile() {
	const navigate = useNavigate();

	const getUserName = useGetUsername();
	const isLoggedIn = useLoggedIn();
	const logOut = useLogOut();

	const [username] = useState(getUserName());
	const [fileNames, setFileNames] = useState<string[]>([]);
	const getFiles = async () => {
		APIService.getFileNames(username).then((res) => {
			setFileNames(res);
		});
	};

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/');
		}
		getFiles();
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

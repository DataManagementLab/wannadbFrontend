import { Link, useNavigate } from 'react-router-dom';
import './Home.scss';
import { useState } from 'react';
import {
	useGetUsername,
	useLogOut,
	useLoggedIn,
} from '../../providers/UserProvider';
import Navbar from '../../components/Navbar/Navbar';
import FileUpload from '../../components/FileUpload/FileUpload';
import DocBaseOverview from '../../components/DocBaseOverview/DocBaseOverview';
import getRandomTip from '../../data/getRandomTip';

/**
 * The home page component
 */
function Home() {
	const getUserName = useGetUsername();
	const navigate = useNavigate();
	const logOut = useLogOut();

	const [username] = useState(getUserName());
	const isLoggedIn = useLoggedIn();
	const [counter, setCounter] = useState(0);

	if (isLoggedIn()) {
		return (
			<div className="Home">
				<Navbar />
				<div className="content">
					<h1
						className="title"
						style={{ cursor: 'pointer', marginBottom: '40px' }}
						onClick={() => {
							navigate('/profile');
						}}
					>
						Hi {username.slice(0, -2)}
						<span className="db">{username.slice(-2)}</span> 👋
					</h1>
					<div className="userStudy">
						<h2>User Study</h2>
						<p>
							<b>
								If you are from the user study, you can download
								some sample documents{' '}
								<a
									href="https://github.com/cophilot/wannadb-sample-txt/archive/refs/heads/main.zip"
									target="_blank"
								>
									here
								</a>{' '}
								to use them for the upload.
							</b>
						</p>
						<p>
							<i>
								If the link does not download the file, please
								click{' '}
								<a
									href="https://github.com/cophilot/wannadb-sample-txt?tab=readme-ov-file#how-to-download"
									target="_blank"
									rel="noreferrer"
								>
									here
								</a>{' '}
								and download the file manually.
							</i>
						</p>
					</div>
					<h2>
						T<span className="db">ip</span>
					</h2>
					<p>
						<i>{getRandomTip()}</i>
					</p>
					<h2>
						Document <span className="db">Up</span>load
					</h2>
					<FileUpload
						organizationProp={undefined}
						afterUpload={() => {
							//window.location.reload();
							setCounter(counter + 1);
						}}
					></FileUpload>
					<h2>
						Doc<span className="db">Ba</span>se
					</h2>
					<DocBaseOverview
						counter={counter}
						organizationProp={undefined}
					></DocBaseOverview>
					{import.meta.env.VITE_APP_LOG === 'true' && (
						<button
							className="btn"
							style={{
								marginTop: '100px',
							}}
							onClick={() => {
								logOut();
								window.location.reload();
							}}
						>
							<i className="bi bi-box-arrow-left mr"></i>Logout
						</button>
					)}
				</div>
			</div>
		);
	}
	return (
		<div className="Home">
			<Navbar />
			<div className="content">
				<h1 className="title">
					Welcome to wanna<span className="db">db</span>!
				</h1>
				<div className="ver">
					<Link className="subtitle" to="/login">
						Please log in to continue.
					</Link>
					<Link
						to="/login"
						className="btn"
						style={{ width: '100px' }}
					>
						<i className="bi bi-box-arrow-in-right mr icon"></i>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;

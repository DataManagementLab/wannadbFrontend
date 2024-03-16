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
					<h2>
						T<span className="db">ip</span>
					</h2>
					<p>
						<i>{getRandomTip()}</i>
					</p>
					<h2>
						Work<span className="db">fl</span>ow
					</h2>
					<button
						className="btn"
						onClick={() => {
							navigate('/workflow/org');
						}}
					>
						<i className="bi bi-play-fill icon mr"></i> Start a
						Workflow run
					</button>
					<h2>
						<span className="db">Or</span>ganization
					</h2>
					<p>
						You can view your organizations{' '}
						<span
							onClick={() => {
								navigate('/profile');
							}}
							style={{
								cursor: 'pointer',
								textDecoration: 'underline',
							}}
						>
							here
						</span>
						.
					</p>
					<p>
						Or you can create a new organization{' '}
						<span
							onClick={() => {
								navigate('/organization/create');
							}}
							style={{
								cursor: 'pointer',
								textDecoration: 'underline',
							}}
						>
							here
						</span>
						.
					</p>

					<h2>
						Document <span className="db">Up</span>load{' '}
						<i
							className="bi bi-question-circle icon helpIcon"
							onClick={() => {
								navigate('/help#q1');
							}}
						></i>
					</h2>
					<FileUpload
						organizationProp={undefined}
						afterUpload={() => {
							setCounter(counter + 1);
						}}
					></FileUpload>
					<h2>
						Doc<span className="db">Ba</span>se
						<i
							className="bi bi-question-circle icon helpIcon"
							onClick={() => {
								navigate('/help#q2');
							}}
						></i>
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

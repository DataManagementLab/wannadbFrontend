import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Home.scss';
import { useState } from 'react';
import { useGetUsername, useLogOut } from '../../providers/UserProvider';
import FileUpload from '../FileUpload/FileUpload';

/**
 * The home page component
 */
function Home() {
	const getUserName = useGetUsername();
	const navigate = useNavigate();
	const logOut = useLogOut();

	const [username] = useState(getUserName());

	if (username !== '') {
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
						File <span className="db">Up</span>load
					</h2>
					<FileUpload></FileUpload>
					{
						// TODO: Only for development
					}
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
						Logout
					</button>
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
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;

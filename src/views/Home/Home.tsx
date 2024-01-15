import { Link, useNavigate } from 'react-router-dom';
import './Home.scss';
import { useState } from 'react';
import { useGetUsername, useLogOut } from '../../providers/UserProvider';
import Navbar from '../../components/Navbar/Navbar';
import FileUpload from '../../components/FileUpload/FileUpload';

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
						Document <span className="db">Up</span>load
					</h2>
					<FileUpload organizationProp={undefined}></FileUpload>
					{/* <AttributeAdder></AttributeAdder> */}
					{
						// TODO: Only for development (remove later)
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
						<i className="bi bi-box-arrow-left mr"></i>Logout
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
						<i className="bi bi-box-arrow-in-right mr icon"></i>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;

import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { useState } from 'react';
import { useGetUsername } from '../../providers/UserProvider';
import { useIsDarkTheme, useToggleTheme } from '../../providers/ThemeProvider';

/**
 * The navbar component
 */
function Navbar() {
	const navigate = useNavigate();

	const getUserName = useGetUsername();

	const [username] = useState(getUserName());

	const [testStyle, setTestStyle] = useState({});

	const isDarkMode = useIsDarkTheme();
	const toggleTheme = useToggleTheme();

	return (
		<div className="Navbar">
			<div
				className="logo"
				onClick={() => navigate('/')}
				style={testStyle}
			>
				wanna<span className="db">db</span>
			</div>
			<div className="links">
				<div
					className="test"
					onDoubleClick={() => {
						if (JSON.stringify(testStyle) === '{}') {
							setTestStyle({
								animation: 'spin 1s linear infinite',
							});
							return;
						}
						setTestStyle({});
					}}
				></div>
				{isDarkMode ? (
					<i
						className="bi bi-brightness-high-fill mr icon-no-hover"
						style={{
							fontSize: '1.2rem',
						}}
						onClick={toggleTheme}
					></i>
				) : (
					<i
						className="bi bi-moon-fill mr icon-no-hover"
						style={{
							fontSize: '1.2rem',
						}}
						onClick={toggleTheme}
					></i>
				)}
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				{/* 				<a
					href="https://www.youtube.com/watch?v=A7AjtPGt2rM"
					target="_blank"
				>
					About
				</a>
 */}{' '}
				<Link to="/settings">Settings</Link>
				{username !== '' ? (
					<Link to={'/profile'}>
						<div className="profilePicture">
							{username.slice(0, 1).toUpperCase()}
						</div>
					</Link>
				) : (
					<Link to={'/login'}>Login</Link>
				)}
			</div>
		</div>
	);
}

export default Navbar;

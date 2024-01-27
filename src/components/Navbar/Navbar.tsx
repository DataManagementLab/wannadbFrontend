import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { useState } from 'react';
import { useGetUsername, useLoggedIn } from '../../providers/UserProvider';
import { useIsDarkTheme, useToggleTheme } from '../../providers/ThemeProvider';
import Icon from '../Icon/Icon';

/**
 * The navbar component
 */
function Navbar() {
	const navigate = useNavigate();

	const getUserName = useGetUsername();
	const isLoggedIn = useLoggedIn();

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
					<Icon
						cls="bi bi-brightness-high-fill mr icon-no-hover"
						style={{
							fontSize: '1.2rem',
						}}
						onClicked={toggleTheme}
					>
						Turn on the lights
					</Icon>
				) : (
					<Icon
						cls="bi bi-moon-fill mr icon-no-hover"
						style={{
							fontSize: '1.2rem',
						}}
						onClicked={toggleTheme}
					>
						Turn off the lights
					</Icon>
				)}
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				<Link to="/settings">Settings</Link>
				<Link to="/help">
					{/* <i className="bi bi-question-circle icon"></i> */}
					Help
				</Link>
				{isLoggedIn() ? (
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

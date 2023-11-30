import { Link, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { useState } from 'react';
import { useGetUsername } from '../../providers/UserProvider';

/**
 * The navbar component
 */
function Navbar() {
	const navigate = useNavigate();

	const getUserName = useGetUsername();

	const [username] = useState(getUserName());

	return (
		<div className="Navbar">
			<div className="logo" onClick={() => navigate('/')}>
				wanna<span className="db">db</span>
			</div>
			<div className="links">
				{/* <div className="toggle-switch">
                    <label className="switch-label">
                        {React.createElement('input', {
                            type: 'checkbox',
                            defaultChecked: !isDarkTheme,
                            onChange: toggleTheme,
                            className: 'checkbox',
                        })}
                        <span className="slider"></span>
                    </label>
                </div> */}
				<Link to="/">Home</Link>
				<a
					href="https://www.youtube.com/watch?v=A7AjtPGt2rM"
					target="_blank"
				>
					About
				</a>
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

import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import { useState } from 'react';
import APIService from '../../utils/ApiService';
import { useShowNotification } from '../../providers/NotificationProvider';

/**
 * A page where the user can register a new account.
 */
function Register() {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(' ');

	const showNotification = useShowNotification();
	const navigate = useNavigate();

	const onRegister = () => {
		if (password !== repeatPassword) {
			setErrorMessage('Passwords do not match!');
			return;
		}

		if (password.length < 3) {
			setErrorMessage('Password must be at least 3 characters long!');
			return;
		}

		if (name.length < 3) {
			setErrorMessage('Username must be at least 3 characters long!');
			return;
		}

		// All inputs are valid, register the user at the backend

		APIService.register(name, password).then((success) => {
			if (!success) {
				setErrorMessage('Username already taken!');
				return;
			}
			showNotification('Success', 'You have successfully registered!');
			setErrorMessage(' ');
			navigate('/login');
		});
	};

	return (
		<div className="Register">
			<h1>
				wanna<span className="db">db</span> <br />
				<i>REGISTER</i>
			</h1>
			<div>
				<p className="errorMsg">{errorMessage}</p>
				<input
					type="text"
					placeholder="Username"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Repeat Password"
					value={repeatPassword}
					onChange={(e) => setRepeatPassword(e.target.value)}
				/>

				<button className="btn" onClick={onRegister}>
					Register
				</button>
				<Link className="btn" to="/login">
					Back
				</Link>
			</div>
		</div>
	);
}

export default Register;

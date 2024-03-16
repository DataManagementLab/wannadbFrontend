import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import '../../styles/form.scss';
import { useState } from 'react';
import APIService from '../../utils/ApiService';
import { useShowNotification } from '../../providers/NotificationProvider';
import getRandomUsername from '../../data/getRandomUsername';

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

	const [randomUserName] = useState(getRandomUsername());

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
		if (name.includes(' ')) {
			setErrorMessage('Username cannot contain spaces!');
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
		<div className="Register myForm">
			<h1>
				wanna<span className="db">db</span> <br />
				<i>REGISTER</i>
			</h1>
			<div>
				<p className="errorMsg">{errorMessage}</p>
				<p
					style={{
						textAlign: 'center',
						fontSize: '14px',
						marginTop: '0',
					}}
				>
					<i>
						No idea?
						<br />
						Why not try
						<span
							style={{ cursor: 'pointer', fontWeight: 'bold' }}
							onClick={() => setName(randomUserName)}
						>
							{randomUserName}
						</span>
					</i>
				</p>
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

import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import '../../styles/form.scss';
import { useState } from 'react';
import APIService from '../../utils/ApiService';
import { useLogin } from '../../providers/UserProvider';

/**
 * The login component
 */
function Login() {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(' ');

	const navigate = useNavigate();
	const login = useLogin();

	const onLogin = () => {
		APIService.login(name, password).then((data) => {
			if (data) {
				setErrorMessage(' ');
				login(name);
				navigate('/');
			} else {
				setErrorMessage('Invalid username or password!');
			}
		});
	};

	return (
		<div className="login myForm">
			<h1>
				wanna<span className="db">db</span> <br />
				<i>LOGIN</i>
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
				<button className="btn" onClick={onLogin}>
					Login
				</button>
				<Link className="btn" to="/">
					Back
				</Link>
				<p>
					Don't have an account?{' '}
					<Link to="/register" style={{ color: 'var(--text-color)' }}>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;

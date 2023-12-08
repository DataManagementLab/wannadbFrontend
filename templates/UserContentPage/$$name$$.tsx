import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useLoggedIn } from '../../providers/UserProvider';
import './$$name$$.scss';

function $$name$$() {
	const navigate = useNavigate();
	const isLoggedIn = useLoggedIn();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/');
		}
	});

	return (
		<div className="$$name$$">
			<Navbar />
			<div className="content">
				<h1>Welcome to $$name$$!</h1>
				{/* Add your content here */}
			</div>
		</div>
	);
}

export default $$name$$;

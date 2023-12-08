import { Link } from 'react-router-dom';
import './$$name$$.scss';
import '../../styles/form.scss';
import { useState } from 'react';

function $$name$$() {
	const [errorMessage, setErrorMessage] = useState(' ');
	const [text, setText] = useState('');

	const onSubmit = () => {
		setErrorMessage('$$name$$ not implemented');
	};

	return (
		<div className="$$name$$ myForm">
			<h1>
				wanna<span className="db">db</span>
				<br />
				<i>$$name$$</i>
			</h1>
			<div>
				<p className="errorMsg">{errorMessage}</p>
				<input
					type="text"
					placeholder="$$name$$Text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button className="btn" onClick={onSubmit}>
					Submit
				</button>
				<Link className="btn" to="/">
					Back
				</Link>
			</div>
		</div>
	);
}
export default $$name$$;

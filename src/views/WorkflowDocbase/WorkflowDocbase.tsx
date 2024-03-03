import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useLoggedIn } from '../../providers/UserProvider';
import './WorkflowDocbase.scss';
import DocBaseOverview from '../../components/DocBaseOverview/DocBaseOverview';
/**
 *  The WorkflowDocbase page component
 */
function WorkflowDocbase() {
	const navigate = useNavigate();
	const isLoggedIn = useLoggedIn();
	const [counter] = useState(0);

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/');
		}
	});

	return (
		<div className="WorkflowDocbase">
			<Navbar />
			<div className="content">
				<h1>
					<span className="db">3.</span> Create a DocBase
				</h1>
				<p>
					Now you can create a from your documents that you just
					uploaded. You will be redirected to the DocBase creation
					page. After you have created a DocBase you can come back
					here with the back button.
				</p>
				<DocBaseOverview
					counter={counter}
					organizationProp={undefined}
					showITP={false}
				></DocBaseOverview>
				<button
					className="btn"
					style={{
						marginTop: '50px',
						marginBottom: '50px',
					}}
					onClick={() => {
						navigate('/workflow/table-population');
					}}
				>
					Next Step
				</button>
			</div>
		</div>
	);
}

export default WorkflowDocbase;

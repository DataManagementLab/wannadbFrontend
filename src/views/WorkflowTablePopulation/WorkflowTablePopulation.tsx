import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useLoggedIn } from '../../providers/UserProvider';
import './WorkflowTablePopulation.scss';
import DocBaseOverview from '../../components/DocBaseOverview/DocBaseOverview';

/**
 *  The WorkflowTablePopulation page component
 */
function WorkflowTablePopulation() {
	const navigate = useNavigate();
	const isLoggedIn = useLoggedIn();
	const [counter] = useState(0);

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/');
		}
	});

	return (
		<div className="WorkflowTablePopulation">
			<Navbar />
			<div className="content">
				<h1>
					<span className="db">4.</span> Start a interactive table
					population
				</h1>
				<p className="workflow-step-description">
					Now you can start a interactive table population from the
					docbase you just created. There you can accept the generated
					results for the documents or suggest new ones.
				</p>
				<DocBaseOverview
					counter={counter}
					organizationProp={undefined}
					onlyITP
				></DocBaseOverview>
				<button
					className="btn"
					style={{
						marginTop: '50px',
						marginBottom: '50px',
					}}
					onClick={() => {
						navigate('/');
					}}
				>
					Finish!
				</button>
			</div>
		</div>
	);
}

export default WorkflowTablePopulation;

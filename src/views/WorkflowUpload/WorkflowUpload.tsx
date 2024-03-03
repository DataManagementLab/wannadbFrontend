import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { useLoggedIn } from '../../providers/UserProvider';
import './WorkflowUpload.scss';
import FileUpload from '../../components/FileUpload/FileUpload';

/**
 *  The WorkflowUpload page component
 */
function WorkflowUpload() {
	const navigate = useNavigate();
	const isLoggedIn = useLoggedIn();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/');
		}
	});

	return (
		<div className="WorkflowUpload">
			<Navbar />
			<div className="content">
				<h1>
					<span className="db">2.</span> Upload your documents
				</h1>
				<p>
					Upload your documents to your organization. You can upload
					txt and bson files and manage them in your organization.
				</p>
				<FileUpload
					organizationProp={undefined}
					afterUpload={() => {}}
				></FileUpload>
				<button
					className="btn"
					style={{
						marginTop: '50px',
						marginBottom: '50px',
					}}
					onClick={() => {
						navigate('/workflow/docbase');
					}}
				>
					Next Step
				</button>
			</div>
		</div>
	);
}

export default WorkflowUpload;

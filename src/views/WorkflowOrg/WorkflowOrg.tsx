import { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useLoggedIn } from '../../providers/UserProvider';
import './WorkflowOrg.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useGetUsername } from '../../providers/UserProvider';
import { useShowChoiceNotification } from '../../providers/NotificationProvider';
import Organization from '../../types/Organization';
import {
	useGetOrganizations,
	useUpdateOrganizations,
} from '../../providers/OrganizationProvider';
import APIService from '../../utils/ApiService';
import Icon from '../../components/Icon/Icon';

/**
 * The WorkflowOrg page component
 */
function WorkflowOrg() {
	const navigate = useNavigate();
	const showChoice = useShowChoiceNotification();

	const getUserName = useGetUsername();
	const isLoggedIn = useLoggedIn();

	const getOrganizations = useGetOrganizations();
	const updateOrganizations = useUpdateOrganizations();

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/');
		}
	});

	return (
		<div className="WorkflowOrg">
			<Navbar />
			<div className="content">
				<h1>
					<span className="db">1.</span> Add a new organization
				</h1>
				<p className="workflow-step-description">
					Add an organization where you can upload and manage your
					documents. You can invite other users to join your
					organization and work together.
				</p>
				<div className="orgs">
					{getOrganizations().length > 0 &&
						getOrganizations().map((org: Organization) => (
							<li key={org.id} className="orgItem">
								<p
									key={org.id + 'Name'}
									onClick={() => {
										navigate('/organization/' + org.id);
									}}
									style={{ cursor: 'pointer' }}
								>
									{org.name}
									<span
										style={{
											opacity: '0.2',
											fontWeight: '200',
										}}
									>
										{'#' + org.id}
									</span>
								</p>
								<Icon
									cls="bi bi-eye icon"
									onClicked={() => {
										navigate('/organization/' + org.id);
									}}
								>
									View Organization
								</Icon>
								{getUserName() + 'Org' !== org.name && (
									<>
										<Icon
											cls="bi bi-plus-lg icon"
											onClicked={() => {
												navigate(
													'/organization/add/' +
														org.id
												);
											}}
										>
											Add Member
										</Icon>
										<Icon
											cls="bi bi-door-closed icon"
											onClicked={() => {
												showChoice(
													'Leave Organization',
													'Are you sure you want to leave ' +
														org.name +
														'?',
													() => {
														APIService.leaveOrganization(
															org.id
														).then(() => {
															updateOrganizations();
														});
													},
													() => {},
													'Leave',
													'Cancel'
												);
											}}
										>
											Leave Organization
										</Icon>
									</>
								)}
							</li>
						))}
					<Link
						className="btn create"
						to="/organization/create"
						style={{ marginTop: '25px' }}
					>
						<i className="bi bi-plus-square icon mr"></i>New
					</Link>
				</div>
				<button
					className="btn"
					style={{
						marginTop: '50px',
						marginBottom: '50px',
					}}
					onClick={() => {
						navigate('/workflow/upload');
					}}
				>
					Next Step
				</button>
			</div>
		</div>
	);
}

export default WorkflowOrg;

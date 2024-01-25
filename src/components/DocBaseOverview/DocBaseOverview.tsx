import { useEffect, useState } from 'react';
import { useGetOrganizations } from '../../providers/OrganizationProvider';
import Organization from '../../types/Organization';
import './DocBaseOverview.scss';
import APIService from '../../utils/ApiService';
import MyDocument from '../../types/MyDocument';
import { Link } from 'react-router-dom';

interface Props {
	organizationProp: Organization | undefined;
}

/**
 * A list of all DocBases of an organization.
 */
function DocBaseOverview({ organizationProp }: Props) {
	const [docBases, setDocBases] = useState<MyDocument[]>([]);
	const [fileCount, setFileCount] = useState<number>(0);
	const [selectedOrgID, setSelectedOrgID] = useState<number>(-1);

	const getOrganizations = useGetOrganizations();

	useEffect(() => {
		APIService.getOrganizationNames().then((orgs) => {
			let orgID = -1;
			if (organizationProp !== undefined) {
				orgID = organizationProp.id;
			} else if (orgs !== undefined && orgs.length > 0) {
				orgID = orgs[0].id;
			}
			loadDocBases(orgID);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loadDocBases = (orgID: number) => {
		if (orgID === -1) {
			setDocBases([]);
			return;
		}
		APIService.getDocumentBaseForOrganization(orgID).then(
			(response: MyDocument[]) => {
				setDocBases(response);
			}
		);
		APIService.getDocumentForOrganization(orgID).then(
			(response: MyDocument[]) => {
				setFileCount(response.length);
			}
		);
		setSelectedOrgID(orgID);
	};

	if (getOrganizations().length === 0) {
		return (
			<p>
				<i>
					You have to be a member of an organization to create a
					DocBase.
				</i>
			</p>
		);
	}

	return (
		<div className="DocBaseOverview">
			{(organizationProp === undefined && getOrganizations().length) ===
				1 && (
				<p>
					Organization:{' '}
					<b className="ml">{getOrganizations()[0].name}</b>
				</p>
			)}
			{organizationProp == undefined && getOrganizations().length > 1 && (
				<div className="hor mb">
					<p>
						<b>Select an Organization:</b>
					</p>
					<select
						className="btn"
						style={{
							marginLeft: '20px',
							padding: '5px',
						}}
						name="organization"
						id="organization"
						onChange={(e) => {
							const name = e.target.value;
							const organization = getOrganizations().find(
								(org) => org.name === name
							);
							if (organization === undefined) return;
							loadDocBases(organization.id);
						}}
					>
						{getOrganizations().map((organization) => (
							<option
								value={organization.name}
								key={organization.id}
							>
								{organization.name}
							</option>
						))}
					</select>
				</div>
			)}
			{docBases.length === 0 ? (
				<p>
					<i>You dont have any DocBase yet.</i>
				</p>
			) : (
				<ul>
					{docBases.map((docBase) => (
						<div className="hor" key={docBase.id}>
							<li
								className="my-list-item"
								style={{
									minWidth: '250px',
								}}
							>
								{docBase.name}
							</li>
							<i className="bi bi-list-task icon"></i>
						</div>
					))}
				</ul>
			)}
			{fileCount > 0 && (
				<Link
					className="lnk mt"
					to={'/organization/' + selectedOrgID + '/docbase/new'}
					style={{
						width: '100px',
						paddingTop: '10px',
						paddingBottom: '10px',
					}}
				>
					<i className="bi bi-plus-square icon mr"></i>New
				</Link>
			)}
			{fileCount == 0 && (
				<i>Please upload a document to create a document base.</i>
			)}
		</div>
	);
}
export default DocBaseOverview;

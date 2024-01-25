import { useEffect, useState } from 'react';
import './NewDocBase.scss';
import Navbar from '../../components/Navbar/Navbar';
import AttributeAdder from '../../components/AttributeAdder/AttributeAdder';
import { useUpdateOrganizations } from '../../providers/OrganizationProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoggedIn } from '../../providers/UserProvider';
import { useSetLoadingScreen } from '../../providers/LoadingScreenProvider';
import Organization from '../../types/Organization';
import MyDocument from '../../types/MyDocument';
import APIService from '../../utils/ApiService';
import { useShowChoiceNotification } from '../../providers/NotificationProvider';
import DocumentViewer from '../../components/DocumentViewer/DocumentViewer';
import DocbaseViewer from '../../components/DocbaseViewer/DocbaseViewer';
import DocBase from '../../types/DocBase';
import {
	useCreateDocbaseTask,
	useIsDocbaseTaskRunning,
} from '../../providers/DocBaseTaskProvider';
import getRandomBaseName from '../../data/getRandomBaseName';
import Icon from '../../components/Icon/Icon';

/**
 * A page for creating a new Docbase
 */
function NewDocBase() {
	const [organization, setOrganization] = useState<Organization>(
		new Organization('Error', -1)
	);
	const [newDocBase, setNewDocBase] = useState<DocBase | undefined>(
		undefined
	);
	const [documents, setDocuments] = useState<MyDocument[]>([]);
	const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
	const [viewDocument, setViewDocument] = useState<MyDocument | undefined>(
		undefined
	);
	const navigate = useNavigate();
	const isLoggedIn = useLoggedIn();
	const updateOrganizations = useUpdateOrganizations();
	const showChoice = useShowChoiceNotification();
	const setLoadingScreen = useSetLoadingScreen();
	const isDocbaseTaskRunning = useIsDocbaseTaskRunning();
	const createDocBase = useCreateDocbaseTask();

	const [name, setName] = useState<string>('');
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [attList, setAttList] = useState<string[]>([]);
	const [randomBaseName] = useState(getRandomBaseName());

	const [docBaseNames, setDocBaseNames] = useState<string[]>([]);

	const onRun = () => {
		if (name.trim() === '') {
			setErrorMsg('Please enter a name');
			return;
		}
		if (docBaseNames.includes(name)) {
			setErrorMsg('A Docbase with this name already exists');
			return;
		}
		if (selectedDocuments.length === 0) {
			setErrorMsg('Please select at least one document');
			return;
		}
		if (attList.length === 0) {
			setErrorMsg('Please add at least one attribute');
			return;
		}
		setErrorMsg('');
		createDocBase(organization.id, name, selectedDocuments, attList);
	};

	const onDocumentClick = (id: number) => {
		if (selectedDocuments.includes(id)) {
			setSelectedDocuments(
				selectedDocuments.filter((docId) => docId !== id)
			);
		} else {
			setSelectedDocuments([...selectedDocuments, id]);
		}
	};

	const selectAllDocuments = () => {
		setSelectedDocuments(documents.map((doc) => doc.id));
	};

	const goBack = () => {
		if (
			name === '' &&
			selectedDocuments.length === 0 &&
			attList.length === 0
		) {
			window.history.back();
			return;
		}

		showChoice(
			'Unsaved changes',
			'You have unsaved changes. Are you sure you want to leave the page (changes will be lost) ?',
			() => {
				window.history.back();
			},
			() => {}
		);
	};

	const { id } = useParams();

	useEffect(() => {
		if (!isLoggedIn || !id) {
			navigate('/');
		}
		setLoadingScreen(true, 'Loading organization test...');
		updateOrganizations().then((orgs) => {
			const org = id
				? orgs.find((org) => org.id === parseInt(id))
				: undefined;
			if (!org) {
				navigate('/');
				return;
			}
			setOrganization(org);

			APIService.getDocumentForOrganization(org.id).then((docs) => {
				setDocuments(docs);
				setLoadingScreen(false);
			});
			APIService.getDocumentBaseForOrganization(org.id).then(
				(docBases) => {
					setDocBaseNames(docBases.map((docBase) => docBase.name));
				}
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{viewDocument && (
				<DocumentViewer
					document={viewDocument}
					onClose={() => {
						setViewDocument(undefined);
					}}
					editable={false}
				/>
			)}
			{newDocBase && (
				<DocbaseViewer
					docBase={newDocBase}
					onClose={() => {
						+setNewDocBase(undefined);
						navigate('/organization/' + organization.id);
					}}
				/>
			)}
			<div className="NewDocBase">
				<Navbar />
				<div className="content">
					<h1>
						Create new Docbase in Organization{' '}
						<i>{organization.name}</i>
					</h1>
					<h2>Name</h2>
					<p
						style={{
							fontSize: '14px',
							marginTop: '0',
						}}
					>
						<i>
							No idea?
							<br />
							Why not try
							<span
								style={{
									cursor: 'pointer',
									fontWeight: 'bold',
								}}
								onClick={() => setName(randomBaseName)}
							>
								{' ' + randomBaseName}
							</span>
						</i>
					</p>
					<input
						type="text"
						className="ipt"
						placeholder="Enter a name for the Docbase"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<h2>Documents</h2>
					{documents.map((doc) => {
						return (
							<div key={doc.id} className="docRow hor cPointer">
								<Icon
									cls={
										'bi icon ' +
										(selectedDocuments.includes(doc.id)
											? 'bi-check-circle'
											: 'bi-circle')
									}
									onClicked={() => {
										onDocumentClick(doc.id);
									}}
								>
									{selectedDocuments.includes(doc.id)
										? 'Unselect Document'
										: 'Select Document'}
								</Icon>
								<p
									style={{
										minWidth: '300px',
									}}
									onClick={() => {
										onDocumentClick(doc.id);
									}}
								>
									<b>{doc.name}</b>
								</p>
								<Icon
									cls="bi bi-eye icon"
									onClicked={() => {
										setViewDocument(doc);
									}}
								>
									View Document
								</Icon>
							</div>
						);
					})}
					{documents.length > 1 && (
						<button
							className="btn mt mb"
							onClick={selectAllDocuments}
						>
							Select all
						</button>
					)}
					<h2>Attributes</h2>
					<AttributeAdder
						populateAble={false}
						onListChange={(list) => {
							setAttList(list);
						}}
					></AttributeAdder>
					<p
						className="mt"
						style={{
							color: 'red',
							minHeight: '20px',
						}}
					>
						{errorMsg}
					</p>
					<div>
						{!isDocbaseTaskRunning() && (
							<button className="btn" onClick={onRun}>
								<i className="bi bi-play-fill icon mr"></i>Run
							</button>
						)}
					</div>
					<button
						className="btn"
						style={{ marginBottom: '100px', marginTop: '50px' }}
						onClick={goBack}
					>
						Back
					</button>
				</div>
			</div>
		</>
	);
}

export default NewDocBase;

import { useEffect, useState } from 'react';
import './NewDocBase.scss';
import Navbar from '../../components/Navbar/Navbar';
import AttributeAdder from '../../components/AttributeAdder/AttributeAdder';

/**
 * A page for creating a new Docbase
 */
function NewDocBase() {
	//const navigate = useNavigate();
	//const isLoggedIn = useLoggedIn();
	//const setLoadingScreen = useSetLoadingScreen();

	const [name, setName] = useState<string>('');
	const [errorMsg, setErrorMsg] = useState<string>('');
	const [attList, setAttList] = useState<string[]>([]);

	const onRun = () => {
		if (name.trim() === '') {
			setErrorMsg('Please enter a name');
			return;
		}
		if (attList.length === 0) {
			setErrorMsg('Please add at least one attribute');
			return;
		}
		setErrorMsg('');
	};

	useEffect(() => {
		/* if (!isLoggedIn || !id) {
			navigate('/');
		}
		setLoadingScreen(true, 'Loading organization...');
		updateOrganizations().then((orgs) => {
			const org = id
				? orgs.find((org) => org.id === parseInt(id))
				: undefined;
			if (!org) {
				navigate('/');
				return;
			}
			setOrganization(org);

			// Get members
			APIService.getMembersForOrganization(org.id).then((members) => {
				if (!members) {
					console.error('Failed to get members for org ' + org.id);
					return;
				}
				setMembers(members);
			});
			APIService.getDocumentForOrganization(org.id).then((docs) => {
				setDocuments(docs);
				setLoadingScreen(false);
			});
		}); */
	});

	return (
		<div className="NewDocBase">
			<Navbar />
			<div className="content">
				<h1>
					Create new Docbase in Organization <i>ORGNAME</i>
				</h1>
				<h2>Name</h2>
				<input
					type="text"
					className="ipt"
					placeholder="Enter a name for the Docbase"
					onChange={(e) => setName(e.target.value)}
				/>
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
				<button className="btn" onClick={onRun}>
					<i className="bi bi-play-fill icon mr"></i>Run
				</button>
			</div>
		</div>
	);
}

export default NewDocBase;

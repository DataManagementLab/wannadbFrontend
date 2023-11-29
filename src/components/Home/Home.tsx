import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Home.scss';
import { ChangeEvent, useState } from 'react';
import APIService from '../../utils/ApiService';
import { useGetUsername } from '../../providers/UserProvider';

function Home() {
	const getUserName = useGetUsername();

	const [username] = useState(getUserName());

	const [file, setFile] = useState<string | ArrayBuffer | null>(null);
	const [fileName, setFileName] = useState<string | ArrayBuffer | null>(null);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		// Get the selected file
		const selectedFile = event.target.files && event.target.files[0];

		if (selectedFile) {
			// Read the file content
			const reader = new FileReader();
			reader.onload = (e) => {
				// Set the file content to state
				setFile(e.target?.result as string);
				setFileName(selectedFile.name);
			};
			reader.readAsText(selectedFile);
		}
	};

	const handleUpload = () => {
		APIService.upload(username, fileName as string, file as string).then(
			(res) => {
				alert(res);
				setFile(null);
				setFileName(null);
			}
		);
	};

	if (username !== '') {
		return (
			<div className="Home">
				<Navbar />
				<div className="content">
					<h1 className="title">
						Hi {username.slice(0, -2)}
						<span className="db">{username.slice(-2)}</span> 👋
					</h1>
					<input
						type="file"
						onChange={handleFileChange}
						accept=".txt"
					/>
					<div className="ver">
						<button
							className="btn uploadFile"
							style={{ width: '200px' }}
							onClick={handleUpload}
							disabled={!file}
						>
							Upload File
						</button>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="Home">
			<Navbar />
			<div className="content">
				<h1 className="title">
					Welcome to wanna<span className="db">db</span>!
				</h1>
				<div className="ver">
					<Link className="subtitle" to="/login">
						Please log in to continue.
					</Link>
					<Link
						to="/login"
						className="btn"
						style={{ width: '100px' }}
					>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;

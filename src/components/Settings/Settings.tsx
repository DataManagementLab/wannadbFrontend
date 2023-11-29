import {
	useAcceptCookie,
	useCookieAllowed,
	useRejectCookies,
} from '../../providers/StorageProvider';
import { useIsDarkTheme, useToggleTheme } from '../../providers/ThemeProvider';
import Navbar from '../Navbar/Navbar';
import './Settings.scss';

function Settings() {
	const cookiesAllowed = useCookieAllowed();
	const allowCookies = useAcceptCookie();
	const rejectCookies = useRejectCookies();

	const isDarkMode = useIsDarkTheme();
	const toggleTheme = useToggleTheme();

	return (
		<div className="Settings">
			<Navbar></Navbar>
			<div className="content">
				<h1 className="title">
					<span className="db">Se</span>ttings
				</h1>
				<div className="ver">
					<h2>Appearance</h2>
					<button className="btn" onClick={toggleTheme}>
						{isDarkMode ? 'Light Mode' : 'Dark Mode'}
					</button>
					<h2>Storage</h2>
					{cookiesAllowed ? (
						<button className="btn" onClick={rejectCookies}>
							Reject Cookies
						</button>
					) : (
						<button className="btn" onClick={allowCookies}>
							Accept Cookies
						</button>
					)}
					<button
						className="btn"
						onClick={() => {
							localStorage.clear();
						}}
					>
						Clear
					</button>
				</div>
			</div>
		</div>
	);
}

export default Settings;

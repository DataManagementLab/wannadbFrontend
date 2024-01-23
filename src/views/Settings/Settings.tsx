import Navbar from '../../components/Navbar/Navbar';
import {
	useAcceptCookie,
	useCookieAllowed,
	useRejectCookies,
} from '../../providers/StorageProvider';
import { useIsDarkTheme, useToggleTheme } from '../../providers/ThemeProvider';
import './Settings.scss';

/**
 * The settings page component
 */
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
					Se<span className="db">tt</span>ings
				</h1>
				<div className="ver">
					<h2>
						A
						<span
							className="db"
							onDoubleClick={() => {
								document.documentElement.setAttribute(
									'data-theme',
									'funky'
								);
							}}
						>
							pp
						</span>
						earance
					</h2>
					<button className="btn" onClick={toggleTheme}>
						{isDarkMode ? (
							<i className="bi bi-brightness-high-fill mr icon"></i>
						) : (
							<i className="bi bi-moon-fill mr icon"></i>
						)}
						{isDarkMode ? 'Light Mode' : 'Dark Mode'}
					</button>
					<h2>
						Stora<span className="db">ge</span>
					</h2>
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

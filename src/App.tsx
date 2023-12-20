import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import { StorageProvider } from './providers/StorageProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { UserProvider } from './providers/UserProvider';
import Settings from './components/Settings/Settings';
import { NotificationProvider } from './providers/NotificationProvider';
import CreateOrg from './components/CreateOrg/CreateOrg';
import { OrganizationProvider } from './providers/OrganizationProvider';
import About from './components/About/About';

// The main component of the application
function App() {
	return (
		<div className="wrapper">
			<NotificationProvider>
				<StorageProvider>
					<ThemeProvider>
						<OrganizationProvider>
							<UserProvider>
								<BrowserRouter>
									<Routes>
										<Route path="/" Component={Home} />
										<Route
											path="/login"
											Component={Login}
										/>
										<Route
											path="/organization/create"
											Component={CreateOrg}
										/>
										<Route
											path="/register"
											Component={Register}
										/>
										<Route
											path="/settings"
											Component={Settings}
										/>
										<Route
											path="/about"
											Component={About}
										/>
										<Route
											path="/profile"
											Component={Profile}
										/>
										<Route path="*" Component={Home} />
									</Routes>
								</BrowserRouter>
							</UserProvider>
						</OrganizationProvider>
					</ThemeProvider>
				</StorageProvider>
			</NotificationProvider>
		</div>
	);
}

export default App;

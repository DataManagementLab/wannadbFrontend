import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import { StorageProvider } from './providers/StorageProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import { UserProvider } from './providers/UserProvider';
import Settings from './components/Settings/Settings';

function App() {
	return (
		<div className="wrapper">
			<StorageProvider>
				<ThemeProvider>
					<UserProvider>
						<BrowserRouter>
							<Routes>
								<Route path="/" Component={Home} />
								<Route path="/login" Component={Login} />
								<Route path="/register" Component={Register} />
								<Route path="/settings" Component={Settings} />
								<Route path="/profile" Component={Profile} />
							</Routes>
						</BrowserRouter>
					</UserProvider>
				</ThemeProvider>
			</StorageProvider>
		</div>
	);
}

export default App;

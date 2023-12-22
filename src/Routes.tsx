import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import Home from './components/Home/Home';
import CreateOrg from './components/CreateOrg/CreateOrg';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Settings from './components/Settings/Settings';
import About from './components/About/About';
import Profile from './components/Profile/Profile';

/**
 * All of our routes are defined here.
 */
function Routes() {
	return (
		<BrowserRouter>
			<ReactRoutes>
				<Route path="/" Component={Home} />
				<Route path="/login" Component={Login} />
				<Route path="/organization/create" Component={CreateOrg} />
				<Route path="/register" Component={Register} />
				<Route path="/settings" Component={Settings} />
				<Route path="/about" Component={About} />
				<Route path="/profile" Component={Profile} />
				<Route path="*" Component={Home} />
			</ReactRoutes>
		</BrowserRouter>
	);
}

export default Routes;

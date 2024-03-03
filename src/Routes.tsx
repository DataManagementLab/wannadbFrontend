import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import Home from './views/Home/Home';
import CreateOrg from './views/CreateOrg/CreateOrg';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import AddToOrg from './views/AddToOrg/AddToOrg';
import Profile from './views/Profile/Profile';
import OrgPage from './views/OrgPage/OrgPage';
import Settings from './views/Settings/Settings';
import About from './views/About/About';
import NewDocBase from './views/NewDocBase/NewDocBase';
import Help from './views/Help/Help';
import WorkflowOrg from './views/WorkflowOrg/WorkflowOrg';
import WorkflowUpload from './views/WorkflowUpload/WorkflowUpload';
import WorkflowDocbase from './views/WorkflowDocbase/WorkflowDocbase';
import WorkflowTablePopulation from './views/WorkflowTablePopulation/WorkflowTablePopulation';

/**
 * All of our routes are defined here.
 */
function Routes() {
	return (
		<BrowserRouter>
			<ReactRoutes>
				<Route path="/" Component={Home} />
				<Route path="/login" Component={Login} />
				<Route path="/register" Component={Register} />
				<Route path="/organization/create" Component={CreateOrg} />
				<Route path="/organization/add/:id" Component={AddToOrg} />
				<Route
					path="/organization/:id/docbase/new"
					Component={NewDocBase}
				/>
				<Route path="/organization/:id" Component={OrgPage} />
				<Route path="/settings" Component={Settings} />
				<Route path="/about" Component={About} />
				<Route path="/profile" Component={Profile} />
				<Route path="/help" Component={Help} />
				<Route path="/workflow/org" Component={WorkflowOrg} />
				<Route path="/workflow/upload" Component={WorkflowUpload} />
				<Route path="/workflow/docbase" Component={WorkflowDocbase} />
				<Route
					path="/workflow/table-population"
					Component={WorkflowTablePopulation}
				/>
				<Route path="*" Component={Home} />
			</ReactRoutes>
		</BrowserRouter>
	);
}

export default Routes;

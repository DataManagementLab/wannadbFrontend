import Routes from './Routes';
import { Providers } from './providers/Providers';

// The main component of the application
function App() {
	return (
		<div className="wrapper">
			<Providers>
				<Routes />
			</Providers>
		</div>
	);
}

export default App;

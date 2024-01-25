import Navbar from '../../components/Navbar/Navbar';
import './Help.scss';

/**
 * The help page
 */
function Help() {
	return (
		<div className="Help">
			<Navbar />
			<div className="content">
				<h1>
					wanna<span className="db">db</span> <i>HELP CENTER</i>
				</h1>
				{/* TODO*/}
			</div>
		</div>
	);
}

export default Help;

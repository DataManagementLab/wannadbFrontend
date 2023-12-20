import Navbar from '../Navbar/Navbar';
import './About.scss';

/**
 * The about page of the wannadb.
 */
function About() {
	return (
		<div className="About">
			<Navbar />
			<div className="content">
				<h1>
					What is wanna
					<span className="db">db</span>?
				</h1>
				<p style={{ width: '50%', fontSize: '20px' }}>
					WannaDB allows users to explore unstructured text
					collections by automatically organizing the relevant
					information nuggets in a table. It supports ad-hoc SQL
					queries over text collections using a novel two-phased
					approach: First, a superset of information nuggets is
					extracted from the texts using existing extractors such as
					named entity recognizers. The extractions are then
					interactively matched to a structured table definition as
					requested by the user.
				</p>
				<div className="hor linkIcons">
					<a
						target="_blank"
						href="https://www.youtube.com/watch?v=A7AjtPGt2rM"
					>
						<i className="bi bi-youtube icon"></i>
					</a>
					<a
						target="_blank"
						href="https://github.com/DataManagementLab/wannadb"
					>
						<i className="bi bi-github icon"></i>
					</a>
					<a
						target="_blank"
						href="https://dl.gi.de/items/7c629993-1e41-4d58-8ee4-5c2e0c20d23a"
					>
						<i className="bi bi-file-earmark-text-fill icon"></i>
					</a>
				</div>
			</div>
		</div>
	);
}

export default About;

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
					WannaDB represents a method for efficiently searching and
					analyzing large collections of text. With this tool, it is
					possible to apply SQL queries directly to texts, similar to
					a database query. It transforms unstructured text data into
					structured, easily understandable information. Instead of
					manually searching through endless texts, WannaDB allows for
					targeted inquiries for specific information and presents
					them in a clear format. This tool is ideal for anyone who
					wants to quickly and effortlessly extract desired data from
					extensive texts.
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

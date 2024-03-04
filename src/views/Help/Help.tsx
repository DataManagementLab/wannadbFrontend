import Navbar from '../../components/Navbar/Navbar';
import './Help.scss';

const downLeft = { marginLeft: '5px', verticalAlign: '-2px' };
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
				<p>
					Welcome to the wanna<span className="db">db</span> help
					center. Here you will find answers to frequently asked
					questions and useful tips for using our service. <br />
					For all of these functions to work please login or register
					an new account.
				</p>

				<div className="container">
					<nav className="navigation">
						<a href="#q1">1. How to upload documents?</a>
						<br />
						<a href="#q2">2. How to use wannadb on my documents?</a>
						<br />
						<a href="#q3">3. How can i interact with a DocBase?</a>
					</nav>
				</div>
				<section id="q1">
					<h3> How to upload documents?</h3>
					{
						<ol>
							<li>
								<p>
									Navigate to the Homepage. At the top you
									will see the 'Document Upload' section.
								</p>
							</li>
							<li>
								<p>
									First select the organization you want to
									upload the files to. By default your
									personal document-storage is selected.
								</p>
							</li>
							<li>
								<p>
									After pressing the 'Browse...' button, a
									pop-up will appear, where you can browse and
									select all files you want to upload.
								</p>
							</li>
							<li className="liIcon">
								<p>
									Using the 'Add' button will show all files
									you've selected. By using 'discard' all
									selected files will be lost.
								</p>
							</li>
							<li className="liIcon">
								<p>
									You can remove documents by pressing
									<i
										className="bi bi-x-circle icon icon -mr"
										style={downLeft}
									></i>{' '}
									'Remove Document' next to the file.{' '}
								</p>
							</li>
							<li>
								<p>
									By pressing{' '}
									<i
										className="bi bi-cloud-arrow-up-fill icon -mr2"
										style={{
											verticalAlign: '-2px',
										}}
									></i>{' '}
									'Upload' you complete the process and can
									now use the newly uploaded documents.
								</p>
							</li>
						</ol>
					}
				</section>

				<section id="q2">
					<h3>
						How can i use wanna
						<span className="db">db</span> on my documents?
					</h3>
					{
						<ol>
							<li>
								<p>
									After uploading the files, you now have to
									create a document base.
								</p>
							</li>
							<li>
								<p>
									Click on the "Create Document Base" button.
								</p>
							</li>
							<li>
								<p>
									First enter a name for your document base.
								</p>
							</li>
							<li>
								<p>
									Select all documents you want to use wanna
									<span className="db">db</span> on.
								</p>
							</li>
							<li className="liIcon">
								<p>
									Add or delete 'Attributes' you want the
									documents filtered for.
								</p>
							</li>
							<li>
								<p>
									Using{' '}
									<i className="bi bi-play-fill icon mr-2"></i>
									'Run' will finish the creation-process, and
									you can now see the prefiltered documents.
								</p>
							</li>
						</ol>
					}
				</section>
				<section id="q3">
					<h3>How can i interact with a DocBase</h3>
					{
						<ol>
							<li className="liIcon">
								<p>
									In the DocBase-Segment you can find your
									created document bases.
								</p>
							</li>
							<li className="liIcon">
								<p>
									By pressing{' '}
									<i className="bi bi-table icon icon"></i>{' '}
									'Start interactive table population' you can
									modify the DocBase.
									<br />
								</p>
							</li>
							<li className="liIcon">
								<p>
									This process is timed to terminate after 180
									seconds.
								</p>
							</li>
							<li>
								<p>
									For each attribute you filtered for, you can
									now
									<i
										className="bi icon ml bi-check-circle icon"
										style={downLeft}
									></i>{' '}
									confirm if the found nuggets are correct.
								</p>
							</li>
						</ol>
					}
				</section>
				<button
					className="btn ml mt mb"
					onClick={() => window.history.back()}
				>
					Back
				</button>
			</div>
		</div>
	);
}
export default Help;

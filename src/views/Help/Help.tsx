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
				{
					/* TODO*/
					<>
						<div className="container">
							<nav className="navigation">
								<a href="#q1">1. How to upload documents?</a>
								<br />
								<a href="#q2">
									2. How to use wanna
									<span className="db">db</span> on my
									documents?
								</a>
							</nav>
						</div>

						<p>
							Welcome to the wanna<span className="db">db</span>{' '}
							help center. Here you will find answers to
							frequently asked questions and useful tips for using
							our service. <br />
							For all of these functions to work please login or
							register an new account.
						</p>
						<section id="q1">
							<h3> How to upload documents?</h3>
							{
								<ol>
									<li>
										<p>
											Navigate to the Homepage. At the top
											you will see the 'Document Upload'
											section.
										</p>
									</li>
									<li>
										<p>
											First select the organization you
											want to upload the files to. By
											default your personal
											document-storage is selected.
										</p>
									</li>
									<li>
										<p>
											After pressing the 'Browse...'
											button, a pop-up will appear, where
											you can browse and select all files
											you want to upload.
										</p>
									</li>
									<li>
										<p>
											Using the 'Add' button will show all
											files you've selected. By using
											'discard' all selected files will be
											lost.
										</p>
									</li>
									<li className="liIcon">
										<p>
											You can remove documents by pressing
											'Remove Document' #icon next to the
											file.{' '}
										</p>
									</li>
									<li>
										<p>
											By pressing{' '}
											<i
												className="bi bi-cloud-arrow-up-fill icon -mr2"
												style={{
													verticalAlign: '-4px',
												}}
											></i>{' '}
											'Upload' you complete the process
											and can now use the newly uploaded
											documents.
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
											After uploading the files, you now
											have to create a document base.
										</p>
									</li>
									<li>
										<p>
											Click on the "Create Document Base"
											button.
										</p>
									</li>
									<li>
										<p>
											First enter a name for your document
											base.
										</p>
									</li>
									<li>
										<p>
											Select all documents you want to use
											wanna<span className="db">db</span>{' '}
											on.
										</p>
									</li>
									<li className="liIcon">
										<p>
											Add or delete 'Attributes' you want
											the documents filtered for.
										</p>
									</li>
									<li>
										<p>
											Using{' '}
											<i
												className="bi bi-play-fill icon mr-2"
												style={{
													verticalAlign: '-4px',
												}}
											></i>
											'Run' will finish the
											creation-process, so you can
											interact with the newly structured
											documents.
										</p>
									</li>
								</ol>
							}
						</section>
					</>
				}
			</div>
		</div>
	);
}

export default Help;

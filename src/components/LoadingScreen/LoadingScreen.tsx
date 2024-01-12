import './LoadingScreen.scss';

interface Props {
	heading: string;
	info: string;
}

/**
 * A simple loading screen
 * @param heading The heading to display
 * @param info The info to display (optional)
 */
function LoadingScreen({ heading, info = '' }: Props) {
	return (
		<div className="LoadingScreen">
			<div className="background"></div>
			<div className="loadingContent">
				<h1>{heading}</h1>
				<p>{info}</p>
				<div className="loadingAnimation">
					<div className="lds-default">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default LoadingScreen;

import { useState } from 'react';
import './LoadingScreen.scss';

interface Props {
	heading: string;
	info: string;
	id: string;
}

/**
 * A simple loading screen
 * @param heading The heading to display
 * @param info The info to display (optional)
 */
function LoadingScreen({ heading, info = '', id }: Props) {
	const [isFullscreen, setIsFullscreen] = useState<boolean>(true);

	const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	};

	return (
		<div
			className={
				isFullscreen ? 'LoadingScreenFull' : 'LoadingScreenSmall'
			}
		>
			<div className="background"></div>
			<i
				className={
					'bi icon screenBtn ' +
					(isFullscreen ? 'bi-fullscreen-exit' : 'bi-fullscreen')
				}
				onClick={toggleFullscreen}
			></i>
			<div className="loadingContent">
				<h1>{heading}</h1>
				<p className="idBox">
					<i>{id}</i>
				</p>
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

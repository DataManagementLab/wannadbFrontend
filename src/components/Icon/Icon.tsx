import { useState } from 'react';
import './Icon.scss';

interface Props {
	children?: React.ReactNode;
	cls: string;
	style?: React.CSSProperties;
	onClicked?: () => void;
}

/**
 * A Icon with a description
 */
function Icon({ children = '', cls, style, onClicked }: Props) {
	const [infoVisible, setInfoVisible] = useState<boolean>(false);

	return (
		<>
			<i
				className={cls + ' icon'}
				style={style}
				onMouseEnter={() => {
					setInfoVisible(true);
				}}
				onMouseLeave={() => {
					setInfoVisible(false);
				}}
				onClick={() => {
					if (onClicked !== undefined) {
						onClicked();
					}
				}}
			></i>
			<div
				className="iconInfo"
				style={{
					opacity:
						infoVisible && children !== '' && children !== undefined
							? 1
							: 0,
				}}
			>
				{children}
			</div>
		</>
	);
}
export default Icon;

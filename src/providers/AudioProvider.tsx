import React, { ReactNode } from 'react';
import { useStoreInLS } from './StorageProvider';

// eslint-disable-next-line react-refresh/only-export-components
export enum MyAudio {
	BING = '/src/audio/bing.mp3',
	SUCCESS = '/src/audio/success.mp3',
	POP = '/src/audio/pop.mp3',
	ERROR = '/src/audio/error.mp3',
}

const AudioContext = React.createContext({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	playAudio: (_audio: MyAudio) => {},
	toggleAudio: () => {},
	isAudioEnabled: (): boolean => {
		return false;
	},
});

// eslint-disable-next-line react-refresh/only-export-components
export function usePlayAudio() {
	const context = React.useContext(AudioContext);
	if (!context) {
		throw new Error('usePlayAudio must be used within a AudioProvider');
	}
	return context.playAudio;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToggleAudio() {
	const context = React.useContext(AudioContext);
	if (!context) {
		throw new Error('useToggleAudio must be used within a AudioProvider');
	}
	return context.toggleAudio;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useIsAudioEnabled() {
	const context = React.useContext(AudioContext);
	if (!context) {
		throw new Error(
			'useIsAudioEnabled must be used within a AudioProvider'
		);
	}
	return context.isAudioEnabled;
}

interface Props {
	children: ReactNode;
}

/**
 * A provider that plays audio
 */
export function AudioProvider({ children }: Props) {
	const [enabled, setEnabled] = React.useState(false);

	const storeInLS = useStoreInLS();

	React.useEffect(() => {
		if (localStorage.getItem('audio-allowed') === 'true') {
			setEnabled(true);
		}
	}, []);

	const play = (audio: MyAudio) => {
		if (!enabled) {
			return;
		}
		const a = new Audio(audio);
		a.addEventListener('canplaythrough', () => {
			/* the audio is now playable; play it if permissions allow */
			a.play();
		});
		a.play();
	};

	const toggle = () => {
		storeInLS('audio-allowed', JSON.stringify(!enabled));
		setEnabled(!enabled);
	};

	const isEnabled = () => {
		return enabled;
	};

	return (
		<AudioContext.Provider
			value={{
				playAudio: play,
				toggleAudio: toggle,
				isAudioEnabled: isEnabled,
			}}
		>
			{children}
		</AudioContext.Provider>
	);
}

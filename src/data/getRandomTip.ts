/** Get a tip for the usage of the website */
const getRandomTip = (): string => {
	const tips = [
		'Click on your profile to view and create a organization',
		'You can access your profile in the top right corner',
		'You can toggle the sound on and off in the settings',
		'You can minimize the loading screen in the button right corner',
		'You can view your profile by clicking on your name',
		'You can always access the home page by clicking on the logo in the top left corner',
		'This website is not optimized for mobile devices so please use a computer',
	];
	if (Math.random() <= 0.01) {
		return 'Philipp was here';
	}
	return tips[Math.floor(Math.random() * tips.length)];
};

export default getRandomTip;

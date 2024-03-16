/** Gets a name suggestion for a new docbase. */
const getRandomBaseName = (): string => {
	const names = [
		'TuringBase',
		'GatesBase',
		'JobsBase',
		'BernersLeeBase',
		'HopperBase',
		'ZuckerbergBase',
		'TorvaldsBase',
		'CerfBase',
		'BrinBase',
		'PastrnakBase',
		'CookBase',
		'DijkstraBase',
		'RitchieBase',
		'WozniakBase',
		'LovelaceBase',
		'ThompsonBase',
		'CoxBase',
		'CoddBase',
		'WangBase',
		'TanenbaumBase',
		'AndreessenBase',
		'BushBase',
		'ClarkeBase',
		'LamportBase',
		'EngelbartBase',
		'MuskBase',
		'NygaardBase',
		'NeumannBase',
		'KnuthBase',
		'WilliamsBase',
		'SchneierBase',
		'KayBase',
		'KernighanBase',
		'BaranBase',
		'WirthBase',
		'SutherlandBase',
		'ClarkBase',
		'LiskovBase',
		'ShannonBase',
		'GolubBase',
		'PerlBase',
		'FeigenbaumBase',
		'FeynmanBase',
		'CarmackBase',
		'FriedmanBase',
		'LynchBase',
		'AdlemanBase',
		'JohnsonBase',
		'WilkesBase',
		'VanVleckBase',
		'PapertBase',
		'IversonBase',
		'LampsonBase',
		'EngelBase',
		'CrayBase',
		'KnopperBase',
		'BabbageBase',
		'SmithBase',
		'StroustrupBase',
		'MillerBase',
		'RaymondBase',
		'GoslingBase',
		'WilesBase',
		'PerlisBase',
		'SimonBase',
		'ReedBase',
		'KahanBase',
		'EstrinBase',
		'FelleisenBase',
		'WilkinsonBase',
		'McCarthyBase',
		'BrooksBase',
		'PouzinBase',
		'DahlBase',
		'GosperBase',
		'AmdahlBase',
		'BachmanBase',
		'FeatherBase',
		'SussmanBase',
		'NyquistBase',
		'AllenBase',
		'BackusBase',
		'BorgBase',
		'BartikBase',
		'LeeBase',
		'SutherlandBase',
		'NashBase',
		'BorgBase',
		'ShawBase',
		'RitchieBase',
		'HoareBase',
		'EllisonBase',
		'MauchlyBase',
		'StallmanBase',
		'CerfBase',
		'KnuthBase',
		'CormackBase',
		'RamanBase',
		'GelernterBase',
		'SarbanesBase',
	];

	return names[Math.floor(Math.random() * names.length)];
};

export default getRandomBaseName;

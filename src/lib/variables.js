export const characters = [
	'Amelia Watson', 'Gawr Gura', 'Ninomae Inanis', 'Takanashi Kiara', 'Calliope Mori',
	'Hakos Baelz', 'Ouro Kronii', 'Ceres Fauna', 'Nanashi Mumei', 'Tsukumo Sana', 'IRyS',
	'Tokino Sora', 'AZKi', 'Roboco-san', 'Hoshimachi Suisei', 'Sakura Miko',
	'Shirakami Fubuki', 'Ookami Mio', 'Nekomata Okayu', 'Inugami Korone',
	'Akai Haato', 'Yozora Mel', 'Natsuiro Matsuri', 'Aki Rosenthal',
	'Oozora Subaru', 'Yuzuki Choco', 'Murasaki Shion', 'Nakiri Ayame', 'Minato Aqua',
	'Moona Hoshinova', 'Ayunda Risu', 'Airani Iofifteen',
	'Kureiji Ollie', 'Pavolia Reine', 'Anya Melfissa',
	'Kobo Kanaeru', 'Kaela Kovalskia', 'Vestia Zeta'

];

export const basicWeapons = [
	'bl-book', 'bounce-ball', 'ceos-tears', 'cutting-board', 'lava-bucket',
	'ens-curse', 'fan-beam', 'glowstick', 'holo-bomb', 'idol-song',
	'plug-in-asacoco', 'sui-axe', 'chama-cooking', 'wamy-water', 'x-potato', "sausage"
];

export const collabWeapons = [
	'absolute-wall', 'bl-fujoshi', 'bone-bros', 'breathe-in-asacoco', 'broken-dreams', "crescent-bardiche", "curse-ball",
	'dragon-fire', 'eldritch-horror', 'elite-cooking', 'flattening-board', 'frozen-sea',
	'im-die-ty-4eva', "legendary-sausage", "lightning-wiener", 'idol-concert', 'light-beam', 'micomet', 'mikorone',
	'rap-dog', 'ring-of-fitness', 'snow-sake', 'stream-of-tears'
];

export const superCollabWeapons = ['holy-fire', 'idol-live', 'jingisukan', 'snow-queen']

export const weapons = basicWeapons.concat(collabWeapons, superCollabWeapons);


export const basicCollabForumlas = {
	"absolute-wall": ["bounce-ball", "cutting-board"],
	"bl-fujoshi": ["bl-book", "sui-axe"],
	"bone-bros": ["cutting-board", "ens-curse"],
	"breathe-in-asacoco": ["holo-bomb", "plug-in-asacoco"],
	"broken-dreams": ["chama-cooking", "ceos-tears"],
	"crescent-bardiche": ['sui-axe', 'idol-song'],
	"curse-ball": ["bounce-ball", "ens-curse"],
	"dragon-fire": ["fan-beam", "plug-in-asacoco"],
	"eldritch-horror": ["chama-cooking", "ens-curse"],
	"elite-cooking": ["chama-cooking", "lava-bucket"],
	"flattening-board": ["cutting-board", "holo-bomb"],
	"frozen-sea": ["bl-book", "wamy-water"],
	"im-die-ty-4eva": ["holo-bomb", "x-potato"],
	"legendary-sausage": ["bl-boook", "sausage"],
	"idol-concert": ["glowstick", "idol-song"],
	"light-beam": ["fan-beam", "glowstick"],
	"lightning-wiener": ['plug-in-asacoco', "sausage"],
	micomet: ["lava-bucket", "sui-axe"],
	mikorone: ["lava-bucket", "x-potato"],
	"rap-dog": ["idol-song", "x-potato"],
	"ring-of-fitness": ["bounce-ball", "ceos-tears"],
	"snow-sake": ["glowstick", "wamy-water"],
	"stream-of-tears": ["ceos-tears", "fan-beam"],
};

export const superCollabFormulas = {
	"holy-fire": [
		"fan-beam",
		"plug-in-asacoco",
		"gorillas-paw",
		"super-gorillas-paw",
	],
	"idol-live": [
		"glowstick",
		"idol-song",
		"idol-costume",
		"super-idol-costume",
	],
	jingisukan: [
		"chama-cooking",
		"lava-bucket",
		"uber-sheep",
		"super-uber-sheep",
	],
	"snow-queen": ["glowstick", "wamy-water", "sake", "super-sake"],
};

export const collabForumlas = {
	...basicCollabForumlas,
	...superCollabFormulas
};

export const basicItems = [
	'blacksmiths-gear', 'body-pillow', 'breastplate', 'chickens-feather', 'credit-card',
	'devil-hat', 'energy-drink', 'face-mask', 'full-meal', 'gorillas-paw',
	'gws-pill', 'halu', 'headphones', 'hope-soda', 'idol-costume',
	'injection-type-asacoco', 'just-bandage', 'milk', 'shackles', 'limiter',
	'membership', 'horn', 'ppp', 'plushie', 'sake',
	'piggy-bank', 'glasses', 'sc-time', 'uber-sheep', 'focus-shades', 'ninja-headband', 'researchers-coat', 'candy-kingdom-sweets', 'beetle'
];

export const superItems = [
	'super-body-pillow', 'super-breastplate', 'super-chickens-feather', 'super-credit-card',
	'super-energy-drink', 'super-gorillas-paw', 'super-headphones', 'super-hope-soda', 'super-idol-costume',
	'super-milk', 'super-limiter', 'super-horn', 'super-sake', 'super-sc-time',
]

export const items = basicItems.concat(superItems);

export const stamps = [
	'atk', 'bomb', 'crit', 'greed', 'haste', 'knockback', 'life-steal', 'projectile',
	'reverse', 'rgb', 'size', 'slow', 'solo', 'stun', 'trumpet', 'weaken'
];

export const stats = ['hp-up', 'atk-up', 'spd-up', 'crt-up', 'pick-up', 'haste-up'];
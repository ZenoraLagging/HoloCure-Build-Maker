//en characters
export const myth = ['Amelia Watson', 'Gawr Gura', 'Ninomae Inanis', 'Takanashi Kiara', 'Calliope Mori', ]
export const council = ['Hakos Baelz', 'Ouro Kronii', 'Ceres Fauna', 'Nanashi Mumei', 'Tsukumo Sana']
export const projectHope = ['IRyS']
export const gamers = ['Shirakami Fubuki', 'Ookami Mio', 'Nekomata Okayu', 'Inugami Korone']

//jp characters
export const jpGen0 = ['Tokino Sora', 'AZKi', 'Roboco-san', 'Hoshimachi Suisei', 'Sakura Miko']
export const jpGen1 = ['Akai Haato', 'Yozora Mel', 'Natsuiro Matsuri', 'Aki Rosenthal']
export const jpGen2 = ['Oozora Subaru', 'Yuzuki Choco', 'Murasaki Shion', 'Nakiri Ayame', 'Minato Aqua']
export const jpGen3 = ['Usada Pekora', 'Houshou Marine', 'Shirogane Noel', 'Shiranui Flare']
export const jpGen4 = ['Kiryu Coco', 'Amane Kanata', 'Tokoyami Towa', 'Tsunomaki Watame', 'Himemori Luna']

//id characters
export const idArea15 = ['Moona Hoshinova', 'Ayunda Risu', 'Airani Iofifteen']
export const idHoloro = ['Kureiji Ollie', 'Pavolia Reine', 'Anya Melfissa']
export const idHoloH3ro = ['Kobo Kanaeru', 'Kaela Kovalskia', 'Vestia Zeta']

//concat them all
export const enCharacters = myth.concat(council, projectHope);
export const jpCharacters = gamers.concat(jpGen0, jpGen1, jpGen2, jpGen3, jpGen4);
export const idCharacters = idArea15.concat(idHoloro, idHoloH3ro);
export const characters = enCharacters.concat(jpCharacters, idCharacters);

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
	'super-glasses', 'super-idol-costume', 'super-sc-time', 'super-gorillas-paw', 'super-body-pillow',
	'super-milk', 'super-energy-drink', 'super-credit-card', 'super-chickens-feather', 'super-sake',
	'super-limiter', 'super-horn', 'super-headphones', 'super-hope-soda', 'super-breastplate', 'super-piggy-bank'
]

export const items = basicItems.concat(superItems);

export const stamps = [
	'atk', 'bomb', 'cold', 'crit', 'greed', 'haste', 'knockback', 'life-steal', 'lightness', 'marking', 'projectile',
	'reverse', 'rgb', 'size', 'slow', 'solo', 'stun', 'trumpet', 'unit', 'weaken'
];

export const stats = ['hp-up', 'atk-up', 'spd-up', 'crt-up', 'pick-up', 'haste-up'];

export const food = [{
	name: "Tempura",
	stat: "atk-up",
	effect: "30%",
	description: "Increases ATK by 30%."
}, {
	name: "Tuna Sandwich",
	stat: "spd-up",
	effect: "25%",
	description: "Increases SPD by 25%."
}, {
	name: "Sushi Set",
	stat: "crt-up",
	effect: "10%",
	description: "Increases Crit by 10%."
}, {
	name: "Poke Bowl",
	stat: "pick-up",
	effect: "40%",
	description: "Increases Pick Up Range by 40%."
}, {
	name: "Lobster Dinner",
	stat: "atk-up",
	effect: "30%",
	description: "Increase ATK by 30%."
}, {
	name: "Lobster Dinner",
	stat: {
		statOne: ["atk-up", "spd-up", "pick-up"],
		statTwo: ["hp-up", "crt-up", "haste-up"]
	},
	effect: {
		statOne: "20%",
		statTwo: "10%"
	},
	description: "Increase ATK/SPD/PUR by 20% and Max HP/Crit/Haste by 10%."
}, ]
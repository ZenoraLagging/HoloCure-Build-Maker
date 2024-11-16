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
	'BL Book', 'Bounce Ball', 'CEO\'s Tears', 'Cutting Board', 'Elite Lava Bucket',
	'EN\'s Curse', 'Fan Beam', 'Glowstick', 'Holo Bomb', 'Idol Song',
	'Plug Type Asacoco', 'Psycho Axe', 'Spider Cooking', 'Wamy Water', 'X-Potato', "Sausage", "Owl Dagger"
];

export const collabWeapons = [
	'Absolute Wall', 'BL Fujoshi', 'Bone Bros.', 'Breathe-In Type Asacoco', 'Broken Dreams', "Crescent Bardiche", "Curse Ball",
	'Dragon Fire', 'Eldritch Horror', 'Elite Cooking', 'Flattening Board', 'Frozen Sea',
	'I\'m Die, Thank You Forever', "Legendary Sausage", "Lightning Wiener", 'Idol Concert', 'Light Beam', 'MiComet', 'MiKorone',
	'Rap Dog', 'Ring Of Fitness', 'Snow Flower Sake', 'Stream Of Tears', "Black Plague", "Blood Lust"
];

export const superCollabWeapons = ['Holy Fire', 'Idol Live', 'Jingisukan', 'Snow Queen', "True Infinite BL Works"]

export const weapons = basicWeapons.concat(collabWeapons, superCollabWeapons);


export const basicCollabFormulas = {
	"Absolute Wall": ["Bounce Ball", "Cutting Board"],
	"BL Fujoshi": ["BL Book", "Psycho Axe"],
	"Bone Bros.": ["Cutting Board", "EN\'s Curse"],
	"Breathe-In Type Asacoco": ["Holo Bomb", "Plug Type Asacoco"],
	"Broken Dreams": ["Spider Cooking", "Ceo\'s Tears"],
	"Crescent Bardiche": ['Psycho Axe', 'Idol Song'],
	"Curse Ball": ["Bounce Ball", "EN\'s Curse"],
	"Dragon Fire": ["Fan Beam", "Plug Type Asacoco"],
	"Eldritch Horror": ["Spider Cooking", "EN\'s Curse"],
	"Elite Cooking": ["Spider Cooking", "Elite Lava Bucket"],
	"Flattening Board": ["Cutting Board", "Holo Bomb"],
	"Frozen Sea": ["BL Book", "Wamy Water"],
	"I\'m Die, Thank You Forever": ["Holo Bomb", "X-Potato"],
	"Legendary Sausage": ["BL Book", "sausage"],
	"Idol Concert": ["Glowstick", "Idol Song"],
	"Light Beam": ["Fan Beam", "Glowstick"],
	"Lightning Wiener": ['Plug Type Asacoco', "sausage"],
	"MiComet": ["Elite Lava Bucket", "Psycho Axe"],
	"MiKorone": ["Elite Lava Bucket", "X-Potato"],
	"Rap Dog": ["Idol Song", "X-Potato"],
	"Ring Of Fitness": ["Bounce Ball", "Ceo\'s Tears"],
	"Snow Flower Sake": ["Glowstick", "Wamy Water"],
	"Stream Of Tears": ["Ceo\'s Tears", "Fan Beam"],
	"Black Plague": ['EN\'s Curse', "Owl Dagger"],
	"Blood Lust": ['Psycho Axe', "Owl Dagger"],
};

export const superCollabFormulas = {
	"Holy Fire": [
		"Fan Beam",
		"Plug Type Asacoco",
		"Gorilla\'s Paw",
		"Super Gorilla\'s Paw",
	],
	"Idol Live": [
		"Glowstick",
		"Idol Song",
		"Idol Costume",
		"Super Idol Costume",
	],
	"Jingisukan": [
		"Spider Cooking",
		"Elite Lava Bucket",
		"Uber Sheep",
		"Super Uber Sheep",
	],
	"Snow Queen": ["Glowstick", "Wamy Water", "Sake", "Super Sake"],
	"True Infinite BL Works": ["Psycho Axe", "BL Fujoshi", "Hope Soda", "Super Hope Soda"],
};

export const collabFormulas = {
	...basicCollabFormulas,
	...superCollabFormulas
};

export const basicItems = [
	'Blacksmith\'s Gear', 'Body Pillow', 'breastplate', 'Chicken\'s Feather', 'Credit Card',
	'Devil Hat', 'Energy Drink', 'Face Mask', 'Full Meal', 'Gorilla\'s Paw',
	'GWS Pill', 'Halu', 'Headphones', 'Hope Soda', 'Idol Costume',
	'Injection Type Asacoco', 'Just Bandage', 'Knightly Milk', 'Kusogaki Shackles', 'limiter',
	'Membership', 'Nurse\'s Horn', 'Piki Piki Piman', 'Plushie', 'Sake',
	'Stolen Piggy Bank', 'Study Glasses', 'Super Chatto Time!', 'Uber Sheep', 'Focus Shades', 'Ninja Headband', 'Researcher\'s Coat',
	'Candy Kingdom Sweets', 'Beetle', 'Corporation Pin', "Promise Tiara", 'Raven Feather'
];

export const superItems = [
	'Super Study Glasses', 'Super Idol Costume', 'Super Super Chatto Time!', 'Super Gorilla\'s Paw', 'Super Body Pillow',
	'Super Knightly Milk', 'Super Energy Drink', 'Super Credit Card', 'Super Chicken\'s Feather', 'Super Sake',
	'Super Limiter', 'Super Nurse\'s Horn', 'Super Headphones', 'Super Hope Soda', 'Super Breastplate', 'Super Stolen Piggy Bank',
	'Super Injection Type Asacoco'
]

export const items = basicItems.concat(superItems);

export const stamps = [
	'ATK Up', 'Bomb', 'Cold', 'Crit Up', 'Greed', 'Haste Up', 'Knockback', 'Life Steal', 'Lightness', 'Marking', 'Projectile Up',
	'Reverse', 'RGB', 'Size Up', 'Slow', 'Solo', 'Stun', 'Trumpet', 'Unit', 'Weaken', "Rock Hard", "Collector's"
];

export const stats = ['Max HP Up', 'ATK Up', 'SPD Up', 'Crit Up', 'Pick Up Range', 'Haste Up'];

export const foods = ['Tempura', 'Tuna Sandwich','Sushi Set',
	'Poke Bowl', 'Lobster Dinner', 'Pufferfish Meal Set',
	'Vegetarian Burger and Fries', 'Unagi Don','Calamari Set','Manta Ray Soup',
	'Fruit Sandwich','Burger Meal','Vegetable Soup', 'Spicy Seafood Udon', 'Strange Seafood Soup', 'BBQ Squid', 'Turtle Soup']
<script>
	import { run } from "svelte/legacy";

	import {
		displayChoices,
		displayWeaponChoices,
		collabLimit,
		superCollabLimit,
		itemSlots,
		clickedSlotIndex,
		weaponAddSymbols,
		equippedItems,
		equippedWeapons,
		removeWeapon,
		removeSuperIndex,
		resetWeaponSlots,
	} from "$lib/stores";

	import {
		weapons,
		basicWeapons,
		collabWeapons,
		superCollabWeapons,
		collabForumlas,
		basicCollabForumlas,
		superCollabFormulas,
	} from "$lib/variables";

	/** @type {{display: any}} */
	let { display } = $props();

	// initialize weapon displays
	let availableBasicWeapons = $state(
		basicWeapons.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{},
		),
	);
	let availableCollabWeapons = $state(
		collabWeapons.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{},
		),
	);

	let availableSuperCollabWeapons = $state(
		superCollabWeapons.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{},
		),
	);

	let unavailableWeapons,
		remainingCollabs = [],
		oldWeaponSlotValue,
		oldItemSlotValue;

	// process for hiding/unhiding basic weapons and collabs:
	// basic weapon selected -> hide/unhide selected, all related collabs
	// collabs selected -> hide/unhide selected, respective component weapons, all collabs related to component weapons
	function getUnavailableWeapons(weapon) {
		for (const collabWeapon in collabForumlas) {
			// basic weapons
			if (
				basicWeapons.includes(weapon) &&
				collabForumlas[collabWeapon].includes(weapon)
			) {
				unavailableWeapons.add(collabWeapon);
			}
			// collabs
			else if (
				collabWeapons.includes(weapon) &&
				collabWeapon === weapon
			) {
				[...collabForumlas[collabWeapon]].forEach((weap) => {
					unavailableWeapons.add(weap);
				});
				// ban collabs relating to basic weapons used for the initial collab
				collabForumlas[collabWeapon].forEach((formula) =>
					getUnavailableWeapons(formula),
				);
			} else if (
				superCollabWeapons.includes(weapon) &&
				collabWeapon === weapon
			) {
				// ban all super collabs
				superCollabWeapons.forEach((weap) => {
					unavailableWeapons.add(weap);
				});
				// ban all weapons related to the super collab
				collabForumlas[collabWeapon].forEach((formula) => {
					getUnavailableWeapons(formula);
				});
			}
		}
	}

	function reinitialize() {
		availableBasicWeapons = basicWeapons.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{},
		);
		availableCollabWeapons = collabWeapons.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{},
		);
		availableSuperCollabWeapons = superCollabWeapons.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{},
		);
		unavailableWeapons = new Set();

		// hide all collabs
		if ($collabLimit === 0) {
			collabWeapons.forEach(
				(collabWeapon) =>
					(availableCollabWeapons[collabWeapon] = false),
			);
			superCollabWeapons.forEach(
				(collabWeapon) =>
					(availableSuperCollabWeapons[collabWeapon] = false),
			);
		}

		if ($superCollabLimit === 0) {
			superCollabWeapons.forEach(
				(collabWeapon) =>
					(availableSuperCollabWeapons[collabWeapon] = false),
			);
			var item = $equippedWeapons.findIndex((v) => {
				return superCollabWeapons.includes(v);
			});
			if (item > -1) {
				removeSuperIndex.set(item);
			}
		}

		// reenable collabs on 2 weapon slots available (excluding default weapon) and coming from less slots
		if (oldWeaponSlotValue === 2 && $equippedWeapons.length === 2) {
			collabWeapons.forEach(
				(collabWeapon) => (availableCollabWeapons[collabWeapon] = true),
			);
			superCollabWeapons.forEach(
				(collabWeapon) =>
					(availableSuperCollabWeapons[collabWeapon] = true),
			);
		}

		// reenable super collabs on 1 item slot and coming from less slots
		if (oldItemSlotValue === 1 && $equippedItems.length === 1) {
			superCollabWeapons.forEach(
				(collabWeapon) =>
					(availableSuperCollabWeapons[collabWeapon] = true),
			);
		}

		oldWeaponSlotValue = $equippedWeapons.length;
		oldItemSlotValue = $equippedItems.length;
	}

	function manageWeaponChoices() {
		reinitialize();

		// identify unavailable weapons based on equipped weapons
		$equippedWeapons
			.filter((str) => str !== "")
			.forEach((weapon) => {
				unavailableWeapons.add(weapon);
				getUnavailableWeapons(weapon);
			});

		// hide all remaining collabs on collab limit
		if (
			$equippedWeapons.filter((weapon) => collabWeapons.includes(weapon))
				.length === $collabLimit
		) {
			remainingCollabs = [];
			for (const collab in collabForumlas) {
				if (!unavailableWeapons.has(collab)) {
					remainingCollabs.push(collab);
				}
			}
			remainingCollabs.forEach((collab) => {
				unavailableWeapons.add(collab);
			});
		}

		// assign availability
		[...Object.keys(availableBasicWeapons)].forEach((weapon) => {
			if (unavailableWeapons.has(weapon)) {
				availableBasicWeapons[weapon] = false;
			}
		});
		[...Object.keys(availableCollabWeapons)].forEach((weapon) => {
			if (unavailableWeapons.has(weapon)) {
				availableCollabWeapons[weapon] = false;
			}
		});
		[...Object.keys(availableSuperCollabWeapons)].forEach((weapon) => {
			if (unavailableWeapons.has(weapon)) {
				availableSuperCollabWeapons[weapon] = false;
			}
		});
	}

	function clickHandler(weapon) {
		// remove add symbol
		weaponAddSymbols.update((arr) => {
			arr[$clickedSlotIndex] = "";
			return arr;
		});

		// add selected weapon to equipped weapons
		equippedWeapons.update((arr) => {
			arr[$clickedSlotIndex] = weapon;
			return arr;
		});

		manageWeaponChoices();

		// hide menu
		displayChoices.set(false);
		displayWeaponChoices.set(false);
	}

	function handleRemoveWeapon() {
		// remove weapon in equipped weapons
		if ($clickedSlotIndex !== null) {
			equippedWeapons.update((arr) => {
				arr[$clickedSlotIndex] = "";
				return arr;
			});
		}

		manageWeaponChoices();

		// set boolean back to false
		removeWeapon.set(false);
	}

	$effect(() => {
		if ($removeWeapon) {
			handleRemoveWeapon();
		}
	});

	$effect(() => {
		if ($resetWeaponSlots) {
			reinitialize();
			resetWeaponSlots.set(false);
		}
	});

	$effect(() => {
		if ($superCollabLimit) {
			reinitialize();
		}
	});
</script>

<div id="weapon-choices" class={display}>
	<h1 id="weapon-header">Basic</h1>
	<div id="basic-choices">
		{#each Object.entries(availableBasicWeapons) as [basicWeapon, available]}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="weapon choice {!available ? 'unavailable' : ''}"
				onclick={() => (available ? clickHandler(basicWeapon) : "")}
			>
				<div class="img {basicWeapon}"></div>
			</div>
		{/each}
	</div>
	<h1 id="weapon-header">Collabs</h1>
	<div id="collab-choices">
		{#each Object.entries(availableCollabWeapons) as [collabWeapon, available]}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="weapon choice {!available ? 'unavailable' : ''}"
				onclick={() => (available ? clickHandler(collabWeapon) : "")}
			>
				<div class="img {collabWeapon}"></div>
			</div>
		{/each}
	</div>
	<h1 id="weapon-header">Super Collabs</h1>
	<div id="super-collab-choices">
		{#each Object.entries(availableSuperCollabWeapons) as [superCollabWeapon, available]}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="weapon choice {!available ? 'unavailable' : ''}"
				onclick={() =>
					available ? clickHandler(superCollabWeapon) : ""}
			>
				<div class="img {superCollabWeapon}"></div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.weapon:hover {
		background-color: #1b41a0;
	}
	:global(.bl-book) {
		background-image: url("/img/weapon/basic/BL_Book_Icon.png");
	}
	:global(.bounce-ball) {
		background-image: url("/img/weapon/basic/Bounce_Ball_Icon.png");
	}
	:global(.ceos-tears) {
		background-image: url("/img/weapon/basic/CEO's_Tears_Icon.png");
	}
	:global(.cutting-board) {
		background-image: url("/img/weapon/basic/Cutting_Board_Icon.png");
	}
	:global(.lava-bucket) {
		background-image: url("/img/weapon/basic/Elite_Lava_Bucket_Icon.png");
	}
	:global(.ens-curse) {
		background-image: url("/img/weapon/basic/EN's_Curse_Icon.png");
	}
	:global(.fan-beam) {
		background-image: url("/img/weapon/basic/Fan_Beam_Icon.png");
	}
	:global(.glowstick) {
		background-image: url("/img/weapon/basic/Glowstick_Icon.png");
	}
	:global(.holo-bomb) {
		background-image: url("/img/weapon/basic/Holo_Bomb_Icon.png");
	}
	:global(.idol-song) {
		background-image: url("/img/weapon/basic/Idol_Song_Icon.png");
	}
	:global(.plug-in-asacoco) {
		background-image: url("/img/weapon/basic/Plug_Type_Asacoco_Icon.png");
	}
	:global(.sui-axe) {
		background-image: url("/img/weapon/basic/Psycho_Axe_Icon.png");
	}
	:global(.chama-cooking) {
		background-image: url("/img/weapon/basic/Spider_Cooking_Icon.png");
	}
	:global(.wamy-water) {
		background-image: url("/img/weapon/basic/Wamy_Water_Icon.png");
	}
	:global(.x-potato) {
		background-image: url("/img/weapon/basic/X-Potato_Icon.png");
	}
	:global(.sausage) {
		background-image: url("/img/weapon/basic/Sausage_Icon.png");
	}
	:global(.absolute-wall) {
		background-image: url("/img/weapon/collab/Absolute_Wall_Icon.png");
	}
	:global(.bl-fujoshi) {
		background-image: url("/img/weapon/collab/BL_Fujoshi_Icon.png");
	}
	:global(.bone-bros) {
		background-image: url("/img/weapon/collab/Bone_Bros._Icon.png");
	}
	:global(.breathe-in-asacoco) {
		background-image: url("/img/weapon/collab/Breathe-In_Type_Asacoco_Icon.png");
	}
	:global(.broken-dreams) {
		background-image: url("/img/weapon/collab/Broken_Dreams_Icon.png");
	}
	:global(.crescent-bardiche) {
		background-image: url("/img/weapon/collab/Crescent_Bardiche_Icon.png");
	}
	:global(.curse-ball) {
		background-image: url("/img/weapon/collab/Curse_Ball_Icon.png");
	}
	:global(.dragon-fire) {
		background-image: url("/img/weapon/collab/Dragon_Fire_Icon.png");
	}
	:global(.eldritch-horror) {
		background-image: url("/img/weapon/collab/Eldritch_Horror_Icon.png");
	}
	:global(.elite-cooking) {
		background-image: url("/img/weapon/collab/Elite_Cooking_Icon.png");
	}
	:global(.flattening-board) {
		background-image: url("/img/weapon/collab/Flattening_Board_Icon.png");
	}
	:global(.frozen-sea) {
		background-image: url("/img/weapon/collab/Frozen_Sea_Icon.png");
	}
	:global(.im-die-ty-4eva) {
		background-image: url("/img/weapon/collab/I'm_Die,_Thank_You_Forever_Icon.png");
	}
	:global(.legendary-sausage) {
		background-image: url("/img/weapon/collab/Legendary_Sausage_Icon.png");
	}
	:global(.idol-concert) {
		background-image: url("/img/weapon/collab/Idol_Concert_Icon.png");
	}
	:global(.light-beam) {
		background-image: url("/img/weapon/collab/Light_Beam_Icon.png");
	}
	:global(.lightning-wiener) {
		background-image: url("/img/weapon/collab/Lightning_Wiener_Icon.png");
	}
	:global(.micomet) {
		background-image: url("/img/weapon/collab/MiComet_Icon.png");
	}
	:global(.mikorone) {
		background-image: url("/img/weapon/collab/MiKorone_Icon.png");
	}
	:global(.rap-dog) {
		background-image: url("/img/weapon/collab/Rap_Dog_Icon.png");
	}
	:global(.ring-of-fitness) {
		background-image: url("/img/weapon/collab/Ring_Of_Fitness_Icon.png");
	}
	:global(.snow-sake) {
		background-image: url("/img/weapon/collab/Snow_Flower_Sake_Icon.png");
	}
	:global(.stream-of-tears) {
		background-image: url("/img/weapon/collab/Stream_of_Tears_Icon.png");
	}
	:global(.holy-fire) {
		background-image: url("/img/weapon/super_collab/Holy_Fire_Icon.png");
	}
	:global(.idol-live) {
		background-image: url("/img/weapon/super_collab/Idol_Live_Icon.png");
	}
	:global(.jingisukan) {
		background-image: url("/img/weapon/super_collab/Jingisukan_Icon.png");
	}
	:global(.snow-queen) {
		background-image: url("/img/weapon/super_collab/Snow_Queen_Icon.png");
	}
</style>

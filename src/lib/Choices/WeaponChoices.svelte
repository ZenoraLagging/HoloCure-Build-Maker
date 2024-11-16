<script lang="ts">
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
		addWeapon,
	} from "$lib/stores";

	import {
		weapons,
		basicWeapons,
		collabWeapons,
		superCollabWeapons,
		collabFormulas,
		basicCollabFormulas,
		superCollabFormulas,
	} from "$lib/variables";
	import { Button } from "$lib/components/ui/button";

	/** @type {{display: boolean}} */
	export let display;

	// initialize weapon displays
	let availableBasicWeapons = basicWeapons.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = true), accumulator
		),
		{},
	);

	let availableCollabWeapons = collabWeapons.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = true), accumulator
		),
		{},
	);

	let availableSuperCollabWeapons = superCollabWeapons.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = true), accumulator
		),
		{},
	);

	/**
	 * @type {Set<any>}
	 */
	let unavailableWeapons,
		remainingCollabs = [];

	/**
	 * @type {number}
	 */
	let oldWeaponSlotValue, oldItemSlotValue;

	// process for hiding/unhiding basic weapons and collabs:
	// basic weapon selected -> hide/unhide selected, all related collabs
	// collabs selected -> hide/unhide selected, respective component weapons, all collabs related to component weapons
	function getUnavailableWeapons(weapon: string) {
		for (const collabWeapon in collabFormulas) {
			// basic weapons
			if (
				basicWeapons.includes(weapon) &&
				collabFormulas[collabWeapon].includes(weapon)
			) {
				unavailableWeapons.add(collabWeapon);
			}
			// collabs
			else if (
				collabWeapons.includes(weapon) &&
				collabWeapon === weapon
			) {
				[...collabFormulas[collabWeapon]].forEach((weap) => {
					unavailableWeapons.add(weap);
				});
				// ban collabs relating to basic weapons used for the initial collab
				collabFormulas[collabWeapon].forEach((formula) =>
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
				collabFormulas[collabWeapon].forEach((formula) => {
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
			for (const collab in collabFormulas) {
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

	function clickHandler(weapon: string) {
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

		addWeapon.set(true);

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

	$: if ($removeWeapon) {
		handleRemoveWeapon();
	}

	$: if ($resetWeaponSlots) {
		reinitialize();
		resetWeaponSlots.set(false);
	}

	$: if ($superCollabLimit) {
		reinitialize();
	}
</script>

{#if display}
	<div id="weapon-choices">
		<h1 id="weapon-header">Basic</h1>
		<div id="basic-choices" class="flex flex-row flex-wrap">
			{#each Object.entries(availableBasicWeapons) as [basicWeapon, available]}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<Button
					variant="ghost"
					class=" {!available ? 'bg-red-500/50' : ''}  w-fit h-fit"
					disabled={!available}
					onclick={() => (available ? clickHandler(basicWeapon) : "")}
				>
					<img
						class="w-12 max-h-12"
						src={`src/lib/images/weapons/basic/${basicWeapon.replaceAll(" ", "_")}_Icon.png`}
						alt={basicWeapon}
					/>
				</Button>
			{/each}
		</div>
		<h1 id="weapon-header">Collabs</h1>
		<div id="collab-choices" class="flex flex-row flex-wrap">
			{#each Object.entries(availableCollabWeapons) as [collabWeapon, available]}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<Button
					variant="ghost"
					class=" {!available ? 'bg-red-500/50' : ''} w-fit h-fit"
					disabled={!available}
					onclick={() =>
						available ? clickHandler(collabWeapon) : ""}
				>
					<img
						class="w-12"
						src={`src/lib/images/weapons/collab/${collabWeapon.replaceAll(" ", "_")}_Icon.png`}
						alt={collabWeapon}
					/>
				</Button>
			{/each}
		</div>
		<h1 id="weapon-header">Super Collabs</h1>
		<div id="super-collab-choices" class="flex flex-row flex-wrap">
			{#each Object.entries(availableSuperCollabWeapons) as [superCollabWeapon, available]}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<Button
					variant="ghost"
					class=" {!available ? 'bg-red-500/50' : ''}  w-fit h-12"
					disabled={!available}
					onclick={() =>
						available ? clickHandler(superCollabWeapon) : ""}
				>
					<img
						class="w-12"
						src={`src/lib/images/weapons/super_collab/${superCollabWeapon.replaceAll(" ", "_")}_Icon.png`}
						alt={superCollabWeapon}
					/>
				</Button>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
</style>

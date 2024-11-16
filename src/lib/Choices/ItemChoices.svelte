<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { images } from "$lib/images/exports.svelte";
	import {
		displayChoices,
		displayItemChoices,
		equippedItems,
		equippedWeapons,
		itemAddSymbols,
		clickedSlotIndex,
		removeItem,
		removeInvalidItem,
		resetItemSlots,
		addWeapon,
	} from "$lib/stores";

	import {
		basicItems,
		superItems,
		items,
		superCollabFormulas,
		superCollabWeapons,
	} from "$lib/variables";

	/** @type {{display: boolean}} */
	export let display;

	// initialize item displays
	let availableBasicItems = basicItems.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = true), accumulator
		),
		{},
	);

	let availableSuperItems = superItems.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = true), accumulator
		),
		{},
	);

	let unavailableItems = [];

	function handleUnavailableItems() {
		let superCollab = $equippedWeapons.filter((weapon) =>
			superCollabWeapons.includes(weapon),
		);
		let itemsToSearch = [];
		if (superCollab.length > 0) {
			// ban all items related to the super collab
			superCollabFormulas[superCollab[0]].forEach((formula) => {
				if (
					basicItems.includes(formula) ||
					superItems.includes(formula)
				) {
					unavailableItems.add(formula);
					itemsToSearch.push(formula);
				}
			});
			var item = $equippedItems.findIndex((v) => {
				return itemsToSearch.includes(v);
			});
			if (item > -1) {
				removeInvalidItem.set(item);
			}
		}
	}

	function reinitialize() {
		// initialize item displays
		availableBasicItems = basicItems.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{},
		);

		availableSuperItems = superItems.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{},
		);

		unavailableItems = new Set();
	}

	// show previous equipped item when replacing
	function showPrevious() {
		if ($equippedItems[$clickedSlotIndex]) {
			unavailableItems[$equippedItems[$clickedSlotIndex]] = true;
		}
	}

	function clickHandler(item: string) {
		showPrevious();

		// remove add symbol
		itemAddSymbols.update((arr) => {
			arr[$clickedSlotIndex] = "";
			return arr;
		});

		// add selected item to equipped items
		equippedItems.update((arr) => {
			arr[$clickedSlotIndex] = item;
			return arr;
		});

		// hide selected item
		// unavailableItems[item] = false;

		manageItemChoices();

		// hide menu
		displayChoices.set(false);
		displayItemChoices.set(false);
	}

	function manageItemChoices() {
		reinitialize();

		// identify unavailable items
		$equippedItems
			.filter((str) => str !== "")
			.forEach((item) => {
				unavailableItems.add(item);
			});

		handleUnavailableItems();

		// assign availability via janky checks ohgodwhydidIdothis
		[...Object.keys(availableBasicItems)].forEach((item) => {
			if (unavailableItems.has(item)) {
				availableBasicItems[item] = false;
				let superItemCheck = superItems.filter((v) =>
					v.toLowerCase().includes(item.toLowerCase()),
				);
				if (superItemCheck.length > 0) {
					availableSuperItems[superItemCheck[0]] = false;
				}
			}
		});
		[...Object.keys(availableSuperItems)].forEach((item) => {
			if (unavailableItems.has(item)) {
				availableSuperItems[item] = false;
				let basicItemCheck = basicItems.filter((v) =>
					v
						.toLowerCase()
						.includes(item.replace("Super ", "").toLowerCase()),
				);
				if (basicItemCheck.length > 0) {
					availableBasicItems[basicItemCheck[0]] = false;
				}
			}
		});

		addWeapon.set(false);
	}

	$: if ($removeItem) {
		if ($clickedSlotIndex !== null) {
			showPrevious();

			// remove item in equipped items
			equippedItems.update((arr) => {
				arr[$clickedSlotIndex] = "";
				return arr;
			});
		}
		// update available items from shared build
		manageItemChoices();

		// set boolean back to false
		removeItem.set(false);
	}

	$: if ($addWeapon) {
		manageItemChoices();
	}

	$: if ($resetItemSlots) {
		reinitialize();
		resetItemSlots.set(false);
	}
</script>

{#if display}
	<div id="item-choices">
		<h1 id="item-header">Basic</h1>
		<div id="basic-choices" class="flex flex-row flex-wrap">
			{#each Object.entries(availableBasicItems) as [basicItem, available]}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<Button
					class="choice {!available
						? 'bg-red-500/50'
						: ''} w-20 h-20 flex"
					variant="ghost"
					size="icon"
					disabled={!available}
					onclick={() => (available ? clickHandler(basicItem) : "")}
				>
					<img
						class="w-16 h-fit"
						src={images[
							`/src/lib/images/items/basic/${basicItem.replaceAll(" ", "_")}_Icon.png`
						].img.src}
						alt={basicItem}
					/>
				</Button>
			{/each}
		</div>
		<h1 id="item-header">Super</h1>
		<div id="basic-choices" class="flex flex-row flex-wrap space-x-2">
			{#each Object.entries(availableSuperItems) as [superItem, available]}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<Button
					class="choice {!available ? 'bg-red-500/50' : ''} w-20 h-20"
					variant="ghost"
					size="icon"
					disabled={!available}
					onclick={() => (available ? clickHandler(superItem) : "")}
				>
					<img
						class="w-fit h-fit"
						src={images[
							`/src/lib/images/items/super/${superItem.replaceAll(" ", "_")}_Icon.png`
						].img.src}
						alt={superItem}
					/>
				</Button>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.item:hover {
		background-color: #3f9744;
	}
</style>

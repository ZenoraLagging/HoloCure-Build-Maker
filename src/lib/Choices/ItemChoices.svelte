<script>
	import {
		displayChoices,
		displayItemChoices,
		unavailableItemChoices,
		equippedItems,
		equippedWeapons,
		itemAddSymbols,
		clickedSlotIndex,
		removeItem,
		resetItemSlots,
	} from "$lib/stores";

	import {
		basicItems,
		superItems,
		items,
		superCollabFormulas,
	} from "$lib/variables";

	export let display;

	// initialize item displays
	let availableBasicItems = basicItems.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = true), accumulator
		),
		{}
	);

	let availableSuperItems = superItems.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = true), accumulator
		),
		{}
	);

	let availableItems = [];

	// show previous equipped item when replacing
	function showPrevious() {
		if ($equippedItems[$clickedSlotIndex]) {
			availableItems[$equippedItems[$clickedSlotIndex]] = true;
		}
	}

	function clickHandler(item) {
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
		availableItems[item] = false;

		// hide menu
		displayChoices.set(false);
		displayItemChoices.set(false);
	}

	function manageItemChoices() {}

	function update() {
		$equippedItems.forEach((item) => {
			availableItems[item] = false;
		});
	}

	$: if ($removeItem) {
		if ($clickedSlotIndex !== null) {
			showPrevious();

			// remove item in equipped items
			equippedItems.update((arr) => {
				arr[$clickedSlotIndex] = "";
				return arr;
			});
		} else {
			// update available items from shared build
			update();
		}

		// set boolean back to false
		removeItem.set(false);
	}

	$: if ($resetItemSlots) {
		availableBasicItems = basicItems.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{}
		);
		availableSuperItems = superItems.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{}
		);
		resetItemSlots.set(false);
	}
</script>

<div id="item-choices" class={display}>
	<div id="basic-choices">
		<h1 id="item-header">Basic</h1>
		{#each Object.entries(availableBasicItems) as [basicItem, available]}
			{#if available}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="item choice"
					on:click={() => clickHandler(basicItem)}
				>
					<div class="img {basicItem}" />
				</div>
			{/if}
		{/each}
	</div>
	<div id="basic-choices">
		<h1 id="item-header">Super</h1>
		{#each Object.entries(availableSuperItems) as [superItem, available]}
			{#if available}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="item choice"
					on:click={() => clickHandler(superItem)}
				>
					<div class="img {superItem}" />
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.item:hover {
		background-color: #3f9744;
	}

	:global(.blacksmiths-gear) {
		background-image: url("/img/item/basic/Blacksmith's_Gear_Icon.png");
	}
	:global(.body-pillow) {
		background-image: url("/img/item/basic/Body_Pillow_Icon.png");
	}
	:global(.super-body-pillow) {
		background-image: url("/img/item/super/Body_Pillow_Icon.png");
	}
	:global(.breastplate) {
		background-image: url("/img/item/basic/Breastplate_Icon.png");
	}
	:global(.super-breastplate) {
		background-image: url("/img/item/super/Breastplate_Icon.png");
	}
	:global(.chickens-feather) {
		background-image: url("/img/item/basic/Chicken's_Feather_Icon.png");
	}
	:global(.super-chickens-feather) {
		background-image: url("/img/item/super/Chicken's_Feather_Icon.png");
	}
	:global(.credit-card) {
		background-image: url("/img/item/basic/Credit_Card_Icon.png");
	}
	:global(.super-credit-card) {
		background-image: url("/img/item/super/Credit_Card_Icon.png");
	}
	:global(.devil-hat) {
		background-image: url("/img/item/basic/Devil_Hat_Icon.png");
	}
	:global(.energy-drink) {
		background-image: url("/img/item/basic/Energy_Drink_Icon.png");
	}
	:global(.super-energy-drink) {
		background-image: url("/img/item/super/Energy_Drink_Icon.png");
	}
	:global(.face-mask) {
		background-image: url("/img/item/basic/Face_Mask_Icon.png");
	}
	:global(.full-meal) {
		background-image: url("/img/item/basic/Full_Meal_Icon.png");
	}
	:global(.gorillas-paw) {
		background-image: url("/img/item/basic/Gorilla's_Paw_Icon.png");
	}
	:global(.super-gorillas-paw) {
		background-image: url("/img/item/super/Gorilla's_Paw_Icon.png");
	}
	:global(.gws-pill) {
		background-image: url("/img/item/basic/GWS_Pill_Icon.png");
	}
	:global(.halu) {
		background-image: url("/img/item/basic/Halu_Icon.png");
	}
	:global(.headphones) {
		background-image: url("/img/item/basic/Headphones_Icon.png");
	}
	:global(.super-headphones) {
		background-image: url("/img/item/super/Headphones_Icon.png");
	}
	:global(.hope-soda) {
		background-image: url("/img/item/basic/Hope_Soda_Icon.png");
	}
	:global(.super-hope-soda) {
		background-image: url("/img/item/super/Hope_Soda_Icon.png");
	}
	:global(.idol-costume) {
		background-image: url("/img/item/basic/Idol_Costume_Icon.png");
	}
	:global(.super-idol-costume) {
		background-image: url("/img/item/super/Idol_Costume_Icon.png");
	}
	:global(.injection-type-asacoco) {
		background-image: url("/img/item/basic/Injection_Type_Asacoco_Icon.png");
	}
	:global(.just-bandage) {
		background-image: url("/img/item/basic/Just_Bandage_Icon.png");
	}
	:global(.milk) {
		background-image: url("/img/item/basic/Knightly_Milk_Icon.png");
	}
	:global(.super-milk) {
		background-image: url("/img/item/super/Knightly_Milk_Icon.png");
	}
	:global(.shackles) {
		background-image: url("/img/item/basic/Kusogaki_Shackles_Icon.png");
	}
	:global(.limiter) {
		background-image: url("/img/item/basic/Limiter_Icon.png");
	}
	:global(.super-limiter) {
		background-image: url("/img/item/super/Limiter_Icon.png");
	}
	:global(.membership) {
		background-image: url("/img/item/basic/Membership_Icon.png");
	}
	:global(.horn) {
		background-image: url("/img/item/basic/Nurse's_Horn_Icon.png");
	}
	:global(.super-horn) {
		background-image: url("/img/item/super/Nurse's_Horn_Icon.png");
	}
	:global(.ppp) {
		background-image: url("/img/item/basic/Piki_Piki_Piman_Icon.png");
	}
	:global(.plushie) {
		background-image: url("/img/item/basic/Plushie_Icon.png");
	}
	:global(.sake) {
		background-image: url("/img/item/basic/Sake_Icon.png");
	}
	:global(.super-sake) {
		background-image: url("/img/item/super/Sake_Icon.png");
	}
	:global(.piggy-bank) {
		background-image: url("/img/item/basic/Stolen_Piggy_Bank_Icon.png");
	}
	:global(.glasses) {
		background-image: url("/img/item/basic/Study_Glasses_Icon.png");
	}
	:global(.super-glasses) {
		background-image: url("/img/item/super/Study_Glasses_Icon.png");
	}
	:global(.sc-time) {
		background-image: url("/img/item/basic/Super_Chatto_Time!_Icon.png");
	}
	:global(.super-sc-time) {
		background-image: url("/img/item/super/Super_Chatto_Time!_Icon.png");
	}
	:global(.uber-sheep) {
		background-image: url("/img/item/basic/Uber_Sheep_Icon.png");
	}
	:global(.focus-shades) {
		background-image: url("/img/item/basic/Focus_Shades_Icon.png");
		background-size: contain !important;
	}
	:global(.ninja-headband) {
		background-image: url("/img/item/basic/Ninja_Headband_Icon.png");
	}
	:global(.researchers-coat) {
		background-image: url("/img/item/basic/Researcher's_Coat_Icon.png");
	}
	:global(.candy-kingdom-sweets) {
		background-image: url("/img/item/basic/Candy_Kingdom_Sweets_Icon.png");
	}
	:global(.beetle) {
		background-image: url("/img/item/basic/Beetle_Icon.png");
	}
</style>

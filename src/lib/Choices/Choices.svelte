<script>
	import CharacterChoices from "./CharacterChoices.svelte";
	import WeaponsChoices from "./WeaponChoices.svelte";
	import ItemsChoices from "./ItemChoices.svelte";
	import StampChoices from "./StampChoices.svelte";
	import StatChoices from "./StatChoices.svelte";
	import {
		displayChoices,
		displayCharacterChoices,
		displayWeaponChoices,
		displayItemChoices,
		displayStampChoices,
		displayStatChoices,
		displayFoodChoices,
	} from "$lib/stores";
	import FoodChoices from "./FoodChoices.svelte";

	function hide() {
		displayChoices.set(false);
		displayCharacterChoices.set(false);
		displayWeaponChoices.set(false);
		displayItemChoices.set(false);
		displayStampChoices.set(false);
		displayStatChoices.set(false);
		displayFoodChoices.set(false);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="choices-bg" class={$displayChoices ? "" : "hidden"} onclick={hide}>
	<div id="choices-container" onclick={(e) => e.stopPropagation()}>
		<CharacterChoices display={$displayCharacterChoices} />
		<WeaponsChoices display={$displayWeaponChoices} />
		<ItemsChoices display={$displayItemChoices} />
		<StampChoices display={$displayStampChoices} />
		<StatChoices display={$displayStatChoices} />
		<FoodChoices display={$displayFoodChoices} />
	</div>
</div>

<style lang="scss">
	:global(#choices-bg) {
		position: fixed;
		top: 0;
		background-color: rgba(0, 0, 0, 0.3);
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	:global(#choices-container) {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 3px solid var(--font-color);
		background-color: #171717;
		padding: 10px;
		overflow-y: initial !important;
	}

	:global(
			#basic-choices,
			#collab-choices,
			#super-collab-choices,
			#item-choices,
			#stamp-choices,
			#food-choices,
			#select-character-choices
		) {
		--min: 5rem;
		--gap: 0.9rem;
		gap: var(--gap);
		@media only screen and (max-width: 1920px) {
			justify-content: center;
		}
	}

	:global(
			#item-choices,
			#weapon-choices,
			#stamp-choices,
			#food-choices,
			#character-choices
		) {
		display: table;
		@media only screen and (max-width: 1920px) {
			max-height: 500px;
			min-width: 400px;
			display: block;
			overflow-y: auto;
		}
		@media only screen and (max-width: 640px) {
			max-height: 300px;
			min-width: 350px;
			display: block;
			overflow-y: auto;
		}
	}

	:global(#weapon-header, #item-header, #generation-header) {
		font-size: 24px;
		margin: 5px 0 15px 10px;
		@media only screen and (max-width: 1080px) {
			text-align: center;
		}
	}

	:global(#character-header) {
		flex-basis: 100%;
		font-size: 18px;
		margin-bottom: 10px;
		margin-left: 5px;
	}
</style>

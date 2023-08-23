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
	} from "$lib/stores";

	function hide() {
		displayChoices.set(false);
		displayCharacterChoices.set(false);
		displayWeaponChoices.set(false);
		displayItemChoices.set(false);
		displayStampChoices.set(false);
		displayStatChoices.set(false);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="choices-bg" class={$displayChoices ? "" : "hidden"} on:click={hide}>
	<div id="choices-container" on:click={(e) => e.stopPropagation()}>
		<CharacterChoices display={$displayCharacterChoices ? "" : "hidden"} />
		<WeaponsChoices display={$displayWeaponChoices ? "" : "hidden"} />
		<ItemsChoices display={$displayItemChoices ? "" : "hidden"} />
		<StampChoices display={$displayStampChoices ? "" : "hidden"} />
		<StatChoices display={$displayStatChoices ? "" : "hidden"} />
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
			#select-character-choices
		) {
		--min: 5rem;
		--gap: 0.9rem;

		display: flex;
		flex-wrap: wrap;
		gap: var(--gap);
		@media only screen and (max-width: 1280px) {
			justify-content: center;
		}
	}

	:global(#item-choices, #weapon-choices, #character-choices) {
		display: table;
		@media only screen and (max-width: 1280px) {
			height: 60vh;
			min-width: 500px;
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

	:global(.unavailable) {
		filter: brightness(30%);
		background-color: #461523;
		pointer-events: none;
		cursor: default;
	}
	:global(.choice) {
		cursor: pointer;
		margin: 5px;
		padding: 5px;
	}
</style>

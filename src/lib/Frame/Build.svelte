<script>
	import BuildName from "./BuildName.svelte";
	import Weapons from "./Weapons.svelte";
	import Items from "./Items.svelte";
	import Stamps from "./Stamps.svelte";
	import StatPriority from "./StatPriority.svelte";
	import SupportItems from "./SupportItems.svelte";
	import { images } from "$lib/images/exports.svelte";
	import { itemSlots, weaponSlots } from "$lib/stores";

	/** @type {{charName: any}} */
	let { charName } = $props();
</script>

<div id="equipment-container">
	<BuildName />
	<Weapons {charName} />
	<Items />
	<div
		class={`flex flex-row ${$itemSlots <= 5 && $weaponSlots <= 5 ? "w-0 sm:w-full" : ""}`}
	>
		<Stamps />
		<SupportItems />
	</div>
	<StatPriority />
</div>

<style lang="scss">
	#equipment-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		margin-left: 10px;
	}

	:global(.slot) {
		position: relative;
		cursor: pointer;
		margin: 5px;
		padding: 5px;
	}

	:global(#weapons-container, #items-container, #stamps-container) {
		display: flex;
		flex-direction: row;
	}

	:global(.remove.material-symbols-outlined) {
		position: absolute;
		top: 0px;
		right: 0px;
		width: 20px;
		height: 20px;
		font-size: 20px;
		color: #dc2626;

		&:hover {
			color: #ef4444;
		}
	}
</style>

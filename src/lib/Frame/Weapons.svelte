<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		displayChoices,
		displayWeaponChoices,
		equippedWeapons,
		weaponAddSymbols,
		clickedSlotIndex,
		removeWeapon,
		removeSuperIndex,
		banWeapon,
	} from "$lib/stores";
	import { basicWeapons, collabWeapons } from "$lib/variables";
	import MdiPlusThick from "~icons/mdi/plus-thick";

	/** @type {{charName: string}} */
	let { charName } = $props();

	let displayRemoveBtn = $state(Array(5).fill("hidden"));

	function showWeaponChoices(index: number) {
		// show menu
		displayChoices.set(true);
		displayWeaponChoices.set(true);
		// save clicked slot
		clickedSlotIndex.set(index);
	}

	function removeGear(index: number) {
		// add back add symbol
		weaponAddSymbols.update((arr) => {
			arr[index] = "add";
			return arr;
		});
		// save clicked slot
		clickedSlotIndex.set(index);
		// set boolean to true for the if-block in WeaponChoices to execute
		removeWeapon.set(true);
	}

	function getWeaponType(weapon: string) {
		if (basicWeapons.includes(weapon)) return "basic";
		else if (collabWeapons.includes(weapon)) return "collab";
		else return "super_collab";
	}

	$effect(() => {
		if ($removeSuperIndex > -1) {
			removeGear($removeSuperIndex);
			removeSuperIndex.set(-1);
		}
	});
</script>

<div id="weapons-container">
	<div id="default-weap" class="w-16 h-16 flex flex-col justify-center">
		{#if charName}
			<img
				src="/src/lib/images/characters/{charName}/{$banWeapon
					? 'banned.png'
					: 'weapon.png'}"
				alt="main weapon"
				class="w-fit"
			/>
		{/if}
		{#if charName}
			<div class="relative">
				<p class="absolute top-[-10px] left-3">
					{$banWeapon ? "Lv1" : "Lv7"}
				</p>
			</div>
		{/if}
	</div>
	{#each $equippedWeapons as equippedWeapon, index}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<Button
			class="weapon slot w-16 h-16"
			size="icon"
			variant="ghost"
			onclick={(e: any) => {
				e.preventDefault();
				showWeaponChoices(index);
			}}
			onmouseenter={() => {
				if ($equippedWeapons[index] !== "")
					displayRemoveBtn[index] = "";
			}}
			onmouseleave={() => (displayRemoveBtn[index] = "hidden")}
		>
			{#if equippedWeapon}
				<img
					src={`src/lib/images/weapons/${getWeaponType(equippedWeapon)}/${equippedWeapon.replaceAll(" ", "_")}_Icon.png`}
					alt={equippedWeapon}
				/>
			{:else}
				<img
					src={`src/lib/images/weapons/weapon_slot.png`}
					alt="weapon slot"
				/>
			{/if}

			<span
				class="remove material-symbols-outlined {displayRemoveBtn[
					index
				]}"
				onclick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					removeGear(index);
				}}
			>
				cancel
			</span>
		</Button>
	{/each}
</div>

<style lang="scss">
	#default-weap {
		border: 3px solid #4779f4;
		border-radius: 5px;
		margin: 5px;
		padding: 5px;
	}
	#banned-weapon {
		position: absolute;
		width: 40px;
		height: 40px;
		z-index: 10;
	}
</style>

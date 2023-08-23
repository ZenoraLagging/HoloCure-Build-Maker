<script>
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

	export let charName;

	const displayRemoveBtn = Array(5).fill("hidden");

	function showWeaponChoices(index) {
		// show menu
		displayChoices.set(true);
		displayWeaponChoices.set(true);
		// save clicked slot
		clickedSlotIndex.set(index);
	}

	function removeGear(index) {
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

	$: if ($removeSuperIndex > -1) {
		removeGear($removeSuperIndex);
		removeSuperIndex.set(-1);
	}
</script>

<div id="weapons-container">
	<div id="default-weap">
		{#if charName}
			<img
				id="weapon-img"
				src="/img/character/{charName}/{$banWeapon
					? 'banned.png'
					: 'weapon.png'}"
				alt="main weapon"
			/>
		{:else}
			<div class="img" />
		{/if}
		{#if charName}
			<div id="weapon-level">
				<p class="weapon-level-text">{$banWeapon ? "Lv 1" : "Lv 7"}</p>
			</div>
		{/if}
	</div>
	{#each $equippedWeapons as equippedWeapon, index}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="weapon slot"
			on:click={() => showWeaponChoices(index)}
			on:mouseenter={() => {
				if ($equippedWeapons[index] !== "")
					displayRemoveBtn[index] = "";
			}}
			on:mouseleave={() => (displayRemoveBtn[index] = "hidden")}
		>
			<div class="img {equippedWeapon}">
				<span class="add material-symbols-outlined"
					>{$weaponAddSymbols[index]}</span
				>
			</div>
			<span
				class="remove material-symbols-outlined {displayRemoveBtn[
					index
				]}"
				on:click|stopPropagation={() => removeGear(index)}
			>
				cancel
			</span>
		</div>
	{/each}
</div>

<style lang="scss">
	#default-weap {
		border: 3px solid #4779f4;
		margin: 5px;
		padding: 5px;
	}
	#weapon-img {
		object-fit: contain;
		width: 40px;
		height: 40px;
	}
	#banned-weapon {
		position: absolute;
		width: 40px;
		height: 40px;
		z-index: 10;
	}
	#weapon-level {
		position: absolute;
		background: rgb(0, 0, 0, 0.3);
		margin: 0 -3px;
		padding: 0 5px 5px 5px;
	}
	.weapon-level-text {
	}
</style>

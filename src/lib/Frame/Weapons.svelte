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

	/** @type {{charName: string}} */
	let { charName } = $props();

	console.log(charName);

	let displayRemoveBtn = $state(Array(5).fill("hidden"));

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

	$effect(() => {
		if ($removeSuperIndex > -1) {
			removeGear($removeSuperIndex);
			removeSuperIndex.set(-1);
		}
	});
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
			<div class="img"></div>
		{/if}
		{#if charName}
			<div id="weapon-level">
				<p class="weapon-level-text">{$banWeapon ? "Lv 1" : "Lv 7"}</p>
			</div>
		{/if}
	</div>
	{#each $equippedWeapons as equippedWeapon, index}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="weapon slot"
			onclick={(e) => {
				e.preventDefault();
				showWeaponChoices(index);
			}}
			onmouseenter={() => {
				if ($equippedWeapons[index] !== "")
					displayRemoveBtn[index] = "";
			}}
			onmouseleave={() => (displayRemoveBtn[index] = "hidden")}
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
				onclick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					removeGear(index);
				}}
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
		margin: -4px -4px 0 -4px;
		padding: 0 5px 5px 5px;
	}
	.weapon-level-text {
	}
</style>

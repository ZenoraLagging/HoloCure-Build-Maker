<script lang="ts">
	import {
		charSelected,
		collabLimit,
		weaponSlots,
		itemSlots,
		equippedWeapons,
		weaponAddSymbols,
		resetWeaponSlots,
		equippedItems,
		itemAddSymbols,
		resetItemSlots,
		equippedStamps,
		stampAddSymbols,
		resetStampSlots,
		displayChoices,
		displayCharacterChoices,
		displayStatChoices,
		showBuildName,
		showStamps,
		superCollabLimit,
		banWeapon,
		buildName,
	} from "$lib/stores";

	import { Button } from "$lib/components/ui/button/index.js";
	import { resetAll } from "./utils";
	import Link from "$lib/Link.svelte";

	function weaponSlotAmount(num: number) {
		if (
			($weaponSlots > 1 && num === -1) ||
			($weaponSlots < 6 && num === 1)
		) {
			$weaponSlots += num;

			// reinitialize stores
			equippedWeapons.set(Array($weaponSlots - 1).fill(""));
			weaponAddSymbols.set(Array($weaponSlots - 1).fill("add"));

			// set new collab limit
			const newCollabLimit = $weaponSlots - 1 > 1 ? $weaponSlots - 2 : 0;
			collabLimit.set(newCollabLimit);

			// reset weapon slots in WeaponChoices
			resetWeaponSlots.set(true);
		}
	}

	function itemSlotAmount(num: number) {
		if (($itemSlots > 0 && num === -1) || ($itemSlots < 6 && num === 1)) {
			$itemSlots += num;

			// reinitialize stores
			equippedItems.set(Array($itemSlots).fill(""));
			itemAddSymbols.set(Array($itemSlots).fill("add"));

			// set new super collab limit
			const newSuperCollabLimit = $itemSlots > 0 ? 1 : 0;
			superCollabLimit.set(newSuperCollabLimit);

			if (newSuperCollabLimit === 0) {
				resetWeaponSlots.set(true);
			}

			// reset item slots in ItemChoices
			resetItemSlots.set(true);
		}
	}
	function showStatChoices() {
		// show menu
		displayChoices.set(true);
		displayStatChoices.set(true);
	}

	function showCharacterChoices(e: any) {
		e.preventDefault();
		// show menu
		displayChoices.set(!$displayChoices);
		displayCharacterChoices.set(!$displayCharacterChoices);
	}

	function clearWeapons() {
		weaponAddSymbols.set(Array($weaponSlots - 1).fill("add"));
		equippedWeapons.set(Array($weaponSlots - 1).fill(""));
		charSelected.set("");
		resetWeaponSlots.set(true);
	}

	function clearItems() {
		itemAddSymbols.set(Array(6).fill("add"));
		equippedItems.set(Array(6).fill(""));
		resetItemSlots.set(true);
	}

	function clearStamps() {
		stampAddSymbols.set(Array(3).fill("add"));
		equippedStamps.set(Array(3).fill(""));
		resetStampSlots.set(true);
	}

	function handleShowName(e: any) {
		if (!$showBuildName) buildName.set("Build Name");
		showBuildName.set(e.target.checked);
	}
</script>

<div id="settings">
	<!-- <CharacterChoicesDropdown /> -->
	<div class="flex flex-row flex-wrap justify-center gap-4">
		<div id="char-select-container">
			<Button
				variant="secondary"
				class="w-64 h-fit p-4 text-2xl hover:bg-white"
				onclick={showCharacterChoices}
				>{$charSelected ? $charSelected : "Select Character"}</Button
			>
		</div>
		<div id="options-container">
			<Button
				variant="secondary"
				class="w-64 h-fit p-4 text-2xl hover:bg-white"
				onclick={showStatChoices}>Stat Priority</Button
			>
		</div>
		<Button
			variant="destructive"
			class="w-64 h-fit p-4 text-2xl"
			id="clear-button"
			onclick={() => resetAll()}>Reset All</Button
		>
	</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div id="more-settings">
		<div id="slot-container" class="flex flex-wrap">
			<div id="input-number">
				<p>Weapon Slot #</p>
				<div id="weapon-slots">
					<button class="minus" onclick={() => weaponSlotAmount(-1)}
					></button>
					<div>{$weaponSlots}</div>
					<button class="plus" onclick={() => weaponSlotAmount(1)}
					></button>
				</div>
				<Button
					variant="destructive"
					class="mt-6"
					onclick={() => clearWeapons()}>Clear Weapons</Button
				>
			</div>
			<div id="input-number">
				<p>Item Slot #</p>
				<div id="item-slots">
					<button class="minus" onclick={() => itemSlotAmount(-1)}
					></button>
					<div>{$itemSlots}</div>
					<button class="plus" onclick={() => itemSlotAmount(1)}
					></button>
				</div>
				<Button
					variant="destructive"
					class="mt-6"
					id="clear-button"
					onclick={() => clearItems()}>Clear Items</Button
				>
			</div>
		</div>
		<div id="toggle-container" class="flex flex-wrap">
			<div id="show-build-name-container">
				<p>Show Build Name</p>
				<label class="switch">
					<input
						type="checkbox"
						bind:checked={$showBuildName}
						onchange={(e: any) => {
							e.preventDefault();
							handleShowName(e);
						}}
					/>
					<span class="slider"></span>
				</label>
			</div>
			<div id="ban-weapon-container">
				<p>Eliminate Main Weapon</p>
				<label class="switch">
					<input
						type="checkbox"
						bind:checked={$banWeapon}
						onchange={(e: any) => banWeapon.set(e.target.checked)}
					/>
					<span class="slider"></span>
				</label>
			</div>
			<div id="show-stamps-container">
				<p>Show Stamps</p>
				<label class="switch">
					<input
						type="checkbox"
						bind:checked={$showStamps}
						onchange={(e: any) => showStamps.set(e.target.checked)}
					/>
					<span class="slider"></span>
				</label>
				<Button
					variant="destructive"
					class="mt-4"
					onclick={() => clearStamps()}>Clear Stamps</Button
				>
			</div>
		</div>
	</div>
	<div id="save-settings" class="flex flex-wrap flex-row">
		<Link />
	</div>
</div>

<style lang="scss">
	#settings {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 600px;
		margin: 40px auto;
		--min: 5rem;
		--gap: 0.5rem;
		flex-wrap: wrap;
		gap: var(--gap);
		@media only screen and (max-width: 640px) {
			width: 400px;
		}
	}

	#more-settings {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 100%;
	}
	#input-number {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--dark-bg-color);
		padding: 15px;
		margin: 10px auto;

		div {
			border: 2px solid var(--font-color);
			display: inline-flex;
		}

		p {
			font-size: 14px;
			margin-bottom: 10px;
		}

		button {
			width: 30px;
			height: 30px;
			margin: auto;
		}
		#clear-button {
			width: auto;
			height: auto;
			margin-top: 15px;
			padding: 10px;
		}
	}

	.minus:after {
		content: "\2212";
	}
	.plus:after {
		content: "\002B";
	}
	.minus:after,
	.plus:after {
		font-size: 16px;
		margin-left: 2px;
	}

	#weapon-slots,
	#item-slots {
		div {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: var(--dark-bg-color);
			border: 1px solid var(--font-color);
			border-width: 0 2px;
			font-size: 16px;
			text-align: center;
			width: 50px;
			padding-bottom: 5px;
		}
	}

	#add-stat-prio {
		margin: 10px auto;
	}

	#show-build-name-container,
	#ban-weapon-container,
	#show-stamps-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		min-height: 65px;
		background-color: var(--dark-bg-color);
		padding: 15px;
		margin: 20px auto;
		#clear-button {
			width: auto;
			height: auto;
			padding: 10px;
		}
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		min-height: 36px;
		margin: 10px 0;

		input {
			opacity: 0;
			width: 0;
			height: 0;
		}
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: red;
		border: 2px solid var(--font-color);

		&:before {
			position: absolute;
			content: "";
			height: 24px;
			width: 24px;
			left: 4px;
			bottom: 4px;
			background-color: var(--font-color);
		}
	}

	input:checked {
		+ .slider {
			background-color: green;
		}

		+ .slider:before {
			transform: translateX(24px);
		}
	}

	#clear-btn-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 130px;
		margin: 5px auto;
	}
</style>

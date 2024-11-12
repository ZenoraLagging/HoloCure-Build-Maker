<script>
	import { run, stopPropagation } from "svelte/legacy";

	import {
		displayChoices,
		displayItemChoices,
		equippedItems,
		itemAddSymbols,
		clickedSlotIndex,
		removeItem,
		removeInvalidItem,
	} from "$lib/stores";

	$: displayRemoveBtn = Array(6).fill("hidden");

	function showItemChoices(index) {
		// show menu
		displayChoices.set(true);
		displayItemChoices.set(true);
		// save clicked slot
		clickedSlotIndex.set(index);
	}

	function removeGear(index) {
		// add back add symbol
		itemAddSymbols.update((arr) => {
			arr[index] = "add";
			return arr;
		});
		// save clicked slot
		clickedSlotIndex.set(index);
		// set boolean to true for the if-block in ItemChoices to execute
		removeItem.set(true);
	}

	run(() => {
		if ($removeInvalidItem > -1) {
			removeGear($removeInvalidItem);
			removeInvalidItem.set(-1);
		}
	});
</script>

<div id="items-container">
	{#each $equippedItems as equippedItem, index}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="item slot"
			onclick={() => showItemChoices(index)}
			onmouseenter={() => {
				if ($equippedItems[index] !== "") displayRemoveBtn[index] = "";
			}}
			onmouseleave={() => (displayRemoveBtn[index] = "hidden")}
		>
			<div class="img {equippedItem}">
				<span class="add material-symbols-outlined"
					>{$itemAddSymbols[index]}</span
				>
			</div>
			<span
				class="remove material-symbols-outlined {displayRemoveBtn[
					index
				]}"
				onclick={stopPropagation(() => removeGear(index))}
			>
				cancel
			</span>
		</div>
	{/each}
</div>

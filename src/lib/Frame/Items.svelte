<script lang="ts">
	import { run, stopPropagation } from "svelte/legacy";

	import {
		displayChoices,
		displayItemChoices,
		equippedItems,
		itemAddSymbols,
		clickedSlotIndex,
		removeItem,
		removeInvalidItem,
		itemSlots,
	} from "$lib/stores";
	import Button from "$lib/components/ui/button/button.svelte";
	import { basicItems } from "$lib/variables";
	import MdiPlusThick from "~icons/mdi/plus-thick";

	let displayRemoveBtn = $state(Array(6).fill("hidden"));

	function showItemChoices(index: number) {
		// show menu
		displayChoices.set(true);
		displayItemChoices.set(true);
		// save clicked slot
		clickedSlotIndex.set(index);
	}

	function removeGear(index: number) {
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

	function getItemType(item: string) {
		if (basicItems.includes(item)) return "basic";
		else return "super";
	}

	$effect(() => {
		if ($removeInvalidItem > -1) {
			removeGear($removeInvalidItem);
			removeInvalidItem.set(-1);
		}
	});
</script>

{#if $itemSlots > 0}
	<div id="items-container">
		{#each $equippedItems as equippedItem, index}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<Button
				variant="ghost"
				class="item slot w-16 h-16"
				size="icon"
				onclick={(e: any) => {
					e.preventDefault();
					showItemChoices(index);
				}}
				onmouseenter={() => {
					if ($equippedItems[index] !== "")
						displayRemoveBtn[index] = "";
				}}
				onmouseleave={() => (displayRemoveBtn[index] = "hidden")}
			>
				{#if equippedItem}
					<img
						class="w-12"
						src={`src/lib/images/items/${getItemType(equippedItem)}/${equippedItem.replaceAll(" ", "_")}_Icon.png`}
						alt={equippedItem}
					/>
				{:else}
					<img
						src={`src/lib/images/items/item_slot.png`}
						alt="item slot"
					/>
				{/if}

				<span
					class="remove material-symbols-outlined {displayRemoveBtn[
						index
					]}"
					onclick={(e: any) => {
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
{/if}

<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		displayChoices,
		displayStampChoices,
		equippedStamps,
		stampAddSymbols,
		clickedSlotIndex,
		removeStamp,
		showStamps,
	} from "$lib/stores";
	import MdiPlusThick from "~icons/mdi/plus-thick";

	let displayRemoveBtn = $state(Array(3).fill("hidden"));

	function showStampChoices(index: number) {
		// show menu
		displayChoices.set(true);
		displayStampChoices.set(true);
		// save clicked slot
		clickedSlotIndex.set(index);
	}

	function removeGear(index: number) {
		// add back add symbol
		stampAddSymbols.update((arr) => {
			arr[index] = "add";
			return arr;
		});
		// save clicked slot
		clickedSlotIndex.set(index);
		// set boolean to true for the if-block in ItemChoices to execute
		removeStamp.set(true);
	}
</script>

{#if $showStamps}
	<div id="stamps-container" class="flex flex-row flex-wrap">
		{#each $equippedStamps as equippedStamp, index}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<Button
				variant="ghost"
				class="stamp slot w-16 h-16"
				size="icon"
				onclick={(e: any) => {
					e.preventDefault();
					showStampChoices(index);
				}}
				onmouseenter={() => {
					if ($equippedStamps[index] !== "")
						displayRemoveBtn[index] = "";
				}}
				onmouseleave={() => (displayRemoveBtn[index] = "hidden")}
			>
				{#if equippedStamp}
					<img
						class="w-16"
						src={`/src/lib/images/stamps/${equippedStamp.replaceAll(" ", "_")}_Stamp_Icon.png`}
						alt={equippedStamp}
					/>
				{:else}
					<MdiPlusThick style="font-size:2em" />
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
{/if}

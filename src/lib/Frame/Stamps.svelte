<script>
	import { stopPropagation } from "svelte/legacy";

	import {
		displayChoices,
		displayStampChoices,
		equippedStamps,
		stampAddSymbols,
		clickedSlotIndex,
		removeStamp,
		showStamps,
	} from "$lib/stores";

	$: displayRemoveBtn = Array(3).fill("hidden");

	function showStampChoices(index) {
		// show menu
		displayChoices.set(true);
		displayStampChoices.set(true);
		// save clicked slot
		clickedSlotIndex.set(index);
	}

	function removeGear(index) {
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
	<div id="stamps-container">
		{#each $equippedStamps as equippedStamp, index}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="stamp slot"
				onclick={() => showStampChoices(index)}
				onmouseenter={() => {
					if ($equippedStamps[index] !== "")
						displayRemoveBtn[index] = "";
				}}
				onmouseleave={() => (displayRemoveBtn[index] = "hidden")}
			>
				<div class="img {equippedStamp}">
					<span class="add material-symbols-outlined"
						>{$stampAddSymbols[index]}</span
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
{/if}

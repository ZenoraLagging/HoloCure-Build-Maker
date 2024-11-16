<script lang="ts">
	import { run } from "svelte/legacy";

	import {
		displayChoices,
		displayStampChoices,
		equippedStamps,
		stampAddSymbols,
		clickedSlotIndex,
		removeStamp,
		resetStampSlots,
	} from "$lib/stores";

	import { stamps } from "$lib/variables";
	import { Button } from "$lib/components/ui/button";

	/** @type {{display: boolean}} */
	export let display;

	// initialize stamp displays
	$: availableStamps = stamps.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = true), accumulator
		),
		{},
	);

	// show previous equipped stamp when replacing
	function showPrevious() {
		if ($equippedStamps[$clickedSlotIndex]) {
			availableStamps[$equippedStamps[$clickedSlotIndex]] = true;
		}
	}

	function clickHandler(stamp: string) {
		showPrevious();

		// remove add symbol
		stampAddSymbols.update((arr) => {
			arr[$clickedSlotIndex] = "";
			return arr;
		});

		// add selected stamp to equipped stamps
		equippedStamps.update((arr) => {
			arr[$clickedSlotIndex] = stamp;
			return arr;
		});

		// hide selected item
		availableStamps[stamp] = false;

		// hide menu
		displayChoices.set(false);
		displayStampChoices.set(false);
	}

	function update() {
		$equippedStamps.forEach((stamp) => {
			availableStamps[stamp] = false;
		});
	}

	$: if ($removeStamp) {
		if ($clickedSlotIndex !== null) {
			showPrevious();

			// remove stamp in equipped stamp
			equippedStamps.update((arr) => {
				arr[$clickedSlotIndex] = "";
				return arr;
			});
		} else {
			// update available items from shared build
			update();
		}

		// set boolean back to false
		removeStamp.set(false);
	}

	$: if ($resetStampSlots) {
		availableStamps = stamps.reduce(
			(accumulator, currValue) => (
				(accumulator[currValue] = true), accumulator
			),
			{},
		);
		resetStampSlots.set(false);
	}
</script>

{#if display}
	<div id="stamp-choices">
		<div id="basic-choices" class="flex flex-row flex-wrap">
			{#each Object.entries(availableStamps) as [stamp, available]}
				{#if available}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<Button
						class="w-20 h-20"
						variant="ghost"
						size="icon"
						onclick={() => clickHandler(stamp)}
					>
						<img
							class="w-16 h-16"
							src={`/src/lib/images/stamps/${stamp.replaceAll(" ", "_")}_Stamp_Icon.png`}
							alt={stamp}
						/>
					</Button>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
</style>

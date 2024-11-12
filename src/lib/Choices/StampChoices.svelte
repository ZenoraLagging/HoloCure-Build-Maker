<script>
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

	/** @type {{display: any}} */
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

	function clickHandler(stamp) {
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

	run(() => {
		if ($removeStamp) {
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
	});

	run(() => {
		if ($resetStampSlots) {
			availableStamps = stamps.reduce(
				(accumulator, currValue) => (
					(accumulator[currValue] = true), accumulator
				),
				{},
			);
			resetStampSlots.set(false);
		}
	});
</script>

<div id="stamp-choices" class={display}>
	<div id="basic-choices">
		{#each Object.entries(availableStamps) as [stamp, available]}
			{#if available}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div class="stamp choice" onclick={() => clickHandler(stamp)}>
					<div class="img {stamp}"></div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.stamp:hover {
		background-color: #c2b971;
	}

	:global(.atk) {
		background-image: url("/img/stamp/ATK_Up_Stamp_Icon.png");
	}
	:global(.bomb) {
		background-image: url("/img/stamp/Bomb_Stamp_Icon.png");
	}
	:global(.cold) {
		background-image: url("/img/stamp/Cold_Stamp_Icon.png");
	}
	:global(.crit) {
		background-image: url("/img/stamp/Crit_Up_Stamp_Icon.png");
	}
	:global(.greed) {
		background-image: url("/img/stamp/Greed_Stamp_Icon.png");
	}
	:global(.haste) {
		background-image: url("/img/stamp/Haste_Up_Stamp_Icon.png");
	}
	:global(.knockback) {
		background-image: url("/img/stamp/Knockback_Stamp_Icon.png");
	}
	:global(.life-steal) {
		background-image: url("/img/stamp/Life_Steal_Stamp_Icon.png");
	}
	:global(.lightness) {
		background-image: url("/img/stamp/Lightness_Stamp_Icon.png");
	}
	:global(.marking) {
		background-image: url("/img/stamp/Marking_Stamp_Icon.png");
	}
	:global(.projectile) {
		background-image: url("/img/stamp/Projectile_Up_Stamp_Icon.png");
	}
	:global(.reverse) {
		background-image: url("/img/stamp/Reverse_Stamp_Icon.png");
	}
	:global(.rgb) {
		background-image: url("/img/stamp/RGB_Stamp_Icon.png");
	}
	:global(.size) {
		background-image: url("/img/stamp/Size_Up_Stamp_Icon.png");
	}
	:global(.slow) {
		background-image: url("/img/stamp/Slow_Stamp_Icon.png");
	}
	:global(.solo) {
		background-image: url("/img/stamp/Solo_Stamp_Icon.png");
	}
	:global(.stun) {
		background-image: url("/img/stamp/Stun_Stamp_Icon.png");
	}
	:global(.trumpet) {
		background-image: url("/img/stamp/Trumpet_Stamp_Icon.png");
	}
	:global(.unit) {
		background-image: url("/img/stamp/Unit_Stamp_Icon.png");
	}
	:global(.weaken) {
		background-image: url("/img/stamp/Weaken_Stamp_Icon.png");
	}
</style>

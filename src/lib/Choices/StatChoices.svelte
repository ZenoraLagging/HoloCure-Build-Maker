<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { images } from "$lib/images/exports.svelte";
	import {
		displayChoices,
		displayStatChoices,
		statPriorityOrder,
		showPriorityOrder,
	} from "$lib/stores";

	import { stats } from "$lib/variables";

	/** @type {{display: boolean}} */
	export let display;

	$: currentOrder = 1;
	$: statPriorityList = [];
	$: statPriorityDisplay = Array(stats.length).fill("");

	function manageOrder(index: number) {
		// unordered stat, assign order
		if (statPriorityDisplay[index] === "") {
			statPriorityDisplay[index] = currentOrder;
			currentOrder += 1;
		} else {
			// ordered stat selected, remove order
			const removedOrder = statPriorityDisplay[index];
			statPriorityDisplay[index] = "";
			currentOrder -= 1;

			// rearrange existing orders
			for (let i = 0; i < statPriorityDisplay.length; i++) {
				if (statPriorityDisplay[i] > removedOrder) {
					statPriorityDisplay[i] -= 1;
				}
			}
		}
	}

	function clickHandler(confirm: boolean) {
		// assign array for display
		statPriorityList = [];

		if (confirm) {
			statPriorityDisplay.forEach(
				(order, index) => (statPriorityList[order - 1] = stats[index]),
			);
		} else {
			// reset variables
			statPriorityDisplay = Array(stats.length).fill("");
			currentOrder = 1;
		}

		statPriorityOrder.set(statPriorityList);

		if (statPriorityList.length > 0) {
			// display in frame
			showPriorityOrder.set(true);
		} else {
			showPriorityOrder.set(false);
		}

		// hide menu
		displayChoices.set(false);
		displayStatChoices.set(false);
	}
</script>

{#if display}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div id="stats-choices" class="flex flex-wrap flex-col text-center text-lg">
		<p>Select stats in order of most prioritized to least prioritized.</p>
		<p>Not required to select all stats.</p>
		<div>
			{#each stats as stat, index}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<Button
					variant="ghost"
					class="w-fit h-fit mt-6"
					onclick={() => manageOrder(index)}
				>
					<img
						class="w-12"
						src={images[
							`/src/lib/images/stats/${stat.replaceAll(" ", "_")}_Icon.png`
						].img.src}
						alt={stat}
					/>
					<div class="order">{statPriorityDisplay[index]}</div>
				</Button>
			{/each}
		</div>
		<div
			id="options-container"
			class="mt-6 flex flex-wrap gap-3 justify-center"
		>
			<Button
				variant="secondary"
				id="confirm"
				class="hover:bg-white hover:text-black"
				onclick={() => clickHandler(true)}>Confirm</Button
			>
			<Button
				variant="destructive"
				id="clear"
				onclick={() => clickHandler(false)}>Clear</Button
			>
		</div>
	</div>
{/if}

<style lang="scss">
	#stats-choices {
		> p {
			line-height: 20px;
		}

		> p:nth-child(2) {
			margin-top: 10px;
			margin-bottom: 30px;
		}

		div:hover {
			cursor: pointer;
		}

		.order {
			position: absolute;
			top: -25px;
			font-size: 20px;
		}
	}

	:global(.stat) {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background-size: auto 100%;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		width: 24px;
		height: 24px;
		margin: auto 5px;
	}
</style>

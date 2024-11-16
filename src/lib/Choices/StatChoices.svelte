<script lang="ts">
	import { Button } from "$lib/components/ui/button";
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
	<div id="stats-choices" class={display}>
		<p>Select stats in order of most prioritized to least prioritized.</p>
		<p>Not required to select all stats.</p>
		<div>
			{#each stats as stat, index}
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<Button
					variant="ghost"
					class="w-fit h-fit"
					onclick={() => manageOrder(index)}
				>
					<img
						class="w-12"
						src={`src/lib/images/stats/${stat.replaceAll(" ", "_")}_Icon.png`}
						alt={stat}
					/>
					<div class="order">{statPriorityDisplay[index]}</div>
				</Button>
			{/each}
		</div>
		<div id="options-container">
			<button id="confirm" onclick={() => clickHandler(true)}
				>Confirm</button
			>
			<button id="clear" onclick={() => clickHandler(false)}>Clear</button
			>
		</div>
	</div>
{/if}

<style lang="scss">
	#stats-choices {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;

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

	#options-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 150px;

		#confirm,
		#clear {
			cursor: pointer;
		}

		p {
			padding-top: 20px;
			padding-bottom: 10px;

			&:hover {
				padding-bottom: 7px;
				border-bottom: 3px solid var(--font-color);
			}
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

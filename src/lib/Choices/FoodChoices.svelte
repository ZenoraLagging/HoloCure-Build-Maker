<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { equippedFoodDish } from "$lib/stores";
	import { images } from "$lib/images/exports.svelte";
	import { foods } from "$lib/variables";

	/** @type {{display: boolean}} */
	export let display;

	function clickHandler(selected: string) {
		equippedFoodDish.set(selected);
	}
</script>

{#if display}
	<div id="food-choices">
		<h1 id="item-header">Foods</h1>
		<div id="basic-choices" class="flex flex-row flex-wrap">
			{#each foods as food, i}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<Button
					class="choice {food === $equippedFoodDish
						? 'bg-red-500/50'
						: ''} w-20 h-20"
					variant="ghost"
					size="icon"
					disabled={food === $equippedFoodDish}
					onclick={() => clickHandler(food)}
				>
					<img
						class="w-16 h-fit"
						src={images[
							`/src/lib/images/foods/${food.replaceAll(" ", "_")}_Icon.png`
						].img.src}
						alt={food}
					/>
				</Button>
			{/each}
		</div>
	</div>
{/if}

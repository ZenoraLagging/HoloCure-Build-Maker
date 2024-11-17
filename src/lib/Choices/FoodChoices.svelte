<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		displayChoices,
		displayFoodChoices,
		equippedFoodDish,
	} from "$lib/stores";
	import { images } from "$lib/images/exports.svelte";
	import { foods } from "$lib/variables";

	/** @type {{display: boolean}} */
	export let display;

	function clickHandler(selected: string) {
		equippedFoodDish.set(selected);

		// hide menu
		displayChoices.set(false);
		displayFoodChoices.set(false);
	}
</script>

{#if display}
	<div id="food-choices">
		<h1 id="item-header">Foods</h1>
		<div id="basic-choices" class="flex flex-row flex-wrap">
			<Button
				class="choice w-20 h-20"
				variant="ghost"
				size="icon"
				onclick={() => clickHandler("")}
			>
				<img
					id="img"
					src={images[`/src/lib/images/equips/none.png`].img.src}
					alt="support"
				/>
			</Button>
			{#each foods as food, i}
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

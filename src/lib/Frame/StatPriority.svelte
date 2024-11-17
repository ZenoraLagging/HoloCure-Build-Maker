<script>
	import { images } from "$lib/images/exports.svelte";
	import { statPriorityOrder, showPriorityOrder } from "$lib/stores";
</script>

{#if $showPriorityOrder}
	<div class="grid grid-cols-7 sm:flex justify-evenly text-center mt-10">
		{#each $statPriorityOrder as stat, index}
			<img
				class="w-fit h-fit sm:mt-0 mt-2"
				src={images[
					`/src/lib/images/stats/${stat.replaceAll(" ", "_")}_Icon.png`
				].img.src}
				alt={stat}
			/>
			<p class="text-2xl sm:mt-0 mt-1">
				{index !== $statPriorityOrder.length - 1 ? ">" : ""}
			</p>
		{/each}
	</div>
{/if}

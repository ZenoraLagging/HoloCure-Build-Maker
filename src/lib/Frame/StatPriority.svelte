<script>
	import { images } from "$lib/images/exports.svelte";
	import { statPriorityOrder, showPriorityOrder } from "$lib/stores";
</script>

{#if $showPriorityOrder}
	<div id="stat-priority">
		{#each $statPriorityOrder as stat, index}
			<img
				class="w-fit min-h-10"
				src={images[
					`/src/lib/images/stats/${stat.replaceAll(" ", "_")}_Icon.png`
				].img.src}
				alt={stat}
			/>
			<p class="text-2xl justify-center">
				{index !== $statPriorityOrder.length - 1 ? ">" : ""}
			</p>
		{/each}
	</div>
{/if}

<style lang="scss">
	#stat-priority {
		display: flex;
		justify-content: space-evenly;
		margin-top: 10px;
	}
</style>

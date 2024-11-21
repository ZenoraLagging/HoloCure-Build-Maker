<script>
	import Button from "$lib/components/ui/button/button.svelte";
	import { images } from "$lib/images/exports.svelte";
	import { statPriorityOrder, showPriorityOrder } from "$lib/stores";
</script>

{#if $showPriorityOrder}
	<div
		class="grid grid-cols-6 sm:flex sm:flex-row min-w-80 items-middle mt-6"
	>
		{#each $statPriorityOrder as stat, index}
			<Button variant="ghost" size="icon" class="flex w-16 mx-auto">
				<img
					class="w-fit h-fit"
					src={images[
						`/src/lib/images/stats/${stat.replaceAll(" ", "_")}_Icon.png`
					].img.src}
					alt={stat}
				/>
			</Button>
			<p class="text-2xl sm:mt-0 mt-1 mx-auto">
				{index !== $statPriorityOrder.length - 1 ? ">" : ""}
			</p>
		{/each}
	</div>
{/if}

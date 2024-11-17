<script lang="ts">
	import { images } from "$lib/images/exports.svelte";
	let { charName }: { charName: string } = $props();
</script>

{#if charName}
	<div
		id="character-container"
		class="flex-col mb-5 sm:mb-0 w-32 sm:w-[200px] object-contain flex justify-evenly"
	>
		<div id="character" class="object-contain flex justify-center">
			<img
				id="img"
				class="sm:block hidden"
				src={images[
					`/src/lib/images/characters/${charName}/portrait.png`
				].img.src}
				alt="{charName} portrait"
			/>
			<img
				id="img"
				class="sm:hidden block support p-1 min-w-[127px]"
				src={images[
					`/src/lib/images/characters/Select/${charName.replaceAll(" ", "_")}_Icon.png`
				].img.src}
				alt="{charName} portrait"
			/>
		</div>
	</div>
{/if}

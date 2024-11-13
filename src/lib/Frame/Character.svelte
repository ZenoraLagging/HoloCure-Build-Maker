<script lang="ts">
	import { images } from "$lib/images/exports.svelte";
	let { charName }: { charName: string } = $props();
	console.log(images);
</script>

{#if charName}
	<div id="character-container">
		<div id="character">
			<img
				id="img"
				src={images[
					`/src/lib/images/characters/${charName}/portrait.png`
				].img.src}
				alt="{charName} portrait"
			/>
		</div>
	</div>
{/if}

<style lang="scss">
	#character-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		object-fit: contain;
		width: 200px;
		align-items: center;
		@media only screen and (max-width: 640px) {
			position: absolute;
			width: 100%;
			overflow: hidden;
			left: 0;
			right: 0;
			opacity: 0.15;
			z-index: 1;
		}
	}

	#character {
		object-fit: contain;
	}

	#img {
		height: 100%;
		width: 100%;
	}
</style>

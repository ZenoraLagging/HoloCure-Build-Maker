<script lang="ts">
	import { images } from "$lib/images/exports.svelte";
	let { charName }: { charName: string } = $props();
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
		flex-direction: column;
		justify-content: center;
		object-fit: contain;
		display: flex;
		width: 200px;
		align-items: center;
	}

	#character {
		object-fit: contain;
	}

	#img {
		height: 100%;
		width: 100%;
	}
</style>

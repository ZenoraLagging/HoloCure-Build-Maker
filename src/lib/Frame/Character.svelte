<script>
	export let charName;
</script>

{#if charName}
	<div id="character-container">
		<div id="character">
			<img
				id="img"
				src="/img/character/{charName}/portrait.png"
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
			height: 25%;
			overflow: hidden;
			left: 0;
			right: 0;
			top: 20%;
			margin-left: auto;
			margin-right: auto;
			opacity: 0.15;
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

<script>
	export let charName;
</script>

<div id="character-container">
	<div id="character">
		<div
			id="img"
			style="background-image: url('/img/character/{charName}/portrait.png');"
		/>
	</div>
</div>

<style lang="scss">
	#character-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 200px;
		@media only screen and (max-width: 600px) {
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
		height: 100%;
	}

	#img {
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: center;
		height: 100%;
	}
</style>

<script>
	import {
		charSelected,
		displayChoices,
		displayCharacterChoices,
	} from "$lib/stores";

	import { characters } from "$lib/variables";
</script>

<div id="char-select-container-mobile">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<select
		id="char-select"
		bind:value={$charSelected}
		onchange={(e) => charSelected.set(e.target.value)}
	>
		{#each characters as character}
			<option value={character}>{character}</option>
		{/each}
	</select>
</div>

<style lang="scss">
	select::-webkit-scrollbar-track {
		background-color: var(--dark-bg-color);
	}

	#char-select-container-mobile {
		position: relative;
		display: flex;
		width: 200px;
		height: 45px;
		overflow: hidden;
		margin-bottom: 20px;

		&::after {
			content: "\25BC";
			position: absolute;
			top: 0;
			right: 0;
			padding: 15px;
			color: var(--font-color);
			background-color: var(--dark-bg-color);
			pointer-events: none;
		}

		&:hover::after {
			background-color: var(--font-color);
			color: var(--dark-bg-color);
		}
	}

	#char-select {
		border: none;
		flex: 1;
		padding-left: 12px;
		padding-bottom: 5px;
		font-size: 16px;
		background-color: var(--dark-bg-color);
		background-image: none;
		cursor: pointer;

		&:hover {
			background-color: var(--font-color);
			color: var(--dark-bg-color);

			option {
				background-color: var(--dark-bg-color);
				color: var(--font-color);
			}
		}
	}
</style>

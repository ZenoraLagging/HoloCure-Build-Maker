<script>
	import {
		charSelected,
		displayChoices,
		displayCharacterChoices,
	} from "$lib/stores";
	import {
		enCharacters,
		jpCharacters,
		idCharacters,
		characters,
	} from "$lib/variables";
	export let display;

	function clickHandler(character) {
		if (character === "en") {
			let random = Math.floor(Math.random() * enCharacters.length);
			character = enCharacters[random];
		} else if (character === "jp") {
			let random = Math.floor(Math.random() * jpCharacters.length);
			character = jpCharacters[random];
		} else if (character === "id") {
			let random = Math.floor(Math.random() * idCharacters.length);
			character = idCharacters[random];
		} else if (character === "random") {
			let random = Math.floor(Math.random() * characters.length);
			character = characters[random];
		}
		charSelected.set(character);

		// hide menu
		displayChoices.set(false);
		displayCharacterChoices.set(false);
	}

	//dynamically import images as urls so i don't go crazy manually importing all by hand
	let enChars = enCharacters.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = new URL(
				"/img/character/Select/en/" +
					currValue.replace(" ", "_").replace("'", "") +
					"_Icon.png",
				import.meta.url
			).href),
			accumulator
		),
		{}
	);

	let jpChars = jpCharacters.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = new URL(
				"/img/character/Select/jp/" +
					currValue.replace(" ", "_").replace("'", "") +
					"_Icon.png",
				import.meta.url
			).href),
			accumulator
		),
		{}
	);

	let idChars = idCharacters.reduce(
		(accumulator, currValue) => (
			(accumulator[currValue] = new URL(
				"/img/character/Select/id/" +
					currValue.replace(" ", "_").replace("'", "") +
					"_Icon.png",
				import.meta.url
			).href),
			accumulator
		),
		{}
	);
</script>

<div id="character-choices" class={display}>
	<h1 id="generation-header">HoloEN</h1>
	<div id="select-character-choices">
		{#each Object.entries(enChars) as [character, url]}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="character choice {$charSelected === character
					? 'selected'
					: ''}"
				on:click={(e) => clickHandler(character)}
			>
				<!-- <div id="char-name-container">
					<p id="char-name">{character}</p>
				</div> -->
				<div class="img-char" style="background-image: url('{url}');" />
			</div>
		{/each}

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="character choice" on:click={(e) => clickHandler("en")}>
			<div class="img-char"><h1 id="random-character">?</h1></div>
		</div>
	</div>
	<h1 id="generation-header">HoloJP</h1>
	<div id="select-character-choices">
		{#each Object.entries(jpChars) as [character, url]}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="character choice {$charSelected === character
					? 'selected'
					: ''}"
				on:click={(e) => clickHandler(character)}
			>
				<div class="img-char" style="background-image: url('{url}');" />
			</div>
		{/each}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="character choice" on:click={(e) => clickHandler("jp")}>
			<div class="img-char"><h1 id="random-character">?</h1></div>
		</div>
	</div>
	<h1 id="generation-header">HoloID</h1>
	<div id="select-character-choices">
		{#each Object.entries(idChars) as [character, url]}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="character choice {$charSelected === character
					? 'selected'
					: ''}"
				on:click={(e) => clickHandler(character)}
			>
				<div class="img-char" style="background-image: url('{url}');" />
			</div>
		{/each}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="character choice" on:click={(e) => clickHandler("id")}>
			<div class="img-char"><h1 id="random-character">?</h1></div>
		</div>
	</div>

	<h1 id="generation-header">Random</h1>
	<div id="select-character-choices">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="character choice" on:click={(e) => clickHandler("random")}>
			<div class="img-char random-select">
				<h1 id="random-character">?</h1>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.character:hover {
		background-color: #2a2a2a;
	}

	.selected {
		border: 3px solid #fff38c;
		filter: brightness(30%);
		pointer-events: none;
		cursor: default;
	}
	#random-character {
		font-size: 50px;
		text-align: center;
		margin-left: 5px;
		@media only screen and (max-width: 1280px) {
			font-size: 40px;
		}
	}
	#char-name-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		background: rgba(0, 0, 0, 0.4);
		padding: 1px 0;
		z-index: 10;
	}
	#char-name {
		text-align: center;
	}
</style>

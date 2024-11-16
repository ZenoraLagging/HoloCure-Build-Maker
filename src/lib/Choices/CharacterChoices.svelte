<script lang="ts">
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
		jpGen3,
		jpGen4,
	} from "$lib/variables";
	import { Button } from "$lib/components/ui/button/index.js";
	/** @type {{display: any}} */
	let { display } = $props();

	function clickHandler(character: string) {
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
</script>

{#if display}
	<div id="character-choices">
		<h1 id="generation-header">HoloEN</h1>
		<div id="select-character-choices" class="flex flex-row flex-wrap">
			{#each enCharacters as character}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<Button
					class="w-fit h-fit character p-1 {$charSelected ===
					character
						? 'selected'
						: ''}"
					variant="ghost"
					onclick={() => clickHandler(character)}
				>
					<img
						class="w-16"
						src={`/src/lib/images/characters/Select/${character.replaceAll(" ", "_")}_Icon.png`}
						alt={character}
					/>
				</Button>
			{/each}

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<Button
				class="character  w-[72px] h-[70px]  text-2xl"
				variant="ghost"
				onclick={(e: any) => clickHandler("en")}
			>
				?
			</Button>
		</div>
		<h1 id="generation-header">HoloJP</h1>
		<div id="select-character-choices" class="flex flex-row flex-wrap">
			{#each jpCharacters as character}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<Button
					class="w-fit h-fit character p-1 {$charSelected ===
					character
						? 'selected'
						: ''}"
					variant="ghost"
					onclick={() => clickHandler(character)}
				>
					{#if jpGen3.includes(character) || jpGen4.includes(character)}
						<p class="absolute bottom-[-18px] text-red-400">New!</p>
					{/if}
					<img
						class="w-16"
						src={`/src/lib/images/characters/Select/${character.replaceAll(" ", "_")}_Icon.png`}
						alt={character}
					/>
				</Button>
			{/each}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<Button
				class="character p-1  w-[72px] h-[70px] text-2xl"
				variant="ghost"
				onclick={(e: any) => clickHandler("jp")}
			>
				?
			</Button>
		</div>
		<h1 id="generation-header">HoloID</h1>
		<div id="select-character-choices" class="flex flex-row flex-wrap">
			{#each idCharacters as character}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<Button
					class="w-fit h-fit character p-1 {$charSelected ===
					character
						? 'selected'
						: ''}"
					variant="ghost"
					onclick={() => clickHandler(character)}
				>
					<img
						class="w-16"
						src={`/src/lib/images/characters/Select/${character.replaceAll(" ", "_")}_Icon.png`}
						alt={character}
					/>
				</Button>
			{/each}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<Button
				variant="ghost"
				class="character p-1 w-[72px] h-[70px] text-2xl"
				onclick={(e: any) => clickHandler("id")}
			>
				?
			</Button>
		</div>

		<h1 id="generation-header">Random</h1>
		<div
			id="select-character-choices"
			class="flex flex-row flex-wrap align-center"
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<Button
				class="character p-1 w-[72px] h-[70px] text-2xl"
				variant="ghost"
				onclick={(e: any) => clickHandler("random")}
			>
				?
			</Button>
		</div>
	</div>
{/if}

<style lang="scss">
	.selected {
		border: 3px solid #fff38c;
		filter: brightness(30%);
		pointer-events: none;
		cursor: default;
	}
	#generation-header {
		padding: 10px 0 5px 0;
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
	.specialtext {
		-webkit-text-fill-color: transparent;
		-webkit-text-stroke-width: 1px;
	}
</style>

<script lang="ts">
	// @ts-nocheck
	import toast, { Toaster } from "svelte-hot-french-toast";
	import Frame from "$lib/Frame/Frame.svelte";
	import Settings from "$lib/Settings.svelte";
	import Choices from "$lib/Choices/Choices.svelte";

	// Vercel Analytics
	import { inject } from "@vercel/analytics";
	import { dev, browser } from "$app/environment";
	import { page } from "$app/stores";
	import { webVitals } from "$lib/vitals";

	inject({ mode: dev ? "development" : "production" });

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	$effect(() => {
		if (browser && analyticsId) {
			webVitals({
				path: $page.url.pathname,
				params: $page.params,
				analyticsId,
			});
		}
	});

	// generate build from parameter
	import { Buffer } from "buffer";
	import {
		charSelected,
		showBuildName,
		buildName,
		equippedWeapons,
		weaponAddSymbols,
		removeWeapon,
		weaponSlots,
		collabLimit,
		equippedItems,
		itemAddSymbols,
		removeItem,
		equippedStamps,
		stampAddSymbols,
		removeStamp,
		showStamps,
		statPriorityOrder,
		showPriorityOrder,
		banWeapon,
		itemSlots,
		equippedPrism,
		equippedFoodDish,
		equippedSupportItem,
	} from "$lib/stores";
	import {
		characters,
		collabWeapons,
		weapons,
		items,
		stamps,
		stats,
	} from "$lib/variables";
	import { resetAll } from "$lib/utils.js";

	/** @type {{data: any}} */
	let { data } = $props();

	if (data.success) {
		toast.success("Successfully loaded build!", {
			icon: "✔️",
			style: "color: #fff; background-color: #333;",
		});
		const build = data.build;
		// const itemArray = build.items.map((v, i) => ({ id: i, name: v }));
		charSelected.set(build.character);
		if (build.name && build.name != "") {
			buildName.set(build.name);
			showBuildName.set(true);
		}

		weaponSlots.set(build.weaponSlots);
		itemSlots.set(build.itemSlots);

		equippedWeapons.set(build.weapons);
		equippedItems.set(build.items);
		equippedStamps.set(build.stamps);
		equippedPrism.set(build.prism);
		equippedFoodDish.set(build.foodDish);
		equippedSupportItem.set(build.supportItem);

		if (build.stats.length > 0) {
			statPriorityOrder.set(build.stats);
			showPriorityOrder.set(true);
		}
		banWeapon.set(build.bannedWeapon);
		showStamps.set(build.bannedStamp);
	} else {
		resetAll();
	}
</script>

<Toaster />
<main id="main-container">
	<h1 id="title">HOLOCURE BUILD MAKER</h1>
	<p id="subtitle">Updated for v0.7</p>
	<div id="pending-updates">
		<p>○ Added JP Gen 3 & 4</p>
	</div>

	<Frame />
</main>
<Settings />
<Choices />

<style lang="scss">
	:global(:root) {
		--font-color: #e5e7eb;
		--bg-color: #27272a;
		--dark-bg-color: #18181b;
	}

	:global(::-webkit-scrollbar) {
		width: 6px;
	}
	:global(::-webkit-scrollbar-thumb) {
		background-color: var(--font-color);
		border-radius: 10px;

		&:hover {
			background-color: white;
		}
	}
	:global(::-webkit-scrollbar-track) {
		background-color: var(--bg-color);
	}

	:global(*) {
		color: var(--font-color);
		/* mozilla scrollbar */
		scrollbar-color: var(--font-color) var(--bg-color) !important;
		scrollbar-width: thin !important;
	}
	:global(*, body) {
		font-family: BestTenDOT;
		letter-spacing: 1px;
	}

	:global(select option) {
		/* custom typeface somehow doesn't apply to the dropdown items, so a fallback */
		font-family: Arial, Helvetica, sans-serif;
	}

	:global(input:focus, select:focus, button:focus) {
		outline: none;
	}

	:global(button) {
		position: relative;
		cursor: pointer;
		border: none;
		width: 130px;
		height: 35px;
		font-size: 14px;
		background-color: var(--dark-bg-color);
		padding-bottom: 5px;

		&:hover {
			background-color: var(--font-color);
			color: var(--dark-bg-color);
		}
	}

	:global(input:focus, select:focus, button:focus) {
		outline: none;
	}

	#main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#title {
		font-size: 48px;
		margin-top: 50px;
		margin-bottom: 30px;
		letter-spacing: 3px;
		text-align: center;
	}
	#subtitle {
		margin-bottom: 10px;
	}

	#pending-updates {
		margin-bottom: 20px;
	}

	#timestamp {
		margin-bottom: 5px;
		font-size: 11px;
	}

	:global(.img) {
		position: relative;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: 40px;
		height: 40px;
	}

	:global(.img-char) {
		position: relative;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: 64px;
		height: 64px;
		@media only screen and (max-width: 1920px) {
			width: 48px;
			height: 48px;
		}
	}

	:global(.character) {
		border: 3px solid #ffffff;
	}
	:global(.weapon) {
		border: 3px solid #4779f4;
	}

	:global(.item) {
		border: 3px solid #9fff87;
	}

	:global(.unavailable) {
		border: 3px solid #cc2e5b;
	}

	:global(.support) {
		border: 3px solid white;
	}

	:global(.stamp) {
		border: 3px solid #fff38c;
	}

	:global(#save-image-container, #generate-link-container) {
		display: flex;
		justify-content: center;
		width: 100%;
		padding-bottom: 20px;
	}
	:global(#save-image, #generate-link, #add-stat-prio) {
		font-size: 16px;
		width: 175px;
		height: 40px;
	}

	#source-code-container {
		position: absolute;
		bottom: 10px;
		right: 10px;
	}
	#source-code {
		text-decoration: none;
		font-size: 12px;
		padding-bottom: 5px;

		&:hover {
			border-bottom: 2px dashed var(--font-color);
		}
	}
</style>

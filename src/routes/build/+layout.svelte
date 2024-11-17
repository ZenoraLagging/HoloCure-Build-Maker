<script lang="ts">
	import "../../app.css";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import { type Snippet } from "svelte";
	import { page } from "$app/stores";
	import { images } from "$lib/images/exports.svelte";

	const charName = $page.data.build ? $page.data.build.character : "";
	const image = charName
		? images[
				`/src/lib/images/characters/Select/${charName.replaceAll(" ", "_")}_Icon.png`
			].img.src
		: images[`/src/lib/images/og/hud_icon.png`].img.src;
	const url = "https://holocure-build-maker-opal.vercel.app";

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	{#if $page.data.meta}
		{#each $page.data.meta as { name, content }}
			<meta {name} {content} />
		{/each}
	{/if}

	<meta property="og:image" content={image} />
	<meta property="og:site_name" content="HoloCure Build Maker" />
	<meta property="og:url" content={url} />
</svelte:head>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex mt-2 shrink-0 items-center gap-2">
			<div class="flex flex-1 items-center gap-2 px-3">
				<Sidebar.Trigger />
			</div>
		</header>
		<div class="flex flex-1 flex-col px-4">
			{@render children?.()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>

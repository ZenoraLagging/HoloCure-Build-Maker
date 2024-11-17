<script lang="ts">
	import "../../../app.css";
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
	<meta property="og:image" content={image} />
	<meta property="og:site_name" content="HoloCure Build Maker" />
	<meta property="og:url" content={url} />
</svelte:head>

{@render children?.()}

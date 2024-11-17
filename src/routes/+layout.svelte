<script lang="ts">
	import "../app.css";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import { type Snippet } from "svelte";
	import { page } from "$app/stores";
	import { images } from "$lib/images/exports.svelte";

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	{#if $page.data.meta}
		{#each $page.data.meta as { name, content }}
			<meta {name} {content} />
		{/each}
	{/if}

	<meta property="og:site_name" content="HoloCure Build Maker" />
	<meta
		property="og:url"
		content="https://holocure-build-maker-opal.vercel.app/"
	/>
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

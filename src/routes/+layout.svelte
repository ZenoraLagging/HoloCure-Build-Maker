<script lang="ts">
	import "../app.css";
	import MainNav from "$lib/Navbar/MainNav.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import AppSidebar from "$lib/components/app-sidebar.svelte";
	import { type Snippet } from "svelte";

	let { children }: { children: Snippet } = $props();
</script>

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

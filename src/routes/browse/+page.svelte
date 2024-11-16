<script lang="ts">
	// @ts-nocheck
	import toast, { Toaster } from "svelte-hot-french-toast";

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

	/** @type {{data: any}} */
	let { data } = $props();
</script>

<Toaster />
<main id="main-container"></main>

import adapter from '@sveltejs/adapter-vercel';
import {
	importAssets
} from 'svelte-preprocess-import-assets'
import {
	vitePreprocess
} from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [importAssets(), vitePreprocess()],
	kit: {
		adapter: adapter()
	},
};

export default config;
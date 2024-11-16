import {
	sveltekit
} from '@sveltejs/kit/vite';
import {
	enhancedImages
} from '@sveltejs/enhanced-img';
import {
	defineConfig
} from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit(),
		Icons({
		compiler: 'svelte',
		autoInstall: true,
	})],
	define: {
		'import.meta.env.VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID)
	}
});
import { images } from "$lib/images/exports.svelte";


export const load = (async () => {
	const meta = [
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1'
		},
		{
			name: 'description',
			content: "Generate and share builds for HoloCure"
		},
		{
			name: 'description',
			content: "Generate and share builds for HoloCure"
		},
		{
			name: "keywords",
			content: "holocure, build, maker, guide" 
		},
		{
			name: "author",
			content: "Zenora" 
		},
		{
			name: "og:title",
			content: "HoloCure Build Maker" 
		},
		{
			name:"og:description",
			content: "A build maker for Holocure." 
		},
		{
			property:"og:image",
			content: images[`/src/lib/images/og/holocure_icon.png`].img.src,
		},
		{
			property: "og:site_name",
			content: "HoloCure Build Maker" 
		},
		{
			property:"og:url",
			content: "https://holocure-build-maker-opal.vercel.app/"
		}]

	try {
	return {
		meta: meta
	};
	} catch (error) {
		console.log(error);
	}
});

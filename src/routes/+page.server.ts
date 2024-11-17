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
		}]

	try {
	return {
		meta: meta
	};
	} catch (error) {
		console.log(error);
	}
});

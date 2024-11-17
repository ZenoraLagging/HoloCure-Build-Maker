import { eq } from 'drizzle-orm';
import { db } from '$lib/db/index';
import { buildsTable } from '$lib/db/schema';
import { images } from '$lib/images/exports.svelte';

export const load = (async ({ url }) => {
	const build = url.searchParams.get('id');
    if (!build || build.length<= 0) {
        return;
	}
	try {
    const result = await db.select().from(buildsTable).where(eq(buildsTable.build_key, build));
    if (!result.length)
        return;

	const charName = result[0].character;
	const image = charName ? images[`/src/lib/images/characters/Select/${charName.replaceAll(" ", "_")}_Icon.png`].img.src : images[`/src/lib/images/og/holocure_icon.png`].img.src;
	
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
			content: result[0].name ? result[0].name : 'HoloCure Build Maker'
		},
		{
			name:"og:description",
			content: charName ? charName + "'s Build" : 'A generic build for any character.'
		},
		{
			property:"og:image",
			content: image
		},
		{
			property: "og:site_name",
			content: "HoloCure Build Maker" 
		},
		{
			property:"og:url",
			content: "https://holocure-build-maker-opal.vercel.app/"
		}]


	return {
			meta: meta,
			success: true,
			build: result[0]
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			build: []
		}
	}
});

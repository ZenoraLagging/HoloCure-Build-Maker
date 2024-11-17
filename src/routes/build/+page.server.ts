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
	const title = result[0].name ? result[0].name : 'HoloCure Build Maker';
	const description = charName ? "A build for " + charName : 'A generic build for any character.';
	const image = charName ? images[`/src/lib/images/characters/Select/${charName.replaceAll(" ", "_")}_Icon.png`].img.src : images[`/src/lib/images/og/holocure_icon.png`].img.src;
	const url = "https://holocure-build-maker-opal.vercel.app";

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
			content: title
		},
		{
			name:"og:description",
			content: description
		},
		{
			property:"og:image",
			content: url + image
		},
		{
			property: "og:site_name",
			content: "HoloCure Build Maker" 
		},
		{
			property:"og:url",
			content: url
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

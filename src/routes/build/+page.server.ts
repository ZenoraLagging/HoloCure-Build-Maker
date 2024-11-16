import { eq } from 'drizzle-orm';
import { db } from '$lib/db/index';
import { buildsTable } from '$lib/db/schema';

export const load = (async ({ url }) => {
	const build = url.searchParams.get('id');
    if (!build || build.length<= 0) {
        return;
	}
	try {
    const result = await db.select().from(buildsTable).where(eq(buildsTable.build_key, build));
    if (!result.length)
        return;
	return {
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

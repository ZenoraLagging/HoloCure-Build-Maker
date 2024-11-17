/** @type {import('./$types').RequestHandler} */
import { buildsTable } from '$lib/db/schema.js';
import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit'
import { db } from '$lib/db/index.js';
import { error } from '@sveltejs/kit';

type NewBuild = typeof buildsTable.$inferInsert;

export async function POST({ request }) {
	const params = await request.json()
	const build: NewBuild = params;

	try {
		
	// const dupeBuild = await db.select().from(buildsTable).where(eq(buildsTable.build_string, params.build_string));

	const res = await db.insert(buildsTable).values(build).returning({ insertedId: buildsTable.id });
	return json({data: res, build_id: params.build_key});

	// else {
	// 	return json({data: dupeBuild[0].id, build_id: dupeBuild[0].build_key});
	// }
	} catch(e) {
		throw error(404, 'Error');
	}
}
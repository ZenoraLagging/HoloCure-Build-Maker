/** @type {import('./$types').RequestHandler} */
import { buildsTable } from '$lib/db/schema.js';
import { json } from '@sveltejs/kit'
import { db } from '$lib/db/index.js';
import { error } from '@sveltejs/kit';

type NewBuild = typeof buildsTable.$inferInsert;

export async function POST({ request }) {
	const params = await request.json()
	const build: NewBuild = params;

	try {
	const res = await db.insert(buildsTable).values(build).returning({ insertedId: buildsTable.id });

	return json({data: res});
	} catch(e) {
		throw error(404, 'Error');
	}
}
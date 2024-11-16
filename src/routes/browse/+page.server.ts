import { getTableColumns } from 'drizzle-orm';
import { db } from '$lib/db/index';
import { buildsTable } from '$lib/db/schema';

const { build_string, ...rest } = getTableColumns(buildsTable);

export const load = async () => {
	try {
    const result = await db.select({ ...rest }).from(buildsTable);
    if (!result.length)
        return;
	return {
			success: true,
			builds: result
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			builds: []
		}
	}
};

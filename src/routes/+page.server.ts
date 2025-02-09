import { db } from '$lib/server/db.server.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	const recipes = await db.recipe.findMany({
		include: {
			user: true
		}
	});

	return {
		recipes
	};
};

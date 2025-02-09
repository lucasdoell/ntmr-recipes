import { db } from '$lib/server/db.server.js';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params }) => {
	const recipe = await db.recipe.findFirst({
		where: {
			id: params.recipeId
		},
		include: {
			user: true
		}
	});

	if (!recipe) {
		fail(404);
	}

	return {
		recipe
	};
};

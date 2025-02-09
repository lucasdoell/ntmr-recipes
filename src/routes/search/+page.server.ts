import { db } from '$lib/server/db.server.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
	const recipes = await db.recipe.findMany({
		include: {
			user: true
		},
		where: {
			OR: [
				{
					name: {
						contains: event.url.searchParams.get('q') ?? '',
						mode: 'insensitive'
					}
				},
				{
					description: {
						contains: event.url.searchParams.get('q') ?? '',
						mode: 'insensitive'
					}
				}
			]
		}
	});

	return {
		recipes
	};
};

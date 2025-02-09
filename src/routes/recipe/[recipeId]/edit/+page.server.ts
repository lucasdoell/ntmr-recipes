import { auth } from '$lib/auth.js';
import { db } from '$lib/server/db.server.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { editRecipeFormSchema } from './schema';

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
		form: await superValidate(zod(editRecipeFormSchema)),
		recipe
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(editRecipeFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		if (!session) {
			return fail(401, {
				form
			});
		}

		const recipe = await db.recipe.findFirst({
			where: {
				id: event.params.recipeId
			},
			include: {
				user: true
			}
		});

		if (!recipe) {
			return fail(404, {
				form
			});
		}

		if (recipe.user.id !== session.user.id) {
			return fail(403, {
				form
			});
		}

		await db.recipe.update({
			where: {
				id: event.params.recipeId
			},
			data: {
				name: form.data.name,
				description: form.data.description,
				updatedAt: new Date()
			}
		});

		return {
			form
		};
	}
};

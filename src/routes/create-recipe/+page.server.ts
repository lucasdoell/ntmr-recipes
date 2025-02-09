import { auth } from '$lib/auth.js';
import { db } from '$lib/server/db.server.js';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types.js';
import { createRecipeFormSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(createRecipeFormSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(createRecipeFormSchema));
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

		await db.recipe.create({
			data: {
				id: crypto.randomUUID(),
				userId: session.user.id,
				name: form.data.name,
				description: form.data.description,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		});

		return {
			form
		};
	}
};

import { z } from 'zod';

export const editRecipeFormSchema = z.object({
	name: z.string().min(1, { message: 'Recipe name is required.' }),
	description: z.string().min(1, { message: 'Recipe description is required.' })
});

export type EditRecipeFormSchema = typeof editRecipeFormSchema;

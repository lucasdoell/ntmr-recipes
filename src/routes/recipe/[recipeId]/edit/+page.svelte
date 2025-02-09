<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { editRecipeFormSchema } from './schema';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(editRecipeFormSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid && !f.errors._errors) {
				toast.success('Recipe updated!');
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	form.form.set({ name: data.recipe!.name, description: data.recipe!.description });

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Recipe Name</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.Description>The name of your recipe. What are you cooking?</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Recipe Description</Form.Label>
				<Textarea {...props} bind:value={$formData.description} />
			{/snippet}
		</Form.Control>
		<Form.Description>
			A description of your recipe. This should include the ingredients and steps.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>

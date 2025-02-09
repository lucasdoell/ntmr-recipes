<script lang="ts">
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';

	let { data } = $props();
	console.log(data.recipes);
</script>

<h1 class="text-xl font-bold">Welcome to NTMR Recipes</h1>

<ul class="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each data.recipes as recipe}
		<li>
			<Card>
				<CardHeader>
					<h2 class="text-xl font-bold"><a href="/recipe/{recipe.id}">{recipe.name}</a></h2>
					<p class="text-muted-foreground text-sm">
						Created {new Date(recipe.createdAt).toLocaleDateString()} by {recipe.user.name}
					</p>
				</CardHeader>
				<CardContent>
					<p class="text-muted-foreground h-48 overflow-y-auto text-sm">
						{recipe.description}
					</p>
				</CardContent>
				<CardFooter>
					<p class="text-muted-foreground text-sm">
						Last updated {new Date(recipe.updatedAt).toLocaleDateString()}
						{new Date(recipe.updatedAt).toLocaleTimeString()}
					</p>
				</CardFooter>
			</Card>
		</li>
	{/each}
</ul>

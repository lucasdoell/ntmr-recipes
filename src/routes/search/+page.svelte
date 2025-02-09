<script lang="ts">
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';

	let { data } = $props();
</script>

<h1 class="text-2xl font-bold">Search Results</h1>

<p>Found {data.recipes.length} recipes</p>

<ul class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

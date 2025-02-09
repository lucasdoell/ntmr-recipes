<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const session = authClient.useSession();

	let canEdit = session.value?.data?.user.id === data.recipe!.user.id;
</script>

<h1 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">{data.recipe!.name}</h1>
<p class="text-muted-foreground text-sm">
	Created {new Date(data.recipe!.createdAt!).toLocaleDateString()} by {data.recipe!.user.name}
</p>

<p class="my-6 leading-7">{data.recipe?.description}</p>

{#if canEdit}
	<Button>
		<a href="/recipe/{data.recipe!.id}/edit">Edit</a>
	</Button>
{/if}

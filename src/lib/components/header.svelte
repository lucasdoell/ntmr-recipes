<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import ModeToggle from '$lib/components/mode-toggle.svelte';
	import { Button } from '$lib/components/ui/button';

	function handleLogin() {
		goto('/login');
	}

	const session = authClient.useSession();
</script>

<header class="">
	<div class="container mx-auto flex items-center justify-between px-4 py-4">
		<h1 class="text-xl font-bold"><a href="/">NTMR Recipes</a></h1>

		<nav aria-label="Main Navigation" class="flex items-center gap-2">
			<ModeToggle />
			{#if $session.data?.user}
				<p>Hello, {$session.data.user.name}</p>
			{:else}
				<Button onclick={handleLogin} variant="outline" aria-label="Login">Login</Button>
			{/if}
		</nav>
	</div>
</header>

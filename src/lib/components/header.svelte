<script lang="ts">
	import { goto } from '$app/navigation';
	import ModeToggle from '$lib/components/mode-toggle.svelte';
	import { Button } from '$lib/components/ui/button';

	function handleLogin() {
		goto('/login');
	}
</script>

<header class="">
	<div class="container mx-auto flex items-center justify-between px-4 py-4">
		<h1 class="text-xl font-bold"><a href="/">Recipe Board</a></h1>

		<nav aria-label="Main Navigation" class="flex items-center gap-2">
			<ModeToggle />
			<Button onclick={handleLogin} variant="outline" aria-label="Login">Login</Button>
		</nav>
	</div>
</header>

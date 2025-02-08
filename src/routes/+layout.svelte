<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	let { children } = $props();
</script>

<Header />
<ModeWatcher />
<div class="container mx-auto px-4 py-4">
	{@render children()}
</div>

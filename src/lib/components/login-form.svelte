<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let loading = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		const email = form.elements.namedItem('email') as HTMLInputElement;
		const password = form.elements.namedItem('password') as HTMLInputElement;

		const formData = {
			email: email.value,
			password: password.value
		};

		await authClient.signIn.email(
			{
				email: formData.email,
				password: formData.password
			},
			{
				onRequest: () => {
					loading = true;
				},
				onSuccess: (ctx) => {
					loading = false;
					goto('/');
				},
				onError: (ctx) => {
					alert(ctx.error.message);
					loading = false;
				}
			}
		);
	}
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form onsubmit={handleSubmit}>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="alice@example.com" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
					</div>
					<Input id="password" type="password" required placeholder="••••••••" />
				</div>
				<Button type="submit" class="w-full" disabled={loading}>Login</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="/sign-up" class="underline"> Sign up </a>
			</div>
		</form>
	</Card.Content>
</Card.Root>

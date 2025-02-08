<script lang="ts">
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
		const name = form.elements.namedItem('name') as HTMLInputElement;

		const formData = {
			email: email.value,
			password: password.value,
			name: name.value
		};

		const { data, error } = await authClient.signUp.email(
			{
				email: formData.email,
				password: formData.password,
				name: formData.name,
				image: '',
				callbackURL: '/'
			},
			{
				onRequest: () => {
					loading = true;
				},
				onSuccess: (ctx) => {
					loading = false;
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
		<Card.Title class="text-2xl">Sign Up</Card.Title>
		<Card.Description>Enter an email, name, and password to create an account.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form onsubmit={handleSubmit}>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="alice@example.com" required />
				</div>
				<div class="grid gap-2">
					<Label for="name">Name</Label>
					<Input id="name" type="text" placeholder="Alice" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
					</div>
					<Input id="password" type="password" required placeholder="••••••••" />
				</div>
				<Button type="submit" class="w-full" disabled={loading}>Sign Up</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/sign-up" class="underline"> Log in </a>
			</div>
		</form>
	</Card.Content>
</Card.Root>

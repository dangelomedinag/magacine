<script lang="ts">
	import { page } from '$app/state';
	import LoginActiveSession from '$components/ui/LoginActiveSession.svelte';
	import LoginForm from '$components/ui/LoginForm.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';

	let { form } = $props();

	let loading = $state(false);

	const handlerSubmit: SubmitFunction = ({ formElement }) => {
		loading = true;
		return async ({ update, result }) => {
			await update();

			loading = false;

			if (result.type === 'failure') {
				await tick();

				formElement.username?.focus();
			}
		};
	};
</script>

<svelte:head>
	<title>Sign In - Magacine</title>
</svelte:head>

<main class="login">
	<div class="container">
		{#if page.data.user}
			<h1 class="title">Session</h1>
			<LoginActiveSession user={page.data.user} />
		{:else}
			<h1 class="title">Sign in</h1>
			<LoginForm {loading} {form} {handlerSubmit} />
		{/if}
	</div>
</main>

<style>
	.login {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		width: 100vw;
		height: 100dvh;
		background-image: url('/imgs/login-bg-image.webp');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		background-color: #000000b3;
		background-blend-mode: multiply;
	}

	.container {
		width: 90%;
		background: var(--c-main);
		padding: 1.5em;
		border-radius: 12px;
		box-shadow: var(--shadow-long);
		max-width: 500px;
	}

	.title {
		display: block;
		width: 100%;
		font-size: 2em;
		margin-top: 0;
		color: var(--c-text-base);
	}
</style>

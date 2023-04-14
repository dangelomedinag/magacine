<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Alert from '$components/ui/alert.svelte';
	import Spinner from '$components/ui/spinner.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let form;

	let loading = false;

	const handlerSubmit = (() => {
		loading = true;
		return async ({ update }) => {
			await update({ reset: true });
			loading = false;
		};
	}) satisfies SubmitFunction;

	const completeInput = (invalid?: boolean) => {
		const username_input = document.getElementById('username');
		if (username_input && 'value' in username_input)
			username_input.value = invalid ? 'invalid' : 'magacineuser';

		const password_input = document.getElementById('password');
		if (password_input && 'value' in password_input) password_input.value = 'superpassword';
	};
</script>

<svelte:head>
	<title>Sign In - Magacine</title>
</svelte:head>

<main class="login">
	{#if loading}
		<Spinner position="absolute" size="8em" />
	{/if}
	<div class="container">
		{#if $page.data.user}
			<h1 class="title">Session</h1>
			<form action="/logout" method="post" class="form">
				<a href="/" class="link user">
					<img
						loading="lazy"
						src={$page.data.user.avatar}
						alt="{$page.data.user.username} - avatar profile"
					/>
					<span class="username">@{$page.data.user.username}</span>
					<h2>{$page.data.user.name} {$page.data.user.lastname}</h2>
				</a>
				<input class="input submit" type="submit" value="logout all sessions" />
			</form>
		{:else}
			<h1 class="title">Sign in</h1>
			<form method="post" class="form" use:enhance={handlerSubmit}>
				<div class:error={form?.username}>
					<label for="username">username:</label>
					<input
						class="input"
						type="text"
						name="username"
						id="username"
						placeholder="✅ any word ❌ 'invalid' or 'non-existent'"
						autocomplete="off"
						minlength="3"
						required
						on:input={(e) => {
							if (form?.username) {
								if (form.username !== e.currentTarget.value) form.username = '';
								if (!form.username && !form.password) form = null;
							}
						}}
					/>
				</div>
				<div class:error={form?.password}>
					<label for="password">password:</label>
					<input
						class="input"
						type="password"
						name="password"
						id="password"
						placeholder="✅ 'superpassword' ❌ any other word"
						required
						minlength="3"
						on:input={(e) => {
							if (form?.password) {
								if (form.password !== e.currentTarget.value) form.password = '';
								if (!form.username && !form.password) form = null;
							}
						}}
					/>
				</div>
				<input
					class="input submit"
					type="submit"
					value={loading ? 'await please...' : 'inicar session'}
					disabled={loading}
				/>
				{#if form?.errors}
					<div>
						<Alert warn><span>Message:</span> {form?.errors}</Alert>
					</div>
				{/if}
			</form>
			<div class="actions">
				<a href={'#'} on:click={() => completeInput()} class="link">remember me</a>
				<a href={'#'} on:click={() => completeInput(true)} class="link">Need help?</a>
			</div>
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
		height: 100vh;
		background-image: url('/imgs/login-bg-image.webp');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		background-color: #b3b3b3;
		background-blend-mode: multiply;
	}

	.container {
		width: 90%;
		background: var(--c-main);
		padding: 1em;
		border-radius: 10px;
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

	.form {
		display: flex;
		flex-direction: column;
		gap: 0.8em;
		width: 100%;
	}

	.input {
		font-size: 1em;
		display: block;
		width: 100%;
		padding: 0.8em;
		border-width: 1px;
		border-color: transparent;
		background-color: rgba(128, 128, 128, 0.15);
		border-radius: 5px;
	}

	.error .input {
		border-color: #d42525;
	}
	.error .input:focus {
		outline-color: #d42525;
	}
	.error label {
		color: #d42525;
		opacity: 1;
	}

	label {
		text-align: left;
		display: block;
		font-size: 0.8rem;
		margin-bottom: 0.2em;
		/* opacity: 0.5; */
	}

	.submit {
		background-color: var(--c-front);
		font-weight: bold;
		color: white;
	}
	.input:focus {
		/* outline-offset: -3px; */
		outline-color: grey;
		outline-width: 1px;
		outline-style: dashed;
	}

	.submit:disabled,
	.form:invalid > .submit {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: grey;
	}

	.form:not(:invalid) .submit:not(:disabled):hover {
		background-color: var(--c-front-dark);
	}

	.user {
		display: block;
		color: inherit;
		width: auto;
		text-decoration: none;
	}

	.user img {
		text-align: center;
		margin: 0 auto;
		display: block;
		border-radius: 100%;
		width: 80px;
		height: auto;
		border: 3px solid var(--c-front);
	}

	.username {
		font-size: 0.8em;
	}
	h2 {
		font-size: 1.2em;
		text-transform: uppercase;
		margin: 0;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1em;
	}

	.link {
		font-size: 0.9em;
		text-decoration: none;
		color: var(--c-text-base);
	}

	.link:hover {
		color: var(--c-front);
	}
</style>

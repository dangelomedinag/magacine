<script>
	import Alert from '$components/ui/alert.svelte';
	import { page } from '$app/stores';
	import { pricePlans } from '$lib/stores/plans-store';
	import { enhance, applyAction } from '$app/forms';
	import Spinner from '$components/ui/spinner.svelte';

	/**@type {import("./$types").ActionData}*/
	export let form;
	let loading = false;
	function onclick() {
		$pricePlans = false;
	}
</script>

<svelte:head>
	<title>Sign In - Magacine</title>
</svelte:head>

<main class="login">
	{#if loading}
		<Spinner position="absolute" size="8rem" />
	{/if}
	<div class="login__container">
		{#if $page.data.user}
			<h1 class="login__title">Session</h1>
			<a href="/" on:click={onclick} class="login__session__user">
				<img src={$page.data.user.avatar} alt="{$page.data.user.username} - avatar profile" />
				<h3>{$page.data.user.username}</h3>
				<h4>{$page.data.user.name} {$page.data.user.lastname}</h4>
			</a>
			<form action="/logout" method="post">
				<button type="submit" class="login__close">logout all sessions</button>
			</form>
			<!-- <a href="/logout" class="login__close">logout all sessions</a> -->
		{:else}
			<h1 class="login__title">Sign In</h1>
			<form
				method="post"
				class="login__form"
				use:enhance={() => {
					if (form?.errors) {
						form.errors = undefined;
					}
					loading = true;
					return async ({ result, update }) => {
						await update();
						loading = false;
					};
				}}
			>
				<input
					class="login__input login__input__username"
					type="text"
					name="username"
					id="usename"
					placeholder="username or email"
					autocomplete="off"
					minlength="1"
					required
					value="dangelomedinag"
				/>
				<input
					class="login__input login__input__pass"
					type="password"
					name="password"
					id="password"
					placeholder="any password"
					required
					minlength="1"
					value="superpassword"
				/>
				<input class="login__input login__submit" type="submit" value="inicar session" />
			</form>
			<div class="login__actions">
				<a href={'#'} class="login__link">remember me</a>
				<a href={'#'} class="login__link">Need help?</a>
			</div>

			{#if form?.errors}
				<div class="login__error">
					<Alert warn><span>{form?.errors}</span></Alert>
				</div>
			{/if}
		{/if}
	</div>

	<section />
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

	.login__container {
		width: 95%;
		background: var(--c-main);
		padding: 2em;
		border-radius: 10px;
		box-shadow: 0 2px 1px rgba(0, 0, 0, 0.09), 0 4px 2px rgba(0, 0, 0, 0.09),
			0 8px 4px rgba(0, 0, 0, 0.09), 0 16px 8px rgba(0, 0, 0, 0.09), 0 32px 16px rgba(0, 0, 0, 0.09);
	}

	.login__form {
		display: flex;
		flex-direction: column;
		gap: 0.8em;
		width: 100%;
	}

	.login__input__username,
	.login__input__pass {
		background-color: var(--c-divider);
		color: #b3b3b3;
	}

	.login__submit {
		color: white;
		background-color: var(--c-front);
	}
	.login__submit:hover {
		color: white;
		background-color: var(--c-front-dark);
		cursor: poiter;
	}

	.login__input {
		/* margin-bottom: 0.5em; */
		padding: 0.8em;
		font-size: 1rem;
		border: none;
		border-radius: 5px;
		border: 2px solid transparent;
	}

	.login__input:focus,
	.login__input:focus-visible {
		outline: none;
		border: 2px solid var(--c-divider);
	}

	.login__title {
		display: block;
		width: 100%;
		color: var(--c-text-base);
		margin-top: 0;
		font-size: 2.5rem;
		/* line-height: 2rem; */
		/* color: white; */
	}

	.login__actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1em;
	}

	.login__link {
		color: var(--c-text-base);
	}
	.login__link:hover {
		color: var(--c-front);
	}

	.login__error {
		padding-top: 2em;
	}

	@media (min-width: 576px) {
	}
	@media (min-width: 768px) {
		.login__container {
			width: 60%;
			max-width: 700px;
		}
	}
	@media (min-width: 992px) {
	}
	@media (min-width: 1200px) {
	}

	/* session active */

	.login__session__user {
		/* display: flex; */
		/* flex-direction: column;
		align-items: center; */
		display: block;
		padding: 1em;
		color: inherit;
		width: auto;
	}
	.login__session__user:hover {
		background-color: var(--c-divider);
		color: var(--c-front);
	}

	.login__session__user img {
		text-align: center;
		margin: 0 auto;
		display: block;
		border-radius: 100%;
		width: 100px;
		height: auto;
		border: 3px solid var(--c-front);
	}

	.login__session__user h3,
	.login__session__user h4 {
		margin: 0;
	}

	.login__close {
		display: block;
		width: 100%;
		padding: 1em;
		background-color: transparent;
		color: inherit;
		font-weight: bold;
		margin: 0;
		margin-top: 1em;
		border: 1px solid var(--c-divider);
		border-radius: 5px;
	}

	.login__close:hover,
	.login__close:active {
		color: white;
	}

	.login__close:hover {
		background-color: var(--c-front);
	}
	.login__close:active {
		background-color: var(--c-front-dark);
	}
</style>

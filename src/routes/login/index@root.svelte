<script context="module">
	export async function load({ session, props }) {
		if (session.user) {
			return {
				status: 303,
				redirect: '/'
			};
		}

		return {
			status: 200,
			props
		};
	}
</script>

<script>
	export let errors;
</script>

<svelte:head>
	<title>Sign In - Magacine</title>
</svelte:head>

<main>
	<!-- <p>Lorem ipsum dolor sit.</p> -->
	<div class="form-container">
		<h1>Sign In</h1>

		<form action="/login" method="post">
			<input
				type="text"
				name="username"
				id="usename"
				value=""
				placeholder="username or email"
				autocomplete="off"
			/>
			<input type="password" name="password" id="password" value="" placeholder="any password" />
			<input type="submit" value="inicar session" />
		</form>
		<div class="actions">
			<a href={'#'} class="link">remember me</a>
			<a href={'#'} class="link">Need help?</a>
		</div>

		{#if errors}
			<p>{errors}</p>
		{/if}
	</div>

	<section />
</main>

<style>
	main {
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
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		background-color: #b3b3b3;
		background-blend-mode: multiply;
	}

	.form-container {
		width: 95%;
		background: rgba(0, 0, 0, 0.85);
		padding: 2em;
		border-radius: 10px;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	input[type='text'],
	input[type='password'] {
		background-color: #333;
		color: #b3b3b3;
	}

	input[type='submit'] {
		color: white;
		background-color: var(--c-front);
	}
	input[type='submit']:hover {
		color: white;
		background-color: var(--c-front-dark);
		cursor: poiter;
	}

	input {
		margin-bottom: 0.5em;
		padding: 0.8em;
		font-size: 1rem;
		border: none;
		border-radius: 5px;
	}

	h1,
	p {
		display: block;
		width: 100%;
	}

	h1 {
		margin-top: 0;
		font-size: 2rem;
		color: white;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.link {
		color: rgba(255, 255, 255, 0.5);
	}
	.link:hover {
		color: rgb(255, 255, 255);
	}

	@media (min-width: 576px) {
	}
	@media (min-width: 768px) {
		.form-container {
			width: 60%;
			max-width: 700px;
		}
	}
	@media (min-width: 992px) {
	}
	@media (min-width: 1200px) {
	}
</style>

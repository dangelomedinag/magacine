<script lang="ts">
	import type { User } from '$lib/types';
	interface Props {
		user: User;
	}

	let { user }: Props = $props();
</script>

<form action="/logout" method="post" class="form">
	<a href="/" class="link user">
		<img loading="lazy" src={user.avatar} alt="{user.username} - avatar profile" />
		<span class="username">@{user.username}</span>
		<h2>{user.name} {user.lastname}</h2>
	</a>
	<input class="input submit" type="submit" value="logout all sessions" />
</form>

<style>
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

	.submit {
		background-color: var(--c-front);
		font-weight: bold;
		color: white;
	}
	.input:focus {
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

	.link {
		font-size: 0.9em;
		text-decoration: none;
		color: var(--c-text-base);
	}

	.link:hover {
		color: var(--c-front);
	}
</style>

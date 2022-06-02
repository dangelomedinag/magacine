<script>
	import { session } from '$app/stores';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Modal from '$components/ui/movie/modal.svelte';
	import Icon from '$components/ui/icons/icon.svelte';

	let modal;
	let isOpen = false;
	// function open() {
	// 	modal = true;
	// }
	// function close() {
	// 	modal = false;
	// }
</script>

{#if $session.user}
	<button on:click={modal.open}>
		<Icon icon="user-circle" />
	</button>
{/if}

<Modal bind:this={modal} Zindex="49">
	<header>
		{$session.user.name}
	</header>
	<main>
		<ul class="list-actions">
			<li>
				<a href="/profile">
					<Icon icon="user-circle" />
					<span>Profile</span></a
				>
			</li>
			<li>
				<a href="/settings">
					<Icon icon="cog" />
					<span>Settings</span></a
				>
			</li>
			<li>
				<a href="/auth/logout">
					<Icon icon="logout" />
					<span>logout</span></a
				>
			</li>
		</ul>
	</main>
	<svelte:fragment slot="action">
		<a href="/auth/logout">logout <Icon icon="logout" /></a>
	</svelte:fragment>
</Modal>

<style>
	header {
		text-align: center;
	}

	.popup {
		/* border: 1px solid rgba(255, 255, 255, 0.1); */
		/* position: absolute;
		z-index: 95; */
		/* right: var(--gap-content);
		top: 100%; */
		/* width: 200px; */
		/* height: 250px; */
		/* background-color: var(--c-main-content); */
		/* border-radius: 10px; */
		/* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
		padding: 1em; */
	}

	/* .foreground {
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(1.5px);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 94;
		cursor: pointer;
	} */

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		text-decoration: none;
		padding: 0;
		margin: 0;
	}
</style>

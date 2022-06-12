<script>
	import { session } from '$app/stores';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Modal from '$components/ui/movie/modal.svelte';
	import Icon from '$components/ui/icons/icon.svelte';

	let modal;
</script>

{#if $session.user}
	<button on:click={modal.open}>
		<Icon name="user-circle" type="solid" />
	</button>
{/if}

<Modal bind:this={modal} Zindex="49">
	<header>
		{$session.user.name}
	</header>
	<!-- <div>
		<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, sunt.</p>
		<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, sunt.</p>
		<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, sunt.</p>
	</div> -->
	<ul class="list">
		<li class="list__item list__item--block">
			<a class="list__link" href="/profile">
				<Icon name="user-circle" />
				<span class="list__label">Profile</span></a
			>
		</li>
		<li class="list__item">
			<a class="list__link" href="/settings">
				<Icon name="cog" />
				<span class="list__label">Settings</span></a
			>
		</li>
		<li class="list__item">
			<a class="list__link" href="/help">
				<Icon name="information-circle" />
				<span class="list__label">help</span></a
			>
		</li>
		<!-- <li class="list__item">
			<a class="list__link" href="/auth/logout">
				<Icon name="logout" />
				<span class="list__label">logout</span></a
			>
		</li> -->
	</ul>
	<svelte:fragment slot="action">
		<a class="list__logout" sveltekit:reload href="/auth/logout">logout <Icon name="logout" /></a>
		<button href="/auth/logout" on:click={modal.close} class="cta">close</button>
	</svelte:fragment>
</Modal>

<style>
	header {
		text-align: center;
	}

	.list {
		list-style: none;
		padding: 1em 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.2em;
	}

	.list__item {
		flex-basis: 33%;
		flex-grow: 1;
		flex-shrink: 1;
		/* max-width: 300px; */
		text-decoration: none;
		/* margin: 0.2em 0; */
		font-weight: bold;
		border-color: rgba(255 255 255 / 7%);
		border-width: 1px;
		border-style: solid;
		border-radius: 5px;
		/* background-color: var(--c-front); */
	}
	.list__item:hover {
		border-color: rgba(255 255 255 / 15%);
	}
	.list__item:hover .list__link {
		color: var(--c-front);
	}

	.list__item--block {
		flex-basis: 100%;
	}

	.list__link {
		padding: 0.5em;
		display: flex;
		align-items: center;
		color: white;
		text-decoration: none;
	}

	.list__label {
		padding-left: 0.5em;
	}

	.list__logout {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
	}
</style>

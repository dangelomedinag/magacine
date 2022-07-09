<script>
	import { session } from '$app/stores';

	// icons
	import Icon from '$icons/icon.svelte';
	import UserCircle from '$icons/outline/user-circle.svelte';
	import Cog from '$icons/outline/cog.svelte';
	import InformationCircle from '$icons/outline/information-circle.svelte';
</script>

<header class="modal-header">
	{$session.user.name}
</header>

<ul class="list">
	<li class="list__item list__item--block">
		<a class="list__link" href="/profile">
			<Icon>
				<UserCircle />
			</Icon>
			<span class="list__label">Profile</span></a
		>
	</li>
	<li class="list__item">
		<a class="list__link" href="/settings">
			<Icon>
				<Cog />
			</Icon>
			<span class="list__label">Settings</span></a
		>
	</li>
	<li class="list__item">
		<a class="list__link" href="/help">
			<Icon>
				<InformationCircle />
			</Icon>
			<span class="list__label">help</span></a
		>
	</li>
</ul>

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
		text-decoration: none;
		font-weight: bold;
		border-color: transparent;
		border-width: 1px;
		border-style: solid;
		border-radius: 5px;
		background-color: var(--c-divider);
	}
	.list__item:hover {
		border-color: rgba(255 255 255 / 15%);
	}

	.list__item--block {
		flex-basis: 100%;
	}

	.list__link {
		padding: 0.5em;
		display: flex;
		align-items: center;
		color: var(--c-text-base);
		text-decoration: none;
	}

	.list__label {
		padding-left: 0.5em;
	}
</style>

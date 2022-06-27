<script>
	import { session } from '$app/stores';
	import Icon from '$components/ui/icons/icon.svelte';
</script>

<header class="modal-header">
	{$session.user.name}
</header>

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
		color: var(--c-text-base);
		text-decoration: none;
	}

	.list__label {
		padding-left: 0.5em;
	}
</style>

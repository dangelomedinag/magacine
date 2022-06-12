<script>
	import { quintInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Icon from '$components/ui/icons/icon.svelte';

	export let success = false,
		warn = false,
		danger = false;
</script>

<div
	transition:fly|local={{ y: 30, easing: quintInOut }}
	class="toast"
	class:toast--warn={warn}
	class:toast--danger={danger}
	class:toast--success={success}
>
	<div class="toast__icon">
		{#if success}
			<Icon name="check" />
		{:else if warn}
			<Icon name="exclamation" />
		{:else if danger}
			<Icon name="exclamation-circle" />
		{:else}
			<Icon name="flag" />
		{/if}
	</div>
	<span class="toast__message">
		<slot />
	</span>
</div>

<style>
	.toast {
		--icon-size: 1.5rem;

		will-change: transform;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1em;
		padding: 0.5em;
		text-align: center;
		color: rgb(196, 196, 196);
		border: 1px solid grey;
		border-radius: 5px;
		background-color: transparent;
		font-weight: lighter;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	}

	.toast--success {
		color: rgb(123, 190, 148);
		border: 1px solid rgb(0, 70, 35);
		background-color: rgb(0, 49, 22);
	}
	.toast--warn {
		color: rgb(190, 190, 123);
		border: 1px solid rgb(70, 70, 0);
		background-color: rgb(49, 49, 0);
	}

	.toast--danger {
		color: rgb(255, 137, 137);
		border: 1px solid rgb(160, 65, 65);
		background-color: rgb(128, 44, 44);
	}

	.toast__icon {
		display: flex;
		justify-content: center;
		align-items: center;
		/* padding: 0.8em; */
		/* background-color: rgb(67, 33, 33); */
	}

	.toast__message {
		/* padding: 1em 0; */
	}

	.toast__message :global(span) {
		font-weight: bold;
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>

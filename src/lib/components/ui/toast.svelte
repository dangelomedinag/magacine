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
	:root {
		/* toast */
		--toast-text: var(--c-text-base);
		--toast-bg: transparent;
		--toast-border: var(--c-text-base);
	}

	:global(body[data-theme='light']) {
		/* toast */
		--toast-text: var(--c-text-base);
		--toast-bg: transparent;
		--toast-border: var(--c-text-base);
	}

	.toast {
		--icon-size: 1.5rem;

		will-change: transform;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1em;
		padding: 0.5em;
		text-align: center;
		color: var(--toast-text);
		border: 1px solid var(--c-divider);
		border-radius: 5px;
		background-color: var(--toast-bg);
		font-weight: lighter;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	}

	.toast--success {
		color: rgb(123, 190, 148);
		border: 1px solid rgb(0, 70, 35);
		background-color: rgb(49, 49, 0);
	}

	.toast--warn {
		--toast-text: rgb(190, 190, 123);
		--toast-bg: rgb(49, 49, 0);
		--toast-border: rgb(70, 70, 0);

		color: var(--toast-text);
		border: 1px solid var(--toast-border);
		background-color: var(--toast-bg);
	}
	:global(body[data-theme='light']) .toast--warn {
		/* toast */
		--toast-text: rgb(115, 97, 4);
		--toast-bg: rgb(225, 206, 128);
		--toast-border: rgb(160, 143, 16);
	}

	.toast--danger {
		--toast-text: rgb(255, 137, 137);
		--toast-bg: rgb(160, 65, 65);
		--toast-border: rgb(128, 44, 44);

		color: var(--toast-text);
		border: 1px solid var(--toast-border);
		background-color: var(--toast-bg);
	}

	:global(body[data-theme='light']) .toast--danger {
		/* toast */
		--toast-text: rgb(255, 171, 171);
		--toast-bg: rgb(140, 47, 47);
		--toast-border: rgb(128, 44, 44);
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

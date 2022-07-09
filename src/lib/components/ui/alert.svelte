<script>
	import { quintInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	// icons
	import Icon from '$icons/icon.svelte';
	import Check from '$icons/outline/check.svelte';
	import Exclamation from '$icons/outline/exclamation.svelte';
	import ExclamationCircle from '$icons/outline/exclamation-circle.svelte';
	import Flag from '$icons/outline/flag.svelte';

	export let success = false,
		warn = false,
		danger = false;
</script>

<div
	transition:fly|local={{ y: 30, easing: quintInOut }}
	class="alert"
	class:alert--warn={warn}
	class:alert--danger={danger}
	class:alert--success={success}
>
	<div class="alert__icon">
		{#if success}
			<Icon>
				<Check />
			</Icon>
		{:else if warn}
			<Icon>
				<Exclamation />
			</Icon>
		{:else if danger}
			<Icon>
				<ExclamationCircle />
			</Icon>
		{:else}
			<Icon>
				<Flag />
			</Icon>
		{/if}
	</div>
	<span class="alert__message">
		<slot />
	</span>
</div>

<style>
	:root {
		/* alert */
		--alert-text: var(--c-text-base);
		--alert-bg: transparent;
		--alert-border: var(--c-text-base);
	}

	:global(body[data-theme='light']) {
		/* alert */
		--alert-text: var(--c-text-base);
		--alert-bg: transparent;
		--alert-border: var(--c-text-base);
	}

	.alert {
		--icon-size: 1.5rem;

		will-change: transform;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1em;
		padding: 0.5em;
		text-align: center;
		color: var(--alert-text);
		border: 1px solid var(--c-divider);
		border-radius: 5px;
		background-color: var(--alert-bg);
		font-weight: lighter;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	}

	.alert--success {
		color: rgb(123, 190, 148);
		border: 1px solid rgb(0, 70, 35);
		background-color: rgb(49, 49, 0);
	}

	.alert--warn {
		--alert-text: rgb(190, 190, 123);
		--alert-bg: rgb(49, 49, 0);
		--alert-border: rgb(70, 70, 0);

		color: var(--alert-text);
		border: 1px solid var(--alert-border);
		background-color: var(--alert-bg);
	}
	:global(body[data-theme='light']) .alert--warn {
		/* alert */
		--alert-text: rgb(115, 97, 4);
		--alert-bg: rgb(225, 206, 128);
		--alert-border: rgb(160, 143, 16);
	}

	.alert--danger {
		--alert-text: rgb(255, 137, 137);
		--alert-bg: rgb(160, 65, 65);
		--alert-border: rgb(128, 44, 44);

		color: var(--alert-text);
		border: 1px solid var(--alert-border);
		background-color: var(--alert-bg);
	}

	:global(body[data-theme='light']) .alert--danger {
		/* alert */
		--alert-text: rgb(255, 171, 171);
		--alert-bg: rgb(140, 47, 47);
		--alert-border: rgb(128, 44, 44);
	}

	.alert__icon {
		display: flex;
		justify-content: center;
		align-items: center;
		/* padding: 0.8em; */
		/* background-color: rgb(67, 33, 33); */
	}

	.alert__message :global(span) {
		font-weight: bold;
	}
</style>

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

<style lang="scss">
	.alert {
		--alert-text: var(--c-text-base);
		--alert-bg: transparent;
		--alert-border: var(--c-text-base);
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
		--alert-bg: rgb(123, 190, 148);
		/* --alert-border: rgb(0, 70, 35); */
		--alert-text: rgb(0, 70, 35);
	}

	@mixin dark-theme {
		.alert--success {
			--alert-text: rgb(123, 190, 148);
			--alert-bg: rgb(0, 70, 35);
			/* --alert-border: rgb(0, 70, 35); */
		}
		.alert--warn {
			--alert-text: rgb(190, 190, 123);
			--alert-bg: rgb(49, 49, 0);
			/* --alert-border: rgb(70, 70, 0); */
		}
		.alert--danger {
			--alert-text: rgb(255, 171, 171);
			--alert-bg: rgb(140, 47, 47);
			--alert-border: rgb(128, 44, 44);
		}
	}

	@mixin light-theme {
		.alert--warn {
			--alert-text: #9d8929;
			--alert-bg: #fff7d2;
			/* --alert-border: rgb(219 195 70); */
		}
		.alert--danger {
			--alert-text: rgb(255, 137, 137);
			--alert-bg: rgb(160, 65, 65);
			--alert-border: rgb(128, 44, 44);
		}
	}

	@media (prefers-color-scheme: dark) {
		@include dark-theme;

		:global(:root.light) {
			@include light-theme;
		}
	}
	@media (prefers-color-scheme: light) {
		@include light-theme;

		:global(:root.dark) {
			@include light-theme;
		}
	}

	// :global(:root.dark) {
	// 	.alert--success {
	// 		--alert-text: rgb(123, 190, 148);
	// 		--alert-bg: rgb(0, 70, 35);
	// 		/* --alert-border: rgb(0, 70, 35); */
	// 	}
	// 	.alert--warn {
	// 		--alert-text: rgb(190, 190, 123);
	// 		--alert-bg: rgb(49, 49, 0);
	// 		/* --alert-border: rgb(70, 70, 0); */
	// 	}
	// 	.alert--danger {
	// 		--alert-text: rgb(255, 171, 171);
	// 		--alert-bg: rgb(140, 47, 47);
	// 		--alert-border: rgb(128, 44, 44);
	// 	}
	// }

	/* @media (prefers-color-scheme: light) { */
	// :global(:root.light) {
	// 	.alert--warn {
	// 		--alert-text: #9d8929;
	// 		--alert-bg: #fff7d2;
	// 		/* --alert-border: rgb(219 195 70); */
	// 	}
	// 	.alert--danger {
	// 		--alert-text: rgb(255, 137, 137);
	// 		--alert-bg: rgb(160, 65, 65);
	// 		--alert-border: rgb(128, 44, 44);
	// 	}
	// }
	/* } */

	.alert__icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.alert__message :global(span) {
		font-weight: bold;
	}
</style>

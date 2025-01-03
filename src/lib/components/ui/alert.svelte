<script lang="ts">
	import { quintInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	// icons
	import Icon from '$icons/icon.svelte';
	import Check from '$icons/solid/check.svg?raw';
	import Exclamation from '$icons/solid/exclamation.svg?raw';
	import ExclamationCircle from '$icons/solid/exclamation-circle.svg?raw';
	import Flag from '$icons/solid/flag.svg?raw';
	import X from '$icons/solid/x.svg?raw';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	interface Props {
		success?: boolean;
		warn?: boolean;
		danger?: boolean;
		close?: boolean;
		onclose?: (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
		children?: import('svelte').Snippet;
	}

	let {
		success = false,
		warn = false,
		danger = false,
		close = false,
		children,
		onclose
	}: Props = $props();

	let active = false;
	let activeElement: EventTarget | null;

	window;
	onMount(() => {
		active = true;
	});

	onDestroy(() => {
		if (activeElement) (activeElement as HTMLElement).focus();
		if (browser) {
			document.body.removeEventListener('focusout', setActiveElement);
		}
		active = false;
	});

	function setActiveElement(e: Event) {
		activeElement = e.target ?? null;
	}
</script>

<svelte:body onfocusout={setActiveElement} />

<div
	transition:slide={{ axis: 'y', duration: 600, easing: quintInOut }}
	class="alert"
	class:alert--warn={warn}
	class:alert--danger={danger}
	class:alert--success={success}
>
	<div class="alert__icon">
		{#if success}
			<Icon>
				{@html Check}
			</Icon>
		{:else if warn}
			<Icon>
				{@html Exclamation}
			</Icon>
		{:else if danger}
			<Icon>
				{@html ExclamationCircle}
			</Icon>
		{:else}
			<Icon>
				{@html Flag}
			</Icon>
		{/if}
	</div>
	<span class="alert__message">
		{@render children?.()}
	</span>
	{#if close}
		<button type="button" onclick={(e) => onclose?.(e)}>
			<Icon>
				{@html X}
			</Icon>
		</button>
	{/if}
</div>

<style>
	.alert {
		--alert-text: var(--c-text-base);
		--alert-bg: transparent;
		--alert-border: var(--c-text-base);
		--icon-size: 1.5em;

		will-change: transform;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 0.5em;
		padding: 0.5em;
		text-align: left;
		color: var(--alert-text);
		border: 1px solid var(--c-divider);
		border-radius: 5px;
		background-color: var(--alert-bg);
		margin-block: 0.3em;
	}

	.alert--success {
		--alert-icon: #2e7d32;
		--alert-text: #1e4620;
		--alert-bg: #edf7ed;
	}

	@media (prefers-color-scheme: dark) {
		.alert--success {
			--alert-icon: #66bb6a;
			--alert-text: #cce8cd;
			--alert-bg: #0c130d;
		}
		.alert--warn {
			--alert-icon: #ffa726;
			--alert-text: #ffe2b7;
			--alert-bg: #191207;
		}
		.alert--danger {
			--alert-icon: #f44336;
			--alert-text: #f4c7c7;
			--alert-bg: #160b0b;
		}

		:global(:root[data-root-theme='light']) {
			.alert--warn {
				--alert-icon: #ed6c02;
				--alert-text: #663c00;
				--alert-bg: #fff4e5;
			}
			.alert--danger {
				--alert-icon: #d32f2f;
				--alert-text: #5f2120;
				--alert-bg: #fdeded;
			}
		}
	}

	@media (prefers-color-scheme: light) {
		.alert--warn {
			--alert-icon: #ed6c02;
			--alert-text: #663c00;
			--alert-bg: #fff4e5;
		}
		.alert--danger {
			--alert-icon: #d32f2f;
			--alert-text: #5f2120;
			--alert-bg: #fdeded;
		}

		:global(:root[data-root-theme='dark']) {
			.alert--warn {
				--alert-icon: #ed6c02;
				--alert-text: #663c00;
				--alert-bg: #fff4e5;
			}
			.alert--danger {
				--alert-icon: #d32f2f;
				--alert-text: #5f2120;
				--alert-bg: #fdeded;
			}
		}
	}

	.alert__icon {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--alert-icon);
	}

	/* .alert__message {
	} */
	.alert__message :global(span) {
		font-weight: bold;
	}

	button {
		--icon-size: 1em;

		/* // width: 100%; */
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: auto;
		position: absolute;
		top: 0;
		right: 0;
		color: var(--alert-icon);
		background-color: transparent;
		border: 1px solid transparent;
		padding: 0.1em;
		margin: 0;
		border-radius: 5px;
	}

	button:focus {
		outline: 1px dashed var(--alert-icon);
	}
</style>

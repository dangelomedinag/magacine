<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount, createEventDispatcher } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';

	import { setBodyScroll } from '$helpers';

	// icons
	import Icon from '$icons/icon.svelte';
	import X from '$icons/solid/x.svg?raw';
	import { afterNavigate } from '$app/navigation';

	export let modal = false;
	export let Zindex = '111';
	export let btnClose = true;

	let currentElementFocus: Element | null = null;
	let ref: HTMLElement;
	const dispatch = createEventDispatcher();

	onMount(async () => {
		console.log('modal');
		if (modal) open();
	});

	export async function open() {
		modal = true;
		setBodyScroll(modal, ref);

		if (browser) {
			window.addEventListener('keydown', handleEsc);
		}
	}
	export async function close() {
		modal = false;

		setBodyScroll(modal);
		if (currentElementFocus) currentElementFocus.focus();

		window.removeEventListener('keydown', handleEsc);
		dispatch('close');
	}
	export function toogle() {
		if (modal) close();
		else open();
	}

	function clickForeground() {
		close();
	}

	function handleEsc(e) {
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
			window.removeEventListener('keydown', handleEsc);
		}
	}

	function focusOnMount(node: HTMLElement) {
		if (node.children.length > 0) {
			let children = node.children[0];
			if (children.tagName === 'A' || children.tagName === 'BUTTON') children.focus();
		}
	}

	onDestroy(() => {
		if (browser) close();
	});

	afterNavigate(({ type }) => {
		// console.log(type);
		if (type === 'link') close();
	});
</script>

{#if modal}
	<div
		style:z-index={Zindex}
		class="foreground content"
		on:click|self={clickForeground}
		on:keydown
	/>
	<section
		bind:this={ref}
		tabindex="-1"
		style:z-index={Zindex}
		in:scale={{ start: 0.9, duration: 500, easing: quintOut }}
		class="modal"
	>
		{#if btnClose}
			<button tabindex="0" on:click={close} class="modal__close"> <Icon>{@html X}</Icon></button>
		{/if}

		{#if $$slots.header}
			<header class="modal__header">
				<slot name="header" />
			</header>
		{/if}

		<div class="modal__container" class:paddingtotal={!$$slots.action}>
			<slot />
		</div>
		<div class="modal__actions" class:paddingTop={$$slots.action} use:focusOnMount>
			<slot name="action" {close} />
		</div>
	</section>
{/if}

<style>
	:root {
		--modal-foreground: rgba(0, 0, 0, 0.8);
		--modal-bg: var(--c-main);
	}

	:global(body[data-theme='light']) {
		--modal-foreground: rgba(0, 0, 0, 0.6);
		--modal-bg: var(--c-main);
	}

	.foreground {
		position: fixed;
		width: 100%;
		height: 100%;
		inset: 0;
		background-color: var(--modal-foreground);
	}

	.modal {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 95%;
		max-width: 500px;
		max-height: 90%;

		display: flex;
		flex-direction: column;
		background-color: var(--modal-bg);
		border-radius: 10px;
		border: 2px solid var(--c-divider);
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
			0 4px 4px rgba(0, 0, 0, 0.11), 0 8px 8px rgba(0, 0, 0, 0.11), 0 16px 16px rgba(0, 0, 0, 0.11),
			0 32px 32px rgba(0, 0, 0, 0.11);
		overflow: hidden;
	}
	.modal:focus,
	.modal:focus-visible {
		outline: none;
	}

	.modal__container {
		padding: 1em;
		padding-bottom: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.paddingtotal {
		padding-bottom: 1em;
	}

	.modal__header {
		--icon-size: 1em;
		padding: 0.5em 0;
		position: sticky;
		background-color: var(--modal-bg);
		top: 0;
		font-size: var(--icon-size);
		text-align: center;
		font-weight: bold;
		border-bottom: 1px solid var(--c-divider);
	}

	.modal__actions {
		display: flex;
		gap: 0.5em;
	}

	.paddingTop {
		border-top: 1px solid var(--c-divider);
		padding: 0.5em;
		/* padding-top: 1em; */
	}

	.modal__actions :global(button),
	.modal__actions :global(a) {
		flex: 1 1 100%;
		text-align: center;
		background-color: transparent;
		border: 1px solid transparent;
		color: var(--c-text-base);
		padding: 0.5em 0;
		border-radius: 5px;
		text-decoration: none;
	}

	.modal__actions :global(button:hover),
	.modal__actions :global(a:hover) {
		background-color: var(--c-divider);
	}
	.modal__actions :global(a:hover) {
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-style: dotted;
	}

	.modal__actions :global(button.cta),
	.modal__actions :global(a.cta) {
		background-color: var(--c-front);
		color: white;
	}
	.modal__actions :global(button.cta:hover),
	.modal__actions :global(a.cta:hover) {
		background-color: var(--c-front-dark);
	}

	.modal__actions :global(button:focus),
	.modal__actions :global(a:focus) {
		outline-style: dashed;
		outline-width: 2px;
		outline-offset: -2px;
		outline-color: var(--c-divider);
	}

	.modal__close {
		--icon-size: 1.2em;

		cursor: pointer;
		position: absolute;
		right: 0;
		top: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		z-index: 1;

		/* width: 1em;
		height: 1em; */
		color: var(--c-text-base);
		padding: 0.5em;
		border: 1px solid transparent;
		background-color: transparent;
	}

	.modal__close:hover {
		background-color: var(--c-divider);
	}

	.modal__close:active {
		background-color: var(--c-front);
	}

	/* scrollbar */
	.modal__container::-webkit-scrollbar {
		width: 5px;
		border-radius: 10px;
	}

	.modal__container::-webkit-scrollbar-track {
		background: rgba(128, 128, 128, 0.05);
		margin: 10px;
		border-radius: 10px;
		overflow: hidden;
	}

	.modal__container::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.05);
	}

	.modal__container::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	/* @media (min-width: 992px) {
		.modal {
			max-width: 50vw;
		}
	} */
</style>

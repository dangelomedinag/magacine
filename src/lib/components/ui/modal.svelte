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

	interface Props {
		onclose?: () => void;
		modal?: boolean;
		Zindex?: string;
		btnClose?: boolean;
		header?: import('svelte').Snippet;
		action?: import('svelte').Snippet<[any]>;
		children?: import('svelte').Snippet;
		onkeydown?: (e: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }) => void;
	}

	let {
		modal = $bindable(false),
		Zindex = '111',
		btnClose = true,
		header,
		action,
		children,
		onkeydown,
		onclose
	}: Props = $props();

	let currentElementFocus: Element | null = null;
	let ref: HTMLElement | undefined = $state(undefined);

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
		if (currentElementFocus) (currentElementFocus as HTMLElement).focus();

		window.removeEventListener('keydown', handleEsc);
		onclose?.();
	}
	export function toogle() {
		if (modal) close();
		else open();
	}

	function clickForeground() {
		close();
	}

	function handleEsc(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
			window.removeEventListener('keydown', handleEsc);
		}
	}

	function focusOnMount(node: HTMLElement) {
		if (node.children.length > 0) {
			let childrenNode = node.children[0];
			if (childrenNode.tagName === 'A' || childrenNode.tagName === 'BUTTON')
				(childrenNode as HTMLElement).focus();
		}
	}

	onDestroy(() => {
		if (browser) close();
	});

	afterNavigate(({ type }) => {
		// console.log(type);
		if (type === 'link') close();
	});

	function self<T>(fn: T) {
		return function (...args: any[]) {
			var event = /** @type {Event} */ (args[0]);
			// @ts-ignore
			if (event.target === this) {
				// @ts-ignore
				fn?.apply(this, args);
			}
		};
	}
</script>

{#if modal}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		style:z-index={Zindex}
		class="foreground content"
		onclick={self(clickForeground)}
		onkeydown={(e) => {
			onkeydown?.(e);
		}}
	></div>
	<section
		bind:this={ref}
		tabindex="-1"
		style:z-index={Zindex}
		in:scale|global={{ start: 0.9, duration: 500, easing: quintOut }}
		class="modal"
	>
		{#if btnClose}
			<button tabindex="0" onclick={close} class="modal__close"> <Icon>{@html X}</Icon></button>
		{/if}

		{#if header}
			<header class="modal__header">
				{@render header?.()}
			</header>
		{/if}

		<div class="modal__container" class:paddingtotal={!action}>
			{@render children?.()}
		</div>
		<div class="modal__actions" class:paddingTop={action} use:focusOnMount>
			{@render action?.({ close })}
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
		box-shadow:
			0 1px 1px rgba(0, 0, 0, 0.11),
			0 2px 2px rgba(0, 0, 0, 0.11),
			0 4px 4px rgba(0, 0, 0, 0.11),
			0 8px 8px rgba(0, 0, 0, 0.11),
			0 16px 16px rgba(0, 0, 0, 0.11),
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
</style>

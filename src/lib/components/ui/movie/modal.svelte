<script>
	import { browser } from '$app/env';

	import { onDestroy } from 'svelte';

	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { setBodyScroll } from '$helpers';
	import Icon from '$components/ui/icons/icon.svelte';

	let modal = false;
	let currentElementFocus = null;
	export let Zindex = '0';
	export let btnClose = true;

	// const getVal = () => modal;

	export function open() {
		if (currentElementFocus) {
			currentElementFocus = document.activeElement;
			currentElementFocus.blur();
		}

		modal = true;
		setBodyScroll(modal);

		if (browser) {
			window.addEventListener('keydown', handleEsc);
		}
	}
	export function close() {
		modal = false;
		setBodyScroll(modal);
		if (currentElementFocus) currentElementFocus.focus();

		window.removeEventListener('keydown', handleEsc);
	}
	export function toogle() {
		if (modal) close();
		else open();
	}

	function clickForeground(e) {
		// if (e.target.contains(e.currentTarget)) close();
		close();
	}

	function handleEsc(e) {
		// console.log('scape');
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
		}
	}

	function focusOnMount(node) {
		let firstChild = node.firstChild;
		if (firstChild?.nodeName === 'A' || firstChild?.nodeName === 'BUTTON') firstChild.focus();

		console.log(firstChild);

		// console.log(document.activeElement);

		// node.focus();
	}
	/* test */

	// function setScroll() {
	// 	if (browser) {
	// 		const body = document.body;
	// 		const prop = body.style.overflow;

	// 		if (modal && prop !== 'hidden') body.style.overflow = 'hidden';
	// 		else body.style.overflow = 'auto';
	// 	}
	// }

	/* test */

	onDestroy(() => {
		if (browser) close();
	});
</script>

{#if modal}
	<div style:z-index={Zindex} class="foreground content" on:click|self={clickForeground} />
	<section
		style:z-index={Zindex}
		in:fly={{ y: 100, duration: 300, easing: quintOut }}
		class="modal"
	>
		<div class="modal__container">
			<slot />
		</div>
		<div class="modal__actions" class:paddingTop={$$slots.action} use:focusOnMount>
			<slot name="action" />
		</div>
		{#if btnClose}
			<button on:click={close} class="modal__close"> <Icon name="x" /></button>
		{/if}
	</section>
{/if}

<style>
	:root {
		/* modal */
		--modal-foreground: rgba(0, 0, 0, 0.8);
		--modal-bg: var(--c-main-content);
	}

	:global(body[data-theme='light']) {
		/* modal */
		--modal-foreground: rgba(0, 0, 0, 0.6);
		--modal-bg: var(--c-main);
	}

	.foreground {
		position: fixed;
		width: 100%;
		height: 100%;
		inset: 0;

		/* max-width: 1400px; */
		background-color: var(--modal-foreground);

		cursor: pointer;
		/* user-select: none; */
		/* z-index: 95; */
		/* margin: 0 auto; */
	}

	/* @media (min-width: 992px) {
		:global(.sidebar.toggle + main) .modal {
			transform: translate(-30%, -50%);
		}
	} */

	.modal {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 95%;
		max-width: 700px;
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
		padding: 1em;
	}

	.modal__container {
		overflow-y: auto;
		overflow-x: hidden;
	}

	.modal__actions {
		display: flex;
		gap: 0.5em;
	}

	.paddingTop {
		padding-top: 1em;
	}

	.modal__actions > :global(button),
	.modal__actions > :global(a) {
		flex: 1 1 100%;
		text-align: center;
		background-color: transparent;
		/* border: 1px solid rgba(255, 255, 255, 0.1); */
		border: 1px solid transparent;
		color: var(--c-text-base);
		padding: 0.5em 0;
		/* cursor: pointer; */
		border-radius: 5px;
		text-decoration: none;
	}

	.modal__actions > :global(button:hover),
	.modal__actions > :global(a:hover) {
		background-color: var(--c-divider);
	}
	.modal__actions > :global(a:hover) {
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-style: dotted;
	}

	.modal__actions > :global(button.cta),
	.modal__actions > :global(a.cta) {
		background-color: var(--c-front);
		color: white;
	}
	.modal__actions > :global(button.cta:hover),
	.modal__actions > :global(a.cta:hover) {
		background-color: var(--c-front-dark);
	}

	.modal__actions > :global(button):focus,
	.modal__actions > :global(a):focus {
		outline-style: dashed;
		outline-width: 2px;
		outline-offset: 3px;
		outline-color: var(--c-divider);
	}

	.modal__close {
		--icon-size: 1.2rem;

		cursor: pointer;
		position: absolute;
		right: 0;
		top: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;

		width: 2.5em;
		height: 2.5em;
		color: var(--c-text-base);
		padding: 0;
		border: 1px solid transparent;
		background-color: var(--c-main-content);
	}

	.modal__close:hover {
		background-color: var(--c-main);
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

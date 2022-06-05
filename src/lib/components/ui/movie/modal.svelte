<script>
	import { browser } from '$app/env';

	import { onDestroy } from 'svelte';

	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { setBodyScroll } from '$helpers';

	let modal = false;
	export let Zindex = '0';

	// const getVal = () => modal;

	export function open() {
		modal = true;
		setBodyScroll(modal);

		if (browser) {
			window.addEventListener('keydown', handleEsc);
		}
	}
	export function close() {
		modal = false;
		setBodyScroll(modal);

		window.removeEventListener('keydown', handleEsc);
	}
	export function toogle() {
		if (modal) close();
		else open();
	}

	function clickForeground(e) {
		if (e.target.contains(e.currentTarget)) close();
	}

	function handleEsc(e) {
		console.log('scape');
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
		}
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
	<div style:z-index={Zindex} class="foreground content" on:click={clickForeground}>
		<section in:fly={{ y: 100, duration: 300, easing: quintOut }} class="modal">
			<div class="modal__container">
				<slot />
			</div>
			<div class="modal__actions">
				<slot name="action" />
			</div>
			<button on:click={close} class="modal__close">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="modal__close__svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg></button
			>
		</section>
	</div>
{/if}

<style>
	.foreground {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 1400px;
		height: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.8);
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		/* z-index: 95; */
		/* margin: 0 auto; */
	}

	@media (min-width: 992px) {
		:global(.sidebar.toggle + main) .modal {
			margin-left: 20%;
		}
	}

	.modal {
		position: relative;
		/* margin-top: 2.5em; */
		cursor: initial;
		background-color: var(--c-main-content);
		width: 100%;
		max-width: 700px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
			0 4px 4px rgba(0, 0, 0, 0.11), 0 8px 8px rgba(0, 0, 0, 0.11), 0 16px 16px rgba(0, 0, 0, 0.11),
			0 32px 32px rgba(0, 0, 0, 0.11);
		overflow: hidden;
		padding: 1em;
	}

	.modal__container {
		max-height: 70vh;
		height: 100%;
		overflow-y: auto;
		width: 100%;
	}

	.modal__actions {
		display: flex;
		gap: 0.5em;
		/* padding-bottom: 1em; */
	}

	.modal__actions > :global(button),
	.modal__actions > :global(a) {
		flex: 1 1 100%;
		text-align: center;
		background-color: transparent;
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: inherit;
		padding: 0.5em 0;
		cursor: pointer;
		background-color: transparent;
		border-radius: 5px;
		text-decoration: none;
	}
	.modal__actions > :global(button:hover),
	.modal__actions > :global(a:hover) {
		background-color: var(--c-main);
	}
	.modal__actions > :global(a:hover) {
		text-decoration: underline;
	}

	.modal__actions > :global(button.cta),
	.modal__actions > :global(a.cta) {
		background-color: var(--c-front);
	}
	.modal__actions > :global(button.cta:hover),
	.modal__actions > :global(a.cta:hover) {
		background-color: var(--c-front-dark);
	}

	.modal__close {
		cursor: pointer;
		position: absolute;
		right: 0;
		top: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		/* display: block; */
		/* width: 100%; */
		width: 2.5em;
		height: 2.5em;
		/* transform: translate(0, -50%); */
		color: white;
		padding: 0;
		border: 1px solid transparent;
		/* background-color: var(--c-main); */
		background-color: var(--c-main-content);
		/* margin-bottom: 1em; */
		/* border-radius: 50vh; */
	}

	.modal__close:hover {
		background-color: var(--c-main);
		/* background-color: transparent; */
		/* cursor: pointer; */
	}

	.modal__close:active {
		background-color: var(--c-front);
		/* transform: translateY(3%); */
	}

	.modal__close__svg {
		height: 1.5rem;
		width: 1.5rem;
	}
</style>

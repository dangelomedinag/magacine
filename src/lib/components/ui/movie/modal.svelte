<script>
	import { browser } from '$app/env';

	import { onDestroy } from 'svelte';

	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let modal = false;
	let zindex = 'false';

	export function open() {
		modal = true;
		setScroll();
		if (browser) {
			window.addEventListener('keydown', handleEsc);
		}
	}
	export function close() {
		modal = false;
		setScroll();
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

	function setScroll() {
		if (browser) {
			const body = document.body;
			if (modal) body.style.overflow = 'hidden';
			else body.style.overflow = 'auto';
		}
		// console.log(window);
	}

	onDestroy(() => {});
</script>

{#if modal}
	<div style:z-index={zindex} class="foreground content" on:click={clickForeground}>
		<section in:fly={{ y: 100, duration: 300, easing: quintOut }} class="modal">
			<div class="modal__container">
				<slot />
			</div>
			<slot name="action">
				<button
					on:click={close}
					style="background-color: var(--c-front);"
					class="modal__button__close">close</button
				>
			</slot>
		</section>
	</div>
{/if}

<style>
	.foreground {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(0, 0, 0, 0.8);
		top: 0;
		left: 0;
		z-index: 95;
		margin: 0 auto;
	}

	.modal {
		background-color: var(--c-main-content);
		padding: 1em;
		width: 100%;
		max-width: 700px;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
			0 4px 4px rgba(0, 0, 0, 0.11), 0 8px 8px rgba(0, 0, 0, 0.11), 0 16px 16px rgba(0, 0, 0, 0.11),
			0 32px 32px rgba(0, 0, 0, 0.11);
	}

	.modal__container {
		max-height: 50vh;
		overflow-y: auto;
		width: 100%;
	}

	.modal__button__close {
		display: block;
		width: 100%;
		color: white;
		padding: 0.5em;
		border: 1px solid rgba(128, 128, 128, 0.3);
		background-color: var(--c-main);
		/* margin-bottom: 1em; */
		border-radius: 5px;
	}

	.modal__button__close:hover {
		background-color: transparent;
		cursor: pointer;
	}

	.modal__button__close:active {
		transform: translateY(3%);
	}
</style>

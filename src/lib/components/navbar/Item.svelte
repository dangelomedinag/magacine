<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	// stores
	import { notiStore } from '$lib/stores/notifications-store';

	const dispatch = createEventDispatcher();

	export let href: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let type: string | undefined = undefined;
	export let autoClose = true;

	function closeNavbar() {
		const element = document.querySelector('nav.open');
		element?.classList.remove('open');
	}

	function handleClick(e) {
		if (autoClose) closeNavbar();
		dispatch('click', e);
	}

	$: active = $page.url.pathname === href ?? false;

	$: obj = $notiStore.filter((e) => e.label === href);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type ? type : undefined}
	class="link"
	class:active
	{href}
	on:click={handleClick}
	tabindex="0"
	{title}
>
	<!-- <div class="wrapper"> -->
	<div class="icon">
		<slot name="icon" />
	</div>
	<div class="label">
		<slot />
	</div>
	{#if obj.length > 0}
		<div class="notification">{obj[0].items.length ? obj[0].items.length : ''}</div>
	{/if}
	<!-- </div> -->
</svelte:element>

<style>
	.link {
		/* font-size: 1em; */
		position: relative;
		font-weight: 700;
		width: 100%;
		display: flex;
		color: var(--aside-link);
		opacity: 1;
		text-decoration: none;
		/* width: min-content; */
		/* flex-shrink: 0;
		flex-grow: 0; */
		margin: 0;
		padding-inline: 1em;
		padding-block: 0.3em;
		margin-bottom: 0.2em;
		/* position: relative; */
		line-height: inherit;
		background-color: transparent;
		border: none;
		text-align: left;
		cursor: pointer;
		transition: transform 0.2s ease-out;
		border-radius: 50vh;
		gap: 0.5em;
	}
	.link:hover {
		opacity: 1;
		background-color: var(--c-divider);
	}
	.link:active {
		transform: translateX(3%);
	}

	.notification {
		/* font-size: 0.8em; */
		/* display: inline-block; */
		/* top: 50%; */

		background-color: var(--c-front);
		color: var(--c-white);
		padding-inline: 5px;
		border-radius: 5vh;
	}

	.active {
		opacity: 1 !important;
		background-color: var(--c-divider);
	}
	.active :global(svg) {
		color: var(--c-front);
	}

	.wrapper {
		/* width: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative; */
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		/* color: var(--aside-link-icon); */
	}

	.label {
		white-space: nowrap;
		/* padding: 0 0.8em; */
		/* border: 1px solid transparent; */
	}

	/* 769px fix 768 real size */
	@media (min-width: 768px) and (max-width: 1200px) {
		.label {
			display: none;
		}

		.notification {
			position: absolute;
			top: 0;
			right: 0;
			transform: translateX(50%);
		}

		.link:hover > .label,
		.link:focus > .label {
			position: absolute;
			right: -10px;
			top: 50%;
			/* transform: translateY(-50%); */
			display: block;
			white-space: nowrap;
			transform: translate(100%, -50%);
			color: var(--c-main);
			background-color: var(--c-main-invert);
			border-radius: 50vh;
			padding-inline: 10px;
			/* width: 100%; */
		}
	}
	/*
	@media (min-width: 768px) {
	}
	@media (min-width: 992px) {
		.link {
			opacity: var(--aside-link-opacity);
		}

		.label {
			display: none;
		}
		.wrapper {
			justify-content: center;
		}

		.notification {
			display: inline-block;
		}

		:global(.toggle) .label {
			position: relative;
			display: block;
			width: 250px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		:global(aside:not(.toggle)) .link:hover .label {
			display: inline-block;
			position: absolute;
			top: 0;
			width: auto;
			left: 40px;
			background-color: var(--c-main-invert);
			border-radius: 50vh;
			border-color: var(--c-divider);
			padding-top: 0.2em;
			padding-bottom: 0.2em;

			color: var(--c-main);
			box-shadow: var(--shadow-long);
		}
		:global(aside:not(.toggle)) .link:hover .notification {
			border-radius: 50vh;
		}
		
	}
	*/
	@media (min-width: 1200px) {
		.label {
			/* position: relative; */
			/* display: block; */
			/* white-space: nowrap; */
			/* width: 250px; */
			/* white-space: nowrap;
			overflow: hidden; */
			/* text-overflow: ellipsis; */
		}
	}
</style>

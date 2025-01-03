<script lang="ts">
	import { page } from '$app/state';
	import Icon from '$icons/icon.svelte';

	// stores
	import { notiStore } from '$lib/stores/notifications-store';

	interface Props {
		href?: string | undefined;
		title?: string | undefined;
		type?: string | undefined;
		autoClose?: boolean;
		icon?: import('svelte').Snippet | string;
		children?: import('svelte').Snippet;
		onclick?: () => void;
	}

	let {
		href = undefined,
		title = undefined,
		type = undefined,
		autoClose = true,
		icon,
		children,
		onclick
	}: Props = $props();

	function closeNavbar() {
		const element = document.querySelector('nav.open');
		element?.classList.remove('open');
	}

	function handleClick(
		e: MouseEvent & {
			currentTarget: EventTarget & (HTMLAnchorElement | HTMLButtonElement);
		}
	) {
		if (autoClose) closeNavbar();
		onclick?.();
	}

	let active = $derived(page.url.pathname === href);

	let obj = $derived($notiStore.filter((e) => e.label === href));
</script>

{#snippet itemElement()}
	<div class="icon">
		{#if typeof icon === 'string'}
			<Icon>{@html icon}</Icon>
		{:else}
			{@render icon?.()}
		{/if}
	</div>
	<div class="label">
		{@render children?.()}
	</div>
	{#if obj.length > 0}
		<div class="notification">{obj[0].items.length ? obj[0].items.length : ''}</div>
	{/if}
{/snippet}

{#if href}
	<a class="link" class:active {href} onclick={(e) => handleClick(e)} tabindex="0" {title}>
		{@render itemElement()}
	</a>
{:else}
	<button
		type="button"
		class="link"
		class:active
		onclick={(e) => handleClick(e)}
		tabindex="0"
		{title}
	>
		{@render itemElement()}
	</button>
{/if}

<style>
	.link {
		position: relative;
		font-weight: 700;
		width: 100%;
		display: flex;
		color: var(--aside-link);
		opacity: 1;
		text-decoration: none;
		margin: 0;
		padding-inline: 1em;
		padding-block: 0.3em;
		margin-bottom: 0.2em;
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

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.label {
		white-space: nowrap;
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
			display: block;
			white-space: nowrap;
			transform: translate(100%, -50%);
			color: var(--c-main);
			background-color: var(--c-main-invert);
			border-radius: 50vh;
			padding-inline: 10px;
		}
	}
</style>

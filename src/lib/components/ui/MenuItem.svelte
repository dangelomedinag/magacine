<script>
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import Icon from '$components/ui/icons/icon.svelte';
	const dispatch = createEventDispatcher();

	// export let label;
	export let href = false;
	export let icon;
	export let notification = false;

	function tap(node) {
		function sendEvent() {
			dispatch('tap');
		}

		node.addEventListener('click', sendEvent);

		return {
			destroy() {
				node.removeEventListener('click', sendEvent);
			}
		};
	}

	$: active = $page.url.pathname === href;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class="link {active ? 'active' : ''}"
	class:active
	{href}
	on:click
	use:tap
	tabindex="0"
>
	<div class="wrapper">
		<div class="icon">
			{#key icon}
				<Icon name={icon} type="solid" />
			{/key}
		</div>
		<div class="label">
			<slot />
			{#if notification}
				<div class="notification">{notification}</div>
			{/if}
		</div>
	</div>
</svelte:element>

<style>
	.link {
		font-size: 0.9rem;
		font-weight: 700;
		width: 100%;
		display: block;
		/* color: inherit; */
		color: var(--aside-link);
		/* opacity: var(--aside-link-opacity); */
		opacity: 1;
		text-decoration: none;
		padding: 0.5em 0.2em;
		position: relative;
		line-height: 1rem;
		background-color: transparent;
		border: none;
		text-align: left;
		cursor: pointer;
		transition: transform 0.2s ease-out;
		border-radius: 50vh;
	}
	.link:hover {
		opacity: 1;
		/* background-color: var(--c-divider); */
		/* color: var(--c-front); */
	}

	.link:active {
		transform: translateX(3%);
	}

	.notification {
		font-size: 0.8em;
		/* position: absolute; */
		/* display: none; */
		display: inline-block;
		top: -50%;
		right: -10px;
		background-color: var(--aside-link-bubble-bg);
		color: var(--aside-link-bubble);
		padding: 0 7px;
		/* padding-left: 5px;
		padding-right: 5px; */
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
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		color: var(--aside-link-icon);
	}

	.label {
		/* display: none; */
		padding: 0 0.8em;
		width: 250px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		border: 1px solid transparent;
		/* color: var(--aside-link-label); */
		/* position: relative; */
	}

	/* Small devices (landscape phones, 576px and up) */
	@media (min-width: 576px) {
		/* .link:hover .label {
			display: inline-block;
			position: absolute;
			top: 0;
			width: auto;
			left: 100%;
			background-color: white;
			border-radius: 50vh;
			color: gray;
		} */
	}
	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
	}
	/* Large devices (desktops, 992px and up) */
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
			background-color: var(--aside-link-label-bg);
			border-radius: 50vh;
			border-color: var(--c-divider);
			padding-top: 0.2em;
			padding-bottom: 0.2em;

			color: var(--aside-link-label);
			box-shadow: var(--shadow-long);
		}
		:global(aside:not(.toggle)) .link:hover .notification {
			/* background-color: var(--c-front); */
			border-radius: 50vh;

			/* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
				0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
				0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07); */
		}
	}
	/* Extra large devices (large desktops, 1200px and up) */
	@media (min-width: 1200px) {
		/* … */
	}
</style>

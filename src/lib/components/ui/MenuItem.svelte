<script>
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import Icon from '$components/ui/icons/icon.svelte';
	const dispatch = createEventDispatcher();

	export let label;
	export let href;
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

<a class="link" class:active {href} on:click use:tap>
	<div class="wrapper">
		<div class="icon">
			<Icon {icon} />
		</div>
		<div class="label">
			<slot />
			{#if notification}
				<div class="notification">{notification}</div>
			{/if}
		</div>
	</div>
</a>

<style>
	.link {
		font-size: 1rem;
		width: 100%;
		display: block;
		color: white;
		opacity: 0.3;
		text-decoration: none;
		padding: 0.5em 0.2em;
		position: relative;
	}
	.link:hover {
		opacity: 1;
	}

	.notification {
		font-size: 0.8em;
		/* position: absolute; */
		/* display: none; */
		display: inline-block;
		top: -50%;
		right: -10px;
		background-color: var(--c-front);
		padding: 0 7px;
		/* padding-left: 5px;
		padding-right: 5px; */
		border-radius: 5vh;
	}

	.active {
		opacity: 1;
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
	}

	.label {
		/* display: none; */
		padding: 0 0.8em;
		width: 250px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
			background-color: white;
			border-radius: 50vh;
			color: var(--c-main);
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
				0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
				0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
		}
		:global(aside:not(.toggle)) .link:hover .notification {
			background-color: var(--c-front);
			border-radius: 50vh;
			color: white;
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

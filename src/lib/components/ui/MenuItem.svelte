<script>
	import { page } from '$app/stores';
	export let label;
	export let href;
	export let notification = false;
	$: active = $page.url.pathname === href;
</script>

<a class="link" class:active {href} on:click>
	<div class="wrapper">
		<div class="icon">
			{#if label.toLowerCase() === 'home'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
					/>
				</svg>
			{/if}
			{#if label.toLowerCase() === 'discovery'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
					/>
				</svg>
			{/if}
			{#if label.toLowerCase() === 'community'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
					/>
				</svg>
			{/if}
			{#if label.toLowerCase() === 'soon' || label.toLowerCase() === 'comming soon'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
					/>
					<path
						d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
					/>
				</svg>
			{/if}
			{#if label.toLowerCase() === 'recent'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"
					/>
				</svg>
			{/if}
			{#if label.toLowerCase() === 'bookmarked'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
				</svg>
			{/if}
			{#if label.toLowerCase() === 'star' || label.toLowerCase() === 'top rated'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
					/>
				</svg>
			{/if}
			{#if label.toLowerCase() === 'downloaded' || label.toLowerCase() === 'download'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
			{#if label.toLowerCase() === 'settings'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
			{#if label.toLowerCase() === 'help'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
			{#if label.toLowerCase() === 'logout'}
				<svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
		</div>
		<div class="label">
			{label}
			{#if notification}
				<div class="notification">{notification}</div>
			{/if}
		</div>
	</div>
</a>

<style>
	.link {
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
		background-color: brown;
		padding: 0 7px;
		/* padding-left: 5px;
		padding-right: 5px; */
		border-radius: 5vh;
	}

	.active {
		opacity: 1;
	}
	.active .svg {
		color: rgb(155, 33, 33);
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

	.svg {
		width: 23px;
		height: 23px;
	}

	.label {
		/* display: none; */
		padding: 0 1em;
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
			left: 100%;
			background-color: white;
			border-radius: 50vh;
			color: gray;
			/* position: relative;
			display: block;
			position: initial;
			background-color: initial;
			color: white;
			border-radius: none; */
		}
	}
	/* Extra large devices (large desktops, 1200px and up) */
	@media (min-width: 1200px) {
		/* … */
	}
</style>

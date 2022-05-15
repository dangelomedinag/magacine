<script>
	import MenuItem from '$lib/components/ui/MenuItem.svelte';
</script>

<div id="aside-wrapper">
	<nav>
		<span class="section">Menu</span>

		<!-- <MenuItem href="/" label="Home" notification={3} on:click /> -->
		<MenuItem href="/discovery" notification={3} label="Discovery" on:click />
		<MenuItem href="/community" label="Community" notification="new" on:click />
		<MenuItem href="/soon" label="Comming soon" on:click />

		<hr style="display: block; width: 100%; border: 1px solid gray; opacity: 0.2;" on:click />

		<span class="section">Library</span>

		<MenuItem href="/recent" label="Recent" on:click />
		<MenuItem href="/bookmarked" label="Bookmarked" on:click />
		<MenuItem href="/rated" label="Top rated" on:click />
		<MenuItem href="/download" label="Downloaded" on:click />
	</nav>

	<div>
		<MenuItem href="/search" label="Search" on:click />
		<MenuItem href="/settings" label="Settings" on:click />
		<MenuItem href="/help" label="Help" on:click />
		<MenuItem href="/logout" label="Logout" on:click />
	</div>
</div>

<style>
	#aside-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding: 1em 1em 6em 1em;
		/* overflow-y: auto; */
	}

	@media (max-height: 500px) {
		#aside-wrapper {
			overflow-y: auto;
		}
		#aside-wrapper::-webkit-scrollbar {
			width: 5px;
			border-radius: 10px;
		}

		#aside-wrapper::-webkit-scrollbar-track {
			background: rgba(128, 128, 128, 0.05);
			margin: 10px;
			border-radius: 10px;
			overflow: hidden;
		}

		#aside-wrapper::-webkit-scrollbar-thumb {
			background: rgba(255, 255, 255, 0.05);
		}

		#aside-wrapper::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
	}

	.section {
		display: none;
		/* font-size: 1.5rem; */
		letter-spacing: 1px;
		font-weight: 300;
		opacity: 0.3;
	}

	@media (min-width: 992px) {
		#aside-wrapper {
			/* padding: 1.2em 1em; */
		}
		:global(aside.toggle) .section {
			display: block;
		}
	}
</style>

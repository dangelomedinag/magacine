<script>
	// @ts-nocheck

	import MenuItem from '$lib/components/ui/MenuItem.svelte';
</script>

<div id="aside-wrapper">
	<nav>
		<span class="section">Menu</span>

		<MenuItem href="/" label="Home" notification={3} on:click />
		<MenuItem href="/discovery" label="Discovery" on:click />
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
		padding: 1em 0 6em 0;
		/* overflow-y: auto; */
	}

	@media (max-height: 500px) {
		#aside-wrapper {
			overflow-y: auto;
		}
	}

	.section {
		display: none;
		font-size: small;
		letter-spacing: 1px;
		font-weight: 300;
		opacity: 0.3;
	}
	@media (min-width: 992px) {
		#aside-wrapper {
			padding: 1.2em 1em;
		}
		.section {
			display: block;
		}
	}
</style>

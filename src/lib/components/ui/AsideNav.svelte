<script>
	import MenuItem from '$lib/components/ui/MenuItem.svelte';
	import { notiStore } from '$lib/stores/notifications-store';
</script>

<div id="aside-wrapper">
	<nav>
		<span class="section">Menu</span>

		<MenuItem href="/" label="Home" on:tap />
		<MenuItem
			href="/discovery"
			notification={$notiStore[0].notification}
			label="Discovery"
			on:click={() => {
				$notiStore[0].notification = false;
			}}
			on:tap
		/>
		<MenuItem
			href="/community"
			label="Community"
			notification={$notiStore[1].notification}
			on:tap
			on:click={() => {
				$notiStore[1].notification = false;
			}}
		/>
		<MenuItem href="/soon" label="Comming soon" on:tap />

		<hr style="display: block; width: 100%; border: 1px solid gray; opacity: 0.2;" />

		<span class="section">Library</span>

		<MenuItem href="/recent" label="Recent" on:tap />
		<MenuItem href="/bookmarked" label="Bookmarked" on:tap />
		<MenuItem href="/rated" label="Top Rated" on:tap />
		<MenuItem href="/download" label="Downloaded" on:tap />
		<MenuItem href="/search" label="Search" on:tap />
	</nav>

	<div>
		<MenuItem href="/settings" label="Settings" on:tap />
		<MenuItem href="/help" label="Help" on:tap />
		<MenuItem href="/logout" label="Logout" on:tap />
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

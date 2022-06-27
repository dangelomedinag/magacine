<script>
	import MenuItem from '$components/ui/MenuItem.svelte';
	import { notiStore } from '$lib/stores/notifications-store';
	import { themeStore } from '$lib/stores/theme-store';
</script>

<div id="aside-wrapper">
	<nav>
		<span class="section">Menu</span>

		<MenuItem href="/" icon="home" on:tap>Home</MenuItem>
		<MenuItem
			href="/discovery"
			notification={$notiStore[0].notification}
			icon="view-grid-add"
			on:click={() => {
				$notiStore[0].notification = false;
			}}
			on:tap>Discovery</MenuItem
		>

		<MenuItem href="/soon" icon="inbox-in" on:tap>Comming soon</MenuItem>
		<MenuItem
			href="/community"
			icon="user-group"
			notification={$notiStore[1].notification}
			on:click={() => {
				$notiStore[1].notification = false;
			}}
			on:tap
			>Community
		</MenuItem>

		<hr />

		<span class="section">Library</span>

		<MenuItem href="/recent" icon="save" on:tap>Recent</MenuItem>
		<MenuItem href="/bookmarked" icon="bookmark" on:tap>Bookmarked</MenuItem>
		<MenuItem href="/rated" icon="star" on:tap>Top Rated</MenuItem>
		<MenuItem href="/download" icon="download" on:tap>Downloaded</MenuItem>
		<MenuItem href="/search?s=" icon="search" on:tap>Search</MenuItem>
	</nav>

	<div>
		<MenuItem href="/settings" icon="cog" on:tap>Settings</MenuItem>
		<MenuItem href="/help" icon="information-circle" on:tap>Help</MenuItem>
		<MenuItem href="/auth/logout" icon="logout" on:tap>Logout</MenuItem>

		<MenuItem icon={$themeStore === 'dark' ? 'sun' : 'moon'} on:click={themeStore.toogleTheme}>
			{$themeStore === 'dark' ? 'light' : 'dark'} theme
		</MenuItem>
	</div>
	<!-- <ThemeToggle /> -->
</div>

<style>
	#aside-wrapper {
		--icon-size: 1.5rem;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding: 1em 0.4em 6em 0.4em;
		background-color: var(--aside-bg);
		color: var(--c-text-base);
		/* overflow-y: auto; */
	}

	hr {
		display: block;
		width: 100%;
		border: 1px solid var(--c-divider);
		/* opacity: 0.2; */
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
		/* letter-spacing: 1px; */
		font-weight: 300;
		opacity: 0.7;
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

<script>
	import MenuItem from '$components/ui/MenuItem.svelte';
	import { notiStore } from '$lib/stores/notifications-store';
	import { themeStore } from '$lib/stores/theme-store';

	/* icons */
	import Icon from '$icons/icon.svelte';
	import Home from '$icons/solid/home.svelte';
	import ViewGridAdd from '$icons/solid/view-grid-add.svelte';
	import InboxIn from '$icons/solid/inbox-in.svelte';
	import UserGroup from '$icons/solid/user-group.svelte';
	import Save from '$icons/solid/save.svelte';
	import Bookmark from '$icons/solid/bookmark.svelte';
	import Star from '$icons/solid/star.svelte';
	import Download from '$icons/solid/download.svelte';
	import Search from '$icons/solid/search.svelte';
	import Cog from '$icons/solid/cog.svelte';
	import InformationCircle from '$icons/solid/information-circle.svelte';
	import Logout from '$icons/solid/logout.svelte';
	import Sun from '$icons/solid/sun.svelte';
	import Moon from '$icons/solid/moon.svelte';
	/* icons */
</script>

<div id="aside-wrapper">
	<nav>
		<span class="section">Menu</span>

		<MenuItem href="/" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Home /></Icon>
			</svelte:fragment>
			Home
		</MenuItem>

		<MenuItem
			href="/discovery"
			notification={$notiStore[0].notification}
			on:click={() => {
				$notiStore[0].notification = false;
			}}
			on:tap
		>
			<svelte:fragment slot="icon">
				<Icon><ViewGridAdd /></Icon>
			</svelte:fragment>
			Discovery</MenuItem
		>

		<MenuItem href="/soon" on:tap>
			<svelte:fragment slot="icon">
				<Icon><InboxIn /></Icon>
			</svelte:fragment>
			Comming soon</MenuItem
		>
		<MenuItem
			href="/community"
			notification={$notiStore[1].notification}
			on:click={() => {
				$notiStore[1].notification = false;
			}}
			on:tap
		>
			<svelte:fragment slot="icon">
				<Icon><UserGroup /></Icon>
			</svelte:fragment>
			Community
		</MenuItem>

		<hr />

		<span class="section">Library</span>

		<MenuItem href="/recent" icon="save" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Save /></Icon>
			</svelte:fragment>
			Recent</MenuItem
		>
		<MenuItem href="/bookmarked" icon="bookmark" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Bookmark /></Icon>
			</svelte:fragment>
			Bookmarked</MenuItem
		>
		<MenuItem href="/rated" icon="star" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Star /></Icon>
			</svelte:fragment>
			Top Rated</MenuItem
		>
		<MenuItem href="/download" icon="download" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Download /></Icon>
			</svelte:fragment>
			Downloaded</MenuItem
		>
		<MenuItem href="/search?s=" icon="search" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Search /></Icon>
			</svelte:fragment>
			Search</MenuItem
		>
	</nav>

	<div>
		<MenuItem href="/settings" icon="cog" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Cog /></Icon>
			</svelte:fragment>
			Settings</MenuItem
		>
		<MenuItem href="/help" icon="information-circle" on:tap>
			<svelte:fragment slot="icon">
				<Icon><InformationCircle /></Icon>
			</svelte:fragment>
			Help</MenuItem
		>
		<MenuItem href="/auth/logout" icon="logout" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Logout /></Icon>
			</svelte:fragment>
			Logout</MenuItem
		>

		<MenuItem icon={$themeStore === 'dark' ? 'sun' : 'moon'} on:click={themeStore.toogleTheme}>
			<svelte:fragment slot="icon">
				<Icon>
					{#if $themeStore === 'dark'}
						<Sun />
					{:else}
						<Moon />
					{/if}
				</Icon>
			</svelte:fragment>
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
		/* background-color: var(--aside-bg); */
		color: var(--c-text-base);
		/* overflow-y: auto; */
		/* transition: var(--transition-theme); */
	}

	hr {
		display: block;
		width: 100%;
		height: 1px;
		border: 1px solid var(--c-divider);
		background-color: var(--c-divider);
		border-radius: 1px;
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

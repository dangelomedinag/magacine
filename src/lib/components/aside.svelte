<script>
	import AsideItem from '$components/asideItem.svelte';

	// icons
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

	// stores
	import { notiStore } from '$lib/stores/notifications-store';
	import { themeStore } from '$lib/stores/theme-store';
</script>

<div id="aside-wrapper">
	<nav>
		<span class="section">Menu</span>

		<AsideItem href="/" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Home /></Icon>
			</svelte:fragment>
			Home
		</AsideItem>

		<AsideItem
			href="/discovery"
			on:click={() => {
				notiStore.update((store) => store.filter((r) => r.label !== '/discovery'));
			}}
			on:tap
		>
			<svelte:fragment slot="icon">
				<Icon><ViewGridAdd /></Icon>
			</svelte:fragment>
			Discovery</AsideItem
		>

		<AsideItem href="/soon" on:tap>
			<svelte:fragment slot="icon">
				<Icon><InboxIn /></Icon>
			</svelte:fragment>
			Comming soon</AsideItem
		>

		<AsideItem
			href="/community"
			on:click={() => {
				notiStore.update((store) => store.filter((r) => r.label !== '/community'));
			}}
			on:tap
		>
			<svelte:fragment slot="icon">
				<Icon><UserGroup /></Icon>
			</svelte:fragment>
			Community
		</AsideItem>

		<hr />

		<span class="section">Library</span>

		<AsideItem href="/recent" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Save /></Icon>
			</svelte:fragment>
			Recent</AsideItem
		>
		<AsideItem href="/bookmarked" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Bookmark /></Icon>
			</svelte:fragment>
			Bookmarked</AsideItem
		>
		<AsideItem href="/rated" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Star /></Icon>
			</svelte:fragment>
			Top Rated</AsideItem
		>
		<AsideItem href="/download" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Download /></Icon>
			</svelte:fragment>
			Downloaded</AsideItem
		>
		<AsideItem href="/search?s=" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Search /></Icon>
			</svelte:fragment>
			Search</AsideItem
		>
	</nav>

	<div>
		<AsideItem href="/settings" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Cog /></Icon>
			</svelte:fragment>
			Settings</AsideItem
		>
		<AsideItem href="/help" on:tap>
			<svelte:fragment slot="icon">
				<Icon><InformationCircle /></Icon>
			</svelte:fragment>
			Help</AsideItem
		>
		<AsideItem href="/auth/logout" on:tap>
			<svelte:fragment slot="icon">
				<Icon><Logout /></Icon>
			</svelte:fragment>
			Logout</AsideItem
		>

		<AsideItem title="toggle theme" on:click={themeStore.toogleTheme}>
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
		</AsideItem>
	</div>
</div>

<style>
	#aside-wrapper {
		--icon-size: 1.5rem;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding: 1em 0.4em 6em 0.4em;
		color: var(--c-text-base);
	}

	hr {
		display: block;
		width: 100%;
		height: 1px;
		border: 1px solid var(--c-divider);
		background-color: var(--c-divider);
		border-radius: 1px;
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
		font-weight: 300;
		opacity: 0.7;
	}

	@media (min-width: 992px) {
		:global(aside.toggle) .section {
			display: block;
		}
	}
</style>

<script>
	import AsideItem from '$components/asideItem.svelte';

	// icons
	import Icon from '$icons/icon.svelte';
	import ViewGridAdd from '$icons/solid/view-grid-add.svg?raw';
	import InboxIn from '$icons/solid/inbox-in.svg?raw';
	import UserGroup from '$icons/solid/user-group.svg?raw';
	import Save from '$icons/solid/save.svg?raw';
	import Bookmark from '$icons/solid/bookmark.svg?raw';
	import Star from '$icons/solid/star.svg?raw';
	import Download from '$icons/solid/download.svg?raw';
	import Search from '$icons/solid/search.svg?raw';
	import Cog from '$icons/solid/cog.svg?raw';
	import InformationCircle from '$icons/solid/information-circle.svg?raw';
	import Logout from '$icons/solid/logout.svg?raw';
	import Sun from '$icons/solid/sun.svg?raw';
	import Moon from '$icons/solid/moon.svg?raw';

	// stores
	import { notiStore } from '$lib/stores/notifications-store';
	import { themeStore } from '$lib/stores/theme-store';
	import LogoNavbar from './ui/logo-navbar.svelte';
</script>

<div id="aside-wrapper">
	<!-- <nav> -->
	<a href="/">
		<LogoNavbar />
	</a>
	<span class="section">Menu</span>
	<div>
		<!-- <hr /> -->
		<!-- <svelte:fragment slot="icon">
				<Icon>
					{@html Home}
				</Icon>
			</svelte:fragment> -->
		<!-- Home -->

		<AsideItem
			href="/discovery"
			on:click={() => {
				notiStore.update((store) => store.filter((r) => r.label !== '/discovery'));
			}}
			on:tap
		>
			<svelte:fragment slot="icon">
				<Icon>{@html ViewGridAdd}</Icon>
			</svelte:fragment>
			Discovery</AsideItem
		>

		<AsideItem href="/soon" on:tap>
			<svelte:fragment slot="icon">
				<Icon>{@html InboxIn}</Icon>
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
				<Icon>{@html UserGroup}</Icon>
			</svelte:fragment>
			Community
		</AsideItem>

		<hr />

		<span class="section">Library</span>

		<AsideItem href="/recent" on:tap>
			<svelte:fragment slot="icon">
				<Icon>{@html Save}</Icon>
			</svelte:fragment>
			Recent</AsideItem
		>
		<AsideItem href="/bookmarked" on:tap>
			<svelte:fragment slot="icon">
				<Icon>{@html Bookmark}</Icon>
			</svelte:fragment>
			Bookmarked</AsideItem
		>
		<AsideItem href="/favorites" on:tap>
			<svelte:fragment slot="icon">
				<Icon>{@html Star}</Icon>
			</svelte:fragment>
			Favorites</AsideItem
		>
		<AsideItem href="/download" on:tap>
			<svelte:fragment slot="icon">
				<Icon>{@html Download}</Icon>
			</svelte:fragment>
			Downloaded</AsideItem
		>
		<AsideItem href="/search" on:tap>
			<svelte:fragment slot="icon">
				<Icon>{@html Search}</Icon>
			</svelte:fragment>
			Search</AsideItem
		>
	</div>
	<!-- </nav> -->
	<div>
		<!-- <div> -->
		<AsideItem href="/settings" on:tap>
			<svelte:fragment slot="icon">
				<Icon>{@html Cog}</Icon>
			</svelte:fragment>
			Settings</AsideItem
		>
		<AsideItem href="/help" on:tap>
			<svelte:fragment slot="icon">
				<Icon>{@html InformationCircle}</Icon>
			</svelte:fragment>
			Help</AsideItem
		>

		<form method="post" action="/logout">
			<AsideItem on:tap type="submit">
				<svelte:fragment slot="icon">
					<Icon>{@html Logout}</Icon>
				</svelte:fragment>
				Logout
			</AsideItem>
		</form>

		<AsideItem title="toggle theme" on:click={themeStore.toogleTheme}>
			<svelte:fragment slot="icon">
				<Icon>
					{#if $themeStore === 'dark'}
						{@html Sun}
					{:else}
						{@html Moon}
					{/if}
				</Icon>
			</svelte:fragment>
			{$themeStore === 'dark' ? 'light' : 'dark'} theme
		</AsideItem>
		<!-- </div> -->
	</div>
</div>

<style>
	#aside-wrapper {
		--icon-size: 1.3em;
		padding-inline: 1em;
		padding-block-end: 1em;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: var(--c-text-base);
		max-height: 100dvh;
	}

	a {
		display: flex;
		gap: 0.4em;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid var(--c-divider);
		padding-block: 0.8em;
		margin-block-end: 1em;
	}

	hr {
		display: block;
		width: 100%;
		height: 1px;
		border: 1px solid var(--c-divider);
		background-color: var(--c-divider);
		border-radius: 1px;
	}

	form {
		width: 100%;
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
		font-weight: 300;
		opacity: 0.7;
	}

	@media (min-width: 768px) {
		#aside-wrapper {
			position: sticky;
			top: 0;
			left: 0;
		}

		.section {
			display: none;
		}
	}

	@media (min-width: 1201px) {
		.section {
			display: block;
		}
	}
</style>

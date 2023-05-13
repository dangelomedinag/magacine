<script lang="ts">
	import Item from '$components/navbar/Item.svelte';
	import Icon from '$icons/icon.svelte';
	import {
		Home,
		ViewGridAdd,
		InboxIn,
		UserGroup,
		Star,
		Search,
		Logout,
		Sun,
		Moon
		// Save,
		// Bookmark,
		// Download,
		// Cog,
		// InformationCircle,
	} from './icons-import';

	// icons
	// import Icon from '$icons/icon.svelte';
	// import Home from '$icons/solid/home.svg?raw';
	// import ViewGridAdd from '$icons/solid/view-grid-add.svg?raw';
	// import InboxIn from '$icons/solid/inbox-in.svg?raw';
	// import UserGroup from '$icons/solid/user-group.svg?raw';
	// import Save from '$icons/solid/save.svg?raw';
	// import Bookmark from '$icons/solid/bookmark.svg?raw';
	// import Star from '$icons/solid/star.svg?raw';
	// import Download from '$icons/solid/download.svg?raw';
	// import Search from '$icons/solid/search.svg?raw';
	// import Cog from '$icons/solid/cog.svg?raw';
	// import InformationCircle from '$icons/solid/information-circle.svg?raw';
	// import Logout from '$icons/solid/logout.svg?raw';
	// import Sun from '$icons/solid/sun.svg?raw';
	// import Moon from '$icons/solid/moon.svg?raw';

	// stores
	import { notiStore } from '$lib/stores/notifications-store';
	import { themeStore } from '$lib/stores/theme-store';
	import { page } from '$app/stores';
	import { setCookieColorTheme, toggleColorTheme } from '$helpers';
</script>

<div class="navbar-wrapper">
	<span class="section">Menu</span>
	<div>
		<Item href="/">
			<svelte:fragment slot="icon">
				<Icon>{@html Home}</Icon>
			</svelte:fragment>
			Home</Item
		>

		<Item
			href="/discovery"
			on:click={() => {
				notiStore.update((store) => store.filter((r) => r.label !== '/discovery'));
			}}
		>
			<svelte:fragment slot="icon">
				<Icon>{@html ViewGridAdd}</Icon>
			</svelte:fragment>
			Discovery</Item
		>

		<Item href="/soon">
			<svelte:fragment slot="icon">
				<Icon>{@html InboxIn}</Icon>
			</svelte:fragment>
			Comming soon</Item
		>

		<Item
			href="/community"
			on:click={() => {
				notiStore.update((store) => store.filter((r) => r.label !== '/community'));
			}}
		>
			<svelte:fragment slot="icon">
				<Icon>{@html UserGroup}</Icon>
			</svelte:fragment>
			Community
		</Item>

		<hr />

		<span class="section">Library</span>

		<!-- <Item href="/recent" >
			<svelte:fragment slot="icon">
				<Icon>{@html Save}</Icon>
			</svelte:fragment>
			Recent</Item
		> -->
		<!-- <Item href="/bookmarked" >
			<svelte:fragment slot="icon">
				<Icon>{@html Bookmark}</Icon>
			</svelte:fragment>
			Bookmarked</Item
		> -->
		{#if $page.data.user}
			<Item href="/favorites">
				<svelte:fragment slot="icon">
					<Icon>{@html Star}</Icon>
				</svelte:fragment>
				Favorites</Item
			>
		{/if}
		<!-- <Item href="/download" >
			<svelte:fragment slot="icon">
				<Icon>{@html Download}</Icon>
			</svelte:fragment>
			Downloaded</Item
		> -->
		<Item href="/search">
			<svelte:fragment slot="icon">
				<Icon>{@html Search}</Icon>
			</svelte:fragment>
			Search</Item
		>
	</div>
	<!-- </nav> -->
	<div>
		<!-- <div> -->
		<!-- <Item href="/settings" >
			<svelte:fragment slot="icon">
				<Icon>{@html Cog}</Icon>
			</svelte:fragment>
			Settings</Item
		> -->
		<!-- <Item href="/help" >
			<svelte:fragment slot="icon">
				<Icon>{@html InformationCircle}</Icon>
			</svelte:fragment>
			Help</Item
		> -->

		{#if $page.data.user}
			<form method="post" action="/logout">
				<Item type="submit">
					<svelte:fragment slot="icon">
						<Icon>{@html Logout}</Icon>
					</svelte:fragment>
					Logout
				</Item>
			</form>
		{/if}

		<Item
			on:click={() => {
				toggleColorTheme();
				setCookieColorTheme($themeStore);
			}}
			title="toggle theme"
			autoClose={false}
		>
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
		</Item>
	</div>
</div>

<style>
	.navbar-wrapper {
		transform: translateX(-100%);
		transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
		--icon-size: 1.2rem;
		/* background-color: var(--c-main); */
		transition-delay: 0.1s;
		border: 1px solid transparent;
		border-right-color: var(--c-divider);
		padding-inline: 1em;
		padding-block-start: 1em;
		padding-block-end: 3em;
		height: 100%;
		width: 80%;
		max-width: 500px;
		background-color: var(--c-main);
	}

	:global(nav.open) .navbar-wrapper {
		transition-delay: 0s;
		transform: translateX(0);
	}

	/* @media (max-width: 767px) {
		.navbar-wrapper {
			height: 100%;
			width: 80%;
			max-width: 500px;
			background-color: var(--c-main);
		}
		:global(nav.open) .navbar-wrapper {
			transition-delay: 0s;
			transform: translateX(0);
		}
	} */

	/* a {
		display: flex;
		gap: 0.4em;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid var(--c-divider);
		padding-block: 0.8em;
		margin-block-end: 1em;
	} */

	hr {
		display: block;
		width: 100%;
		height: 0.5px;
		border: 1px solid transparent;
		/* border-bottom-color: var(--c-divider); */
		background-color: var(--c-divider);
		border-radius: 1px;
	}

	form {
		width: 100%;
	}

	@media (max-height: 500px) {
		.navbar-wrapper {
			overflow-y: auto;
		}
		.navbar-wrapper::-webkit-scrollbar {
			width: 5px;
			border-radius: 10px;
		}

		.navbar-wrapper::-webkit-scrollbar-track {
			background: rgba(128, 128, 128, 0.05);
			margin: 10px;
			border-radius: 10px;
			overflow: hidden;
		}

		.navbar-wrapper::-webkit-scrollbar-thumb {
			background: rgba(255, 255, 255, 0.05);
		}

		.navbar-wrapper::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
	}

	.section {
		font-weight: 300;
		opacity: 0.7;
	}

	@media (min-width: 768px) {
		.navbar-wrapper {
			width: auto;
			position: sticky;
			top: 3.3em;
			left: 0;
			background-color: transparent;
			transform: translate(0);
			border-right-color: transparent;
			height: initial;
			z-index: 1;
			/* padding-inline: 1em; */
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

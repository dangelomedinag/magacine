<script>
	/* icons */
	import Icon from '$icons/icon.svelte';
	import Home from '$icons/solid/home.svelte';
	import Search from '$icons/solid/search.svelte';
	import X from '$icons/solid/x.svelte';
	import UserCircle from '$icons/solid/user-circle.svelte';
	import Bell from '$icons/outline/bell.svelte';
	import BellSolid from '$icons/solid/bell.svelte';
	import Logout from '$icons/outline/user-circle.svelte';
	import ExclamationCircle from '$icons/outline/exclamation-circle.svelte';
	/* icons */

	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Modal from '$components/ui/movie/modal.svelte';

	import ThemeToggle from '$components/ui/themeToggle.svelte';
	import SessionModal from '$components/ui/navbar/sessionModal.svelte';
	import { session } from '$app/stores';
	import NavbarSearchForm from '$components/ui/navbar-search-form.svelte';
	import NavbarSearchResults from '$components/ui/navbar-search-results.svelte';
	import Notification from '$components/ui/notification.svelte';
	import { notiStore } from '$lib/stores/notifications-store';
	// import SessionModalTest from '$components/ui/sessionModalTest.svelte';

	/* variable */
	export let search = true,
		bell = true,
		profile = true;
	let modalSearch;
	let modalSession;
	// $: console.log(modalSession);
	let modalNotification;
	let searchInput = false;
	let results;

	function submit(e) {
		e.target.x.blur();

		let query = e.target.x.value.trim();
		console.log(location.origin);
		let url = new URL('/api', location.origin);
		url.searchParams.set('limit', 3);
		url.searchParams.set('s', query);

		results = fetch(url.href).then(async (r) => {
			if (!r.ok) {
				const error = await r.json();
				throw error;
			}

			return r.json();
		});

		// e.target.x.focus();
		modalSearch.open();
	}
	afterNavigate(() => {
		document.querySelector('nav.navbar').style.transform = `translateY(0px)`;
	});
	let lastScroll = 0;
	let expand;
	// let down = false;
	// let up = false;
	onMount(() => {
		const navbar = document.querySelector('nav.navbar');
		let leftContainer;
		function alternatedNavbar(e) {
			let currentScroll = window.pageYOffset;
			if (!leftContainer) leftContainer = document.querySelector('div.left').offsetHeight;
			if (window.scrollY > 150) {
				if (currentScroll - lastScroll > 0) {
					navbar.style.transform = `translateY(-${leftContainer + 2}px)`;
					expand = true;
					// down = true;
					// up = false;
					// document.querySelector('div.center').classList.add('block');
				} else {
					navbar.style.transform = `translateY(0px)`;
					expand = false;
					// down = false;
					// up = true;
					// document.querySelector('div.center').classList.remove('block');
				}
			}
			lastScroll = currentScroll;
		}

		if (!matchMedia('(min-width: 576px)').matches) {
			window.addEventListener('scroll', alternatedNavbar);
		}
		return () => window.removeEventListener('scroll', alternatedNavbar);
	});
</script>

<nav class="navbar">
	<div class="content navbar-wrapper">
		<div class="left navbar_slots" class:esconder={searchInput}>
			<a href="/" class="navbar-item">
				<Icon>
					<Home />
				</Icon>
			</a>
			<ThemeToggle />
		</div>
		<div class="center navbar_slots" class:block={expand}>
			{#if searchInput}
				<NavbarSearchForm
					on:esc={() => {
						searchInput = !searchInput;
					}}
					on:submit={submit}
					on:close={() => {
						searchInput = !searchInput;
						modalSearch.close();
					}}
				/>
			{:else}
				<slot />
				{#if search}
					<button
						title="serach"
						class="search-second"
						on:click={() => {
							searchInput = !searchInput;
						}}
					>
						<Icon>
							<Search />
						</Icon>
					</button>
				{/if}
			{/if}
		</div>
		<div class="right navbar_slots" class:esconder={searchInput}>
			{#if search}
				{#if !searchInput}
					<button
						title="search"
						class="search-first navbar-item"
						on:click={() => {
							searchInput = !searchInput;
						}}
					>
						<Icon>
							<Search />
						</Icon>
					</button>
				{/if}
			{/if}
			{#if bell}
				<button title="notification" class="navbar-item" on:click={modalNotification.open}>
					<Icon counter={$notiStore.length}>
						{#if $notiStore.length}
							<BellSolid />
						{:else}
							<Bell />
						{/if}
					</Icon>
				</button>
			{/if}
			{#if profile}
				{#if $session.user}
					<button title="session" class="navbar-item" on:click={modalSession.open}>
						<Icon>
							<UserCircle />
						</Icon>
						<span class="username">
							{$session.user.username}
						</span>
					</button>
				{/if}
			{/if}
		</div>
	</div>
</nav>

{#if searchInput}
	<div class="foreground" on:click|self={() => (searchInput = false)} />
{/if}

<Modal bind:this={modalSession} btnClose={false}>
	<svelte:fragment slot="header">
		Session <Icon y="10%"><UserCircle /></Icon>
	</svelte:fragment>
	<SessionModal />
	<svelte:fragment slot="action">
		<a class="list__logout" href="/auth/logout">logout <Icon><Logout /></Icon></a>
		<button href="/auth/logout" on:click={modalSession.close} class="cta">close</button>
	</svelte:fragment>
</Modal>

<Modal bind:this={modalSearch} btnClose={false}>
	<svelte:fragment slot="header">
		{#await results}
			<Icon y="10%"><Search /></Icon> Searching...
		{:then _}
			<Icon y="10%"><Search /></Icon> Search
		{:catch _}
			<Icon y="10%"><ExclamationCircle /></Icon> Ooops!
		{/await}
	</svelte:fragment>
	<NavbarSearchResults {results} />

	<svelte:fragment slot="action">
		{#await results then response}
			<a href="/search?s={response.search}" class="cta">show all</a>
		{/await}
		<button on:click={modalSearch.close}>close</button>
	</svelte:fragment>
</Modal>

<Modal bind:this={modalNotification}>
	<svelte:fragment slot="header">
		<Icon y="10%"><BellSolid /></Icon>
		{$notiStore.length ?? ''} Notifications
	</svelte:fragment>
	<Notification on:clickItem={() => modalNotification.close()} />
</Modal>

<style>
	:global(.d-none) {
		display: none;
	}

	@media (min-width: 576px) {
		.esconder {
			visibility: hidden;
		}
	}
	.foreground {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.8;
		z-index: 50;
	}

	:root {
		--navbar-item-gap: 0.5em;
	}

	.navbar {
		--icon-size: 1.2rem;
		width: 100%;
		transition: transform 300ms ease;
		transform: translateY(0);
		position: sticky;
		top: 0;
		z-index: 51;
		overflow: hidden;
		background-color: var(--navbar-bg);
		border-bottom: 1px solid var(--c-divider);
		box-shadow: var(--shadow-short);
		transition: transform 0.3s ease-in-out, var(--transition-theme);
	}
	.navbar-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.navbar_slots {
		display: flex;
	}

	.navbar-item {
		background-color: transparent;
		color: inherit;
		border: 2px solid transparent;
		border: none;
		opacity: var(--navbar-item-opacity);
		padding: 0;
		margin: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 0.9em 0.5em;
		text-decoration: none;
		cursor: pointer;
	}

	.navbar-item:hover {
		opacity: 1;
		color: var(--navbar-item-hover);
	}

	.center {
		order: 3;
		width: 100%;
	}
	.center > :global(button),
	.center > :global(a) {
		background-color: transparent;
		border: 2px solid transparent;
		font-weight: bold;
		line-height: 1rem;
		color: inherit;
		padding: 0.9em 0.5em;
		opacity: var(--navbar-item-opacity);
		text-decoration: none;
	}
	.center > :global(button.active) {
		border-bottom: 2px solid var(--c-front);
		opacity: 1;
	}

	@media (min-width: 576px) {
		.navbar-wrapper {
			flex-wrap: nowrap;
		}
		.center {
			width: auto;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.center > :global(button) {
			flex: 0 1 auto;
		}
		.search-first {
			display: inline-flex;
		}
	}

	.search-second {
		display: none !important;
		margin-left: auto !important;
	}

	.center.block > :global(button + .search-second) 
	/* :global(.center.block) > :global(a + .search-second) */ {
		display: inline-flex !important;
	}

	.list__logout {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
	}

	.username {
		display: none;
		padding: 0 0.2em;
	}

	@media (min-width: 768px) {
		.username {
			display: inline-block;
		}
	}
</style>

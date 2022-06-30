<script>
	// import { onDestroy } from 'svelte';
	import SessionModal from '$components/ui/navbar/sessionModal.svelte';
	import Icon from '$components/ui/icons/icon.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import Modal from '$components/ui/movie/modal.svelte';
	import CarouselMovies from './CarouselMovies.svelte';
	// import { page } from '$app/stores';
	import ThemeToggle from '$components/ui/themeToggle.svelte';
	import HeaderSticky from './headerSticky.svelte';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';
	import NavbarSearchForm from '$components/ui/navbar-search-form.svelte';
	import NavbarSearchResults from '$components/ui/navbar-search-results.svelte';
	export let search = true,
		bell = true,
		profile = true;
	let modal;
	let modalSession;
	let searchInput = false;
	let results;

	function submit(e) {
		e.target.x.blur();

		let query = e.target.x.value.trim();
		let url = new URL(location);

		results = fetch(url.origin + '/api/?limit=3&s=' + query).then(async (r) => {
			if (!r.ok) {
				const error = await r.json();
				throw error;
			}

			return r.json();
		});

		// e.target.x.focus();
		modal.open();
	}
	afterNavigate(() => {
		document.querySelector('nav.navbar').style.transform = `translateY(0px)`;
	});
	let lastScroll = 0;
	// let currentScroll = 0;
	let down = false;
	let up = false;
	onMount(() => {
		const navbar = document.querySelector('nav.navbar');
		let leftContainer;
		function alternatedNavbar(e) {
			let currentScroll = window.pageYOffset;
			if (!leftContainer) leftContainer = document.querySelector('div.left').offsetHeight;
			if (window.scrollY > 150) {
				if (currentScroll - lastScroll > 0) {
					navbar.style.transform = `translateY(-${leftContainer + 2}px)`;
					down = true;
					up = false;
					document.querySelector('div.center').classList.add('block');
				} else {
					navbar.style.transform = `translateY(0px)`;
					down = false;
					up = true;
					document.querySelector('div.center').classList.remove('block');
				}
			}
			lastScroll = currentScroll;
		}
		// const body = document.body;
		if (!matchMedia('(min-width: 576px)').matches) {
			window.addEventListener('scroll', alternatedNavbar);
		}
		return () => window.removeEventListener('scroll', alternatedNavbar);
	});
</script>

<!-- <nav class="navbar" class:scroll-down={down} class:scroll-up={up}> -->
<nav class="navbar">
	<div class="content navbar-wrapper">
		<div class="left dos">
			<a href="/">
				<Icon name="home" type="solid" />
			</a>
			<ThemeToggle />
		</div>
		<div class="center">
			{#if searchInput}
				<NavbarSearchForm
					on:esc={() => {
						searchInput = !searchInput;
					}}
					on:submit={submit}
					on:close={() => {
						searchInput = !searchInput;
						modal.close();
					}}
				/>
				<!-- <form on:submit|preventDefault={submit}>
					<input
						use:focus
						class="searchBox"
						type="search"
						name="x"
						id="x"
						autocomplete="off"
						value="suspense"
					/>
					<button
						type="button"
						on:click={() => {
							searchInput = !searchInput;
							modal.close();
						}}
						style="display: inline-flex; justify-content: center; align-items: center; background-color: transparent; border: none; color: var(--c-text-base)"
					>
						<Icon name="x" type="solid" />
					</button>
				</form> -->
			{:else}
				<slot />
				{#if search}
					<button
						class="search-second"
						on:click={() => {
							searchInput = !searchInput;
						}}
					>
						<Icon name="search" type="solid" />
					</button>
				{/if}
			{/if}
		</div>
		<div class="right">
			{#if search}
				<button
					class="search-first"
					on:click={() => {
						searchInput = !searchInput;
					}}
				>
					{#if searchInput}
						<Icon name="x" type="solid" />
					{:else}
						<Icon name="search" type="solid" />
					{/if}
				</button>
			{/if}
			{#if bell}
				<button>
					<Icon name="bell" />
				</button>
			{/if}
			{#if profile}
				{#if $session.user}
					<button on:click={modalSession.open}>
						<Icon name="user-circle" type="solid" />
					</button>
				{/if}
			{/if}
		</div>
	</div>
</nav>

<Modal bind:this={modalSession} Zindex="110" btnClose={false}>
	<SessionModal />
	<svelte:fragment slot="action">
		<a class="list__logout" href="/auth/logout">logout <Icon name="logout" /></a>
		<button href="/auth/logout" on:click={modalSession.close} class="cta">close</button>
	</svelte:fragment>
</Modal>

<Modal bind:this={modal} Zindex="110" btnClose={false}>
	<NavbarSearchResults {results} />

	<svelte:fragment slot="action">
		{#await results then response}
			<a href="/search?s={response.search}" class="cta">show all</a>
		{/await}
		<button
			on:click={() => {
				modal.close();
				searchInput = false;
			}}>close</button
		>
	</svelte:fragment>
</Modal>

<style>
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
	}
	.navbar-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
	.left,
	.center,
	.right {
		display: flex;
	}

	.left > :global(button),
	.right > :global(button),
	.center > :global(button),
	.left > :global(a),
	.right > :global(a),
	.center > :global(a) {
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
		line-height: 1rem;
		text-decoration: none;
		cursor: pointer;
	}
	.left > :global(button:hover),
	.right > :global(button:hover),
	.center > :global(button:hover),
	.left > :global(a:hover),
	.right > :global(a:hover),
	.center > :global(a:hover),
	.center > :global(button.active),
	.center > :global(a.active) {
		opacity: 1;
		color: var(--navbar-item-hover);
	}
	.center > :global(button.active) {
		border-bottom: 2px solid var(--c-front);
	}
	.center {
		order: 3;
		width: 100%;
	}
	.center > :global(button),
	.center > :global(a) {
		font-weight: bold;
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
	:global(.center.block) > :global(button + .search-second),
	:global(.center.block) > :global(a + .search-second) {
		display: inline-flex !important;
	}

	.list__logout {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
	}
</style>

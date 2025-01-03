<script lang="ts">
	import { self } from 'svelte/legacy';

	import { tick } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	// icons
	import Icon from '$icons/icon.svelte';
	import Search from '$icons/solid/search.svg?raw';
	import UserCircle from '$icons/solid/user-circle.svg?raw';
	import Bell from '$icons/outline/bell.svelte';
	import BellSolid from '$icons/solid/bell.svg?raw';
	import Logout from '$icons/outline/user-circle.svelte';
	import ExclamationCircle from '$icons/outline/exclamation-circle.svelte';

	// components
	import Modal from '$components/ui/modal.svelte';
	import ThemeToggle from '$components/header/ThemeToggle.svelte';
	import SessionModal from '$components/header/Session.svelte';
	import SearchForm from '$components/header/SearchForm.svelte';
	import SearchResults from '$components/header/SearchResults.svelte';
	import Notification from '$components/header/Notification.svelte';

	// stores
	import { page } from '$app/stores';
	import { notiStore } from '$lib/stores/notifications-store';
	import LogoNavbar from '$components/ui/logo-navbar.svelte';
	// import { enhance } from '$app/forms';
	import LoginForm from '$components/ui/LoginForm.svelte';
	import type { MoviesResponse } from '$lib/types';

	interface Props {
		search?: boolean;
		bell?: boolean;
		profile?: boolean;
		onkeydown: () => void;
	}

	let { search = true, bell = true, profile = true, ...rest }: Props = $props();
	// svelte-ignore non_reactive_update
	let modalSearch: Modal;
	// svelte-ignore non_reactive_update
	let modalSession: Modal;
	// svelte-ignore non_reactive_update
	let modalNotification: Modal;
	let searchInput = $state(false);
	let inputRef = $state<HTMLInputElement>();
	let results = $state<Promise<MoviesResponse>>();
	let showModalSearch: boolean = $state(false);
	let showModalSession: boolean = $state(false);
	let showModalNotification: boolean = $state(false);
	let scrollY = $state(0);
	let down = $derived(scrollY > 40);

	async function openModal(modal: string) {
		if (modal === 'search') showModalSearch = true;
		if (modal === 'session') showModalSession = true;
		if (modal === 'notification') showModalNotification = true;
		await tick();
		if (modal === 'search') modalSearch?.open();
		if (modal === 'session') modalSession?.open();
		if (modal === 'notification') modalNotification?.open();
	}

	async function submit(e: MouseEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		e.preventDefault();
		if (!inputRef) return;

		let query = inputRef.value.trim();
		let url = new URL('/api', location.origin);
		url.searchParams.set('limit', '3');
		if (query) url.searchParams.set('s', query);

		// results =

		let res = await fetch(url.href);
		if (!res.ok) {
			const error = res.statusText;
			throw error;
		}
		const json = res.json() as Promise<MoviesResponse>;
		results = json;

		inputRef.focus();
		openModal('search').then();
	}

	function focusIn(node: HTMLElement) {
		node.focus();
	}

	function toggleSearchInput() {
		searchInput = !searchInput;
	}
</script>

<svelte:window bind:scrollY />

<div class="header" class:search-open={searchInput} class:down>
	<div class="content header-wrapper">
		<div class="left header_slots" class:esconder={searchInput}>
			<a href="/" class="header-item">
				<LogoNavbar />
			</a>
		</div>
		<div class="center header_slots">
			{#if searchInput}
				<SearchForm bind:inputRef onesc={toggleSearchInput} {submit} onclose={toggleSearchInput} />
			{/if}
		</div>
		<div class="right header_slots" class:esconder={searchInput}>
			{#if search}
				{#if !searchInput}
					<button title="search" class="search-first header-item" onclick={toggleSearchInput}>
						<Icon>
							{@html Search}
						</Icon>
					</button>
				{/if}
			{/if}
			{#if bell}
				<button title="notification" class="header-item" onclick={() => openModal('notification')}>
					<Icon counter={$notiStore.length.toString()}>
						{#if $notiStore.length}
							{@html BellSolid}
						{:else}
							<Bell />
						{/if}
					</Icon>
				</button>
			{/if}
			<ThemeToggle />
			{#if profile}
				{#if $page.data.user}
					<button title="session" class="header-item" onclick={() => openModal('session')}>
						<Icon>
							{@html UserCircle}
						</Icon>
						<span class="username">
							{$page.data.user.username}
						</span>
					</button>
				{:else}
					<button class="header-item sign-in" onclick={() => openModal('session')}>sign in</button>
				{/if}
			{/if}
		</div>
	</div>
</div>

{#if searchInput}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="foreground"
		onclick={self(() => (searchInput = false))}
		onkeydown={() => {
			rest.onkeydown?.();
		}}
	></div>
{/if}

{#if showModalSession}
	{#if $page.data.user}
		<Modal bind:this={modalSession} btnClose={false}>
			{#snippet header()}
				Session <Icon y="10%">{@html UserCircle}</Icon>
			{/snippet}
			<SessionModal />

			{#snippet action()}
				<form method="post" action="/logout" style="display: contents;">
					<button type="submit">logout <Icon y="10%"><Logout /></Icon></button>
				</form>
				<button onclick={modalSession.close} class="cta">close</button>
			{/snippet}
		</Modal>
	{:else}
		<Modal bind:this={modalSession} btnClose={false}>
			{#snippet header()}
				login <Icon y="10%">{@html UserCircle}</Icon>
			{/snippet}
			<LoginForm
				on:result={async ({ detail }) => {
					if (detail.result.type === 'redirect') {
						await invalidateAll();
						modalSession.close();
					}
				}}
			/>
		</Modal>
	{/if}
{/if}

{#if showModalSearch}
	<Modal bind:this={modalSearch}>
		{#snippet header()}
			{#await results}
				<Icon y="10%">{@html Search}</Icon> Searching...
			{:then}
				<Icon y="10%">{@html Search}</Icon> Search
			{:catch}
				<Icon y="10%"><ExclamationCircle /></Icon> Ooops!
			{/await}
		{/snippet}
		<SearchResults {results} />

		{#snippet action()}
			{#if results}
				{#await results then response}
					<a
						use:focusIn
						data-sveltekit-reload
						href="/movies?s={encodeURI(response.search)}"
						class="cta"
						onclick={() => (searchInput = false)}>show all</a
					>
				{:catch}
					<button use:focusIn onclick={modalSearch.close}>close</button>
				{/await}
			{/if}
		{/snippet}
	</Modal>
{/if}

{#if showModalNotification}
	<Modal bind:this={modalNotification}>
		{#snippet header()}
			<Icon y="10%">{@html BellSolid}</Icon>
			{$notiStore.length ?? ''} Notifications
		{/snippet}
		<Notification on:clickItem={() => modalNotification.close()} />
	</Modal>
{/if}

<style>
	.sign-in {
		padding-inline: 1em;
	}
	.sign-in:hover {
		color: var(--c-front) !important;
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

	.header {
		--icon-size: 1.2rem;
		width: 100%;
		transition: transform 300ms ease;
		transform: translateY(0);
		position: sticky;
		top: 0;
		z-index: 51;
		overflow: hidden;
		/* backdrop-filter: blur(15px); */
		/* background-color: var(--c-main); */
		/* background-color: var(--bg-navbar); */
		/* background-color: var(--c-main); */
		box-shadow: var(--shadow-short);
		transition:
			transform 0.3s ease-in-out,
			var(--transition-theme);
	}
	.header.down {
		border-bottom: 1px solid var(--c-divider);
		/* background-color: transparent;
		border-color: transparent;
		backdrop-filter: none; */
		/* backdrop-filter: blur(15px); */
		background-color: var(--c-main);
	}

	.header.search-open {
		border-bottom: 1px solid var(--c-divider);
		background-color: var(--c-main);
		border-color: var(--c-divider);
	}

	.header-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.header_slots {
		display: flex;
	}

	.header-item {
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

	.header-item:hover {
		opacity: 1;
		color: var(--navbar-item-hover);
	}

	.center {
		/* display: none; */
		order: 3;
		width: 100%;
	}

	.center > :global(button),
	.center > :global(a) {
		font-size: 1em;
		background-color: transparent;
		border: 2px solid transparent;
		font-weight: bold;
		line-height: 1rem;
		color: inherit;
		padding: 0.9em 0.5em;
		opacity: var(--navbar-item-opacity);
		text-decoration: none;
	}
	.center > :global(button.active),
	.center > :global(a.active) {
		border-bottom: 2px solid var(--c-front);
		opacity: 1;
	}

	.username {
		display: none;
		padding: 0 0.2em;
	}

	@media (min-width: 768px) {
		.center {
			order: initial;
			width: auto;
		}
	}
</style>

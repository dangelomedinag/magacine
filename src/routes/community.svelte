<!-- <script context="module">
	/** @type {import("@sveltejs/kit").Load}*/
	export const load = async ({ url, fetch }) => {
		const searchParam = url.searchParams.has('s');
		const type = url.searchParams.has('type');

		if (!searchParam) {
			return { status: 200 };
		}

		const searchParams = new URLSearchParams();
		searchParams.set('s', url.searchParams.get('s'));
		if (type) searchParams.set('type', url.searchParams.get('type'));

		const data = await fetch('/api?' + searchParams.toString());
		const json = await data.json();

		return {
			props: {
				search: json
			}
		};
	};
</script> -->
<script>
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';

	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';
	import NavbarTop from '$lib/components/ui/NavbarTop.svelte';
	import Spinner from '$lib/components/ui/Spinner.svelte';
	import Toast from '$lib/components/ui/toast.svelte';
	import { onMount } from 'svelte';

	// export let search;
	// $: console.log(search);
	// let act = 'series';
	let form;
	let value = '';
	let input;
	let autocomplete = [];
	let lastValue = '';
	let movies;
	let lastSearch;
	let timer;
	let errors;
	let loading = false;
	let selected = ['movie', 'series'];
	let options = [
		{ value: 'movie', label: 'movies' },
		{ value: 'series', label: 'series' }
	];

	onMount(async () => {
		const searchParam = $page.url.searchParams.has('s');
		const type = $page.url.searchParams.has('type');

		if (!searchParam) {
			return;
		}

		const searchParams = new URLSearchParams();
		searchParams.set('s', $page.url.searchParams.get('s'));
		if (type) searchParams.set('type', $page.url.searchParams.get('type'));

		const data = await fetch('/api?' + searchParams.toString());
		const search = await data.json();

		if (search) {
			value = search.search;
			movies = search;
			lastSearch = search;
			lastValue = search.search;
		}
	});

	async function submit() {
		if (timer) clearTimeout(timer);

		if (lastValue.toLowerCase() === getInputValue()) {
			if (lastSearch) {
				movies = lastSearch;
				autocomplete = [];
			}
			return;
		}

		await getMovies();
	}

	function onReset() {
		if (timer) clearTimeout(timer);
		value = '';
	}

	async function getSuggestion() {
		const searchString = getInputValue();
		try {
			let res = await getData(searchString);
			autocomplete = res;
		} catch (error) {
			autocomplete = [];
			lastSearch = undefined;
			// errors = error;
		}
	}

	async function getMovies() {
		const searchString = getInputValue();
		try {
			const url = new URL(location);
			// console.log(location);
			let res = await getData(searchString);
			movies = res;

			// const s = ['s', searchString];
			// const type = ['type', selected[0]];

			url.searchParams.set('s', searchString);

			if (selected.length == 1) url.searchParams.set('type', selected[0]);
			else if (url.searchParams.has('type')) url.searchParams.delete('type');

			await goto(url.href, { replaceState: true });
		} catch (error) {
			movies = undefined;
			lastSearch = undefined;
			errors = error;
		}
	}

	async function getData(searchString) {
		if (searchString.length < 3) {
			throw { level: { warn: true }, message: 'your search must contain at least letters' };
		}

		loading = true;

		const Params = new URLSearchParams('');

		const s = ['s', searchString];
		const type = ['type', selected[0]];

		Params.set(s[0], s[1]);

		if (selected.length == 1) {
			Params.set(type[0], type[1]);
		}

		const req = await fetch('/api?' + Params.toString());

		if (!req.ok) {
			loading = false;
			const res = await req.json();
			throw { level: { danger: true }, message: res.message };
		}

		const res = await req.json();
		lastValue = searchString;
		lastSearch = res;
		loading = false;

		return res;
	}

	const getInputValue = () => input.value.trim().toLowerCase();

	const delay = (fn, ms = 800) => setTimeout(fn, ms);

	function onInput() {
		if (timer) clearTimeout(timer);
		errors = undefined;

		if (getInputValue().length < 3) {
			errors = { level: { warn: true }, message: 'your search must contain at least letters' };
			autocomplete = [];
			return;
		}

		timer = delay(() => {
			getSuggestion();
		});
	}

	function onBlur() {
		errors = undefined;

		setTimeout(() => {
			autocomplete = [];
		}, 100);
	}

	function onFocus() {
		if (lastValue.toLowerCase() === getInputValue()) {
			if (lastSearch) {
				autocomplete = lastSearch;
			}
		}
	}
</script>

<NavbarTop />

<div class="content">
	<h1 style="text-align: center;">Search</h1>
	<div class="search-container">
		<form
			bind:this={form}
			on:reset={onReset}
			on:submit|preventDefault={submit}
			class="search-box"
			class:search-box--open={autocomplete?.results?.length > 0}
		>
			{#if value.length > 0}
				<button type="reset" class="btn-clear">
					{#if loading}
						<Spinner size="5" />
					{:else}
						❌
					{/if}
				</button>
			{/if}
			<input
				bind:this={input}
				bind:value
				type="search"
				name="mysearch"
				id="mysearch"
				on:focus={onFocus}
				on:blur={onBlur}
				on:input={onInput}
				required
				placeholder="ej. batman"
				autocomplete="off"
			/>
			<button type="submit" class="btn-search">search</button>
		</form>

		<div
			class="autocomplete-container"
			class:autocomplete-container--open={autocomplete?.results?.length > 0}
		>
			{#each autocomplete.results ?? [] as item (item.uuid)}
				<button
					class="item"
					on:click={() => {
						// console.log(item);
						input.value = item.title;
						autocomplete = [];
						// form.querySelector('.btn-search').focus();
						input.focus();

						// input.focus();
					}}>{item.title}</button
				>
			{:else}
				<!--  -->
			{/each}
		</div>
	</div>
	<div class="filters">
		{#each options as item}
			<label
				for="radio-{item.value}"
				class="option"
				class:option--active={selected.includes(item.value)}
			>
				<span>{item.label}</span>
				<!-- <div class="option"> -->
				<input
					on:change={() => {
						lastValue = '';
						lastSearch = undefined;
					}}
					id="radio-{item.value}"
					class="input-radio"
					type="checkbox"
					bind:group={selected}
					value={item.value}
				/>
			</label>
		{/each}
	</div>
	{#if errors}
		<Toast {...errors.level}>{errors.message}</Toast>
	{/if}
	{#if movies}
		<CarouselMovies
			details={false}
			{movies}
			title="{movies.totalResults} results"
			priority="small"
		/>
	{:else if errors?.level?.danger}
		<!-- content here -->
		<CarouselMovies
			details={false}
			movies={$page.stuff?.suggest}
			title="suggestions"
			priority="small"
		/>
	{/if}
</div>

<style>
	.content {
		/* margin-top: 1em; */
		/* height: 600px; */
		background-image: linear-gradient(var(--c-front) -80%, transparent 20%);
		/* background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat; */
	}

	.search-container {
		position: relative;
		margin: 1em auto;
		max-width: 800px;
		/* display: flex; */
		/* height: 50px; */
		/* outline: 1px solid red; */
	}

	.search-box {
		display: flex;
		color: white;
		border: 1px solid rgba(128, 128, 128, 0.3);
		overflow: hidden;
		border-radius: 50vh;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
	}

	.search-box--open {
		border-radius: 20px;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	#mysearch {
		color: inherit;
		font-size: 1.3rem;
		font-weight: bold;
		display: block;
		height: 100%;
		width: 100%;
		background-color: transparent;
		border: none;
		outline: none;
		padding-left: 0.5em;
		padding-right: 0.5em;
		padding-top: 0.25em;
		padding-bottom: 0.25em;
	}

	#mysearch:hover,
	#mysearch:focus,
	.btn-clear:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.btn-search:hover {
		background-color: var(--c-front-dark);
	}

	.btn-search:disabled {
		color: rgba(255, 255, 255, 0.2);
		background-color: rgba(255, 0, 0, 0.1);
		cursor: not-allowed;
	}
	.btn-search:focus {
		background-color: var(--c-front);
	}

	.btn-search {
		cursor: pointer;
		color: inherit;
		background-color: var(--c-front);
		border: none;
		padding-left: 1em;
		padding-right: 1em;
	}

	.btn-clear {
		cursor: pointer;
		color: inherit;
		background-color: transparent;
		border: none;
		/* padding-left: 1em;
		padding-right: 1em; */
		width: 50px;
		position: relative;
		/* width: 40px; */
	}

	.autocomplete-container {
		width: 100%;
		position: absolute;
		/* background-color: burlywood; */
		background-color: var(--c-main-content);
		display: block;
		z-index: 50;
		bottom: 0;
		transform: translateY(100%);
		border-bottom-right-radius: 20px;
		border-bottom-left-radius: 20px;
		overflow-y: auto;
		max-height: 40vh;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);
		/* overflow: hidden; */
	}

	.autocomplete-container--open {
		padding: 1em;
		border: 1px solid rgba(128, 128, 128, 0.3);
	}

	.item {
		text-align: left;
		width: 100%;
		background-color: transparent;
		/* outline: 1px solid red;	 */
		display: block;
		border: none;
		color: white;
		padding: 0.25em 0;
		cursor: pointer;
	}

	.item:hover {
		background-color: var(--c-main);
	}

	.filters {
		text-align: center;
		margin-top: 1em;
		/* border: 1px solid var(--c-front); */
		padding-top: 1em;
		padding-bottom: 1em;
		/* background-color: rgba(255, 255, 255, 0.1); */
	}

	.option {
	}
</style>

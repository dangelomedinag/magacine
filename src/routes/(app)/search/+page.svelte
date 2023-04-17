<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { CODE } from './_ERRORS_CODE';

	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import Spinner from '$lib/components/ui/spinner.svelte';
	import Alert from '$components/ui/alert.svelte';

	/* icons */
	import Icon from '$icons/icon.svelte';
	import ArrowNarrowUp from '$icons/solid/arrow-narrow-up.svg?raw';
	import X from '$icons/solid/x.svg?raw';

	let value = '';
	let currentValue = '';
	let input;
	let showSuggest = false;
	let autocomplete = [];
	let lastValue = '';
	let movies;
	let lastSearch;
	let timer;
	let timerErrors;
	let errors;
	let loading = false;
	let suggestionsMovies = undefined;

	// filters
	let selected = ['movie', 'series'];
	let options = [
		{ value: 'movie', label: 'movies' },
		{ value: 'series', label: 'series' }
	];

	onMount(async () => {
		const currURL = new URL(location);
		const notSearch = !currURL.searchParams.has('s') || currURL.searchParams.get('s').length < 3;

		if (notSearch) return;

		loading = true;
		value = currURL.searchParams.get('s');

		try {
			const data = await fetch('/api' + currURL.search);
			if (!data.ok) throw data;

			const search = await data.json();

			if (search) {
				movies = search;
				lastSearch = search;
				lastValue = value;
				loading = false;
			}
		} catch (error) {
			await getMovies();
		}
	});

	function openSuggestions() {
		if (!lastSearch) {
			return;
		}
		autocomplete = lastSearch;
		showSuggest = true;
	}

	async function closeSuggestions() {
		showSuggest = false;
	}

	async function submit() {
		if (timer) clearTimeout(timer);

		if (lastValue.toLowerCase() === getInputValue()) {
			if (lastSearch) {
				movies = lastSearch;
				let searchString = getInputValue();
				updateUrlSearchParam(searchString);
				closeSuggestions();
			}
			return;
		}

		await getMovies();
		closeSuggestions();
	}

	function onReset() {
		if (timer) clearTimeout(timer);
		value = '';
		delay(() => {
			closeSuggestions();
		}, 10);
		input.focus();
	}

	async function getSuggestion() {
		const searchString = getInputValue();
		try {
			let res = await getData(searchString);
			lastSearch = res;
			lastValue = searchString;
			currentValue = getInputValue();
			openSuggestions();
		} catch (error) {
			autocomplete = [];
			showSuggest = false;
			lastSearch = undefined;
		}
	}

	async function updateUrlSearchParam(searchString) {
		const url = new URL(location);
		url.searchParams.set('s', searchString);

		if (selected.length == 1) url.searchParams.set('type', selected[0]);
		else if (url.searchParams.has('type')) url.searchParams.delete('type');

		await goto(url.href, { replaceState: true });
	}

	async function getMovies() {
		const searchString = getInputValue();
		try {
			let res = await getData(searchString);
			movies = res;
			lastValue = searchString;

			await updateUrlSearchParam(searchString);
		} catch (error) {
			if (!error.level.warn) movies = undefined;
			lastSearch = undefined;
			errors = error;
			let sug = await fetch('/api?s=avengers');
			suggestionsMovies = await sug.json();
		}
	}

	async function getData(searchString) {
		if (searchString.length < 3) {
			throw { level: { warn: true }, message: CODE.too_short };
		}

		loading = true;

		const Params = new URLSearchParams('');
		Params.set('s', searchString);

		if (selected.length == 1) {
			Params.set('type', selected[0]);
		}

		const req = await fetch('/api?' + Params.toString());

		if (!req.ok) {
			loading = false;
			const res = await req.json();
			throw { level: { danger: true }, message: res.message };
		}

		const res = await req.json();
		loading = false;

		return res;
	}

	const getInputValue = () => input.value.trim().toLowerCase();

	const delay = (fn, ms = 800) => setTimeout(fn, ms);

	function onInput() {
		if (timer) clearTimeout(timer);
		if (timerErrors) clearTimeout(timerErrors);

		if (getInputValue().length < 3 && getInputValue().length > 0) {
			timerErrors = delay(() => {
				errors = { level: { warn: true }, message: CODE.too_short };
			});
			showSuggest = false;
			return;
		}
		errors = undefined;

		timer = delay(() => {
			getSuggestion();
		});
	}

	function onFocus() {
		if (lastValue.toLowerCase() === getInputValue() && getInputValue().length > 0) {
			openSuggestions();
		}
	}

	function setValue(item) {
		input.value = item.title.toLowerCase();
		closeSuggestions();
		input.focus();
	}
</script>

<svelte:head>
	<title>Magacine - Search</title>
</svelte:head>

<NavbarTop search={false} />

<!-- <div class="contenta"> -->
<div class="content wrapper">
	<h1 style="text-align: center;">Search</h1>
	<div class="search-container">
		<form
			on:reset={onReset}
			on:submit|preventDefault={submit}
			class="search-box"
			class:search-box--open={showSuggest}
		>
			{#if showSuggest}
				<button
					type="button"
					on:click={() => {
						closeSuggestions();
					}}
					class="btn-clear"
				>
					<Icon>
						{@html ArrowNarrowUp}
					</Icon>
				</button>
			{:else}
				<button type="reset" class="btn-clear">
					{#if loading}
						<Spinner size="5" />
					{:else}
						<Icon>
							{@html X}
						</Icon>
					{/if}
				</button>
			{/if}
			<input
				bind:this={input}
				bind:value
				type="search"
				name="mysearch"
				id="mysearch"
				class="input-search"
				on:focus={onFocus}
				on:input={onInput}
				required
				placeholder="ej. spider-man"
				autocomplete="off"
			/>
			<button type="submit" class="btn-search">search</button>
		</form>

		<div class="autocomplete-container" class:autocomplete-container--open={showSuggest}>
			{#if showSuggest}
				{#each autocomplete.results as item, i (item.uuid)}
					<button
						in:fly={{ y: 15, delay: 20 * i, duration: 150, easing: quintInOut }}
						class="item"
						on:click={() => setValue(item)}>{item.title.toLowerCase()}</button
					>
				{/each}
			{/if}
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
					class="check-item"
					type="checkbox"
					bind:group={selected}
					value={item.value}
				/>
			</label>
		{/each}
	</div>
	{#if errors}
		<div style="padding-top: 1em; padding-bottom: 1em;" class="content">
			<Alert {...errors.level}><span>{errors.message}</span></Alert>
		</div>
	{/if}
	{#if movies}
		<CarouselMovies details={false} {movies} title="{movies.totalResults} results" />
	{:else if errors?.level?.danger}
		<!-- content here -->
		<CarouselMovies details={false} movies={suggestionsMovies} title="suggestions" />
	{/if}
</div>

<!-- </div> -->
<style>
	.wrapper {
		padding-block: 3em;
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
		color: var(--c-text-base);
		border: 1px solid rgba(128, 128, 128, 0.3);
		overflow: hidden;
		border-radius: 50vh;
		/* box-shadow: var(--shadow-long); */
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
		background-color: var(--c-divider);
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
		color: white;
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
		display: inline-flex;
		justify-content: center;
		align-items: center;
		/* border-radius: 50vh; */
		/* padding-left: 1em;
		padding-right: 1em; */
		width: 40px;
		position: relative;
		/* width: 40px; */
	}

	.btn-clear:active {
		background-color: var(--c-front);
	}
	.btn-clear:focus {
		background-color: rgba(255, 255, 255, 0.1);
		/* border-radius: 0; */
		border: none;
		outline: none;
		/* outline: 1px solid grey;
		outline-offset: 2px; */
	}

	.autocomplete-container {
		width: 100%;
		position: absolute;
		/* background-color: burlywood; */
		background-color: var(--c-main-content);
		opacity: 0.95;
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
		/* padding: 1em; */
		border: 1px solid var(--c-divider);
	}

	.autocomplete-container::-webkit-scrollbar {
		width: 5px;
		border-radius: 10px;
	}

	.autocomplete-container::-webkit-scrollbar-track {
		background: rgba(128, 128, 128, 0.05);
		margin: 10px;
		border-radius: 10px;
		overflow: hidden;
	}

	.autocomplete-container::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.05);
	}

	.autocomplete-container::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	.item {
		text-align: left;
		width: 100%;
		background-color: transparent;
		/* outline: 1px solid red;	 */
		display: block;
		border: none;
		color: inherit;
		padding: 0.5em 1em;
		cursor: pointer;
		/* padding: 0 0.5em; */
	}

	.item:hover,
	.item:focus {
		background-color: var(--c-front);
		color: white;
	}

	.filters {
		font-size: 0.9em;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding-top: 1em;
		padding-bottom: 1em;
	}

	.option {
		/* background-color: rgba(255, 255, 255, 0.1); */
		text-align: center;
		border: 1px solid transparent;

		width: 100%;
		max-width: 80px;
		padding: 0.5em 0;
		cursor: pointer;
	}

	.option span {
		display: block;
		padding-bottom: 0.5em;
	}

	.option:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.option--active {
		/* border-color: rgb(1, 87, 44); */
		/* color: rgb(127, 211, 169); */
		border-top: 1px solid var(--c-front);
	}

	.check-item {
		display: block;
		margin: 0 auto;
		text-align: center;
		/* display: none; */
		accent-color: var(--c-front);
	}
</style>

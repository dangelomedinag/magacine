<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { CODE } from './_ERRORS_CODE';

	import CarouselMovies from '$components/card/carouselMovies.svelte';
	import Alert from '$components/ui/alert.svelte';

	/* icons */
	import Icon from '$icons/icon.svelte';
	import X from '$icons/solid/x.svg?raw';
	import GridCards from '$components/gridMovies/GridCards.svelte';
	import SectionPage from '$components/ui/SectionPage.svelte';
	import SearchCircle from '$icons/solid/search-circle.svg?raw';
	import Search from '$icons/solid/search.svg?raw';
	import type { MoviesResponse } from '$lib/types';

	export let data;

	let value = '';
	let currentValue = '';
	let input;
	let showSuggest = false;
	let autocomplete: MoviesResponse;
	let lastValue = '';
	let movies = undefined;
	let lastSearch: MoviesResponse;
	let timer = undefined;
	let timerErrors = undefined;
	let errors = undefined;

	let loading = false;

	// filters
	let selected = ['movie', 'series'];
	let options = [
		{ value: 'movie', label: 'movies' },
		{ value: 'series', label: 'series' }
	];

	onMount(async () => {
		if (data.movies) {
			if (data.movies?.message) {
				errors = { level: { danger: true }, message: data.movies?.message };
			} else {
				value = data.movies?.search;
				movies = data.movies;
			}
		}
	});

	function openSuggestions() {
		if (!lastSearch) {
			return;
		}
		lastSearch.results = lastSearch.results.filter((el) =>
			el.title.toLowerCase().startsWith(value.toLowerCase())
		);
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

	async function onReset() {
		if (timer) clearTimeout(timer);
		await tick();

		value = '';
		closeSuggestions();
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
			// let sug = await fetch('/api?s=fast');
			// suggestionsMovies = await sug.json();
			// if(data.suggest.movies)
			// suggestionsMovies = await data.suggest.movies;
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
		showSuggest = false;
		if (timer) clearTimeout(timer);
		if (timerErrors) clearTimeout(timerErrors);

		if (getInputValue().length < 3 && getInputValue().length > 0) {
			timerErrors = delay(() => {
				errors = { level: { warn: true }, message: CODE.too_short };
			});
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

	const filterAutocomplete = () =>
		autocomplete.results.filter((r) => r.title.trim().slice(value.length).length > 1);
</script>

<svelte:head>
	<title>Magacine - Search</title>
</svelte:head>

<div class="content search-wrapper">
	<div class="search-container">
		<form id="search-form" on:reset={onReset} on:submit|preventDefault={submit}>
			<div class="form-section">
				<label for="search-input" class="form-item search-label"><Icon>{@html Search}</Icon></label>
			</div>
			<input
				type="search"
				name="search-input"
				id="search-input"
				class="search-input form-item"
				minlength="3"
				placeholder="ej. spider-man"
				autocomplete="off"
				required
				on:focus={onFocus}
				on:input={onInput}
				bind:this={input}
				bind:value
			/>
			<div class="form-section">
				<button type="submit" class="form-item form-btn btn-submit" disabled={errors?.level?.warn}
					>search</button
				>
			</div>
		</form>

		{#if showSuggest}
			<div class="wrapper-suggest scroolbar-prettie">
				<!-- {#if filterAutocomplete().length > 0} -->
				<button type="button" class="suggest-item btn-close" on:click={closeSuggestions}>
					<Icon y="10%">{@html X}</Icon>
				</button>
				<!-- {/if} -->
				{#each filterAutocomplete() as item, i (item.uuid)}
					{@const word = item.title.trim().toLowerCase().slice(0, value.length)}
					{@const rest = item.title.trim().toLowerCase().slice(value.length)}
					<button
						in:fly={{ y: 15, delay: 20 * i, duration: 150, easing: quintInOut }}
						class="suggest-item"
						on:click={() => setValue(item)}
					>
						...{rest}</button
					>
				{/each}
			</div>
		{/if}
		<div class="filter-container">
			<!-- <div class="filter-group"> -->
			{#each options as item}
				<label
					for="radio-{item.value}"
					class="option"
					class:option--active={selected.includes(item.value)}
				>
					<input
						tabindex="0"
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
					<span class="check-label">{item.label}</span>
				</label>
			{/each}
			<!-- </div> -->
		</div>
	</div>
</div>
<div class="content">
	{#if errors}
		<Alert {...errors.level} on:click={() => (errors = undefined)}
			><span>{errors.message}</span></Alert
		>
	{/if}
	{#if movies?.results}
		<GridCards {movies} />
	{:else if errors?.level?.danger}
		{#if data.suggest.movies}
			{#await data.suggest.movies then suggestMovies}
				<CarouselMovies details={false} movies={suggestMovies} title="suggestions" />
			{/await}
		{/if}
	{/if}
</div>
<SectionPage>
	<span
		><Icon>{@html SearchCircle}</Icon> find your <a href="/favorites">favorites</a> movies and series</span
	>
</SectionPage>

<style>
	.loading {
		/* position: absolute;
		top: 0;
		left: 0; */
		height: 3px;
		background-color: var(--c-front);
		/* width: 0px; */
	}

	.search-wrapper {
		position: relative;
		/* background-color: var(--c-main); */
		/* border-bottom: 1px solid var(--c-front); */
	}

	.search-container {
		/* padding-inline: 1em; */
		padding-block: 1em;
		border: 1px solid transparent;
		max-width: 600px;
		margin-inline: auto;
		/* border-radius: 15px; */
	}

	#search-form {
		border: 1px solid transparent;
		position: relative;
		display: flex;
		border-bottom-color: var(--c-divider);
	}
	.form-section {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form-item {
		border: 1px solid transparent;
		line-height: 1.5;
		margin: 0;
		background-color: transparent;
	}

	.search-label {
		font-size: 1.2rem;
		opacity: 0.5;
	}

	.search-input {
		padding-block: 1em;
		padding-inline: 2em;
		width: 100%;
		font-weight: bold;
	}

	.search-input::placeholder {
		opacity: 0.5;
		font-weight: initial;
	}
	.search-input:focus {
		outline: none;
		/* background-color: rgba(128, 128, 128, 0.03); */
	}

	.btn-submit {
		color: var(--c-front);
		border-radius: 5px;
		padding-block: 0.4em;
		padding-inline: 1em;
		font-weight: bold;
		border-color: var(--c-front);
	}
	.btn-submit:not(:disabled):hover {
		background-color: var(--c-front);
		color: white;
		border-radius: 5px;
		padding-block: 0.4em;
		padding-inline: 1em;
		font-weight: bold;
	}

	#search-form:invalid .btn-submit,
	.btn-submit:disabled {
		cursor: not-allowed;
		background-color: var(--c-divider);
		color: var(--c-divider);
		border-color: var(--c-divider);
	}

	.filter-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.3em;
		margin-top: 1em;
	}

	/* .filter-group {
		margin-top: 1em;
		border: 1px solid transparent;
	} */

	.option {
		position: relative;
		display: inline-block;
		font-weight: bold;
		min-width: 100px;
		text-align: center;
		/* margin-inline: 0.2em; */
	}

	.check-item {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		all: initial;
		z-index: 1;
		border-radius: 50vh;
	}
	.check-item:focus {
		outline: 1px dashed grey;
		outline-offset: 2px;
	}
	.check-item:hover ~ .check-label {
		background-color: var(--c-divider);
	}

	.check-label {
		display: inline-block;
		width: 100%;
		border-radius: 50vh;
		padding-inline: 0.6em;
		padding-block: 0.4em;
		color: var(--c-text-basee);
		opacity: 0.5;
	}

	.check-item:checked ~ .check-label {
		opacity: 1;
		background-color: var(--c-front);
		color: white;
	}

	.wrapper-suggest {
		display: flex;
		/* flex-wrap: wrap; */
		max-width: 100%;
		overflow-x: auto;
		gap: 0.2em;
		padding-block: 0.5em;
		position: relative;
	}

	.suggest-item {
		flex-shrink: 0;
		opacity: 0.3;
		background-color: var(--c-divider);
		border-radius: 50vh;
		border: 1px solid var(--c-divider);
		max-width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.btn-close {
		position: sticky;
		top: 0;
		left: 0;
		opacity: 1;
		background-color: white;
		color: var(--c-dark);
		z-index: 1;
	}
	.suggest-item:hover {
		opacity: 1;
	}

	.scroolbar-prettie::-webkit-scrollbar {
		height: 5px;
		border-radius: 10px;
		overflow: hidden;
	}

	.scroolbar-prettie::-webkit-scrollbar-track {
		background-color: rgba(128, 128, 128, 0.1);
		margin: 10px;
		border-radius: 10px;
		overflow: hidden;
	}

	.scroolbar-prettie::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: rgba(128, 128, 128, 0.2);
	}

	.scroolbar-prettie::-webkit-scrollbar-thumb:hover {
		background-color: #555;
	}

	/* .wrapper {
	}

	.search-container {
		position: relative;
	}

	.search-box {
		display: flex;
		color: var(--c-text-base);
		border: 1px solid rgba(128, 128, 128, 0.3);
		overflow: hidden;
		border-radius: 50vh;
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
		width: 40px;
		position: relative;
	}

	.btn-clear:active {
		background-color: var(--c-front);
	}
	.btn-clear:focus {
		background-color: rgba(255, 255, 255, 0.1);
		border: none;
		outline: none;
	}

	.autocomplete-container {
		width: 100%;
		position: absolute;
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
	}

	.autocomplete-container--open {
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
		display: block;
		border: none;
		color: inherit;
		padding: 0.5em 1em;
		cursor: pointer;
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
		border-top: 1px solid var(--c-front);
	}

	.check-item {
		display: block;
		margin: 0 auto;
		text-align: center;
		accent-color: var(--c-front);
	} */
</style>

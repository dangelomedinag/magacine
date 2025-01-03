<script lang="ts">
	import { afterNavigate, goto, invalidate, invalidateAll } from '$app/navigation';
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
	import Error from '../../+error.svelte';

	// interface Props {
	// 	data: any;
	// }

	let { data } = $props();

	let value = $state('');
	let currentValue = '';
	let input = $state() as HTMLInputElement;
	let form: HTMLFormElement;
	let showSuggest = $state(false);
	let autocomplete: MoviesResponse;
	let lastValue = $state('');
	let movies: MoviesResponse | undefined = $state(undefined);
	let lastSearch: MoviesResponse | [] = $state([]);
	let timer: NodeJS.Timeout | undefined = undefined;
	let timerErrors: NodeJS.Timeout | undefined = undefined;
	let errors: { level: { [index: string]: boolean }; message: string } | undefined =
		$state(undefined);

	let loading = $state(false);

	// filters
	let selected = $state(['movie' /* , 'series' */]);
	let options = [
		{ value: 'movie', label: 'movies' },
		{ value: 'series', label: 'series' }
	];

	onMount(() => {
		if (data.movies) {
			if (data.movies?.message) {
				errors = { level: { danger: true }, message: data.movies?.message };
			} else {
				value = data.movies?.search;
				movies = data.movies;
			}
		}
	});

	async function submit(
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) {
		e.preventDefault();

		loading = true;
		try {
			movies = await getData(value);
		} catch (err) {
			if (err instanceof Error) {
				console.error(err);
			}
			ErrorHandler(err as { type: string; message: string });
		} finally {
			loading = false;
			showSuggest = false;
		}
		await updateUrlSearchParam(value);
	}

	async function updateUrlSearchParam(searchString: string) {
		const url = new URL(location.toString());
		const replaceState = !url.searchParams.size;
		url.searchParams.set('s', searchString);

		if (selected.length == 1) url.searchParams.set('type', selected[0]);
		else if (url.searchParams.has('type')) url.searchParams.delete('type');

		await goto(url.href, { replaceState, keepFocus: true, invalidateAll: false });
	}

	async function getData(searchString: string) {
		// if (searchString.length < 3) {
		// 	throw { level: { warn: true }, message: CODE.too_short };
		// }

		loading = true;

		const Params = new URLSearchParams('');
		Params.set('s', searchString);

		if (selected.length == 1) {
			Params.set('type', selected[0]);
		}

		const req = await fetch('/api?' + Params.toString());

		if (!req.ok) {
			const res = await req.json();
			throw { type: 'request', message: res.message };
		}

		const res = (await req.json()) as MoviesResponse;
		if (res.message) {
			throw { type: 'info', message: res.message };
		}
		loading = false;
		return res;
	}

	const ErrorHandler = ({ type, message }: { type: string; message: string }) => {
		if (type === 'request') {
			errors = { level: { danger: true }, message: message };
		}
		if (type === 'info') {
			errors = { level: { danger: true }, message: message };
		}
	};

	const delay = (fn: () => void, ms = 800) => setTimeout(fn, ms);

	function oninput() {
		// console.log(value);
		if (value.length < 1) return;

		if (timer) clearTimeout(timer);
		errors = undefined;
		loading = true;
		timer = delay(() => {
			getData(value)
				.then((res) => {
					autocomplete = res;
					showSuggest = true;
				})
				.catch((e) => {
					console.log(e);
				})
				.finally(() => {
					loading = false;
				});
		}, 1000);
	}

	const filterAutocomplete = () =>
		autocomplete.results
			.filter((r) => r.title.trim().slice(value.length).length > 1)
			.sort((a, b) => a.title.length - b.title.length);

	afterNavigate(async ({ type, from, to }) => {
		if (type === 'popstate') {
			if (from?.url.search !== to?.url.search) {
				await invalidate('search:load');
				if (data.movies) {
					if (data.movies?.message) {
						errors = { level: { danger: true }, message: data.movies?.message };
					} else {
						value = data.movies?.search;
						movies = data.movies;
					}
				}
			}
		}
	});

	/* function openSuggestions() {
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

	async function updateUrlSearchParam(searchString: string) {
		const url = new URL(location.toString());
		url.searchParams.set('s', searchString);

		if (selected.length == 1) url.searchParams.set('type', selected[0]);
		else if (url.searchParams.has('type')) url.searchParams.delete('type');

		await goto(url.href, { keepFocus: true, invalidateAll: true });
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
		if (res.message) {
			throw { level: { danger: true }, message: res.message };
		}
		loading = false;
		return res;
	}

	const getInputValue = () => input.value.trim().toLowerCase();

	const delay = (fn: () => void, ms = 800) => setTimeout(fn, ms);

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

	afterNavigate(async ({ type, from, to }) => {
		if (type === 'popstate') {
			if (from?.url.search !== to?.url.search) {
				await invalidate('search:load');
				if (data.movies) {
					if (data.movies?.message) {
						errors = { level: { danger: true }, message: data.movies?.message };
					} else {
						value = data.movies?.search;
						movies = data.movies;
					}
				}
			}
		}
	}); */
</script>

<svelte:head>
	<title>Magacine - Search</title>
</svelte:head>

<div class="content search-wrapper">
	<div class="search-container">
		<form bind:this={form} id="search-form" onsubmit={submit}>
			<div class="form-section">
				<label for="search-input" class="form-item search-label"><Icon>{@html Search}</Icon></label>
			</div>
			<input
				bind:this={input}
				bind:value
				type="search"
				name="search-input"
				id="search-input"
				class="search-input form-item"
				minlength="3"
				placeholder="ej. spider-man"
				autocomplete="off"
				required
				{oninput}
			/>
			<div class="form-section">
				<button type="submit" class="form-item form-btn btn-submit" disabled={errors?.level?.warn}
					>search</button
				>
			</div>
		</form>

		{#if showSuggest}
			<div class="wrapper-suggest scroolbar-prettie">
				<button
					type="button"
					class="suggest-item btn-close"
					onclick={() => {
						/* closeSuggestions */
					}}
				>
					<Icon y="10%">{@html X}</Icon>
				</button>
				{#each filterAutocomplete() as item, i (item.uuid)}
					{@const word = item.title.trim().toLowerCase().slice(0, value.length)}
					{@const rest = item.title.trim().toLowerCase().slice(value.length)}
					<button
						in:fly|global={{ y: 15, delay: 20 * i, duration: 150, easing: quintInOut }}
						class="suggest-item"
						onclick={() => {
							value = item.title.toLowerCase();
							form.requestSubmit();
						}}
					>
						...{rest}</button
					>
				{/each}
			</div>
		{/if}
		<div class="filter-container">
			{#each options as item}
				<label
					for="radio-{item.value}"
					class="option"
					class:option--active={selected.includes(item.value)}
				>
					<input
						id="radio-{item.value}"
						class="check-item"
						type="checkbox"
						bind:group={selected}
						value={item.value}
					/>
					<span class="check-label">{item.label}</span>
				</label>
			{/each}
		</div>
	</div>
</div>
<div class="content" class:loading>
	{#if errors}
		<Alert {...errors.level} onclose={() => (errors = undefined)}
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
		opacity: 0.2;
	}

	.search-wrapper {
		position: relative;
	}

	.search-container {
		padding-block: 1em;
		border: 1px solid transparent;
		max-width: 600px;
		margin-inline: auto;
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

	.option {
		text-align: center;
		border: 1px solid transparent;
		color: var(--c-text-basee);
		opacity: 0.5;
		width: 100%;
		max-width: 100px;
		border-radius: 50vh;

		&:hover {
			background-color: var(--c-divider);
		}
		&:focus-within {
			outline: 1px solid rgba(128, 128, 128, 0.5);
			outline-offset: 2px;
		}
	}
	.option:has(:checked) {
		border: 1px solid red;
		opacity: 1;
		background-color: var(--c-front);
		color: white;
	}
	.check-item {
		pointer-events: none;
		position: absolute;
		all: initial;
	}

	.wrapper-suggest {
		display: flex;
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
</style>

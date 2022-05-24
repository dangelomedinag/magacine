<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	import CarouselMovies from '$components/ui/CarouselMovies.svelte';
	import NavbarTop from '$components/ui/NavbarTop.svelte';
	import Spinner from '$components/ui/Spinner.svelte';
	import Toast from '$components/ui/toast.svelte';

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
		// { value: 'episode', label: 'episodes' }
	];

	onMount(async () => {
		const currURL = new URL(location);
		console.log(currURL.searchParams.has('s'));
		const notSearch = !currURL.searchParams.has('s') || currURL.searchParams.get('s').length < 3;

		if (notSearch) return;

		const data = await fetch('/api' + currURL.search);
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
		input.focus();
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

<NavbarTop search={false}>
	{#if movies?.results}
		<span>{value} - {movies?.totalResults} results</span>
	{/if}
</NavbarTop>

<div class="content">
	<h1 style="text-align: center;">Search</h1>
	<div class="search-container">
		<form
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							style="width: 1rem; height: 1rem;"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
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
			{#each autocomplete.results ?? [] as item, i (item.uuid)}
				<button
					in:fly={{ y: 15, delay: 20 * i, duration: 150, easing: quintInOut }}
					class="item"
					on:click={() => {
						input.value = item.title;
						autocomplete = [];
						input.focus();
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
					class="check-item"
					type="checkbox"
					bind:group={selected}
					value={item.value}
				/>
			</label>
		{/each}
	</div>
	{#if errors}
		<div style="padding: 1em 0;">
			<Toast {...errors.level}>{errors.message}</Toast>
		</div>
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
		border: 1px solid rgba(128, 128, 128, 0.3);
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
		color: white;
		padding: 0.5em 1em;
		cursor: pointer;
		/* padding: 0 0.5em; */
	}

	.item:hover {
		background-color: var(--c-front);
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

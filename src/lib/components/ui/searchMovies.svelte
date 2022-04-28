<script>
	import { spring } from 'svelte/motion';
	import Spinner from './Spinner.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let value = '';
	export let results = [];
	let ready = false;
	let match = false;
	let loading = false;
	let timer = null;
	let totalResults = 0;
	let selected = ['movie'];
	let options = [
		{ value: 'movie', label: 'movies' },
		{ value: 'series', label: 'series' }
	];

	// counter ;
	const displayed_count = spring();
	$: displayed_count.set(totalResults);
	$: offset = modulo($displayed_count, 1);

	function modulo(n, m) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
	const normalize = (string) => string.toLowerCase().trim();

	async function getData() {
		loading = true;

		try {
			const filterUnions = () => {
				const both = selected.length == options.length;
				if (!!!selected.length || both) return '';
				return '&type=' + selected[0];
			};

			const data = await fetch(`/api?s=${normalize(value)}${filterUnions()}`);

			if (!data.ok) {
				const message = data.status + ' ' + (await data.text());
				throw new Error(message);
			}
			const json = await data.json();
			//console.log(json);
			if (json.Response === 'False') throw new Error(json.Error);
			totalResults = +json.totalResults;
			results = json.Search;

			const url = new URL(location);
			url.searchParams.set('search', value);
			// console.log(url.searchParams.toString());
			if (!Boolean(selected.length) || selected.length > 1) {
				url.searchParams.delete('type');
			} else {
				url.searchParams.set('type', selected[0]);
			}
			// console.log(url);
			await goto(url.href, { replaceState: true });

			// goto('/?search=' + `${normalize(value)}${filterUnions()}`, { replaceState: true });
			// window.history.pushState({}, '', '?search=' + `${normalize(value)}${filterUnions()}`);
			// input.blur();
			// console.log($page.url.host);
		} catch (error) {
			console.warn(error.message);
			match = true;
			// console.log(match);
			results = [];
		}
		loading = false;
	}

	async function search() {
		if (timer) clearTimeout(timer);

		if (value.trim().length < 3) {
			results = [];
			return;
		}

		// state = 'typing';
		loading = true;
		match = false;

		timer = setTimeout(() => {
			getData();
		}, 900);
	}
</script>

<div class="search-container">
	<div class="search-box">
		<div class="copy">buscar:</div>
		<div class="input-group">
			<input
				autocomplete="off"
				type="search"
				name="seach"
				bind:value
				on:input={search}
				on:keyup={(e) => {
					if (e.code === 'Enter' || e.key === 'Enter') search();
				}}
				on:click={(e) => {
					e.value;
					setTimeout(() => {
						if (value.length < 1) {
							results = [];
							match = false;
						}
					}, 5);
				}}
				placeholder="Type a movie/serie"
			/>

			{#if loading}
				<Spinner position="absolute" top="0" left="0" />
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			{/if}
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
						id="radio-{item.value}"
						on:change={search}
						class="input-radio"
						type="checkbox"
						bind:group={selected}
						value={item.value}
					/>
				</label>
				<!-- </div> -->
			{/each}
		</div>
	</div>

	{#if results.length > 0}
		<div class="information content">
			<!-- <h4>Seach: {value}</h4> -->
			<span>results:</span>
			<div class="counter-viewport">
				<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
					<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
					<strong>{Math.floor($displayed_count)}</strong>
				</div>
			</div>
			<span>{!!selected.length ? selected.join(' & ') : 'all'}</span>
		</div>
		<div class="result content">
			<slot />
		</div>
	{/if}

	{#if match}
		<slot name="suggest" />
	{/if}
</div>

<style>
	.search-container {
		background-color: var(--c-main-content);
		/* padding-bottom: 1em; */
		max-height: calc(100vh - 63.59px);
		overflow-y: auto;
	}
	input[type='search'] {
		width: 100%;
		display: inline-block;
		border: 1px solid transparent;
		border-bottom: 2px solid rgb(87, 87, 87);
		font-size: 1.5rem;
		background-color: transparent;
		outline: none;
		color: white;
		padding: 1rem;
		text-align: center;
		font-weight: bold;
	}

	input[type='search']:disabled {
		background-color: rgba(255, 255, 255, 0.05);
		cursor: not-allowed;
		border-bottom: 2px solid rgb(87, 87, 87);
	}

	.search-box {
		padding: 0.5em 1.5em;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* margin-bottom: 1rem; */
		/* height: 200px; */
		background-image: linear-gradient(to bottom, transparent -100%, var(--c-main-content) 60%),
			url('/assets/banner-search.jpg');
		background-size: 100% 100%, cover;
		background-position: center, center;
		background-repeat: no-repeat, no-repeat;
	}

	.input-group {
		position: relative;
		width: 100%;
	}

	input[type='search']:not(:disabled):hover + svg,
	input[type='search']:not(:disabled):focus + svg {
		color: brown;
	}
	input[type='search']:not(:disabled):focus,
	input[type='search']:not(:disabled):hover {
		border-bottom-color: brown;
	}

	.filters {
		padding-top: 1em;
		width: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		/* align-items: center; */
	}

	.option {
		display: flex;
		gap: 0.5em;
		justify-content: center;
		align-items: center;
		border: 1px solid rgba(128, 128, 128, 0.228);
		border-radius: 50vh;
		/* display: flex; */
		text-align: center;
		/* width: 300px; */
		padding: 0 1em;
		margin: 0 1em;
		cursor: pointer;
		user-select: none;
	}
	.option--active {
		border-color: rgb(1, 87, 44);
		color: rgb(127, 211, 169);
		background-color: rgb(0, 56, 28);
	}

	input[type='checkbox'] {
		display: none;
	}

	.information {
		display: flex;
		align-items: center;
	}
	.result {
		overflow: hidden;
	}

	svg {
		user-select: none;
		pointer-events: none;
		color: rgb(87, 87, 87);
		position: absolute;
		top: 40%;
		left: 30px;
		height: 1.4rem;
	}

	.counter-viewport {
		width: calc(1rem * 3.5);
		height: 1em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: bold;
		font-size: 1.2rem;
		color: brown;
		align-items: center;
		justify-content: center;
		font-family: monospace;
		/* background-color: white;
		border-radius: 50vh; */
		/* margin: 0 0.5rem; */
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.hidden {
		top: -100%;
		user-select: none;
	}

	@media (min-width: 576px) {
	}
	@media (min-width: 768px) {
	}
	@media (min-width: 992px) {
		/* .search-box {
			max-width: 70%;
		} */
	}
	@media (min-width: 1200px) {
	}
	@media (min-width: 992px) {
	}
</style>

<script>
	import { spring } from 'svelte/motion';
	import Spinner from './Spinner.svelte';

	export let value = '';
	export let results = [];
	let state = 'initial';
	let input;
	// let states = ['initial', 'typing', 'clear'];
	let match = true;
	let loading = false;
	let timer = null;
	let totalResults = 0;
	let initial = true;
	let selected = 'movie';
	let options = ['movie', 'series'];

	// let count = 0;

	const displayed_count = spring();
	$: displayed_count.set(totalResults);
	$: offset = modulo($displayed_count, 1);
	// $: if (value.length < 1 && !initial) {
	// 	initial = true;
	// 	loading = false;
	// }

	function modulo(n, m) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
	const normalize = (string) => string.toLowerCase().trim();

	// async function getData(parent) {
	// 	try {
	// 		const data = await fetch(`/api?s=${normalize(value)}&type=movie`);
	// 		if (!data.ok) throw new Error(data.status + ' ' + (await data.text()));
	// 		const json = await data.json();
	// 		if (json.Response === 'False') throw new Error(json.Error);
	// 		console.log(json);
	// 		loading = false;
	// 		results = json.Search;
	// 		length = +json.totalResults;
	// 		parent.blur();
	// 	} catch (error) {
	// 		console.warn(error.message);
	// 		loading = false;
	// 		results = [];
	// 		length = 0;
	// 	}
	// }
	async function getData() {
		try {
			const data = await fetch(`/api?s=${normalize(value)}&type=${selected}`);
			if (!data.ok) throw new Error(data.status + ' ' + (await data.text()));
			const json = await data.json();
			console.log(json);
			if (json.Response === 'False') throw new Error(json.Error);
			totalResults = +json.totalResults;
			results = json.Search;
			input.blur();
		} catch (error) {
			console.warn(error.message);
			match = false;
		}
		loading = false;
	}

	// async function search(e) {
	// 	loading = true;
	// 	if (timer) clearTimeout(timer);

	// 	if (value.length < 3) {
	// 		return;
	// 	}
	// 	timer = setTimeout(() => {
	// 		getData(e.target);
	// 	}, 900);
	// }

	async function search() {
		if (timer) clearTimeout(timer);

		if (value.length < 3) {
			results = [];
			return;
		}

		state = 'typing';
		loading = true;
		// match = true;

		timer = setTimeout(() => {
			getData();
		}, 900);
	}
</script>

<div>
	<div class="search-box">
		<div class="copy">buscar:</div>
		<div class="input-group">
			<input
				autocomplete="off"
				type="search"
				name="seach"
				bind:this={input}
				bind:value
				on:input={search}
				on:keyup={(e) => {
					if (e.code === 'Enter' || e.key === 'Enter') search();
				}}
				on:click={(e) => {
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
			{#each options as option}
				<div class="option">
					<input
						class="input-radio"
						id="radio-{option}"
						type="radio"
						bind:group={selected}
						value={option}
					/>
					<label for="radio-{option}" class="label-radio">
						{option}
					</label>
				</div>
			{/each}
		</div>
	</div>

	{#if results.length > 0}
		<div class="information content">
			<!-- <h4>Seach: {value}</h4> -->
			<span>results {value.length > 0 ? `for "${normalize(value)}"` : ''}:</span>
			<div class="counter-viewport">
				<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
					<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
					<strong>{Math.floor($displayed_count)}</strong>
				</div>
			</div>
			<span>movies</span>
		</div>

		<div class="result content">
			<slot />
		</div>
	{/if}

	{#if !match}
		<slot name="suggest" />
	{/if}
</div>

<style>
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
	}

	.search-box {
		padding: 0 1.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* margin-bottom: 1rem; */
		height: 200px;
		background-image: linear-gradient(to bottom, transparent -100%, #0d0d0f 60%),
			url('/assets/banner-search.jpg');
		background-size: 100% 100%, cover;
		background-position: center, center;
		background-repeat: no-repeat, no-repeat;
	}

	.input-group {
		position: relative;
		width: 100%;
	}

	input:hover + svg,
	input:focus + svg {
		color: brown;
	}
	input:focus,
	input:hover {
		border-bottom-color: brown;
	}

	.filters {
		padding: 1em 0;
		width: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		/* align-items: center; */
	}

	.option {
		border: 1px solid rgba(128, 128, 128, 0.228);
		border-radius: 5px;
		/* background-color: grey; */
		/* display: flex; */
		text-align: center;
		/* width: 300px; */
		padding: 0 1em;
		margin: 0 1em;
	}

	.information {
		display: flex;
		align-items: center;
	}
	.result {
		overflow: hidden;
	}

	svg {
		color: rgb(87, 87, 87);
		position: absolute;
		top: 40%;
		left: 0;
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

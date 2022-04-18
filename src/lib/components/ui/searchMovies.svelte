<script>
	import { spring } from 'svelte/motion';

	let value = '';
	let timer = null;
	export let results = [];
	let length = 0;

	// let count = 0;

	const displayed_count = spring();
	$: displayed_count.set(length);
	$: offset = modulo($displayed_count, 1);

	function modulo(n, m) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	async function getData() {
		try {
			const data = await fetch(`https://www.omdbapi.com/?s=${value}&type=movie&apikey=eedc324b`);
			if (!data.ok) throw { message: 'error in search' };
			const json = await data.json();
			if (json.Response === 'False') throw { message: json.Error };
			console.log(json);
			results = json.Search;
			length = +json.totalResults;
		} catch (error) {
			console.log('-----sdas-dasdas-das-d-as-d--asd-a');
			console.log(error.message);
			results = [];
			length = 0;
		}
	}
	async function search() {
		if (timer) clearTimeout(timer);

		if (value.length < 3) {
			return;
		}
		timer = setTimeout(getData, 800);
	}
</script>

<div>
	<div class="search-box">
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
		<input
			type="search"
			name="seach"
			bind:value
			on:input={search}
			placeholder="Type a movie o serie"
		/>
	</div>
	{#if !!results.length}
		<div class="information">
			<!-- <h4>Seach: {value}</h4> -->
			<span>results:</span>
			<div class="counter-viewport">
				<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
					<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
					<strong>{Math.floor($displayed_count)}</strong>
				</div>
			</div>
			<span>movies</span>
		</div>
		<div class="result">
			<slot />
		</div>
	{:else}
		<slot name="suggest" />
	{/if}
</div>

<style>
	input {
		width: 100%;
		display: block;
		border: 1px solid transparent;
		border-bottom: 1px solid gray;
		font-size: 1.5rem;
		background-color: transparent;
		outline: none;
		color: white;
		padding: 1rem;
		text-align: center;
	}
	.search-box {
		max-width: 70%;
		margin: 0 auto;
		position: relative;
		margin-bottom: 1rem;
	}
	.information {
		display: flex;
		align-items: center;
	}
	.result {
		overflow: hidden;
	}

	svg {
		position: absolute;
		top: 40%;
		left: 0;
		height: 1.4rem;
	}

	.counter-viewport {
		width: calc(1rem * 4 + 1rem);
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--accent-color);
		font-size: 2rem;
		align-items: center;
		justify-content: center;
		font-family: monospace;
		/* padding: 0 0.5rem; */
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
</style>

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
			const data = await fetch(`http://www.omdbapi.com/?s=${value}&type=movie&apikey=eedc324b`);
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
		display: block;
		min-width: 70%;
		margin: 0 auto;
		border: 1px solid transparent;
		border-bottom: 1px solid gray;
		font-size: 1.5rem;
		background-color: transparent;
		outline: none;
		color: white;
		padding: 1rem;
		text-align: center;
	}
	.information {
		display: flex;
		align-items: center;
	}
	.result {
		overflow: hidden;
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

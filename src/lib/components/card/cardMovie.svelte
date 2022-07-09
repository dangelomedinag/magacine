<script>
	import { fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';

	import ProgressLine from '$components/card/cardProgressLine.svelte';
	import CardRatingStarts from '$components/card/cardRatingStarts.svelte';

	let element;
	export let details = true;
	export let movie;
	export let progress = 0;
	export let i;
	let promiseDetails = new Promise((res, rej) => {});

	let options = {
		rootMargin: '0px',
		threshold: 0
	};

	if (!details) {
		promiseDetails = Promise.reject();
	}

	const callback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				loadDetails()
					.then((r) => {
						promiseDetails = r;
					})
					.catch(() => {
						promiseDetails = Promise.reject();
					})
					.finally(() => {
						observer.disconnect();
					});
			}
		});
	};

	function showDetails(node) {
		if (!details) {
			return;
		}
		let observer = new IntersectionObserver(callback, options);
		observer.observe(node);

		return {
			destroy() {
				observer?.disconnect();
			}
		};
	}

	async function loadDetails() {
		const req = await fetch('/api/' + movie.imdbid);
		if (!req.ok) throw req;
		const res = await req.json();
		return res;
	}
</script>

<figure use:showDetails in:fade={{ duration: 600, easing: quintInOut, delay: 50 * i }} class="item">
	<a sveltekit:prefetch class="item-link" href="/movies/{movie.imdbid}">
		<img class="item-poster" src={movie.poster} alt={movie.title} loading="lazy" />
	</a>

	{#if progress}
		<ProgressLine value={movie.progress} />
	{/if}

	<figcaption class="description-wrapper">
		<div class="info-wrapper">
			<h2 class="movie-title">{movie.title}</h2>

			<p class="movie-year">{movie.year}</p>

			{#await promiseDetails}
				wait...
			{:then value}
				<img class="rating-logo" src="/imgs/imdb-logo.png" alt="imdb trade mark" loading="lazy" />
				<div class="rating-wrapper">
					<span class="rating-label">rating {(value.imdbrating / 2).toFixed(1)}</span>
				</div>
				<CardRatingStarts rating={value.imdbrating} />
			{:catch}
				<!-- error handle -->
			{/await}
		</div>
	</figcaption>
</figure>

<style>
	:root {
		--card-w: 200px;
		--card-h: 350px;
	}

	.item {
		position: relative;
		overflow: hidden;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-width: var(--card-w);
		height: var(--card-h);
		max-width: var(--card-w);
		position: relative;
		margin: 0;
		margin-right: 1em;
		background-color: var(--c-main-content);
		border: 1px solid rgba(128, 128, 128, 0.3);
		transition: transform 100ms ease-in-out;
	}

	.item-link {
		display: block;
		height: 100%;
		width: 100%;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	.item-poster {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.2s ease-in-out;
	}

	.description-wrapper {
		padding: 1em;
	}

	/* @media (min-width: 768px) {} */

	.info-wrapper {
		position: relative;
	}

	.movie-title {
		margin: 0;
		font-weight: 600;
		font-size: 1rem;
		margin-bottom: 0.2em;
		width: calc(var(--card-w) - 2em);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.movie-year {
		margin: 0;
		opacity: 0.7;
	}
	.rating-wrapper {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
	}
	.rating-logo {
		max-width: 28px;
	}
	.rating-label {
		font-size: 0.8em;
		margin-left: 5px;
		margin-right: 5px;
	}

	@media (min-width: 768px) {
	}

	.item:hover {
		box-shadow: var(--shadow-short);
		transform: translateY(-1%);
	}

	.item:hover .movie-title {
		color: var(--c-front);
	}
</style>

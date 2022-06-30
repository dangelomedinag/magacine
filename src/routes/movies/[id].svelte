<script context="module">
	/**  @type {import("@sveltejs/kit").Load}*/
	export const load = async ({ fetch, params }) => {
		try {
			const req = await fetch('/api/' + params.id);
			if (!req.ok) throw req;
			const movie = await req.json();

			return {
				props: {
					movie: movie
				}
			};
		} catch (error) {
			const msg = await error.json();
			return {
				status: 404,
				error: new Error(`${params.id} - ${msg.message}`)
			};
		}
	};
</script>

<script>
	import { goto, afterNavigate, beforeNavigate } from '$app/navigation';
	import CarouselMovies from '$components/ui/CarouselMovies.svelte';
	import NavbarTop from '$components/ui/NavbarTop.svelte';
	import Toast from '$components/ui/toast.svelte';
	import VideoPlayer from '$lib/components/ui/movie/videoPlayer.svelte';
	import YearMovie from '$lib/components/ui/movie/yearMovie.svelte';
	import RuntimeMovie from '$lib/components/ui/movie/runtimeMovie.svelte';
	import InfoMovie from '$lib/components/ui/movie/infoMovie.svelte';
	import { randomInt } from '$helpers';
	import Icon from '$components/ui/icons/icon.svelte';
	import { onMount } from 'svelte';

	export let movie;
	let showPlayer = false;
	let xxx;
	// let suggetsPromise = getSuggest();
	// let existSuggestions = false;
	onMount(() => {
		getSuggest();
	});

	async function getSuggest() {
		xxx = null;

		const { genre, plot } = movie;
		let selected;
		if (plot) {
			const plotArr = plot.split(' ');
			const plotArrFilter = plotArr.filter((word) => word.length > 4 && !word.includes('-'));
			selected = plotArrFilter[randomInt(plotArrFilter.length - 1)];
		} else {
			if (genre.length > 0) {
				selected = genre[randomInt(genre.length - 1)];
			}
		}

		// try {
		// 	if (!selected) throw Error('no content');
		// 	const req = await fetch(
		// 		'/api?s=' + selected.toLowerCase().replace(/\.|\(|\)|\"|\'|\,|\$|\-/g, '')
		// 	);
		// 	if (!req.ok) {
		// 		throw Error('bad request');
		// 	}
		// 	existSuggestions = true;
		// 	return req.json();
		// } catch (error) {
		// 	existSuggestions = false;
		// 	return Promise.reject();
		// }

		try {
			if (!selected) throw Error('no content for now');

			const req = await fetch(
				'/api?s=' + selected.toLowerCase().replace(/\.|\(|\)|\"|\'|\,|\$|\-/g, '')
			);
			if (!req.ok) throw Error('bad request');

			xxx = await req.json();
		} catch (error) {
			xxx = Error(error.message);
		}
	}

	afterNavigate(({ from, to }) => {
		if (from && to && from.pathname.startsWith('/movies/') && to.pathname.startsWith('/movies/')) {
			console.log('after navigate');
			if (from.pathname !== to.pathname) {
				getSuggest();
				showPlayer = false;
			}
		}
	});

	function smoothScroll(node) {
		async function scrollToPosition(e) {
			e.preventDefault();
			const ele = document.getElementById(url.hash.substring(1));
			if (ele) {
				const navbar = document.querySelector('nav.navbar');
				const isExpand = document.querySelector('div.block');
				const navbarHeight = navbar.clientHeight;

				try {
					let n = ele.offsetTop - navbarHeight;
					if (!isExpand) n = n + 52;
					scrollTo({ behavior: 'smooth', top: n });
				} catch (error) {
					// console.log(error.message);
				}
			}
		}

		const url = new URL(node.href);

		if (url.host === location.host && url.pathname === location.pathname) {
			if (url.hash.length > 1) {
				node.addEventListener('click', scrollToPosition);
			}
		}

		return {
			destroy() {
				node.removeEventListener('click', scrollToPosition);
			}
		};
	}
</script>

<svelte:head>
	<title
		>{movie?.title.length > 14 ? `${movie.title.slice(0, 13)}...` : movie.title} - {movie.type}</title
	>
</svelte:head>

<NavbarTop>
	<!-- <button
		on:click={() => {
			goto('#info', { replaceState: true });
		}}>info</button
	> -->
	<a href="#info" use:smoothScroll>info</a>
	{#if xxx && !(xxx instanceof Error)}
		<a href="#suggest" use:smoothScroll>suggest</a>
		<!-- <button
			on:click={() => {
				goto('#suggest', { replaceState: true });
			}}>suggest</button
		> -->
	{/if}
</NavbarTop>

<div class="container ">
	<div class:movie={showPlayer} class:poster={!showPlayer}>
		{#if !showPlayer}
			<img class="image" src={movie.poster} alt={movie.title} />
			<button class="btn-play" on:click={() => (showPlayer = !showPlayer)}>
				<Icon
					name="play"
					type="solid"
					style="background-color: white; border-radius: 50vh;"
					shadow
				/>
			</button>
			<div class="info__item">
				<YearMovie value={movie.year} />
				<RuntimeMovie value={movie.runtime} />
			</div>
		{:else}
			<VideoPlayer />
		{/if}
	</div>
	<div class="info content" id="info">
		{#key movie}
			<InfoMovie {movie} />
		{/key}
	</div>
</div>
<div class="content">
	<!-- {#await suggetsPromise()}
		<p>cargando sugerencias...</p>
	{:then value}
		{#if Array.isArray(value?.results)}
			<div class="suggest" id="suggest">
				<CarouselMovies movies={value} details={false} title="Suggestions"  />
			</div>
		{/if}
	{:catch}
		<div style="padding: var(--gap-content) 0;">
			<Toast warn>
				For now we do <span>not have related movies or series</span>
			</Toast>
		</div>
	{/await} -->
	<div class="suggest" id="suggest">
		<CarouselMovies movies={xxx} details={false} title="Suggestions">
			<div slot="error" style="width: 100%;">
				<Toast warn>
					For now we do <span>not have related movies or series</span>
				</Toast>
			</div>
		</CarouselMovies>
	</div>
</div>

<style>
	:root {
		/* modal */
		--movie-info-item-opacity: 0.5;
	}

	:global(body[data-theme='light']) {
		/* modal */
		--movie-info-item-opacity: 0.8;
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	.poster,
	.info {
		padding-top: 2em;
	}

	.poster {
		background: linear-gradient(to top, var(--c-main) 10%, var(--c-front) 150%);
		position: relative;
		text-align: center;
		width: 100%;
		height: 100%;
	}

	.movie {
		width: 100%;
	}

	.info {
	}

	.image {
		display: block;
		width: auto;
		max-width: 100%;
		max-height: 500px;
		margin: 1em auto;
		box-shadow: 0 1px 2px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 7%), 0 4px 8px rgb(0 0 0 / 7%),
			0 8px 16px rgb(0 0 0 / 7%), 0 16px 32px rgb(0 0 0 / 7%), 0 32px 64px rgb(0 0 0 / 7%);
		border-radius: 10px;
		border: 1px solid rgb(255 255 255 / 7%);
		overflow: hidden;
	}

	.poster .btn-play {
		--icon-size: 5rem;

		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%) rotate(0deg);
		border: none;
		color: var(--c-front);
		padding: 0;
		margin: 0;
		background-color: transparent;
		cursor: pointer;
		transform-origin: center;
	}

	@media (min-width: 768px) {
		.container {
			flex-direction: row;
			flex-wrap: wrap;
		}

		.movie {
			width: 100%;
		}

		.poster {
			width: 50%;
			position: sticky;
			top: 2em;
		}
		.info {
			width: 50%;
		}

		.movie + .info {
			width: 100%;
		}
	}

	.suggest {
		padding-top: 3em;
	}

	:global(.info__item) {
		padding-bottom: 1em;
		/* border-top: 1px solid var(--c-divider); */
	}
	:global(.info__item + .info__item) {
		padding-top: 1em;
		border-top: 1px solid var(--c-divider);
	}

	:global(.info__item:last-of-type) {
		padding-bottom: 0;
	}

	.info__item :global(svg) {
		color: var(--c-front);
	}

	:global(.info__property) {
		opacity: var(--movie-info-item-opacity);
		text-transform: capitalize;
		font-weight: bold;
		line-height: 2rem;
	}

	/* @media (min-width: 576px) {}
	@media (min-width: 768px) {}
	@media (min-width: 992px) {}
	@media (min-width: 1200px) {} */

	@media (min-width: 768px) {
	}
	@media (min-width: 992px) {
	}
</style>

<script>
	// @ts-nocheck
	import { v4 as uuidv4 } from 'uuid';
	import CarouselMovies from '$lib/components/ui/CarouselMovies.svelte';

	function prevPage(e) {
		console.log(e.target.parentNode.parentNode);
		const { steps, current, element } = pages(e.target.parentNode.parentNode);
		console.log({ steps, current, element });
		let prev = 0;

		for (let i = 0; i < steps.length; i++) {
			if (current <= steps[i]) {
				prev = steps[i - 1];
				break;
			}
		}

		element.scrollLeft = prev;
	}
	function nextPage(e) {
		const { steps, current, element } = pages(e.target.parentNode);
		console.log({ steps, current, element });

		let next = 0;

		for (let i = 0; i < steps.length; i++) {
			if (current < steps[i] - 1) {
				next = steps[i];
				break;
			}
		}

		element.scrollLeft = next;
	}
	const getExtra = (childEle) => {
		let extra = 0;
		let computedStyle = window.getComputedStyle(childEle);
		extra += parseInt(computedStyle.marginLeft, 10);
		extra += parseInt(computedStyle.marginRight, 10);
		extra += parseInt(computedStyle.borderWidth, 10);
		extra += parseInt(computedStyle.paddingLeft, 10);
		extra += parseInt(computedStyle.paddingRight, 10);
		return extra;
	};

	function pages(node) {
		/* ssssssssssssss */

		/* ssssssssssss */
		let margin;
		let ele = node.querySelector('section');
		let childs = node.querySelectorAll('section > figure');
		let steps = [];
		let cardWidth;
		childs.forEach((card, index) => {
			cardWidth = card.getBoundingClientRect().width;
			if (index < 1) {
				margin = getExtra(card);
				xx = margin;
				steps.push(cardWidth + margin);
			}
			if (index > 0) {
				steps.push(steps[index - 1] + cardWidth + 16);
			}
		});

		return { steps, current: ele.scrollLeft, element: ele };
	}

	/* let tracks = [
		{
			id: uuidv4(),
			title: 'Trending movies',
			level: 'primary',
			movies: [
				{
					id: uuidv4(),
					title: 'Title of Movie 1',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180'
				},
				{
					id: uuidv4(),
					title: 'En busca de la felicidad',
					poster:
						'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217'
				},
				{
					id: uuidv4(),
					title: 'Title of Movie',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180'
				},
				{
					id: uuidv4(),
					title: 'the short',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054'
				},
				{
					id: uuidv4(),
					title: 'En busca de la felicidad 1',
					poster:
						'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217'
				},
				{
					id: uuidv4(),
					title: 'the short 1',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054'
				}
			]
		},
		{
			id: uuidv4(),
			title: 'Continue watching',
			level: 'secondary',
			movies: [
				{
					id: uuidv4(),
					title: 'Title of Movie 1',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180'
				},
				{
					id: uuidv4(),
					title: 'En busca de la felicidad',
					poster:
						'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217'
				},
				{
					id: uuidv4(),
					title: 'Title of Movie',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180'
				},
				{
					id: uuidv4(),
					title: 'the short',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054'
				},
				{
					id: uuidv4(),
					title: 'En busca de la felicidad 1',
					poster:
						'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217'
				},
				{
					id: uuidv4(),
					title: 'the short 1',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054'
				}
			]
		},
		{
			id: uuidv4(),
			title: 'Top rated',
			level: 'regular',
			movies: [
				{
					id: uuidv4(),
					title: 'Title of Movie 1',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180'
				},
				{
					id: uuidv4(),
					title: 'En busca de la felicidad',
					poster:
						'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217'
				},
				{
					id: uuidv4(),
					title: 'Title of Movie',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180'
				},
				{
					id: uuidv4(),
					title: 'the short',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054'
				},
				{
					id: uuidv4(),
					title: 'En busca de la felicidad 1',
					poster:
						'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217'
				},
				{
					id: uuidv4(),
					title: 'the short 1',
					poster:
						'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054'
				}
			]
		}
	]; */

	let movies = [
		{
			id: uuidv4(),
			title: 'Avengers: Endgame',
			poster:
				'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/108b520c55e3c9760f77a06110d6a73b_e97cf224-d57f-44e3-8477-4f5479cd746b_480x.progressive.jpg?v=1573616089',
			progress: 25
		},
		{
			id: uuidv4(),
			title: 'After: what happens when peopel die',
			poster:
				'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180',
			progress: 80
		},
		{
			id: uuidv4(),
			title: 'Moonlight',
			poster:
				'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
			progress: 5
		},
		{
			id: uuidv4(),
			title: 'Step brothers',
			poster:
				'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/stepbrothers.mp_480x.progressive.jpg?v=1608672208',
			progress: 9
		},
		{
			id: uuidv4(),
			title: 'Freedom',
			poster:
				'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054',
			progress: 56
		},
		{
			id: uuidv4(),
			title: 'En busca de la felicidad 1',
			poster:
				'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217',
			progress: 32
		},
		{
			id: uuidv4(),
			title: 'Guardians of the galaxy',
			poster:
				'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/0cc70cae1f62b215aee14211c78fe95e_cda1a52f-e010-476a-9cb8-cd4392848bf7_500x749.jpg?v=1573584677',
			progress: 74
		}
	];
</script>

<div class="media" />
<div class="container">
	<nav class="topnav">
		<div class="type">
			<a class="active" href={'#'}>Movies</a>
			<a href={'#'}>Series</a>
		</div>
		<div>
			<button>🔔</button>
			<button>🙍‍♂️</button>
		</div>
	</nav>
	<div class="content">
		<CarouselMovies {movies} title="Trending movies" priority="large" />
		<CarouselMovies
			movies={movies.reverse()}
			title="Continue watching"
			priority="medium"
			progress
		/>
		<CarouselMovies
			movies={movies.sort((a, b) => a.title.length - b.title.length)}
			title="Top rated"
			priority="small"
		/>
		<!-- {#each tracks as track (track.id)}
			<div class="track">
				<header>
					<h3>{track.title}</h3>
					<button
						>See all<span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="svg"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</span></button
					>
				</header>
				<section>
					{#each track.movies as movie, i (movie.id)}
						<figure
							animate:flip={{ duration: 400, easing: quintOut }}
							out:scale|local={{ duration: 600, start: 0.85, easing: quintInOut }}
							class={track.level}
						>
							<a class="poster-link" href={'#'}>
								<img class="poster" src={movie.poster} alt="yo robot film" />
							</a>
							<figcaption>
								<div class="info">
									<h2>{movie.title}</h2>
									<p>2021</p>
									<div class="rating">
										<img
											class="imdb-logo"
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/640px-IMDB_Logo_2016.svg.png"
											alt=""
										/>
										<span>7.9 rating</span>
									</div>
								</div>
								<div class="actions">
									<button class="cta-btn">Watch now</button>
									<button
										class="more"
										on:click={() =>
											(track.movies = [...track.movies.filter((t) => t.id !== movie.id)])}>+</button
									>
								</div>
							</figcaption>
						</figure>
					{/each}
				</section>
				<div class="movement-action">
					<button on:click={prevPage} class="next controls">
						{'<<'}
					</button>
					<button class="prev controls" on:click={nextPage}>
						{'>>'}
					</button>
				</div>
			</div>
		{/each} -->
	</div>
	<footer />
</div>
<!-- </main> -->

<!-- </div> -->
<style>
	div.media {
		position: fixed;
		right: 50%;
		top: 0;
		background-color: #555;
		color: white;
		z-index: 999;
		padding: 5px;
		opacity: 0.4;
	}
	div.media::before {
		content: 'init';
	}
	/* @media (min-width: 576px) {}
		@media (min-width: 768px) {}
		@media (min-width: 992px) {}
		@media (min-width: 1200px) {} */

	@media (min-width: 576px) {
		div.media {
			background-color: blue;
		}
		div.media::before {
			content: '576px';
		}
	}
	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		div.media {
			background-color: red;
		}
		div.media::before {
			content: '768px';
		}
	}
	/* Large devices (desktops, 992px and up) */
	@media (min-width: 992px) {
		div.media {
			background-color: green;
		}
		div.media::before {
			content: '992px';
		}
	}
	/* Extra large devices (large desktops, 1200px and up) */
	@media (min-width: 1200px) {
		div.media {
			background-color: purple;
		}
		div.media::before {
			content: '1200px';
		}
	}

	.container {
		display: flex;
		flex-direction: column;
	}

	.topnav {
		position: sticky;
		top: 0;
		z-index: 50;
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: black;
		border-bottom: 1px solid rgba(128, 128, 128, 0.2);
	}

	.type a {
		text-decoration: none;
		padding-right: 2em;
		color: white;
		font-size: 0.9em;
		opacity: 0.5;
	}

	.type a.active {
		opacity: 1;
	}

	.container nav,
	.content {
		padding: 1.2em;
	}
</style>

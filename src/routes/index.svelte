<script>
	const titles = [
		{
			title: 'Title of Movie',
			poster:
				'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180'
		},
		{
			title: 'the short',
			poster:
				'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054'
		},
		{
			title: 'En busca de la felicidad',
			poster:
				'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217'
		},
		{
			title: 'Title of Movie',
			poster:
				'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/movie-poster-template-design-21a1c803fe4ff4b858de24f5c91ec57f_screen.jpg?ts=1636996180'
		},
		{
			title: 'the short',
			poster:
				'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054'
		},
		{
			title: 'En busca de la felicidad',
			poster:
				'https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217'
		}
	];
	const tracks = [
		{
			title: 'Trending movies',
			level: 'primary'
		},
		{
			title: 'Continue watching',
			level: 'secondary'
		},
		{
			title: 'Top rated',
			level: 'regular'
		}
	];
</script>

<div class="media" />
<div class="container">
	<nav>
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
		{#each tracks as track}
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
					{#each titles as movie}
						<figure class={track.level}>
							<a href={'#'}>
								<img class="poster" src={movie.poster} alt="yo robot film" />
							</a>
							<figcaption>
								<div class="info">
									<h2>{movie.title}</h2>
									<p>2021</p>
									<img
										class="imdb-logo"
										src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/640px-IMDB_Logo_2016.svg.png"
										alt=""
									/>
									<span> 7.9 rating </span>
								</div>
								<div class="actions">
									<button>Watch now</button>
									<button>+</button>
								</div>
							</figcaption>
						</figure>
					{/each}
				</section>
			</div>
		{/each}
	</div>
	<footer />
</div>
<!-- </main> -->

<!-- </div> -->
<style>
	div.media {
		position: absolute;
		right: 50%;
		top: 0;
		background-color: #555;
		color: white;
		z-index: 2;
		padding: 5px;
		opacity: 0.4;
	}
	div.media::before {
		content: 'init';
	}

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

	/* Small devices (landscape phones, 576px and up) */
	@media (min-width: 576px) {
		figure.primary {
			/* max-width: 550px; */
			min-width: 450px;
		}
		figure.secondary {
			min-width: 320px;
		}
	}
	/* Medium devices (tablets, 768px and up) */
	@media (min-width: 768px) {
		figure.primary {
			min-width: 550px;
		}
		figure.secondary {
			min-width: 420px;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		/* position: relative; */
	}

	.container nav {
		/* position: sticky; */
		/* top: 0; */
		display: flex;
		justify-content: space-between;
		/* padding: 1.5em; */
		/* background-color: bisque; */
		border-bottom: 1px solid rgba(128, 128, 128, 0.2);
	}

	.type a {
		text-decoration: none;
		padding-right: 2em;
		color: white;
		font-size: 0.9em;
		/* font-weight: bold; */
		opacity: 0.5;
	}

	.type a.active {
		opacity: 1;
	}

	.container nav,
	.content {
		padding: 1.2em;
	}

	.track {
		padding-bottom: 2em;
	}
	.track header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* height: 50px; */
	}
	.track section {
		display: flex;
		overflow-x: auto;
		padding-left: 0;
		padding-right: 1em;
		padding-top: 1em;
		padding-bottom: 1em;
		height: 300px;
	}

	header h3 {
		margin: 0;
	}
	header button {
		background-color: transparent;
		margin: 0;
		border: none;
		color: gray;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	header button:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	header .svg {
		width: 20px;
		height: 20px;
	}

	.poster {
		width: 100%;
		/* height: 300px;
		min-height: 200px; */
		object-fit: cover;
		object-position: top;
	}

	figure {
		/* border: 1px solid red; */
		overflow: hidden;
		border-radius: 15px;
		min-width: 250px;
		/* min-width: 450px; */
		position: relative;
		margin: 0;
		margin-right: 1em;
	}

	/* figure.primary {
		min-width: 250px;
		max-width: 250px;
	}
	figure.secondary {
		min-width: 250px;
		max-width: 250px;
	}
	figure.regular {
		min-width: 250px;
		max-width: 250px;
	} */

	figcaption {
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		padding: 2em;
		padding-top: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
	}

	.info h2 {
		margin: 0;
		font-weight: 600;
		font-size: 1.3rem;
		margin-bottom: 0.2em;
	}

	.info p {
		margin: 0;
		margin-bottom: 0.6em;
		opacity: 0.7;
	}

	.info img {
		max-width: 28px;
	}
	.info span {
		font-size: 0.8em;
	}

	.info {
		/* min-width: 100%; */
	}

	.actions {
		margin-top: auto;
		flex-shrink: 0;
		/* min-width: 100%; */
	}

	.actions button {
		border: none;
		color: white;
		margin: 0;
		background-color: rgba(255, 0, 0, 0.4);
		border-radius: 50vh;
		padding: 0.8em 1.2em;
	}

	section::-webkit-scrollbar {
		/* width: 10px; */
		height: 5px;
		border-radius: 10px;
	}

	/* Track */
	section::-webkit-scrollbar-track {
		background: rgba(128, 128, 128, 0.05);
		margin: 10px;
		border-radius: 10px;
		overflow: hidden;
	}

	/* Handle */
	section::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.05);
	}

	/* Handle on hover */
	section::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>

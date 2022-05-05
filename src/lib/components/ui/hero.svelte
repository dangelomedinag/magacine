<script>
	const urls = [
		'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg',
		'https://m.media-amazon.com/images/M/MV5BNzY2ZDQ2MTctYzlhOC00MWJhLTgxMmItMDgzNDQwMDdhOWI2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg',
		'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		'https://m.media-amazon.com/images/M/MV5BMTYzODQzYjQtNTczNC00MzZhLTg1ZWYtZDUxYmQ3ZTY4NzA1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg'
	];
</script>

<section>
	{#each urls as src}
		<img {src} alt="hero spider man" />
	{/each}
	<div class="copy">
		<h1>Lorem, ipsum dolor.</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, cupiditate!</p>
	</div>
</section>

<style>
	section {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300px;
		/* flex-wrap: wrap; */
		background-color: var(--c-front);
	}

	section::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-image: linear-gradient(to bottom, transparent -100%, var(--c-main-content) 60%);
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}

	section > * {
		flex-basis: calc(100% / 4);
	}

	img {
		min-width: 0;
		max-width: 100%;
		height: 100%;
		/* display: block; */
		object-fit: cover;
	}

	.copy {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		padding: var(--gap-content);
	}
</style>

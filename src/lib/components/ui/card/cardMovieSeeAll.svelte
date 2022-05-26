<script>
	export let posters;
	export let totalResults;
	export let query;
</script>

<div class="item">
	<a class="item-link" href="/movies?{query}">
		{#each posters as src}
			<img {src} alt="grid background the all posters" />
		{/each}
		<div class="front">
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
					d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
				/>
			</svg>
			<strong>{totalResults}</strong>
			<span>See all results</span>
		</div>
	</a>
</div>

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
		border: 1px solid rgba(128, 128, 128, 0.3);
		transition: transform 100ms ease-in-out;
	}
	.item:hover {
		background-color: var(--c-front);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
			0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07),
			0 32px 64px rgba(0, 0, 0, 0.07);

		transform: translateY(-1%);
	}

	.item:hover svg,
	.item:hover strong {
		color: white;
	}

	.item-link {
		display: flex;
		flex-wrap: wrap;

		height: 100%;
		width: 100%;
		overflow: hidden;
		margin: 0;
		padding: 0;
		color: white;
		text-decoration: none;
	}

	.front {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	img {
		opacity: 0.1;
		display: block;
		width: calc(100% / 3);
		height: calc(100% / 3);
		object-fit: cover;
	}

	span {
		/* padding: 0.2em 0.5em;
		border-radius: 50vh; */
		margin-top: 1em;
		font-size: 1rem;
	}

	strong {
		font-size: 2rem;
		color: var(--c-front);
	}

	svg {
		color: var(--c-front);
		height: 2.4rem;
		width: 2.4rem;
	}
</style>

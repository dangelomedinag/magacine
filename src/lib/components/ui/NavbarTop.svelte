<nav class="navbar-content">
	<div class="items-wrapper">
		<slot />
		<!-- <a class="active" href={'#'}>Movies</a>
		<a href={'#'}>Series</a> -->
	</div>
	<div class="tools">
		<button>🔔</button>
		<button>🙍‍♂️</button>
	</div>
</nav>

<style>
	.navbar-content {
		position: sticky;
		top: 0;
		z-index: 50;
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: black;
		border-bottom: 1px solid rgba(128, 128, 128, 0.2);
		padding: var(--gap-content);
	}

	.navbar-content :global(a) {
		text-decoration: none;
		padding-right: 2em;
		color: white;
		font-size: 0.9em;
		opacity: 0.5;
	}

	.navbar-content :global(a.active) {
		opacity: 1;
	}
</style>

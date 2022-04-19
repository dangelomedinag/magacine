<nav class="navbar-content">
	<div class="items-wrapper">
		<slot />
		<!-- <a class="active" href={'#'}>Movies</a>
		<a href={'#'}>Series</a> -->
	</div>
	<div class="tools">
		<button class="bell-btn">
			<svg
				class="bell-svg"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
				/>
			</svg>
		</button>
		<button class="profile-btn">
			<svg
				class="bell-svg"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</button>
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

	.bell-btn {
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	.bell-svg {
		height: 1rem;
		width: 1rem;
	}
</style>

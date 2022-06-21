<script>
	import { browser } from '$app/env';

	if (browser) {
		const body = document.body;
		const header = document.querySelector('header');
		const main = document.querySelector('main');
		const headerHeight = document.querySelector('header').offsetHeight;

		main.style.top = headerHeight + 'px';

		let lastScroll = 0;

		window.addEventListener('scroll', () => {
			let currentScroll = window.pageYOffset;

			// console.log("current: ", currentScroll);
			// console.log("last: ", lastScroll);

			if (currentScroll - lastScroll > 0) {
				// scrolled down -- header hide
				header.classList.add('scroll-down');
				header.classList.remove('scroll-up');
			} else {
				// scrolled up -- header show
				header.classList.add('scroll-up');
				header.classList.remove('scroll-down');
			}

			lastScroll = currentScroll;
			// console.log("last: ", lastScroll);
		});
	}
</script>

<header>
	<div class="brand">
		<ul>
			<li>Site Logo Here</li>
		</ul>
	</div>
	<div class="nav">
		<ul>
			<li>This Is A Navbar</li>
		</ul>
	</div>
</header>

<style>
	.brand {
		font-weight: 600;
		text-transform: uppercase;
	}

	.nav ul {
		display: flex;
		gap: 2rem;
	}

	/* Scroller */

	header {
		display: flex;
		justify-content: space-between;
		padding: 2rem 5rem;
		background: #4f46e5;
		color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		transition: all 300ms ease;
		z-index: 10;
	}
	:global(.scroll-up) {
		transform: translateY(0);
	}

	:global(.scroll-down) {
		transform: translateY(-100%);
	}
</style>

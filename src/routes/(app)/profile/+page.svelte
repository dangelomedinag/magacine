<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import NavbarTop from '$components/navbar/navbarTop.svelte';
	import { themeStore } from '$lib/stores/theme-store';
	let form;

	function getColorSchemePrefers(event) {
		if (event) return event.matches ? 'light' : 'dark';

		if (window.matchMedia) {
			return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
		}
	}
</script>

<NavbarTop />

<div class="wrapper">
	<img src={$page.data.user.avatar} alt="" />
	<h1>{$page.data.user.username}</h1>
	<p>{$page.data.user.name}</p>
	<form method="POST" use:enhance>
		<select
			name="theme"
			id="theme"
			value={$themeStore}
			on:change={(e) => {
				console.log(e.target.value);

				if (e.target.value === 'system') {
					document.documentElement.classList.remove('dark');
					document.documentElement.classList.remove('light');
					themeStore.set(getColorSchemePrefers());
				}

				if (e.target.value === 'dark') {
					themeStore.set('dark');
					document.documentElement.classList.add('dark');
				}
				if (e.target.value === 'light') {
					document.documentElement.classList.add('light');
					themeStore.set('light');
				}
				// form.submit();
			}}
		>
			<option value="system">system</option>
			<option value="dark">dark</option>
			<option value="light">light</option>
		</select>

		<button type="submit">save changes</button>
	</form>
</div>

<style>
	.wrapper {
		text-align: center;
	}

	img {
		border-radius: 100%;
		display: block;
		width: 100px;
		height: auto;
		margin: 0 auto;
	}
</style>

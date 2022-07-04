<script>
	import { notiStore } from '$lib/stores/notifications-store';
	import Icon from '$icons/icon.svelte';
	import Notification from '$icons/solid/bell.svelte';
	import { quintIn, quintOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	// import X from '$icons/solid/x.svelte';

	// $: console.log($notiStore);
</script>

<header>
	{$notiStore.length ? $notiStore.length : ''} Notifications <Icon y="10%"><Notification /></Icon>
</header>
{#each $notiStore as item, i (item.id)}
	<div>
		<h5>({i + 1}) {item.label.substring(1)}</h5>
		<ul>
			{#each item.items as el (el.id)}
				<li out:fly|local={{ easing: quintOut, x: 100 }} class:read={!el.read}>
					<svelte:element
						this={el.href ? 'a' : 'button'}
						class="anchor"
						href={el.href ?? undefined}
					>
						{el.detail}
					</svelte:element>
					<div class="actions">
						<button
							on:click={() => {
								notiStore.update((value) => {
									let EleIn = value.findIndex((e) => e.id === item.id);
									let ind = value[EleIn].items.findIndex((r) => r.id === el.id);
									value[EleIn].items[ind].read = !value[EleIn].items[ind].read;
									return value;
								});
							}}
						>
							{#if !el.read}
								Mark as read
							{:else}
								Mark as not read
							{/if}
						</button>
						<button
							on:click={() => {
								// let index = $notiStore.findIndex(item);
								notiStore.update((value) => {
									value[i].items = value[i].items.filter((y) => y.id !== el.id);
									if (value[i].items.length < 1) {
										value = value.filter((r) => r.id !== value[i].id);
									}
									return value;
								});
								// $notiStore[i].items.filter((t) => t.id !== el.id);
							}}>delete</button
						>
					</div>
				</li>
			{/each}
		</ul>
	</div>
	<!-- {#if i < item.items.length - 1}
		<hr />
	{/if} -->
{:else}
	<div class="empty">
		<h5>All caught up!</h5>
		<p>Take a break, thousands of movies and series await you.</p>
	</div>
{/each}

<style>
	.empty {
		text-align: center;
		/* font-style: italic; */
	}

	.empty h5 {
		font-weight: lighter;
		margin-top: 2em;
		font-size: 1.5rem;
		/* font-style: italic; */
	}

	header {
		--icon-size: 1.2rem;

		font-size: var(--icon-size);
		text-align: center;
		font-weight: bold;
	}

	h5 {
		margin: 0.2em 0;
	}

	ul {
		list-style: none;
		padding: 0.2em 0;
		margin: 0.2em 0;
	}

	li {
		position: relative;
		margin: 0.8em 0;
		/* margin: 0.5em 0;
		padding-bottom: 0;
		/* padding-bottom: 0; */
		/* background-color: var(--c-divider); */
		border: 1px solid transparent;
		border-radius: 5px;
		overflow: hidden;
		background-color: var(--c-divider);
	}

	.read::before {
		content: '';
		width: 2px;
		height: 100%;
		background-color: var(--c-front);
		position: absolute;
		inset: 0;
	}

	.actions {
		display: flex;
	}

	button {
		width: 100%;
		/* background-color: transparent; */
		background-color: var(--c-divider);
		color: inherit;
		border: none;
		font-size: 0.8rem;
		/* margin-top: 0.5em; */
		padding: 0.4em 0;
	}
	button:hover {
		color: var(--c-front);
	}

	.anchor {
		padding: 1em 0.5em;
		color: var(--c-base);
		display: block;
		text-decoration: none;
	}
	.anchor:hover {
		text-decoration: underline;
		/* text-decoration-style: dashed; */
		/* text-decoration-color: deepskyblue; */
		text-underline-offset: 2px;
	}
</style>

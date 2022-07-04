<script>
	import { notiStore } from '$lib/stores/notifications-store';
	import Icon from '$icons/icon.svelte';
	import Trash from '$icons/solid/trash.svelte';
	import Eye from '$icons/solid/eye.svelte';
	import EyeOff from '$icons/solid/eye-off.svelte';

	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	// import X from '$icons/solid/x.svelte';

	function MarkAsReadItem(parentId, itemId) {
		notiStore.update((value) => {
			let parentIndex = value.findIndex((e) => e.id === parentId);
			let itemIndex = value[parentIndex].items.findIndex((r) => r.id === itemId);
			value[parentIndex].items[itemIndex].read = !value[parentIndex].items[itemIndex].read;
			return value;
		});
	}
	function DeleteItem(parentId, itemId) {
		notiStore.update((value) => {
			let parentIndex = value.findIndex((e) => e.id === parentId);
			value[parentIndex].items = value[parentIndex].items.filter((r) => r.id !== itemId);
			if (value[parentIndex].items.length < 1) {
				value = value.filter((r) => r.id !== value[parentIndex].id);
			}
			return value;
		});
	}
</script>

<!-- <header>
	{$notiStore.length ? $notiStore.length : ''} Notifications <Icon y="10%"><Notification /></Icon>
</header> -->
{#each $notiStore as item, i (item.id)}
	<div>
		<h5>({i + 1}) {item.label.substring(1)}</h5>
		<ul>
			{#each item.items as el (el.id)}
				<li out:fly|local={{ easing: quintOut, x: 100 }} class:read={!el.read}>
					<div class="item">
						<div class="item-content">
							<div>
								{#if el.href}
									<a href={el.href} on:click={() => {}}>{@html el.detail}</a>
								{:else}
									{@html el.detail}
								{/if}
							</div>
							<div class="controls">
								<button on:click={() => DeleteItem(item.id, el.id)}><Icon><Trash /></Icon></button>
								<button on:click={() => MarkAsReadItem(item.id, el.id)}>
									<Icon>
										{#if !el.read}
											<Eye />
										{:else}
											<EyeOff />
										{/if}
									</Icon>
								</button>
							</div>
						</div>
						<!-- <div class="actions">
							{#if el.href}
								<a href={el.href} class="actions__btn actions__open">open</a>
							{/if}
							
						</div> -->
					</div>
					<!-- <div class="actions">
						<button
							class="actions__read"
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
							class="actions__delete"
							on:click={() => {
								notiStore.update((value) => {
									value[i].items = value[i].items.filter((y) => y.id !== el.id);
									if (value[i].items.length < 1) {
										value = value.filter((r) => r.id !== value[i].id);
									}
									return value;
								});
							}}>delete</button
						>
					</div> -->
				</li>
			{/each}
		</ul>
	</div>
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

	/* header {
		--icon-size: 1.2rem;
		position: sticky;
		background-color: var(--modal-bg);
		top: 0;
		font-size: var(--icon-size);
		text-align: center;
		font-weight: bold;
	} */

	h5 {
		margin: 0.2em 0;
	}

	ul {
		list-style: none;
		padding: 0.2em 0;
		margin: 0.2em 0;
	}

	li {
		/* display: flex; */
		position: relative;
		margin: 0.8em 0;
		/* margin: 0.5em 0;
		padding-bottom: 0;
		/* padding-bottom: 0; */
		/* background-color: var(--c-divider); */
		border: 1px solid var(--c-divider);
		border-radius: 5px;
		overflow: hidden;
		background-color: var(--modal-bg);
		transition: box-shadow 0.2s ease-in-out;
	}
	.read {
		/* box-shadow: none; */
		box-shadow: var(--shadow-long);
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
		/* background-color: var(--c-divider); */
	}

	.actions__btn {
		border-radius: 3px;
		width: 100%;
		background-color: transparent;
		/* background-color: var(--c-divider); */
		color: inherit;
		border: none;
		font-size: 0.8rem;
		/* margin-top: 0.5em; */
		padding: 0.4em 0;
		text-align: center;
	}

	.actions__btn:hover {
		/* color: var(--c-front); */
		background-color: var(--c-divider);
	}

	/* details { */
	/* padding: 1em; */
	/* } */
	.item-content {
		display: flex;
		padding: 1em;
		justify-content: space-between;
	}

	.item-content a {
		text-align: left;
		padding: 0;
		margin: 0;
		/* padding: 1em 0.5em 1em 2em; */
		color: var(--c-base);
		background-color: transparent;
		border: 1px solid transparent;
		display: block;
		font-size: 1rem;
		text-decoration: none;
	}

	.item-content button {
		color: inherit;
		height: 100%;
		background-color: transparent;
		border: none;
		opacity: 0.5;
	}
	.item-content button:hover {
		opacity: 1;
	}

	.controls {
		flex-shrink: 0;
		padding-left: 0.5em;
	}

	.item {
		width: 100%;
	}

	.anchor {
		text-align: left;
		padding: 1em 0.5em 1em 2em;
		color: var(--c-base);
		background-color: transparent;
		border: 1px solid transparent;
		display: block;
		font-size: 1rem;
		text-decoration: none;
	}

	.item :global(strong) {
		color: var(--c-front);
	}

	.item :global(strong.username:before) {
		content: '@';
	}
</style>

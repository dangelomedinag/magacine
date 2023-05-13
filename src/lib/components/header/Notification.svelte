<script>
	import { quintOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	// icons
	import Icon from '$icons/icon.svelte';
	import Trash from '$icons/solid/trash.svg?raw';
	import Eye from '$icons/solid/eye.svg?raw';
	import EyeOff from '$icons/solid/eye-off.svg?raw';

	import { notiStore } from '$lib/stores/notifications-store';

	const dispatch = createEventDispatcher();

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
	function onClickItem(parentId, itemId) {
		MarkAsReadItem(parentId, itemId);
		DeleteItem(parentId, itemId);
		dispatch('clickItem');
	}
</script>

{#each $notiStore as item, i (item.id)}
	<div class="notification">
		<h5 class="notification__title">({i + 1}) {item.label.substring(1)}</h5>
		<ul class="notification__list">
			{#each item.items as el (el.id)}
				<li
					animate:flip={{ easing: quintOut, delay: 200 }}
					class="notification__item"
					out:fly|local={{ easing: quintOut, x: 100 }}
					class:notification__item--unread={!el.read}
				>
					<div class="notification__container">
						<div class="notification__details">
							{#if el.href}
								<a
									href={el.href}
									class="notification__element"
									on:click={() => onClickItem(item.id, el.id)}>{@html el.detail}</a
								>
							{:else}
								<button
									class="notification__element"
									on:click={() => MarkAsReadItem(item.id, el.id)}
								>
									{@html el.detail}
								</button>
							{/if}
						</div>
						<div class="notification__actions">
							<button class="actions__btn" on:click={() => DeleteItem(item.id, el.id)}
								><Icon>{@html Trash}</Icon></button
							>
							<button class="actions__btn" on:click={() => MarkAsReadItem(item.id, el.id)}>
								<Icon>
									{#if !el.read}
										{@html Eye}
									{:else}
										{@html EyeOff}
									{/if}
								</Icon>
							</button>
						</div>
					</div>
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
	h5 {
		margin: 0.2em 0;
		font-size: 1em;
	}

	.empty {
		text-align: center;
	}

	.empty h5 {
		font-weight: lighter;
		margin-top: 2em;
		font-size: 1.5rem;
	}

	.notification__list {
		list-style: none;
		padding: 0.2em 0;
		margin: 0;
	}

	.notification__item {
		position: relative;
		margin: 0.8em 0;
		border: 1px solid var(--c-divider);
		border-radius: 5px;
		overflow: hidden;
		background-color: var(--modal-bg);
		transition: box-shadow 0.2s ease-in-out;
	}
	.notification__item--unread {
		box-shadow: var(--shadow-long);
	}

	.notification__item--unread::before {
		content: '';
		width: 2px;
		height: 100%;
		background-color: var(--c-front);
		position: absolute;
		inset: 0;
	}

	.notification__container {
		display: flex;
		justify-content: space-between;
	}

	.notification__details {
		width: 100%;
	}

	.notification__element {
		text-align: left;
		padding: 0;
		margin: 0;
		color: var(--c-base);
		background-color: transparent;
		border: 1px solid transparent;
		display: block;
		font-size: 1em;
		text-decoration: none;
		padding: 1em;
		width: 100%;
	}

	.actions__btn {
		color: inherit;
		height: 100%;
		background-color: transparent;
		border: none;
		opacity: 0.5;
	}
	.notification__item button:hover {
		opacity: 1;
	}

	.notification__actions {
		flex-shrink: 0;
		padding: 0 0.5em;
	}

	.notification__item {
		width: 100%;
	}

	.notification__item :global(strong) {
		color: var(--c-front);
	}

	.notification__item :global(strong.username:before) {
		content: '@';
	}
</style>

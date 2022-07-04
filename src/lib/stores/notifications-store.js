import { writable } from 'svelte/store';

export const notiStore = writable([
	{
		id: 'ac',
		label: '/profile',
		notification: 3,
		items: [
			{
				id: '1',
				read: false,
				type: 'session',
				detail: "Find a plan that's right for you."
			}
		]
	},
	{
		id: 'a',
		label: '/discovery',
		notification: 3,
		items: [
			{
				id: '1',
				read: false,
				type: 'movie',
				href: '/discovery',
				detail: 'Discover these <strong>3 new movies</strong> that premiered this week.'
			},
			{
				id: '2',
				read: false,
				type: 'serie',
				href: '/discovery',
				detail: 'Discover these <strong>6 new series</strong> that premiered this week.'
			},
			{
				id: '3',
				read: false,
				type: 'movie',
				href: '/discovery',
				detail: 'Discover these <strong>3 new movies</strong> that premiered this week.'
			}
		]
	},
	{
		id: 'b',
		label: '/community',
		notification: 'new',
		items: [
			{
				id: '1',
				read: false,
				type: 'blog',
				href: '/community/post/comment?id=1234',
				detail: '<strong class="username">botchat_real</strong> replied to your comment'
			}
		]
	}
]);

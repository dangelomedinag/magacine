import { writable } from 'svelte/store';

const DEMO_NOTIFICATION = [
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
	}
];

export const notiStore = writable(DEMO_NOTIFICATION);

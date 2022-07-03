import { writable } from 'svelte/store';

export const notiStore = writable([
	{
		id: 'a',
		label: '/discovery',
		notification: 3,
		items: [
			{
				id: '1',
				type: 'movie',
				href: '/discovery',
				detail:
					'Discover these 3 new movies that premiered this weekDiscover these 3 new movies that premiered this week '
			},
			{
				id: '2',
				type: 'serie',
				href: '/discovery',
				detail:
					'Discover these 6 new series that premiered this weekDiscover these 3 new movies that premiered this week '
			},
			{
				id: '3',
				type: 'movie',
				href: '/discovery',
				detail:
					'Discover these 3 new movies that premiered this weekDiscover these 3 new movies that premiered this week '
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
				type: 'blog',
				href: '/community',
				detail: 'botchat_real replied to your comment'
			}
		]
	}
]);

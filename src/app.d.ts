// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				username: string;
				name: string;
				lastname: string;
				role: string;
				avatar: string;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

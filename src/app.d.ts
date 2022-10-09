/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Error {
		message: string;
	}

	interface Locals {
		user: {
			username: string;
			name: string;
			lastname: string;
			role: string;
			avatar: string;
		};
	}
	interface PrivateEnv {
		OMDB_API_KEY: string;
		OMDB_API_URL: string;
	}
	// interface Platform {}
	// interface PublicEnv {}
	// interface Session {}
	// interface Stuff {}
}

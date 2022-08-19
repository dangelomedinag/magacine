/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: {
			username: string;
			name: string;
			avatar: string;
		};
	}
	// interface Platform {}
	interface PrivateEnv {
		OMDB_API_KEY: string;
		OMDB_API_URL: string;
	}
	// interface PublicEnv {}
	// interface Session {}
	// interface Stuff {}
}

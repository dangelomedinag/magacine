export function logHours() {
	const date = new Date();
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

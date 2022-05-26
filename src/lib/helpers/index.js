export const randomInt = (MAX) => Math.floor(Math.random() * MAX) + 1;
export const uuid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

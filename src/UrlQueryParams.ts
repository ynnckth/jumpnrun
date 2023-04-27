const urlQueryParams = new URL(window.location.toString());
const message = urlQueryParams.searchParams.get("message") ?? "";
const hash = urlQueryParams.hash ?? "";

export const inputString = message || hash ? `${message}${hash}` : "Hello World";
export const winMessage = urlQueryParams.searchParams.get("won") ?? "You won!";

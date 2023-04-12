const urlQueryParams = new URL(window.location.toString()).searchParams;

export const inputString = urlQueryParams.get("message") ?? "Hello World";
export const winMessage = urlQueryParams.get("won") ?? "You won!";

const urlQueryParams = new URL(window.location.toString()).searchParams;

export const encoded = urlQueryParams.get("encoded") === "true"

const getAndDecodeMessageFromParam = (paramName: string, defaultValue: string) => {
    if (encoded) {
        const encodedInputString = urlQueryParams.get(paramName);
        return encodedInputString ? atob(encodedInputString) : defaultValue;
    }
    return urlQueryParams.get("won") ?? defaultValue
};
export const getInputString = (): string => {
    return getAndDecodeMessageFromParam("message", "Hello World");
}
export const getWinMessage = (): string => {
    return getAndDecodeMessageFromParam("won", "You won!");
}

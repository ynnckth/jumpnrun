import LevelGenerator from "./LevelGenerator/LevelGenerator";

const urlQueryParams = new URL(window.location.toString()).searchParams;

export const isEncoded = urlQueryParams.get("encoded") === "true";

const getAndDecodeMessageFromParam = (paramName: string, defaultValue: string) => {
  if (isEncoded) {
    const encodedInputString = urlQueryParams.get(paramName);
    return encodedInputString ? window.atob(encodedInputString) : defaultValue;
  }
  return urlQueryParams.get(paramName) ?? defaultValue;
};

export const getInputString = (): string => getAndDecodeMessageFromParam("message", "Hello World");
export const getWinMessage = (): string => getAndDecodeMessageFromParam("won", "You won!");
export const getDesiredLevel = (): string => urlQueryParams.get("level") ?? LevelGenerator.DEFAULT_LEVEL;

import { it, describe, expect } from "vitest";
import LevelGenerator from "./LevelGenerator";
import { stringLetterToGridLetterMappings } from "./stringLetterToGridLetterMappings";

describe(LevelGenerator.name, () => {
  const levelGenerator = new LevelGenerator();

  it.each([
    ["H", stringLetterToGridLetterMappings["H"]],
    ["A", stringLetterToGridLetterMappings["A"]],
  ])("should return map grid for single letter '%s'", (letterString: string, expected) => {
    expect(levelGenerator.getMapGridForSingleLetter(letterString)).toBe(expected);
  });

  it("should return map grid for string", () => {
    const inputString = "HAPPY";

    const mapGrid = levelGenerator.getMapGridForString(inputString);

    expect(mapGrid).toStrictEqual([
      "  o  o     oo     oooo    oooo   o    o ",
      "  o  o    o  o    o  o    o  o    o  o  ",
      "  oooo    oooo    oooo    oooo     oo   ",
      "  o  o    o  o    o       o        oo   ",
      "  o  o    o  o    o       o        oo   ",
    ]);
  });
});

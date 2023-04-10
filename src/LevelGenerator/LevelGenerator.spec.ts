import { describe, expect, it } from "vitest";
import LevelGenerator from "./LevelGenerator";

describe(LevelGenerator.name, () => {
  const levelGenerator = new LevelGenerator();

  it("should return map grid for upper-case string", () => {
    const inputString = "HAPPY BIRTHDAY";

    const mapGrid = levelGenerator.getMapGridForString(inputString);

    expect(mapGrid).toStrictEqual([
      "  o  o     oo     oooo    oooo   o    o           ooo      oo     ooo    oooooo   o  o    ooo      oo    o    o ",
      "  o  o    o  o    o  o    o  o    o  o            o  o            o  o     oo     o  o    o  o    o  o    o  o  ",
      "  oooo    oooo    oooo    oooo     oo             oooo     oo     ooo      oo     oooo    o  o    oooo     oo   ",
      "  o  o    o  o    o       o        oo             o  o     oo     o  o     oo     o  o    o  o    o  o     oo   ",
      "  o  o    o  o    o       o        oo             oooo     oo     o  o     oo     o  o    o o     o  o     oo   ",
    ]);
  });

  it("should return map grid for mixed-case string", () => {
    const inputString = "Happy Birthday";

    const mapGrid = levelGenerator.getMapGridForString(inputString);

    expect(mapGrid).toStrictEqual([
      "  o  o     oo     oooo    oooo   o    o           ooo      oo     ooo    oooooo   o  o    ooo      oo    o    o ",
      "  o  o    o  o    o  o    o  o    o  o            o  o            o  o     oo     o  o    o  o    o  o    o  o  ",
      "  oooo    oooo    oooo    oooo     oo             oooo     oo     ooo      oo     oooo    o  o    oooo     oo   ",
      "  o  o    o  o    o       o        oo             o  o     oo     o  o     oo     o  o    o  o    o  o     oo   ",
      "  o  o    o  o    o       o        oo             oooo     oo     o  o     oo     o  o    o o     o  o     oo   ",
    ]);
  });
});

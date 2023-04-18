import { describe, expect, it } from "vitest";
import LevelGenerator from "./LevelGenerator";

describe(LevelGenerator.name, () => {
  const levelGenerator = new LevelGenerator();

  it.each([["HAPPY BIRTHDAY"], ["Happy Birthday"], ["happy birthday"]])(
    "should return map grid for string %s",
    (inputString) => {
      const mapGrid = levelGenerator.generateLevelFromString(inputString);

      expect(mapGrid).toStrictEqual([
        "                                                                                                                ",
        "                                                                                                                ",
        "                                          x   x                                                                 ",
        "                                          x!!!x                                                                 ",
        "                                          xx!xx                                                                 ",
        "                                           xvx                                                                  ",
        "                                                                                                                ",
        "                                                                                                                ",
        "                                                                                                                ",
        "                                                                                                                ",
        "  o  o     oo     oooo    oooo   o    o           ooo      oo     ooo    oooooo   o  o    ooo      oo    o    o ",
        "  o  o    o  o    o  o    o  o    o  o            o  o            o  o     oo     o  o    o  o    o  o    o  o  ",
        "  oooo    oooo    oooo    oooo     oo             oooo     oo     ooo      oo     oooo    o  o    oooo     oo   ",
        "  o  o    o  o    o       o        oo             o  o     oo     o  o     oo     o  o    o  o    o  o     oo   ",
        "@ o  o    o  o    o       o        oo             oooo     oo     o  o     oo     o  o    ooo     o  o     oo   ",
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "                                        x!!!!!!x                                                                ",
        "                                        xxxxxxxx                                                                ",
      ]);
    }
  );

  it("should use letter grid for space character given unknown letter", () => {
    const mapGrid = levelGenerator.generateLevelFromString("Y2");

    expect(mapGrid).toStrictEqual([
      "                ",
      "                ",
      "          x   x ",
      "          x!!!x ",
      "          xx!xx ",
      "           xvx  ",
      "                ",
      "                ",
      "                ",
      "                ",
      " o    o         ",
      "  o  o          ",
      "   oo           ",
      "   oo           ",
      "@  oo           ",
      "xxxxxxxxx      x",
      "        x!!!!!!x",
      "        xxxxxxxx",
    ]);
  });
});

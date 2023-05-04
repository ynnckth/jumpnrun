import { describe, expect, it } from "vitest";
import LevelGenerator from "./LevelGenerator";

describe(LevelGenerator.name, () => {
  const levelGenerator = new LevelGenerator();

  it.each([["HAPPY BIRTHDAY"], ["Happy Birthday"], ["happy birthday"]])(
    "should return map grid for string %s",
    (inputString) => {
      const mapGrid = levelGenerator.generateLevelFromString(inputString);

      expect(mapGrid).toStrictEqual([
        "                                      x!!x                                                                                                                                             ",
        "                                      x!!x                                                                                                                                             ",
        "                                      x!!xxxxxxxxxx                                                                                                                                    ",
        "                                      xx!!!!!!!!!!xx                                                                                                                                   ",
        "                                       xxxxxxxxxx!!x                                                                                                                                   ",
        "                                                xx!x                                                                                                                                   ",
        "                                                 x!x                                                                                                                                   ",
        "                                                 xvx                                                                                                                                   ",
        "                                                                                                                                                                                       ",
        "                                                                                                                                                                                       ",
        "                                                                                                                 x   x                                                                 ",
        "                                               x     x                                                           x!!!x                                                                 ",
        "                                               x     x                                                           xx!xx                                                                 ",
        "                                               x     x                                                            xvx                                                                  ",
        "                                               x     x                                                                                                                                 ",
        "                                               xx    x             xx                                                                                                                  ",
        "                                               x     x      o  o                                                                                                                       ",
        "               xxxxxxx        xxx   xxx        x     x                                                                                                                                 ",
        "              xx     xx         x   x          x     x     xxxxxx        o  o     oo     oooo    oooo   o    o           ooo      oo     ooo    oooooo   o  o    ooo      oo    o    o ",
        "             xx       xx        x o x          x    xx                   o  o    o  o    o  o    o  o    o  o            o  o            o  o     oo     o  o    o  o    o  o    o  o  ",
        "     @       x         x        x   x          x     x                   oooo    oooo    oooo    oooo     oo             oooo     oo     ooo      oo     oooo    o  o    oooo     oo   ",
        "    xxx      x         x        x   x          x     x                   o  o    o  o    o       o        oo             o  o     oo     o  o     oo     o  o    o  o    o  o     oo   ",
        "    x x      x         x       xx o xx         x     x                   o  o    o  o    o       o        oo             oooo     oo     o  o     oo     o  o    ooo     o  o     oo   ",
        "!!!!x x!!!!!!x         x!!!!!!xx     xx!!!!!!!!xx    x!!!!!!!!!!       xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxx     x!!!!!!!xx!                                               x!!!!!!x                                                                ",
        "!!!!x x!!!!!!x         x!!!!!x    o                 xx!!!!!!xx !                                               x!!!!!!x                                                                ",
        "!!!!x x!!!!!!x         x!!!!!x                     xx!!!!!!xx  !                                               x!!!!!!x                                                                ",
        "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxxxxxx!!!!!!xx   !                                               xxxxxxxx                                                                ",
        "!!!!x x!!!!!!x         x!!!!!!xxxxxxxxx!!!!!!!!!!!!!!!!!!xx    !                                                                                                                       ",
        "!!!!x x!!!!!!x         x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xx     !                                                                                                                       ",
      ]);
    }
  );

  it("should use letter grid for space character given unknown letter", () => {
    const mapGrid = levelGenerator.generateLevelFromString("Y2");

    expect(mapGrid).toStrictEqual([
      "                                      x!!x                                             ",
      "                                      x!!x                                             ",
      "                                      x!!xxxxxxxxxx                                    ",
      "                                      xx!!!!!!!!!!xx                                   ",
      "                                       xxxxxxxxxx!!x                                   ",
      "                                                xx!x                                   ",
      "                                                 x!x                                   ",
      "                                                 xvx                                   ",
      "                                                                                       ",
      "                                                                                       ",
      "                                                                                 x   x ",
      "                                               x     x                           x!!!x ",
      "                                               x     x                           xx!xx ",
      "                                               x     x                            xvx  ",
      "                                               x     x                                 ",
      "                                               xx    x             xx                  ",
      "                                               x     x      o  o                       ",
      "               xxxxxxx        xxx   xxx        x     x                                 ",
      "              xx     xx         x   x          x     x     xxxxxx       o    o         ",
      "             xx       xx        x o x          x    xx                   o  o          ",
      "     @       x         x        x   x          x     x                    oo           ",
      "    xxx      x         x        x   x          x     x                    oo           ",
      "    x x      x         x       xx o xx         x     x                    oo           ",
      "!!!!x x!!!!!!x         x!!!!!!xx     xx!!!!!!!!xx    x!!!!!!!!!!       xxxxxxxxx      x",
      "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxx     x!!!!!!!xx!               x!!!!!!x",
      "!!!!x x!!!!!!x         x!!!!!x    o                 xx!!!!!!xx !               x!!!!!!x",
      "!!!!x x!!!!!!x         x!!!!!x                     xx!!!!!!xx  !               x!!!!!!x",
      "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxxxxxx!!!!!!xx   !               xxxxxxxx",
      "!!!!x x!!!!!!x         x!!!!!!xxxxxxxxx!!!!!!!!!!!!!!!!!!xx    !                       ",
      "!!!!x x!!!!!!x         x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xx     !                       ",
    ]);
  });
});

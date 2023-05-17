import { describe, expect, it } from "vitest";
import LevelGenerator from "./LevelGenerator";

describe(LevelGenerator.name, () => {
  const levelGenerator = new LevelGenerator();

  it.each([["HAPPY BIRTHDAY"], ["Happy Birthday"], ["happy birthday"]])(
    "should return map grid for string %s",
    (inputString) => {
      const mapGrid = levelGenerator.generateLevelFromString(inputString);

      expect(mapGrid).toStrictEqual([
        "                                                                                                                                                                                                         ",
        "                                                                                                                                                                                                         ",
        "                                                                                                                                                                                                         ",
        "                                                                                                                                                                                                     x   ",
        "                                                                                                                                                                                                     x   ",
        "                                                                                                                                                                                                     x   ",
        "                                      x!!x                                                                                                                                                           x   ",
        "                                      x!!x                                                                                                                                                           x   ",
        "                                      x!!xxxxxxxxxx                                                                                                                                                 ox   ",
        "                                      xx!!!!!!!!!!xx                                                                                                                                                xx   ",
        "                                       xxxxxxxxxx!!x                                                                                                                                           x    xx   ",
        "                                                xx!x                                                                                                                                                xx   ",
        "                                                 x!x                                                                                                                                                xx   ",
        "                                                 xvx                                                                                                                                                xx   ",
        "                                                                                                                                                                                                  xxxx   ",
        "                                                                                                                                                                                                   xxx   ",
        "                                                                                                                 x   x                                                                        x    xxx   ",
        "                                               x     x                                                           x!!!x                                                                             xxx   ",
        "                                               x     x                                                           xx!xx                                                                             xxx   ",
        "                                               x     x                                                            xvx                                                                            xxxxx   ",
        "                                               x     x                                                                                                                                             xxx   ",
        "                                               xx    x             xx                                                                                                                        x     xxx   ",
        "                                               x     x      o  o                                                                                                                                   xxx   ",
        "               xxxxxxx        xxx   xxx        x     x                                                                                                                                             xxx   ",
        "              xx     xx         x   x          x     x     xxxxxx        o  o     oo     oooo    oooo   o    o           ooo      oo     ooo    oooooo   o  o    ooo      oo    o    o             xxx   ",
        "             xx       xx        x o x          x    xx                   o  o    o  o    o  o    o  o    o  o            o  o            o  o     oo     o  o    o  o    o  o    o  o           xxxxxx   ",
        "     @       x         x        x   x          x     x                   oooo    oooo    oooo    oooo     oo             oooo     oo     ooo      oo     oooo    o  o    oooo     oo              xxxx   ",
        "    xxx      x         x        x   x          x     x                   o  o    o  o    o       o        oo             o  o     oo     o  o     oo     o  o    o  o    o  o     oo        x     xxxx   ",
        "    x x      x         x       xx o xx         x     x                   o  o    o  o    o       o        oo             oooo     oo     o  o     oo     o  o    ooo     o  o     oo              xxox   ",
        "!!!!x x!!!!!!x         x!!!!!!xx     xx!!!!!!!!xx    x!!!!!!!!!!       xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx      xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx        xxox   ",
        "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxx     x!!!!!!!xx!                                               x!!!!!!x                                                                  x=          x   ",
        "!!!!x x!!!!!!x         x!!!!!x    o                 xx!!!!!!xx !                                               x!!!!!!x                                                                  x    xx     x   ",
        "!!!!x x!!!!!!x         x!!!!!x                     xx!!!!!!xx  !                                               x!!!!!!x                                                                  x           x   ",
        "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxxxxxx!!!!!!xx   !                                               xxxxxxxx                                                                  x           x   ",
        "!!!!x x!!!!!!x         x!!!!!!xxxxxxxxx!!!!!!!!!!!!!!!!!!xx    !                                                                                                                         x  xxxxx   xx   ",
        "!!!!x x!!!!!!x         x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xx     !                                                                                                                         x!!x   x!!!x    ",
      ]);
    }
  );

  it("should use letter grid for space character given unknown letter", () => {
    const mapGrid = levelGenerator.generateLevelFromString("Y2");

    expect(mapGrid).toStrictEqual([
      "                                                                                                         ",
      "                                                                                                         ",
      "                                                                                                         ",
      "                                                                                                     x   ",
      "                                                                                                     x   ",
      "                                                                                                     x   ",
      "                                      x!!x                                                           x   ",
      "                                      x!!x                                                           x   ",
      "                                      x!!xxxxxxxxxx                                                 ox   ",
      "                                      xx!!!!!!!!!!xx                                                xx   ",
      "                                       xxxxxxxxxx!!x                                           x    xx   ",
      "                                                xx!x                                                xx   ",
      "                                                 x!x                                                xx   ",
      "                                                 xvx                                                xx   ",
      "                                                                                                  xxxx   ",
      "                                                                                                   xxx   ",
      "                                                                                 x   x        x    xxx   ",
      "                                               x     x                           x!!!x             xxx   ",
      "                                               x     x                           xx!xx             xxx   ",
      "                                               x     x                            xvx            xxxxx   ",
      "                                               x     x                                             xxx   ",
      "                                               xx    x             xx                        x     xxx   ",
      "                                               x     x      o  o                                   xxx   ",
      "               xxxxxxx        xxx   xxx        x     x                                             xxx   ",
      "              xx     xx         x   x          x     x     xxxxxx       o    o                     xxx   ",
      "             xx       xx        x o x          x    xx                   o  o                   xxxxxx   ",
      "     @       x         x        x   x          x     x                    oo                      xxxx   ",
      "    xxx      x         x        x   x          x     x                    oo                x     xxxx   ",
      "    x x      x         x       xx o xx         x     x                    oo                      xxox   ",
      "!!!!x x!!!!!!x         x!!!!!!xx     xx!!!!!!!!xx    x!!!!!!!!!!       xxxxxxxxx      xxxx        xxox   ",
      "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxx     x!!!!!!!xx!               x!!!!!!x  x=          x   ",
      "!!!!x x!!!!!!x         x!!!!!x    o                 xx!!!!!!xx !               x!!!!!!x  x    xx     x   ",
      "!!!!x x!!!!!!x         x!!!!!x                     xx!!!!!!xx  !               x!!!!!!x  x           x   ",
      "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxxxxxx!!!!!!xx   !               xxxxxxxx  x           x   ",
      "!!!!x x!!!!!!x         x!!!!!!xxxxxxxxx!!!!!!!!!!!!!!!!!!xx    !                         x  xxxxx   xx   ",
      "!!!!x x!!!!!!x         x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xx     !                         x!!x   x!!!x    ",
    ]);
  });
});

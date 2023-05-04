import { stringLetterToGridLetterMappings } from "./stringLetterToGridLetterMappings";

class LevelGenerator {
  private readonly GROUND_CHAR = "x";
  private readonly SINGLE_LETTER_GRID_ROW_LENGTH = 8;
  private readonly ROWS_ABOVE_LETTER = 18;
  private readonly ROWS_BELOW_GROUND = 6;
  private readonly STATIC_MAP_ROWS = [
    "                                      x!!x                             ",
    "                                      x!!x                             ",
    "                                      x!!xxxxxxxxxx                    ",
    "                                      xx!!!!!!!!!!xx                   ",
    "                                       xxxxxxxxxx!!x                   ",
    "                                                xx!x                   ",
    "                                                 x!x                   ",
    "                                                 xvx                   ",
    "                                                                       ",
    "                                                                       ",
    "                                                                       ",
    "                                               x     x                 ",
    "                                               x     x                 ",
    "                                               x     x                 ",
    "                                               x     x                 ",
    "                                               xx    x             xx  ",
    "                                               x     x      o  o       ",
    "               xxxxxxx        xxx   xxx        x     x                 ",
    "              xx     xx         x   x          x     x     xxxxxx      ",
    "             xx       xx        x o x          x    xx                 ",
    "     @       x         x        x   x          x     x                 ",
    "    xxx      x         x        x   x          x     x                 ",
    "    x x      x         x       xx o xx         x     x                 ",
    "!!!!x x!!!!!!x         x!!!!!!xx     xx!!!!!!!!xx    x!!!!!!!!!!       ",
    "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxx     x!!!!!!!xx!       ",
    "!!!!x x!!!!!!x         x!!!!!x    o                 xx!!!!!!xx !       ",
    "!!!!x x!!!!!!x         x!!!!!x                     xx!!!!!!xx  !       ",
    "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxxxxxx!!!!!!xx   !       ",
    "!!!!x x!!!!!!x         x!!!!!!xxxxxxxxx!!!!!!!!!!!!!!!!!!xx    !       ",
    "!!!!x x!!!!!!x         x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xx     !       ",
  ];
  private readonly COLUMN_HEIGHT = this.STATIC_MAP_ROWS.length;

  generateLevelFromString(inputString: string): string[] {
    const concatenatedLetterGrids = this.concatLetterGrids(inputString);

    const staticMapRows = this.STATIC_MAP_ROWS;
    for (let currentRow = 0; currentRow < concatenatedLetterGrids.length; currentRow++) {
      concatenatedLetterGrids[currentRow] = staticMapRows[currentRow].concat(concatenatedLetterGrids[currentRow]);
    }

    return concatenatedLetterGrids;
  }

  private concatLetterGrids(inputString: string): string[] {
    const letterGrids = [...inputString.toUpperCase()].map((letter) => this.getMapGridForSingleLetter(letter));
    const mapGrid = [...new Array(this.COLUMN_HEIGHT)].map(() => "");
    letterGrids.forEach((letterGrid) => {
      letterGrid.forEach((_, letterRowIdx) => {
        mapGrid[letterRowIdx] += letterGrid[letterRowIdx];
      });
    });
    return mapGrid;
  }

  private getMapGridForSingleLetter(inputLetter: string) {
    let letterGrid = stringLetterToGridLetterMappings[inputLetter];
    if (!letterGrid || inputLetter === " " || inputLetter === "-") {
      const letterGridCopy = [...stringLetterToGridLetterMappings[" "]];
      this.appendLavaCrack(letterGridCopy);
      this.prependDrippingLavaOnTopOfLetter(letterGridCopy);
      return letterGridCopy;
    }
    const letterGridCopy = [...letterGrid];
    this.appendGroundAndBelowGroundRows(letterGridCopy);
    this.prependEmptyRowsOnTopOfLetter(letterGridCopy);
    return letterGridCopy;
  }

  private appendLavaCrack(letterGrid: string[]) {
    letterGrid.push("x      x");
    letterGrid.push("x!!!!!!x");
    letterGrid.push("x!!!!!!x");
    letterGrid.push("x!!!!!!x");
    letterGrid.push("xxxxxxxx");
    letterGrid.push("        ");
    letterGrid.push("        ");
  }

  private appendGroundAndBelowGroundRows(letterGrid: string[]) {
    letterGrid.push(this.GROUND_CHAR.repeat(this.SINGLE_LETTER_GRID_ROW_LENGTH));
    for (let i = 0; i < this.ROWS_BELOW_GROUND; i++) {
      letterGrid.push(" ".repeat(this.SINGLE_LETTER_GRID_ROW_LENGTH));
    }
  }

  private prependEmptyRowsOnTopOfLetter(letterGrid: string[]) {
    for (let i = 0; i < this.ROWS_ABOVE_LETTER; i++) {
      letterGrid.unshift(" ".repeat(this.SINGLE_LETTER_GRID_ROW_LENGTH));
    }
  }

  private prependDrippingLavaOnTopOfLetter(letterGrid: string[]) {
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("   xvx  ");
    letterGrid.unshift("  xx!xx ");
    letterGrid.unshift("  x!!!x ");
    letterGrid.unshift("  x   x ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
  }
}
export default LevelGenerator;

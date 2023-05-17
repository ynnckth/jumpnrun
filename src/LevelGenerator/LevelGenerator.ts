import { stringLetterToGridLetterMappings } from "./stringLetterToGridLetterMappings";
import { END_MAP_FRAGMENT_ROWS, START_MAP_FRAGMENT_ROWS } from "./fixedMapFragments";

class LevelGenerator {
  private readonly GROUND_CHAR = "x";
  private readonly SINGLE_LETTER_GRID_ROW_LENGTH = 8;
  private readonly ROWS_ABOVE_LETTER = 24;
  private readonly ROWS_BELOW_GROUND = 6;
  private readonly COLUMN_HEIGHT = START_MAP_FRAGMENT_ROWS.length;

  generateLevelFromString(inputString: string): string[] {
    const concatenatedLetterGrids = this.concatLetterGrids(inputString);
    const mapWithPrependedStaticRows = this.prependStaticStartMapRows(concatenatedLetterGrids);
    return this.appendStaticEndMapRows(mapWithPrependedStaticRows);
  }

  private prependStaticStartMapRows(mapRows: string[]) {
    for (let currentRow = 0; currentRow < mapRows.length; currentRow++) {
      mapRows[currentRow] = START_MAP_FRAGMENT_ROWS[currentRow].concat(mapRows[currentRow]);
    }
    return mapRows;
  }

  private appendStaticEndMapRows(mapRows: string[]) {
    for (let currentRow = 0; currentRow < mapRows.length; currentRow++) {
      mapRows[currentRow] = mapRows[currentRow].concat(END_MAP_FRAGMENT_ROWS[currentRow]);
    }
    return mapRows;
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
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
    letterGrid.unshift("        ");
  }
}
export default LevelGenerator;

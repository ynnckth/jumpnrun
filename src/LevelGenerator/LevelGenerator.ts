import { stringLetterToGridLetterMappings } from "./stringLetterToGridLetterMappings";

class LevelGenerator {
  private readonly PLAYER_CHAR = "@";
  private readonly GROUND_CHAR = "x";
  private readonly SINGLE_LETTER_GRID_ROW_LENGTH = 8;
  private readonly LEVEL_TOP_PADDING = 10;
  private readonly LETTER_HEIGHT = 5;
  private readonly BELOW_GROUND = 2;
  private readonly COLUMN_HEIGHT = this.LETTER_HEIGHT + this.LEVEL_TOP_PADDING + this.BELOW_GROUND + 1;

  // TODO: Prepend or append a static map fraction to the end of the map with a climbing challenge
  generateLevelFromString(inputString: string): string[] {
    const concatenatedLetterGrids = this.concatLetterGrids(inputString);

    const rowAboveGround = concatenatedLetterGrids[concatenatedLetterGrids.length - this.BELOW_GROUND - 1 - 1];
    const rowAboveGroundCharacters = [...rowAboveGround];
    rowAboveGroundCharacters[0] = this.PLAYER_CHAR;
    concatenatedLetterGrids[concatenatedLetterGrids.length - this.BELOW_GROUND - 1 - 1] =
      rowAboveGroundCharacters.join("");

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

  // TODO: add dripping lava from the top (add top padding per character instead of overall)
  private getMapGridForSingleLetter(inputLetter: string) {
    let letterGrid = stringLetterToGridLetterMappings[inputLetter];
    if (!letterGrid || inputLetter === " " || inputLetter === "-") {
      const letterGridCopy = [...stringLetterToGridLetterMappings[" "]];
      this.appendLavaCrack(letterGridCopy);
      this.prependEmptyRowsOnTopOfLetter(letterGridCopy);
      this.prependDrippingLava(letterGridCopy);
      return letterGridCopy;
    }
    const letterGridCopy = [...letterGrid];
    this.appendGroundAndBelowGroundRows(letterGridCopy);
    this.prependEmptyRowsOnTopOfLetter(letterGridCopy);
    return letterGridCopy;
  }

  private appendLavaCrack(letterGridCopy: string[]) {
    letterGridCopy.push("x      x");
    letterGridCopy.push("x!!!!!!x");
    letterGridCopy.push("xxxxxxxx");
  }

  private appendGroundAndBelowGroundRows(letterGrid: string[]) {
    letterGrid.push(this.GROUND_CHAR.repeat(this.SINGLE_LETTER_GRID_ROW_LENGTH));
    for (let i = 0; i < this.BELOW_GROUND; i++) {
      letterGrid.push(" ".repeat(this.SINGLE_LETTER_GRID_ROW_LENGTH));
    }
  }

  private prependEmptyRowsOnTopOfLetter(letterGrid: string[]) {
    for (let i = 0; i < this.LEVEL_TOP_PADDING; i++) {
      letterGrid.unshift(" ".repeat(this.SINGLE_LETTER_GRID_ROW_LENGTH));
    }
  }

  private prependDrippingLava(letterGrid: string[]) {
    // TODO: Implement
  }
}
export default LevelGenerator;

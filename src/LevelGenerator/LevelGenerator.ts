import { stringLetterToGridLetterMappings } from "./stringLetterToGridLetterMappings";

class LevelGenerator {
  private readonly PLAYER_CHAR = "@";
  private readonly GROUND_CHAR = "x";
  private readonly LEVEL_TOP_PADDING = 10;

  // TODO: Add lava on the ground between spaces of words
  generateLevelFromString(inputString: string): string[] {
    const concatenatedLetterGrids = this.concatLetterGrids(inputString);
    const rowLength = concatenatedLetterGrids[0].length;

    for (let i = 0; i < this.LEVEL_TOP_PADDING; i++) {
      concatenatedLetterGrids.unshift(" ".repeat(rowLength));
    }

    const rowAboveGround = concatenatedLetterGrids[concatenatedLetterGrids.length - 1];
    const rowAboveGroundCharacters = [...rowAboveGround];
    rowAboveGroundCharacters[0] = this.PLAYER_CHAR;
    concatenatedLetterGrids[concatenatedLetterGrids.length - 1] = rowAboveGroundCharacters.join("");

    const groundRow = this.GROUND_CHAR.repeat(rowLength);
    concatenatedLetterGrids.push(groundRow);
    return concatenatedLetterGrids;
  }

  private concatLetterGrids(inputString: string): string[] {
    const letterGrids = [...inputString.toUpperCase()].map((letter) => this.getMapGridForSingleLetter(letter));
    const mapGrid = ["", "", "", "", ""];
    letterGrids.forEach((letterGrid) => {
      letterGrid.forEach((_, letterRowIdx) => {
        mapGrid[letterRowIdx] += letterGrid[letterRowIdx];
      });
    });
    return mapGrid;
  }

  private getMapGridForSingleLetter(inputLetter: string) {
    const letterGrid = stringLetterToGridLetterMappings[inputLetter];
    if (!letterGrid) {
      return stringLetterToGridLetterMappings[" "];
    }
    return letterGrid;
  }
}
export default LevelGenerator;

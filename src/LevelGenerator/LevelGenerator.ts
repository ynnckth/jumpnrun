import { stringLetterToGridLetterMappings } from "./stringLetterToGridLetterMappings";

class LevelGenerator {
  private readonly PLAYER_CHAR = "@";
  private readonly GROUND_CHAR = "x";

  // TODO: Adjust level height
  // TODO: Add lava between spaces of words
  generateLevelFromString(inputString: string): string[] {
    const concatenatedLetterGrids = this.concatLetterGrids(inputString);

    const rowAboveGround = concatenatedLetterGrids[concatenatedLetterGrids.length - 1];
    const rowAboveGroundCharacters = [...rowAboveGround];
    rowAboveGroundCharacters[0] = this.PLAYER_CHAR;
    concatenatedLetterGrids[concatenatedLetterGrids.length - 1] = rowAboveGroundCharacters.join("");

    const groundRow = this.GROUND_CHAR.repeat(concatenatedLetterGrids[0].length);
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
    return stringLetterToGridLetterMappings[inputLetter];
  }
}
export default LevelGenerator;

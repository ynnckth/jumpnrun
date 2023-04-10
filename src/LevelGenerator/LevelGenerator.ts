import { stringLetterToGridLetterMappings } from "./stringLetterToGridLetterMappings";

class LevelGenerator {
  // TODO: add map baseline
  getMapGridForString(inputString: string): string[] {
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

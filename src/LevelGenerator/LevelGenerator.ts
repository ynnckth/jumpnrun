import { stringLetterToGridLetterMappings } from "./stringLetterToGridLetterMappings";

class LevelGenerator {
  getMapGridForSingleLetter(inputLetter: string) {
    return stringLetterToGridLetterMappings[inputLetter];
  }

  getMapGridForString(inputString: string): string[] {
    const letterGrids = [...inputString].map((letter) => this.getMapGridForSingleLetter(letter));
    const mapGrid = ["", "", "", "", ""];
    letterGrids.forEach((letterGrid) => {
      letterGrid.forEach((_, letterRowIdx) => {
        mapGrid[letterRowIdx] += letterGrid[letterRowIdx];
      });
    });
    return mapGrid;
  }
}
export default LevelGenerator;

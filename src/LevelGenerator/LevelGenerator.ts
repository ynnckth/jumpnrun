import { characterToMapGridMappings } from "./characterToMapGridMappings";
import { levelMappings } from "./levels/Level";

class LevelGenerator {
  public static readonly DEFAULT_LEVEL = "1";

  private readonly columnHeight: number;
  private readonly groundChar = "x";
  private readonly singleLetterGridRowLength = characterToMapGridMappings["A"][0].length;
  private readonly rowsAboveLetter = 24;
  private readonly rowsBelowGround = 6;

  constructor(private selectedLevel: string = LevelGenerator.DEFAULT_LEVEL) {
    this.columnHeight = levelMappings[this.selectedLevel].startFragment.length;
  }

  generateLevelFromString(inputString: string): string[] {
    const concatenatedLetterGrids = this.concatLetters(inputString);
    const mapWithPrependedStaticRows = this.prependFixedStartFragmentForSelectedLevel(concatenatedLetterGrids);
    return this.appendFixedEndFragmentForSelectedLevel(mapWithPrependedStaticRows);
  }

  private prependFixedStartFragmentForSelectedLevel(allMapRows: string[]) {
    for (let currentRow = 0; currentRow < allMapRows.length; currentRow++) {
      allMapRows[currentRow] = levelMappings[this.selectedLevel].startFragment[currentRow].concat(
        allMapRows[currentRow]
      );
    }
    return allMapRows;
  }

  private appendFixedEndFragmentForSelectedLevel(mapRows: string[]) {
    for (let currentRow = 0; currentRow < mapRows.length; currentRow++) {
      mapRows[currentRow] = mapRows[currentRow].concat(levelMappings[this.selectedLevel].endFragment[currentRow]);
    }
    return mapRows;
  }

  private concatLetters(completeInputString: string): string[] {
    const individualLetters = [...completeInputString.toUpperCase()].map((letter) =>
      this.getRowsForSingleLetter(letter)
    );
    const mapGrid = [...new Array(this.columnHeight)].map(() => "");
    individualLetters.forEach((letterRows) => {
      letterRows.forEach((_, letterRowIdx) => {
        mapGrid[letterRowIdx] += letterRows[letterRowIdx];
      });
    });
    return mapGrid;
  }

  private getRowsForSingleLetter(letter: string) {
    let letterRows = characterToMapGridMappings[letter];
    if (!letterRows || letter === " " || letter === "-") {
      const letterGridCopy = [...characterToMapGridMappings[" "]];
      this.appendLavaCrack(letterGridCopy);
      this.prependDrippingLavaOnTopOfLetter(letterGridCopy);
      return letterGridCopy;
    }
    const letterGridCopy = [...letterRows];
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
    letterGrid.push(this.groundChar.repeat(this.singleLetterGridRowLength));
    for (let i = 0; i < this.rowsBelowGround; i++) {
      letterGrid.push(" ".repeat(this.singleLetterGridRowLength));
    }
  }

  private prependEmptyRowsOnTopOfLetter(letterGrid: string[]) {
    for (let i = 0; i < this.rowsAboveLetter; i++) {
      letterGrid.unshift(" ".repeat(this.singleLetterGridRowLength));
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

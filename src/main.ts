import { arrowKeyCodes, LEVELS } from "./constants";
import { Level } from "./Level";
import { DOMDisplay } from "./DOMDisplay";
import { getWinMessage } from "./UrlQueryParams";
import Hammer from "hammerjs";


const touchDetector = new Hammer(document.getElementsByTagName("html")[0]);

const trackDirections = (arrowKeyCodes: any) => {
  const pressed = Object.create(null);

  const handleKeyPress = (event: any) => {
    if (arrowKeyCodes.hasOwnProperty(event.keyCode)) {
      pressed[arrowKeyCodes[event.keyCode]] = event.type === "keydown";
      event.preventDefault();
    }
  };

  addEventListener("keydown", handleKeyPress);
  addEventListener("keyup", handleKeyPress);
  touchDetector.on("panend", () => {
    pressed["right"] = false;
    pressed["left"] = false;
    pressed["up"] = false;
  });
  touchDetector.on("panup", () => {
    pressed["up"] = true;
  });
  touchDetector.on("panright", () => {
    pressed["right"] = true;
    pressed["left"] = false;
  });
  touchDetector.on("panleft", () => {
    pressed["left"] = true;
    pressed["right"] = false;
  });
  return pressed;
};

const runAnimation = (frameFunc: (step: number) => boolean | undefined) => {
  let lastTime: number | null = null;
  const frame = (time: number) => {
    let stop = false;
    if (lastTime != null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

const arrows = trackDirections(arrowKeyCodes);

const runLevel = (level: Level, Display: any, andThen: (status: string | null) => void) => {
  const display = new Display(document.body, level);
  runAnimation((step) => {
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen) andThen(level.status);
      return false;
    }
    return undefined;
  });
};

const runGame = (levels: string[][], Display: any) => {
  const startLevel = (n: number) => {
    runLevel(new Level(levels[n]), Display, (status: string | null) => {
      if (status === "lost") startLevel(n);
      else if (n < levels.length - 1) startLevel(n + 1);
      else alert(getWinMessage());
    });
  };
  startLevel(0);
};

runGame(LEVELS, DOMDisplay);

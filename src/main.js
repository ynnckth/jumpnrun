import { arrowKeyCodes, LEVELS } from "./constants.js";
import { Level } from "./Level.js";
import { DOMDisplay } from "./DOMDisplay.js";
import { winMessage } from "./UrlQueryParams.ts";
import Hammer from "hammerjs";

const touchDetector = new Hammer(document.getElementsByTagName("html")[0]);

const trackDirections = (arrowKeyCodes) => {
  const pressed = Object.create(null);

  const handleKeyPress = (event) => {
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

const runAnimation = (frameFunc) => {
  let lastTime = null;
  const frame = (time) => {
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

const runLevel = (level, Display, andThen) => {
  const display = new Display(document.body, level);
  runAnimation((step) => {
    level.animate(step, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen) andThen(level.status);
      return false;
    }
  });
};

const runGame = (levels, Display) => {
  const startLevel = (n) => {
    runLevel(new Level(levels[n]), Display, (status) => {
      if (status === "lost") startLevel(n);
      else if (n < levels.length - 1) startLevel(n + 1);
      else alert(winMessage);
    });
  };
  startLevel(0);
};

runGame(LEVELS, DOMDisplay);

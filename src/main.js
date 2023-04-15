import { arrowKeyCodes, LEVELS } from "./constants.js";
import { Level } from "./Level.js";
import { DOMDisplay } from "./DOMDisplay.js";
import { winMessage } from "./UrlQueryParams.ts";
import Hammer from "hammerjs";

const touchDetector = new Hammer(document.getElementsByTagName("html")[0]);
touchDetector.get("pan").set({ direction: Hammer.DIRECTION_ALL });

const trackKeys = (arrowKeyCodes) => {
  const pressed = Object.create(null);

  const handleKeyPress = (event) => {
    if (arrowKeyCodes.hasOwnProperty(event.keyCode)) {
      pressed[arrowKeyCodes[event.keyCode]] = event.type === "keydown";
      event.preventDefault();
    }
  };

  // TODO: instead of manually checking angles, use panup, pandown, panright, panleft hammerjs events
  //  https://hammerjs.github.io/recognizer-pan/
  const handleSwipe = (event) => {
    if (event.angle > -155 && event.angle < -90) {
      pressed["up"] = true;
      pressed["left"] = true;
      pressed["right"] = false;
    } else if (event.angle < -155 || (event.angle > 130 && event.angle < 180)) {
      pressed["left"] = true;
      pressed["right"] = false;
      pressed["up"] = false;
    } else if (event.angle > -20 && event.angle < 30) {
      pressed["right"] = true;
      pressed["left"] = false;
      pressed["up"] = false;
    } else if (event.angle < -20 && event.angle > -90) {
      pressed["up"] = true;
      pressed["right"] = true;
      pressed["left"] = false;
    }
    event.preventDefault();
  };

  const handleSwipeEnd = () => {
    pressed["right"] = false;
    pressed["left"] = false;
    pressed["up"] = false;
  };

  addEventListener("keydown", handleKeyPress);
  addEventListener("keyup", handleKeyPress);
  touchDetector.on("pan", handleSwipe);
  touchDetector.on("panend", handleSwipeEnd);
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

const arrows = trackKeys(arrowKeyCodes);

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

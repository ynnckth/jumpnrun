import { LEVELS, arrowKeyCodes } from "./constants.js";
import { Level } from "./Level.js";
import { DOMDisplay } from "./DOMDisplay.js";

const trackKeys = (arrowKeyCodes) => {
  const pressed = Object.create(null);
  const handler = (event) => {
    if (arrowKeyCodes.hasOwnProperty(event.keyCode)) {
      const down = event.type === "keydown";
      pressed[arrowKeyCodes[event.keyCode]] = down;
      event.preventDefault();
    }
  };
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
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
      else alert("You win!");
    });
  };
  startLevel(0);
};

runGame(LEVELS, DOMDisplay);

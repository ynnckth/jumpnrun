import { arrowKeyCodes, LEVELS } from "./constants.js";
import { Level } from "./Level.js";
import { DOMDisplay } from "./DOMDisplay.js";

const trackKeys = (arrowKeyCodes) => {
  const pressed = Object.create(null);
  let xDown = null;
  let yDown = null;
  let xUp = null;
  let yUp = null;
  let xDiff = null;
  let yDiff = null;

  const handleTouchStart = (event) => {
    const firstTouch = (event.touches || event.originalEvent.touches)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  // TODO: enhance switching swipe direction while moving (before touchend)
  const handleTouchMove = (event) => {
    if (!xDown || !yDown) return;
    xUp = event.touches[0].clientX;
    yUp = event.touches[0].clientY;
    xDiff = xDown - xUp;
    yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        pressed["left"] = true;
      } else {
        pressed["right"] = true;
      }
    } else {
      if (yDiff > 0) {
        pressed["up"] = true;
      }
    }
  };

  const handleTouchEnd = () => {
    xDown = null;
    yDown = null;
    pressed["right"] = false;
    pressed["left"] = false;
    pressed["up"] = false;
  };

  const handler = (event) => {
    if (arrowKeyCodes.hasOwnProperty(event.keyCode)) {
      pressed[arrowKeyCodes[event.keyCode]] = event.type === "keydown";
      event.preventDefault();
    }
  };
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  addEventListener("touchstart", handleTouchStart);
  addEventListener("touchmove", handleTouchMove);
  addEventListener("touchend", handleTouchEnd);
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

function getRandomInt() {
  return Math.floor(Math.random() * 1000);
}

class Game {
  constructor(canvasId, spriteSrc, controls) {
    const self = this;
    const canvas = document.getElementById(canvasId);

    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.fillStyle = '#fff';

    this.sprite = new Image();
    this.sprite.src = spriteSrc;

    this.sizes = {
      w: 200,
      h: 400,
      paddings: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      }
    };

    this.field = new Array(20).fill(new Array(10).fill(false));

    this.keyControl = new KeyControl(controls);

    this.state = {
      score: 0,
      start: true,
      lose: false,
      pause: false
    };

    this.objects = {
      alienPool: {},
      bulletPool: {},
      fortPool: {}
    };

    const tick = function () {
      self.update();
      self.render();
      requestAnimationFrame(tick);
    }

    setTimeout(tick, 500);
  }
  update() {

  }
  render() {
    this.field.forEach((line, i) => line.forEach((pixel, j) => {
      this.ctx.drawImage(
        this.sprite,
        j * 18,
        i * 18,
        18,
        18
      );
    }));
  }
  loseGame() {

  }
  pauseGame() {

  }
  startGame() {

  }
}

class Figure {
  constructor() {

  }
  update() {

  }
}

class KeyControl {
  constructor(controls) {
    const keyState = {};
    this.buttons = {
      rotate: document.getElementById(controls.rotate.elementId),
      left: document.getElementById(controls.left.elementId),
      right: document.getElementById(controls.right.elementId),
      down: document.getElementById(controls.down.elementId)
    };
    window.onkeydown = function (e) {
      Object.keys(controls).forEach(key => {
        if (controls[key] && controls[key].keyCode === e.keyCode) keyState[key] = true;
      });
    };
    window.onkeyup = function (e) {
      Object.keys(controls).forEach(key => {
        if (controls[key] && controls[key].keyCode === e.keyCode) keyState[key] = false;
      });
    };
    const enableKey = (keyName) => (e) => {
      e.preventDefault();
      keyState[keyName] = true;
    };
    const disableKey = (keyName) => (e) => {
      e.preventDefault();
      keyState[keyName] = false;
    };
    this.buttons.rotate.onmousedown = enableKey('rotate');
    this.buttons.rotate.onmouseup = disableKey('rotate');
    this.buttons.rotate.ontouchstart = enableKey('rotate');
    this.buttons.rotate.ontouchend = disableKey('rotate');

    this.buttons.left.onmousedown = enableKey('left');
    this.buttons.left.onmouseup = disableKey('left');
    this.buttons.left.ontouchstart = enableKey('left');
    this.buttons.left.ontouchend = disableKey('left');

    this.buttons.right.onmousedown = enableKey('right');
    this.buttons.right.onmouseup = disableKey('right');
    this.buttons.right.ontouchstart = enableKey('right');
    this.buttons.right.ontouchend = disableKey('right');

    this.buttons.down.onmousedown = enableKey('down');
    this.buttons.down.onmouseup = disableKey('down');
    this.buttons.down.ontouchstart = enableKey('down');
    this.buttons.down.ontouchend = disableKey('down');

    this.isPressed = (keyName) => keyState[keyName] === true;
  }
}

window.onload = () => {
  const game = new Game('tetris', './assets/img/pixel.png', {
    left: { keyCode: 37, elementId: 'control-left' },
    right: { keyCode: 39, elementId: 'control-right' },
    down: { keyCode: 40, elementId: 'control-down' },
    rotate: { keyCode: 32, elementId: 'control-rotate' }
  });
}


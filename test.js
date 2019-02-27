onload = function () {

  var ZOOM = 10;
  var FPS = 24;
  var LENGTH = 5;
  var started = false;

  var orientation = {
    N: 1, S: 2, E: 3, W: 4
  };

  var frame = {
    width: 20,
    height: 15,
    el: document.getElementById("frame")
  };

  var snake = function () {
    var body = new Array(LENGTH);
    for (let i = 0; i < LENGTH; i++) {
      body[i] = { x: i + 1, y: 1 };
    }
    return {
      orientation: orientation.E,
      updated: null,
      dead: false,
      speed: 5, // steps/s
      tail: 0,
      head: LENGTH - 1,
      body: body
    };
  }();

  window.start = start;
  frame.el.style.width = frame.width * ZOOM + "px";
  frame.el.style.height = frame.height * ZOOM + "px";
  refreshSnake();

  function start () {
    if (!started) {
      started = true;
      document.addEventListener("click", rotateSnake);
      snake.updated = new Date().getTime();
      setInterval(loop, 1000 / FPS);
    }
  }

  function loop () {
    var now = new Date().getTime();
    var t = now - snake.updated;
    var d = snake.speed * t / 1000;
    if (d >= 1) {
      updateSnake(Math.round(d));
      snake.updated = now;
      refreshSnake();
    }
  }

  function rotateSnake () {
    switch (snake.orientation) {
      case orientation.N:
        snake.orientation = orientation.E; break;
      case orientation.E:
        snake.orientation = orientation.S; break;
      case orientation.S:
        snake.orientation = orientation.W; break;
      case orientation.W:
        snake.orientation = orientation.N; break;
    }
  }

  function updateSnake (steps) {
    var tail, head;
    var dead = snake.dead;
    var length = snake.body.length;
    for (let i = 0; !dead && i < steps; i++) {
      tail = snake.body[snake.tail];
      head = snake.body[snake.head];
      snake.tail = (snake.tail + 1) % length;
      snake.head = (snake.head + 1) % length;
      tail.x = head.x;
      tail.y = head.y;
      head = tail;
      switch (snake.orientation) {
        case orientation.N: head.y -= 1; break;
        case orientation.S: head.y += 1; break;
        case orientation.E: head.x += 1; break;
        case orientation.W: head.x -= 1; break;
      }
      if (snake.dead = (
        head.y + 1 > frame.height
        || head.x + 1 > frame.width
        || head.y < 0
        || head.x < 0
      )) break;
    }
  }

  function refreshSnake (now) {
    var bg = snake.dead ? "red" : "white";
    frame.el.innerHTML = snake.body.map(function (bit) {
      return "<div style=\""
      + "width:" + ZOOM + "px;"
      + "height:" + ZOOM + "px;"
      + "top:" + (bit.y * ZOOM) + "px;"
      + "left:" + (bit.x * ZOOM) + "px;"
      + "position:absolute;"
      + "background:" + bg + ";"
      + "\"></div>";
    }).join("");
  }
};
<p>Tap or click in the snippet viewer to turn right&nbsp;! <button onclick="start(); event.stopPropagation();">Start</button></p>
<div id="frame" style="backgrou

var tileArray = [];
var gameWidth = 80;
var gameHeight = 80;
var ID = 0;
var TILE = 1;
var ROT = 2;

function setup() {
  document.body.removeChild(document.body.children[0]);
  var gameDiv = document.createElement("div");
  gameDiv.id = "gameDiv";
  var curEl = null;
  var curAr = [];
  for (var y = 0; y < gameHeight; y++) {
    for (var x = 0; x < gameWidth; x++) {
      curEl = document.createElement("div");
      curEl.className = "tile";
      curEl.id = "tile" + x + "," + y;
      gameDiv.appendChild(curEl);
      curAr.push([curEl.id, "bk", 0]);
    }
    gameDiv.appendChild(document.createElement("br"));
    tileArray.push(curAr);
    curAr = [];
  }
  document.body.appendChild(gameDiv);
  document.body.onkeydown = function(e) {keybinder.onkeydown(e);};
  levelLoader.loadLevel(level[0]);
}

function start() {
  levelLoader.loadLevel(level[levelLoader.curLevel]);
  for (var i = 0; i < 4; i++) {
    if (keybinder.worms[i].enabled) {
      activeWorms.push(new worm(levelLoader.worms[i].x,levelLoader.worms[i].y,levelLoader.worms[i].d,keybinder.worms[i].color, i));
    }
  }
  activeWorms.map(function (w) {w.registerKeyBindsAndUpdateLoop(1);});
  keybinder.bindings[13] = undefined;
  item.createItem = true;
  item.createItemAtInterval("c", 10000);
  item.createItemAtInterval("i", 10000);
  item.createItemAtInterval("d", 10000);
  item.createItemAtInterval("o", -1);
}

function gameOver(c) {
  console.log("GAME OVER!");
  console.log("COLOR " + c + " WON!");
  keybinder.bindings[13] = start;
  item.createItem = false;
}

var items = [];

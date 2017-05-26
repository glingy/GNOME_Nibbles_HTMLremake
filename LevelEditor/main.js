var tileArray = [];
var gameWidth = 80;
var gameHeight = 80;
var ID = 0;
var TILE = 1;
var ROT = 2;

function setup() {
  document.onselectstart = function() {return false;};
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
      curEl.onmouseover = function(e) {
        edit.hover(e);
      };
      curEl.onmouseout = function(e) {
        edit.hoverleave(e);
      };
      gameDiv.appendChild(curEl);
      curAr.push([curEl.id, "bk", 0]);
    }
    gameDiv.appendChild(document.createElement("br"));
    tileArray.push(curAr);
    curAr = [];
  }
  document.body.appendChild(gameDiv);
  levelLoader.loadLevel(level[0]);
  edit.loadEditor();
}

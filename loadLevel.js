function levelLoader() {
  this.curLevel = 0;
  this.levelHash = 0;
  this.worms = [{x: 20, y: 20, d: 3}, {x: 60, y: 20, d: 3}, {x: 20, y: 60, d: 1}, {x: 60, y: 60, d: 1}];
  this.loadLevel = function (lvl) {
    this.levelHash = Math.floor(Math.random()*10000000000);
    var lvla = lvl.split(/([0-9]+)/);
    console.log(lvla);
    lvla.shift();
    var curCount = lvla.shift();
    var curTile = lvla.shift();
    for (var y = 0; y < gameHeight; y++) {
      for (var x = 0; x < gameWidth; x++) {
        tile.setTile(x,y,key[curTile][TILE],key[curTile][ROT]);
        curCount--;
        if (curCount === 0) {
          if (lvla.length === 0) {
            x = 100000000;
            y = 100000000;
            return;
          } else {
            curCount = lvla.shift();
            curTile = lvla.shift();
          }
        }
      }
    }

  };
  this.saveLevel = function () {
    var lvl = [];
    var curTile = "";
    for (var y = 0; y < gameHeight; y++) {
      for (var x = 0; x < gameWidth; x++) {
        curTile = key2[tileArray[y][x][TILE] + tileArray[y][x][ROT]];
        if (lvl[lvl.length - 1] == curTile) {
          lvl[lvl.length - 2] += 1;
        } else {
          lvl.push(1);
          lvl.push(curTile);
        }
      }
    }
    return lvl.toString().replace(",","");
  };
  this.nextLevel = function() {
    this.loadLevel(level[this.curLevel++]);
  };
}

var levelLoader = new levelLoader();

var level = [
  "1j12i1l9o1j32i1l9o1j12i1l1f12o1k9o1k32o1k9o1k12o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o1f1g1h76o1m1n720o1j1h76o1m1l1f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o1f1g1h76o1m1n800o1j1h76o1m1l1f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f78o2f12o1e9o1e32o1e9o1e12o1f1g12i1n9o1g32i1n9o1g12i1n",
  "1i38h1l1e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o2e38o1e1f38h1n"
];

var key = {
  "a":[null, "wy", 0],
  "b":[null, "wb", 0],
  "c":[null, "wr", 0],
  "d":[null, "wg", 0],
  "e":[null, "we", 0],
  "h":[null, "we", 90],
  "k":[null, "we", 180],
  "m":[null, "we", 270],
  "f":[null, "ws", 0],
  "i":[null, "ws", 90],
  "g":[null, "wt", 0],
  "j":[null, "wt", 90],
  "l":[null, "wt", 180],
  "n":[null, "wt", 270],
  "o":[null, "bk", 0]
};
var key2 = {
  "wy0" : "a",
  "wb0" : "b",
  "wr0" : "c",
  "wg0" : "d",
  "we0" : "e",
  "we90" : "h",
  "we180" : "k",
  "we270" : "m",
  "ws0" : "f",
  "ws90" : "i",
  "wt0" : "g",
  "wt90" : "j",
  "wt180" : "l",
  "wt270" : "n",
  "bk0" : "o"
};

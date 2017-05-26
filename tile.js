function tile() {
  this.setTile = function (x,y,t,r) {// x position, y position, 2-letter tile abbreviation, absolute rotation (deg)
    r = r || 0;
    if (typeof x == "object") {
      r = t;
      t = y;
      y = x[1];
      x = x[0];
    }
    if (typeof t == "number") {
      r = t;
      t = null;
    }
    if (t) {
      tileArray[y][x][TILE] = t;
      t = tiles[t];
      document.getElementById("tile" + x + "," + y).style.backgroundPosition = t;
    }
    if (r == -90) {r = 270;}
    if (r != tileArray[y][x][ROT]) {
      if (tileArray[y][x][ROT] !== 0) {
        document.getElementById("tile" + x + "," + y).classList.remove("r" + tileArray[y][x][ROT]);
      }
      tileArray[y][x][ROT] = r;
      if (r !== 0) {document.getElementById("tile" + x + "," + y).classList.add("r" + r);}
    }
  };
  this.testTile = function (x,y,a) {
    if (typeof x == "object") {
      a = y;
      y = x[1];
      x = x[0];
    }
    if (typeof a == "string") {
      a = tiles[a];
    }
    if (a.indexOf(tileArray[y][x][TILE]) != -1) {
      return true;
    } else {
      return false;
    }
  };
}

var tiles = {
  "c1": "-00px -00px",
  "c2": "-16px -00px",
  "c3": "-00px -16px",
  "c4": "-16px -16px",
  "o1": "-32px -00px",
  "o2": "-48px -00px",
  "o3": "-32px -16px",
  "o4": "-48px -16px",
  "i1": "-00px -32px",
  "i2": "-16px -32px",
  "i3": "-00px -48px",
  "i4": "-16px -48px",
  "d1": "-32px -32px",
  "d2": "-48px -32px",
  "d3": "-32px -48px",
  "d4": "-48px -48px",
  "wy": "-00px -64px",
  "wb": "-16px -64px",
  "wr": "-32px -64px",
  "wg": "-48px -64px",
  "we": "-64px -00px",
  "ws": "-64px -16px",
  "wt": "-64px -32px",
  "bk": "-64px -64px",// -64 48 is a duplicate background
  "item": ["c1","c1","c2","c3","c4","o1","o2","o3","o4","i1","i2","i3","i4","d1","d2","d3","d4"],
  "wall": ["we","ws","wt"],
  "worm": ["wy","wb","wr","wg"]
};

var tile = new tile();

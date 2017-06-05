function tile() {
  this.canvas = document.getElementById("canvas");
  this.canvas.height = 1280;
  this.canvas.width = 1280;
  this.ctx = this.canvas.getContext("2d");
  this.tileSheet = new Image();
  this.tileSheet.src = "tileSheet.png";
  this.tileSheet.onload = function() {console.log("ImageLoaded!");};
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
    if (r == -90) {r = 270;}
    r = r || 0;
    r *= Math.PI/180;
    console.log(x);
    console.log(y);
    console.log(t);
    console.log(r);
    tileArray[y][x][ROT] = r;
    tileArray[y][x][TILE] = t;
    t = tiles[t];
    console.log(t);
    console.log(this.tileSheet);

    if (r !== 0) {
      this.ctx.save();
      this.ctx.translate(x*16 + 8, y*16 + 8);
      this.ctx.rotate(r);
      this.ctx.drawImage(this.tileSheet, t[0], t[1], 16, 16, -8, -8, 16, 16);
      this.ctx.restore();
    } else {
      this.ctx.drawImage(this.tileSheet, t[0], t[1], 16, 16, x*16, y*16, 16, 16);
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
  "c1": [00, 00],
  "c2": [16, 00],
  "c3": [00, 16],
  "c4": [16, 16],
  "o1": [32, 00],
  "o2": [48, 00],
  "o3": [32, 16],
  "o4": [48, 16],
  "i1": [00, 32],
  "i2": [16, 32],
  "i3": [00, 48],
  "i4": [16, 48],
  "d1": [32, 32],
  "d2": [48, 32],
  "d3": [32, 48],
  "d4": [48, 48],
  "wy": [00, 64],
  "wb": [16, 64],
  "wr": [32, 64],
  "wg": [48, 64],
  "we": [64, 00],
  "ws": [64, 16],
  "wt": [64, 32],
  "bk": [64, 64],// -64 48 is a duplicate background
  "item": ["c1","c1","c2","c3","c4","o1","o2","o3","o4","i1","i2","i3","i4","d1","d2","d3","d4"],
  "wall": ["we","ws","wt"],
  "worm": ["wy","wb","wr","wg"]
};

var tile = new tile();

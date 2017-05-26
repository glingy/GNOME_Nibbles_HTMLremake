function edit() {
  this.editDiv = document.getElementById("edit");
  this.cursor = [null, "bk", 0];
  this.mouseisdown = 0;
  this.loadEditor = function() {
    for (letter in key) {
      console.log(letter);
      var curEl = document.createElement("div");
      curEl.className = "tile";
      curEl.style.backgroundPosition = tiles[key[letter][TILE]];
      console.log(key[letter][ROT]);
      if (key[letter][ROT] !== 0) {
        console.log("rotate(" + key[letter][ROT] + "deg)");
        console.log(curEl);
        var rot = "rotate(" + key[letter][ROT] + "deg)";
        console.log(rot);
        curEl.style.transform = rot;
      } else {
        curEl.style.transform = "";
      }
      curEl.onclick = function(w) {edit.setCursor(w)}.bind(null, letter);
      this.editDiv.appendChild(curEl);
    }
  };
  this.setCursor = function(l) {
    this.cursor = key[l];
  };
  this.hover = function(e) {
    if (this.mouseisdown) {
      tile.setTile(Number(e.target.id.split(",")[0].split("tile")[1]), Number(e.target.id.split(",")[1]), this.cursor[TILE], this.cursor[ROT]);
    }
    e.target.style.backgroundPosition = tiles[edit.cursor[TILE]];
    e.target.style.transform = "rotate(" + edit.cursor[ROT] + "deg)";
  };
  this.mousedown = function(e) {
    console.log(e);
    if (e.target.classList.contains("tile")) {
      console.log("tile Clicked!");
      console.log([Number(e.target.id.split(",")[0].split("tile")[1]), Number(e.target.id.split(",")[1]), this.cursor[TILE], this.cursor[ROT]]);
      tile.setTile(Number(e.target.id.split(",")[0].split("tile")[1]), Number(e.target.id.split(",")[1]), this.cursor[TILE], this.cursor[ROT]);
    }
    this.mouseisdown = 1;
  };
  this.mouseup = function(e) {
    this.mouseisdown = 0;
  };
  this.hoverleave = function(e) {
    var tile = tileArray[Number(e.target.id.split(",")[1])][Number(e.target.id.split(",")[0].split("tile")[1])];
    e.target.style.backgroundPosition = tiles[tile[TILE]];
    e.target.style.transform = "rotate(" + tile[ROT] + "deg)";
  }
}

var edit = new edit();

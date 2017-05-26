function item() {
  this.createItem = 1; //can I create an item?
  this.oCount = 0;
  this.createItemAtInterval = function(item, int) {
    if (int == -1) {
      if (this.oCount++ > 10) {
        console.log("Next Level!");
        //levelLoader.nextLevel();
      }
    }
    setTimeout(function() {
      if (!this.createItem) {
        return;
      }

      var x,y,i = 0;
      while (true) {
        x = Math.floor(Math.random()*(gameWidth-1));
        y = Math.floor(Math.random()*(gameHeight-1));
        if (tileArray[y][x][TILE] == "bk" &&
            tileArray[y+1][x][TILE] == "bk" &&
            tileArray[y][x+1][TILE] == "bk" &&
            tileArray[y+1][x+1][TILE] == "bk") {
          tile.setTile(x,y,item + "1");
          tile.setTile(x+1,y,item + "2");
          tile.setTile(x,y+1,item + "3");
          tile.setTile(x+1,y+1,item + "4");
          if (int != -1) {
            setTimeout(function() {
              if (tileArray[y][x][TILE][1] == "1") {
                tile.setTile(x,y,"bk");
                tile.setTile(x+1,y,"bk");
                tile.setTile(x,y+1,"bk");
                tile.setTile(x+1,y+1,"bk");
              }
            }.bind(self, x, y), 15000);
          }
          break;
        }
        if (i++ > 10 && int != -1) {
          break;
        }
      }
      if (int != -1) {this.createItemAtInterval(item,int)};
    }.bind(this,item,int), Math.floor(Math.random()*2000 + int));
  };
  this.delete = function(pos) {
    var x = pos[0];
    var y = pos[1];
    var type = tileArray[y][x][TILE][0];
    if (tileArray[y][x][TILE][1] == 2) {
      x--;
    } else if (tileArray[y][x][TILE][1] == 3) {
      y--;
    } else if (tileArray[y][x][TILE][1] == 4){
      x--;
      y--;
    }
    tile.setTile(x,y,"bk");
    tile.setTile(x+1,y,"bk");
    tile.setTile(x,y+1,"bk");
    tile.setTile(x+1,y+1,"bk");
    return type;
  };
}

var item = new item();

function worm(x,y,d,c,i) {
  this.worms = [];
  this.name = null;
  this.number = i;
  this.parts = [[x,y]];
  this.spawnPoint = [x,y,d];
  this.color = c;
  this.direction = d; //1up,2right,3down,4left
  this.growing = 5;
  this.interval = null;
  this.deathCount = 0;
  this.dirChanged = 1;
  this.update = function() {
      if (this.parts == []) {return;}
      this.head();
      if (this.growing === 0) {
        this.shrink(1);
      } else {
        this.growing--;
      }
  };
  this.shrink = function(n,t) {
    if (n == 1 && (this.parts.length > 1 || t)) {
      tile.setTile(this.parts.pop(),"bk");
    } else {
      for (var i = 0; i < n; i++) {
        if (this.parts.length > 1 || t) {
          tile.setTile(this.parts.pop(),"bk");
        }
      }
    }
  };
  this.head = function() {
    this.dirChanged = 0;
    if (this.direction % 2 === 0) {
      this.parts.unshift([this.parts[0][0] - (this.direction - 3), this.parts[0][1]]);
    } else {
      this.parts.unshift([this.parts[0][0], this.parts[0][1] + (this.direction - 2)]);
    }
    if (this.parts[0][0] < 0 || this.parts[0][0] > gameWidth-1) {
      this.parts[0][0] = this.parts[0][0] < 0 ? gameWidth-1 : 0;
    }
    if (this.parts[0][1] < 0 || this.parts[0][1] > gameHeight-1) {
      this.parts[0][1] = this.parts[0][1] < 0 ? gameHeight-1 : 0;
    }
    if (!tile.testTile(this.parts[0],["bk"])) {
      if (tile.testTile(this.parts[0],"worm")) {
        clearInterval(this.interval);
        this.die();
        return;
      } else if (tile.testTile(this.parts[0],"wall")) {
        clearInterval(this.interval);
        this.die();
        return;
      } else {
        var itemm = item.delete(this.parts[0]);
        if (itemm == "o") {
          this.growing = 4;
          item.createItemAtInterval("o", -1, levelLoader.levelHash);
        } else if (itemm == "i") {
          this.growing = 10;
        } else if (itemm == "c") {
          this.shrink(this.parts.length > 3? 3 : this.parts.length - 2);
        } else if (itemm == "d") {
          for (w of activeWorms) {
            if (w.color != this.color) {
              w.swapHeads(this.color);
            }
          }
        }
      }
    }
    tile.setTile(this.parts[0],"w" + c);
  };
  this.swapHeads = function(c) {
    console.log(this.parts);
    var newdir = 0;
    var lastPoint = this.parts[this.parts.length-1];
    var slastPoint = this.parts[this.parts.length-2];
    if (lastPoint[0] == slastPoint[0]) {
      newdir = 1;
    } else {
      newdir = 2;
    }
    if (lastPoint[1] > slastPoint[1] || lastPoint[0] < slastPoint[0]) {
      newdir += 2;
    }
    console.log(newdir);
    this.parts.reverse();
    this.direction = newdir;
    console.log(this.parts);
  };
  this.setDir = function(dir) {
    console.log(this.dirChanged);
    if (((this.direction - dir) % 2 !== 0) && !this.dirChanged) {
      this.direction = dir;
      this.dirChanged = 1;
    }
    console.log(this.dirChanged);
  };
  this.registerKeyBindsAndUpdateLoop = function(b) { //bool
    if (b) {
      keybinder.bindings[keybinder.worms[i].up] = function() {this.setDir(1)}.bind(this);
      keybinder.bindings[keybinder.worms[i].right] = function() {this.setDir(2)}.bind(this);
      keybinder.bindings[keybinder.worms[i].down] = function() {this.setDir(3)}.bind(this);
      keybinder.bindings[keybinder.worms[i].left] = function() {this.setDir(4)}.bind(this);
      this.interval = setInterval(function() {this.update()}.bind(this), keybinder.updateSpeed);
    } else {
      keybinder.bindings[keybinder.worms[i].up] = null;
      keybinder.bindings[keybinder.worms[i].right] = null;
      keybinder.bindings[keybinder.worms[i].down] = null;
      keybinder.bindings[keybinder.worms[i].left] = null;
      this.interval = null;
    }
  };
  this.die = function() {
    this.deathCount++;
    this.parts.shift();
    this.registerKeyBindsAndUpdateLoop(0);
    this.shrink(this.parts.length, 1);
    this.parts.push([this.spawnPoint[0],this.spawnPoint[1]]);
    this.growing = 5;
    this.direction = this.spawnPoint[2];
    if (this.deathCount < 3) {
      this.registerKeyBindsAndUpdateLoop(1);
    } else {
      activeWorms.splice(activeWorms.indexOf(this), 1);
      console.log(activeWorms);
      if (activeWorms.length === 0) {
        gameOver(this.color);
      }
    }
  }
}

var activeWorms = [];

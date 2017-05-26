function keybinder() {
  function wormKeys(c,e,u,d,l,r) {
    this.color = c;
    this.enabled = e;
    this.up = u;
    this.down = d;
    this.left = l;
    this.right = r;
    this.setChar = function(w,k) {
      if (w == 1) {
        this.up = k;
      } else if (w == 2) {
        this.down = k;
      } else if (w == 3) {
        this.left = k;
      } else if (w == 4) {
        this.right = k;
      }
    };
  }
  this.getCharFor = null;
  this.bindings = {
    13: start
  };
  this.worms = [
    new wormKeys("r",true, 38, 40, 37, 39),
    new wormKeys("g",false, 87, 83, 65, 68),
    new wormKeys("y",false),
    new wormKeys("b",false)
  ];
  this.onkeydown = function(e) {
    if (this.getCharFor !== null) {
      var key = e.which;
      if (e.which == 27) {
        key = undefined;
        e.preventDefault();
      }
      this.worms[this.getCharFor[0]].setChar(this.getCharFor[1], key);
      key = e.key;
      if (key.indexOf("Arrow") != -1) {
        key = key.split(/Arrow/)[1] + " Arrow";
      }
      this.getCharFor[2].innerHTML = this.getCharFor[2].innerHTML.replace(/:.*/, ": " + key);
      this.getCharFor = null;
      return;
    } else {
      (this.bindings[e.which] || function() {})();
    }
  };
  this.displayKeybinds = function() {
    if (!document.getElementById("keyholder")) {
      var maindiv = document.createElement("div");
      maindiv.id = "keyholder";
      maindiv.innerHTML = "<div id=\"keybinds\"><div class=\"keybinds\" id=\"rSnake\" onclick=\"keybinder.disable(event,1)\"><h2>Red Snake:</h2><span onclick=\"keybinder.setCharFor(event,1,1)\">Up: Up Arrow</span><br><span onclick=\"keybinder.setCharFor(event,1,2)\">Down: Down Arrow</span><br><span onclick=\"keybinder.setCharFor(event,1,3)\">Left: Left Arrow</span><br><span onclick=\"keybinder.setCharFor(event,1,4)\">Right: Right Arrow</span><br><div class=\"disabler\"></div></div><div  class=\"keybinds disabled\" id=\"gSnake\" onclick=\"keybinder.disable(event,2)\"><h2>Green Snake:</h2><span onclick=\"keybinder.setCharFor(event,2,1)\">Up: w</span><br><span onclick=\"keybinder.setCharFor(event,2,2)\">Down: s</span><br><span onclick=\"keybinder.setCharFor(event,2,3)\">Left: a</span><br><span onclick=\"keybinder.setCharFor(event,2,4)\">Right: d</span><br><div class=\"disabler\"></div></div><br><div class=\"keybinds disabled\" id=\"ySnake\"   onclick=\"keybinder.disable(event,3)\"><h2>Yellow Snake:</h2><span onclick=\"keybinder.setCharFor(event,3,1)\">Up: none</span><br><span onclick=\"keybinder.setCharFor(event,3,2)\">Down: none</span><br><span onclick=\"keybinder.setCharFor(event,3,3)\">Left: none</span><br><span onclick=\"keybinder.setCharFor(event,3,4)\">Right: none</span><br><div class=\"disabler\"></div></div><div class=\"keybinds disabled\" id=\"bSnake\" onclick=\"keybinder.disable(event,4)\"><h2>Blue Snake:</h2><span   onclick=\"keybinder.setCharFor(event,4,1)\">Up: none</span><br><span onclick=\"keybinder.setCharFor(event,4,2)\">Down: none</span><br><span onclick=\"keybinder.setCharFor(event,4,3)\">Left: none</span><br><span onclick=\"keybinder.setCharFor(event,4,4)\">Right: none</span><br><div class=\"disabler\"></div></div><img src=\"close.png\" onclick=\"keybinder.closeKeybinds()\"/></div>";
      document.body.appendChild(maindiv);
    } else {
      document.getElementById("keyholder").style.display = "flex";
    }
  };
  this.disable = function(e,n) {
    if (e.target.className == "disabler") {
      e.target.parentElement.className = "keybinds";
      this.worms[n-1].enabled = true;
    } else if (e.target.className.indexOf("keybinds") != -1){
      e.target.className = "keybinds disabled";
      this.worms[n-1].enabled = false;
    }
  };
  this.setCharFor = function(e,wormColor, direction) {
    e.stopPropagation();
    if (this.getCharFor === null) {
      e.target.innerHTML = e.target.innerHTML.replace(/:.*/, ": setting...");
      this.getCharFor = [wormColor-1, direction, e.target];
    } else {
      var h = e.target.innerHTML;
      e.target.innerHTML = "Error";
      setTimeout(function(h) {this.target.innerHTML = h;}.bind(e,h), 1000);
    }
  };
  this.closeKeybinds = function() {
    if (this.validKeys()) {
      document.getElementById("keyholder").style.display = "none";
    } else {
      alert("Duplicate or undefined keys found in enabled snakes.\nPlease disable the snake or fix the keybindings.");
    }
  };
  this.validKeys = function() {
    var tmpKeysArray = [];
    for (var i = 0; i < 4; i++) {
      var w = this.worms[i];
      console.log(w.enabled);
      if (w.enabled == true) {
        console.log("Checking Worm");
        if (w.up && w.down && w.left && w.right) {
          if (tmpKeysArray.indexOf(w.up) == -1 && tmpKeysArray.indexOf(w.down) == -1 && tmpKeysArray.indexOf(w.left) == -1 && tmpKeysArray.indexOf(w.right) == -1) {
            var tmpArray = [];

            if (tmpArray.indexOf(w.up) == -1) {
              tmpArray.push(w.up);
            } else {return false;}

            if (tmpArray.indexOf(w.down) == -1) {
              tmpArray.push(w.down);
            } else {return false;}

            if (tmpArray.indexOf(w.left) == -1) {
              tmpArray.push(w.left);
            } else {return false;}

            if (tmpArray.indexOf(w.right) == -1) {
              tmpArray.push(w.right);
            } else {return false;}

            tmpKeysArray.push(w.up);
            tmpKeysArray.push(w.down);
            tmpKeysArray.push(w.left);
            tmpKeysArray.push(w.right);
            console.log(tmpArray);
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    console.log(tmpKeysArray);
    return true;
  };
}

var keybinder = new keybinder();

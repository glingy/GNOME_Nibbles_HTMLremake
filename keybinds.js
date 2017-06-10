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
  this.updateSpeed = 50;
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
      console.log(e);
      console.log(e.charCode);
      this.getCharFor[2].innerHTML = this.getCharFor[2].innerHTML.replace(/:.*/, ": " + this.stringFromID(key));
      this.getCharFor = null;
      return;
    } else {
      (this.bindings[e.which] || function() {})();
    }
  };
  this.stringFromID = function(s) {
    console.log(s);
    var ret = String.fromCharCode(s);
    console.log(ret);
    console.log(ret.length);
    if (ret.length > 1) {
      ret = s;
    }
    if (s === 0) {
      ret = "None";
    }
    console.log(ret);
    return ret;
  };
  this.displayKeybinds = function() {
    this.getCookie();
    document.getElementById("keyholder").style.display = "flex";
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
      this.setCookie();
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
  this.speedUpdate = function(e) {
    var displaySpeed = (e.target.value.length == 1? "00" : e.target.value.length == 2? "0" : "") + e.target.value + "ms";
    document.getElementById("curSpeed").innerHTML = displaySpeed;
    console.log(e.target.value);
    this.updateSpeed = e.target.value;
  };
  this.setCookie = function() {
    var cookie = [];
    for (var i = 0; i < 4; i++) {
      cookie.push(this.worms[i].color, this.worms[i].enabled, this.worms[i].up, this.worms[i].down, this.worms[i].left, this.worms[i].right);
    }
    cookie.push(this.updateSpeed);
    document.cookie = "cookie=" + cookie.join("!") + "; expires=Thu, 1 Jan 2111 00:00:00 UTC";
  };
  this.getCookie = function() {
    if (!document.cookie) {return}
    var cookie = document.cookie.split(";")[0].split("=")[1].split("!");
    for (var i = 0; i < 4; i++) {
      this.worms[i] = new wormKeys(cookie.shift(),cookie.shift() == "true"? true : false,Number(cookie.shift()),Number(cookie.shift()),Number(cookie.shift()),Number(cookie.shift()));
      console.log(this.worms[i]);
      document.getElementById(this.worms[i].color + "Snake").className = this.worms[i].enabled ? "keybinds" : "keybinds disabled";
      document.getElementById("keybindss").children[i].children[1].innerHTML = "Up: " + this.stringFromID(this.worms[i].up);
      document.getElementById("keybindss").children[i].children[3].innerHTML = "Down: " + this.stringFromID(this.worms[i].down);
      document.getElementById("keybindss").children[i].children[5].innerHTML = "Left: " + this.stringFromID(this.worms[i].left);
      document.getElementById("keybindss").children[i].children[7].innerHTML = "Right: " + this.stringFromID(this.worms[i].right);
    }
    this.updateSpeed = Number(cookie.shift());
    document.getElementById("speed").children[1].value = this.updateSpeed;
    document.getElementById("curSpeed").innerHTML = (this.updateSpeed.length == 1? "00" : this.updateSpeed.length == 2? "0" : "") + this.updateSpeed + "ms";
  }
}

var keybinder = new keybinder();

function Utility() {
  var def = {
  isDoubleTapBug: function(evt) {
    if (!('ontouchstart' in document.documentElement)) return false;
    if (!evt.originalEvent.touches) {
      evt.preventDefault();
      evt.stopPropagation();
      return true;
    }
    return false;
  },
  touchEnded: function() {
    touchEndedSinceTap = true;
  },
  isTouch: function() {
    return 'ontouchstart' in document.documentElement;
  },
  padLeft: function (nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
  },
  trim: function (s) {
    return s.replace(/^\s*|\s*$/gi, '');
  },
  between: function (min, max, decimals) {
    if (decimals)
      return ((Math.random() * (max - min)) + min).toFixed(decimals) * 1;
    return Math.floor((Math.random() * (max - min + 1)) + min);
  },
  shuffleSimple: function(sourceArray) {
    sourceArray.sort(function() { return .5 - Math.random(); });
    return sourceArray;
  },
  shuffle: function (sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
      var k = n + Math.floor(Math.random() * (sourceArray.length - n));

      var temp = sourceArray[k];
      sourceArray[k] = sourceArray[n];
      sourceArray[n] = temp;
    }
    return sourceArray;
  },
  index: function (obj, i) {
    var j = 0;
    for (var name in obj) {
      if (j == i)
        return obj[name];
      j++;
    }
  },
  areArraysEqual: function(arr1, arr2) {
    if (!arr1 || !arr2) return false;
    return arr1.join('|') === arr2.join('|'); // dirty but enough
  },
  count: function (obj) {
    var count = 0;
    for (var name in obj)
      count++;
    return count;
  },
  eat: function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  },
  pick: function (arr) {
    var drawFromArr = arr;
    if (arr.constructor == Object) {
      drawFromArr = [];
      for (var id in arr)
        drawFromArr.push(id);
    }
    var drawIndex = Utils.between(0, drawFromArr.length - 1);
    if (drawFromArr.length == 0)
      return null;
    return drawFromArr[drawIndex];
  },
  draw: function (arr, optionalValueToMatch) {
    var drawFromArr = arr;
    if (arr.constructor == Object) {
      drawFromArr = [];
      for (var id in arr)
        drawFromArr.push(id);
    }
    if (drawFromArr.length == 0)
      return null;
    var drawIndex = Utils.between(0, drawFromArr.length - 1);
    // if a value was given, find that one
    if (optionalValueToMatch != undefined) {
      var foundMatch = false;
      for (var i = 0; i < drawFromArr.length; i++) {
        if (drawFromArr[i] == optionalValueToMatch) {
          drawIndex = i;
          foundMatch = true;
          break;
        }
      }
      if (!foundMatch)
        return null;
    }
    var value = drawFromArr[drawIndex];
    drawFromArr.splice(drawIndex, 1);
    return value;
  },
  // removes the given value from arr
  removeFromArray: function (arr, val) {
    if (arr.length == 0)
      return null;
    var foundMatch = false, drawIndex = -1;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        drawIndex = i;
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch)
      return null;
    var value = arr[drawIndex];
    arr.splice(drawIndex, 1);
    return value;
  },
  toArray: function (obj) {
    var arr = [];
    for (var id in obj)
      arr.push(id);
    return arr;
  },
  fillArray: function(min, max, repeatEachValue) {
    if (!repeatEachValue)
      repeatEachValue = 1;
    var arr = new Array();
    for (var repeat=0; repeat<repeatEachValue; repeat++)
      for (var i=min; i<=max; i++)
        arr.push(i);
    return arr;
  },
  contains: function(arr, item) {
    for (var i=0; i<arr.length; i++)
      if (arr[i] == item)
        return true;
    return false;
  },
  setCookie: function(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    } else
      var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  },
  getCookie: function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for ( var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  clearCookie: function(name) {
    this.setCookie(name, "", -1);
  },
  cssVendor: function($el, prop, value) {
    switch (prop) {
      case 'opacity':
        if ($.browser.ie) {
          $el.css('-ms-filter', '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + Math.round(value * 100) + ')"');
        }
        else
          $el.css(prop, value);
        break;
      default:
        var prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-'];
        for (var i=0; i<prefixes.length; i++) {
          $el.css(prefixes[i] + prop, value);
        }
        break;
    }
  },
  createCSS: function(s, id) {
    id = id || 'tempcss';
    $('#' + id).remove();
    var style = '<style id="' + id + '">' + s + '</style>';
    
    // windows security
    if (!window.isWebApp && window.MSApp && window.MSApp.execUnsafeLocalFunction) {
      MSApp.execUnsafeLocalFunction(function() {
        $('head').first().append($(style));
      });
    }
    else
      $('head').first().append($(style));
  },
  setColorScheme: function(c1) {
    var c2 = Colors.getComplementary(c1),
        lum = 0.1,
        c1lum = Colors.luminateHex(c1, lum),
        c2lum = Colors.luminateHex(c2, lum);
    var css = '' +
      '.odd  .tile-1 .inner { background-color: ' + c1 + '; }' +
      '.even .tile-1 .inner { background-color: ' + c1lum + '; }' +
      '.odd  .tile-2 .inner { background-color: ' + c2 + '; }' +
      '.even .tile-2 .inner { background-color: ' + c2lum + '; }';
    Utils.createCSS(css);
  }

  };
  for (var o in def)
    this[o] = def[o];
}function State(grid) {
	var self = this,
			saveSlots = {},

			stateStack,
			currentState;

  this.grid = grid;

  function clear() {
  	stateStack = {};
  	currentState = stateStack;
  }

  // adds the changed tile to the stack
  function push(tile) {
  	var id = tile.value == 1? tile.id1 : tile.id2;
  	var newState = { 'parent': currentState, tile: tile };
  	// add the new state on top of the current
  	currentState[id] = newState;
  	// for this specific tile, count how many values have been tried
  	if (currentState[tile.id])
  		currentState[tile.id]++
  	else
  		currentState[tile.id] = 1;
  	currentState = newState;
  }

  function pop() {
  	do {
  		// clear the working on tile
	  	var tile = currentState.tile;
	  	tile.clear();
	  	currentState = currentState.parent;
  	}
  	while (currentState && currentState[tile.id] == 2)
  }

  function save(saveId, values) {
    saveId = saveId || '1';
    var slot = { id: saveId, values: [], restoreCount: 0 };
    if (values) {
      for (var i=0; i<values.length; i++)
        slot.values.push(values[i])
    }
    else {
      for (var i=0; i<self.grid.tiles.length; i++)
        slot.values.push(self.grid.tiles[i].value);
    }
    saveSlots[saveId] = slot;
    return self;
  }

  function restore(saveId) {
    saveId = saveId || '1';
    var slot = saveSlots[saveId];
    slot.restoreCount++;
    for (var i=0; i<slot.values.length; i++)
      self.grid.tiles[i].value = slot.values[i];
    return self;
  }

  function getValueForTile(saveId, x, y) {
    var slot = saveSlots[saveId];
    if (!slot) 
    	return -1;
    if (isNaN(y)) {
    	var i = x,
      		x = i % self.grid.width,
      		y = Math.floor(i / self.grid.width);
    }
    return slot.values[y * self.grid.width + x];
  }

  this.clear = clear;
  this.save = save;
  this.restore = restore;
  this.push = push;
  this.pop = pop;
  this.getValueForTile = getValueForTile;
  this.__defineGetter__('currentState', function() { return currentState; })
}function Grid(size, height, id) {
  var self = this,
      id = id || 'board';
      width = size,
      height = height || size,
      tiles = [],
      renderTOH = 0,
      noRender = false;
      emptyTile = new Tile(-99,self,-99),
      maxPerRow = Math.ceil(width/2),
      maxPerCol = Math.ceil(height/2),

      wreg = new RegExp('[12]{' + width + '}'),
      hreg = new RegExp('[12]{' + height + '}'),
      tripleReg = new RegExp('1{3}|2{3}'),
      tripleRedReg = new RegExp('1{3}'),
      tripleBlueReg = new RegExp('2{3}'),
      count0reg = new RegExp('[^0]', 'g'),
      count1reg = new RegExp('[^1]', 'g'),
      count2reg = new RegExp('[^2]', 'g'),
      rendered = false,
      quality = 0,
      tileToSolve = null;

  var state = self.state = new State(this);
  var hint = self.hint = new Hint(this);

  function each(handler) {
    for (var i=0; i<tiles.length; i++) {
      var x = i%width,
          y = Math.floor(i/width),
          tile = tiles[i],
          result = handler.call(tile, x, y, i, tile);
      if (result)
        break;
    }
    return self;
  }

  function load(values, fullStateValues) {
    if (values) {
      width = height = Math.sqrt(values.length);
      if (fullStateValues)
        self.state.save('full', fullStateValues);
    }
    tiles = [];
    for (var i=0; i<width*height; i++) {
      var value = values? values[i] : 0;
      tiles[i] = new Tile(value, self, i);
    }
    render();
    return self;
  }

  function getIndex(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height)
      return -1;
    return y * width + x;
  }

  function render() {
  }

  function domRenderer(direct) {
    if (noRender) return;
    clearTimeout(renderTOH);
    if (!direct) {
      renderTOH = setTimeout(function() {domRenderer(true);}, 0);
      return;
    }
    if (Game.debug)
      console.log('rendering...')
    rendered = false;
    var html = '<table data-grid="' + id + '" id="grid" cellpadding=0 cellspacing=0>';
    for (var y=0; y<height; y++) {
      html += '<tr>';
      for (var x=0; x<width; x++) {
        var index = getIndex(x,y),
            tile = tiles[index],
            label = tile? ((tile.value > 0)? tile.value : '') : '';
        var odd = (x + (y % 2)) % 2;
        html += '<td data-x="'+x+'" data-y="'+y+'" class="' + (odd? 'even' : 'odd') + '"><div id="tile-' + x + '-' + y + '" class="tile tile-' + label + '"><div class="inner"></div></div></td>';
      }      
      html += '</tr>';
    }
    html += '</table>';
    $('#' + id).html(html);
    Game.resize();
    rendered = true;
    return self;
  }

  function getTile(x, y) {
    // if no y is specified, use x as interger
    if (isNaN(x)) return emptyTile;
    if (isNaN(y)) {
      var i = x;
      x = i % width,
      y = Math.floor(i / width);
    }
    if (x < 0 || x >= width || y < 0 || y >= height)
      return emptyTile;
    return tiles[getIndex(x,y)];
  }
  var tile = getTile; // other reference

  function clear() {
    each(function() { this.clear(); });
    return self;
  }

  function getEmptyTiles() {
    var emptyTiles = [];
    each(function() {
      if (this.isEmpty)
        emptyTiles.push(this);
    })
    return emptyTiles;
  }

  function generate() {
    var result = solve(true);
    self.state.save('full');
    return result;
  }

  function step(isGenerating) {
    return solve(isGenerating, true);
  }

  function ease(percentage) {
    var emptyTiles = getEmptyTiles(),
        easeCount = percentage? Math.floor((percentage / 100) * emptyTiles.length) : 1;
    if (!emptyTiles.length)
      return self;
    
    Utils.shuffle(emptyTiles);
    for (var i=0; i<easeCount; i++) {
      var tile = emptyTiles[i];
      tile.value = self.state.getValueForTile('full', tile.x, tile.y);
    }
    return self;
  }

  function solve(isGenerating, stepByStep) {
    var attempts = 0,
        tile,
        emptyTiles,
        pool = tiles;
    
    self.state.clear();
    noRender = true;

    // for stepByStep solving, randomize the pool
    if (isGenerating || stepByStep) {
      var pool = tiles.concat();
      Utils.shuffle(pool);
    }
    // if tileToSolve, put its row/col items first as they hugely increase time to solve tileToSolve
    if (tileToSolve) {
      var sameRow = [],
          sameCol = [],
          pool2 = [];
      each(function(x,y,i) { 
        if (x == tileToSolve.x)
          sameCol.push(this)
        else if (y == tileToSolve.y)
          sameRow.push(this)
        else 
          pool2.push(this);
      });
      // put all its row/col items first, then tileToSolve (again), then the rest
      pool = sameRow.concat(sameCol, [tileToSolve], pool2);
    }

    var totalAtt = width * height * 50;
    while (attempts++ < totalAtt) {
      emptyTiles = [];
      var tileChanged = false;

      // phase 1: try easy fixes while building a pool of remaining empty tiles
      for (var i=0; i<pool.length; i++) {
        tile = pool[i];
        if (!tile.isEmpty)
          continue
        var tileCanBeSolved = solveTile(tile);
        if (tileCanBeSolved) {
          if (hint.active)
            return;
          tileChanged = tile;
          break;
        }
        else {
          emptyTiles.push(tile);
        }
      }

      // when the broken tile was found, quickly return true!
      if (tileToSolve && tileChanged && tileToSolve.x == tileChanged.x && tileToSolve.y == tileChanged.y) {
        //console.log('quickwin!', attempts)
        return true;
      }

      // phase 2: no tile changed and empty ones left: pick random and try both values
      if (!tileChanged && emptyTiles.length && isGenerating) {
        tile = emptyTiles[0];
        // try both values
        var valueToTry = Utils.pick(tile.possibleValues);
        tile.value = valueToTry;
        self.state.push(tile); // mark this value as used
        if (!isValid()) {
          self.state.pop(tile);
          tile.value = valueToTry == 1? 2 : 1;
          self.state.push(tile);
          if (!isValid()) {
            self.state.pop(tile);
          }
        }

        continue;
      }

      // phase 3: push changed tile and check validity
      if (tileChanged) {
        self.state.push(tileChanged);
        if (!isValid()) {
          self.state.pop();
        }
      }
      // no tile changed and no empty tiles left? break the while loop!
      else
        break;

      if (stepByStep) {
        break; // step by step solving? quit
      }
    }

    //console.log(attempts, isGenerating == true)

    noRender = false;
    render();
    return getEmptyTiles().length == 0;
  }

  function generateFast() {
    var combos = [],
        tripleReg = new RegExp('0{3}|1{3}', 'g');

    noRender = true;
    
    function generateCombos() {
      for (var i=0,l=Math.pow(2,width); i<l; i++) {
        var c = Utils.padLeft((i).toString(2), width);
        if (c.match(tripleReg) ||
          (c.split(0).length-1) > maxPerRow || 
          (c.split(1).length-1) > maxPerRow)
          continue;
        combos.push(c);
      }
    }

    generateCombos();

    Utils.shuffle(combos);

    function clearRow(y) {
      for (var x=0; x<width; x++) {
        var tile = getTile(x, y);
        tile.clear();
      }
      var combo = comboUsed[y];
      if (combo) {
        combos.push(combo);
        delete comboUsed[y];
      }
    }
    
    var y = 0,
        comboUsed = [],
        attempts = Utils.fillArray(0,0,width);
    do {
      attempts[y]++;
      var combo = combos.shift();
      for (var x=0; x<width; x++) {
        var tile = getTile(x, y);
        tile.value = (combo.charAt(x) * 1) + 1;
      }
      if (isValid()) {
        comboUsed[y] = combo;
        y++;
      }
      else {
        combos.push(combo);
        clearRow(y);
        if (attempts[y] >= combos.length) {
          attempts[y] = 0;
          var clearFromY = 1;
          for (var y2 = clearFromY; y2 < y; y2++) {
            clearRow(y2);
            attempts[y2] = 0;
          }
          y = clearFromY;
        }
      }
    }
    while (y < height);
    self.state.save('full');
    noRender = false;
  }

  function solveTile(tile) {
    tile.collect(hint);

    // if the current tile already has a closed path with either value 1 or 0, consider the other one as single option
    if (self.state.currentState) {
      if (self.state.currentState[tile.id2])
        tile.possibleValues = [1];
      else if (self.state.currentState[tile.id1])
        tile.possibleValues = [2];
    }

    if (tile.possibleValues.length == 1) {
      
      if (hint.active)
        return true;

      // tile can be solved
      tile.value = tile.possibleValues[0];
      return true;
    }
    if (tile.emptyRowPairWith) {
      if (findCombo(tile, tile.emptyRowPairWith)) {
        
        // if we're looking for a hint, clear the tile and set the hint
        if (hint.active) {
          tile.clear();
          var hType = HintType.SinglePossibleRowCombo,
              doubleRowOrCol = [];
          if (hint.doubleColFound.length) {
            hType = HintType.ColsMustBeUnique;
            doubleRowOrCol = hint.doubleColFound;
          }
          else if (hint.doubleRowFound.length) {
            hType = HintType.RowsMustBeUnique;
            doubleRowOrCol = hint.doubleRowFound;
          }
          hint.mark(tile, hType, tile.emptyRowPairWith, doubleRowOrCol);
          return true;
        }

        // tile can be solved
        return true;
      }
    }
    if (tile.emptyColPairWith) {
      if (findCombo(tile, tile.emptyColPairWith)) {

        // if we're looking for a hint, clear the tile and set the hint
        if (hint.active) {
          tile.clear();
          var hType = HintType.SinglePossibleColCombo,
              doubleRowOrCol = [];
          if (hint.doubleColFound.length) {
            hType = HintType.ColsMustBeUnique;
            doubleRowOrCol = hint.doubleColFound;
          }
          else if (hint.doubleRowFound.length) {
            hType = HintType.RowsMustBeUnique;
            doubleRowOrCol = hint.doubleRowFound;
          }
          hint.mark(tile, hType, tile.emptyColPairWith, doubleRowOrCol);
          return true;
        }

        // tile can be solved
        return true;
      }
    }
    return false;
  }

  // finds a valid combo for tile1 and tile2 based on inverting an invalid attempt
  function findCombo(tile, tile2) {
    // see if we're checking a row or column
    for (var valueForTile1 = 1; valueForTile1 <= 2; valueForTile1++) {
      tile.value = valueForTile1;
      tile2.value = valueForTile1==1?2:1;
      if (!isValid()) {
        // only fill out a single tile (the first), which makes backtracking easier
        tile.value = valueForTile1==1?2:1;
        tile2.clear();
        return true;
      }
    }
    tile.clear();
    tile2.clear();
    return false;
  }

  // gridInfo section is for speeding up isValid method
  var gridInfo = {
    cols: [],
    rows: [],
    colInfo: [],
    rowInfo: []
  }
  for (var i=0; i<width; i++) {
    gridInfo.cols[i] = Utils.fillArray(0,0,height);
    gridInfo.rows[i] = Utils.fillArray(0,0,width);
  }

  // used for keeping row/col info, and erasing their string representations upon a value change
  function setValue(x,y,i,v) {
    gridInfo.cols[x][y] = v;
    gridInfo.rows[y][x] = v;
    gridInfo.colInfo[x] = 0;
    gridInfo.rowInfo[y] = 0;
  }

  function getColInfo(i) {
    var info = gridInfo.colInfo[i];
    if (!info) {
      var str = gridInfo.cols[i].join('');
      info = gridInfo.colInfo[i] = {
        col: i,
        str: str,
        nr0s: str.replace(count0reg,'').length, 
        nr1s: str.replace(count1reg,'').length, 
        //nr2s: str.replace(count2reg,'').length, 
        hasTriple: tripleReg.test(str),
        //isFull: !/0/.test(str)
      }
      if (info.hasTriple) {
        info.hasTripleRed = tripleRedReg.test(str),
        info.hasTripleBlue = tripleBlueReg.test(str)
      }
      info.isFull = info.nr0s == 0;
      info.nr2s = height - info.nr0s - info.nr1s;
      info.isInvalid = info.nr1s > maxPerRow || info.nr2s > maxPerRow || info.hasTriple; 
    }
    return info;
  }

  function getRowInfo(i) {
    var info = gridInfo.rowInfo[i];
    if (!info) {
      var str = gridInfo.rows[i].join('');
      info = gridInfo.rowInfo[i] = {
        row: i,
        str: str,
        nr0s: str.replace(count0reg,'').length, 
        nr1s: str.replace(count1reg,'').length, 
        //nr2s: str.replace(count2reg,'').length, 
        hasTriple: tripleReg.test(str)
        //isFull: !/0/.test(str)
      }
      if (info.hasTriple) {
        info.hasTripleRed = tripleRedReg.test(str),
        info.hasTripleBlue = tripleBlueReg.test(str)
      }
      info.isFull = info.nr0s == 0;
      info.nr2s = width - info.nr0s - info.nr1s;
      info.isInvalid = info.nr1s > maxPerRow || info.nr2s > maxPerRow || info.hasTriple; 
    }
    return info;
  }

  // not a full isValid check, only checks for balanced spread of 0's and 1's
  function isValid(ignoreInvalidState) {
    hint.doubleColFound = [];
    hint.doubleRowFound = [];

    var rows = {},
        cols = {};
    for (var i=0; i<width; i++) {
      var info = getColInfo(i);
      // if too many 1's or 2's found, or three in a row, leave
      if (info.isInvalid && !ignoreInvalidState)
        return false;
      // if no empty tiles found, see if it's double
      if (info.isFull) {
        if (cols[info.str]) {

          info.unique = false;
          info.similar = cols[info.str] - 1; // store the identical col

          if (hint.active)
            hint.doubleColFound.push(cols[info.str]-1, i);
          
          if (!ignoreInvalidState)
            return false;
        }
        else {
          info.unique = true;
          cols[info.str] = i + 1;
        }
      }

      var info = getRowInfo(i);
      // if too many 1's or 2's found, or three in a row, leave
      if (info.isInvalid && !ignoreInvalidState)
        return false;
      // if no empty tiles found, see if it's double
      if (info.isFull) {
        if (rows[info.str]) {

          info.unique = false;
          info.similar = rows[info.str] - 1; // store the identical row

          if (hint.active)
            hint.doubleRowFound.push(rows[info.str]-1, i);

          if (!ignoreInvalidState)
            return false;
        }
        else {
          info.unique = true;
          rows[info.str] = i + 1;
        }
      }
    }

    return true;
  }

  function breakDownSimple() {
    var tile,
        pool = tiles.concat(),
        i = 0;

    Utils.shuffle(pool);
    var remainingTiles = [];

    while (i < pool.length) {
      tile = pool[i++];
      var prevValue = tile.value;
      tile.clear();
      // if only this one cleared tile cannot be solved
      if (!solveTile(tile)) {
        // restore its value
        tile.value = prevValue;
        remainingTiles.push(tile);
      } else {
        tile.clear();
      }
    }
    quality = Math.round(100 * (getEmptyTiles().length / (width * height)));
    return remainingTiles;
  }
  
  function breakDown(remainingTiles) {
    var attempts = 0,
        tile,
        pool = remainingTiles || tiles.concat();

    tileToSolve = null;
    self.state.clear();
    //State.save('full');

    //console.log('items to solve', pool.length)

    if (!remainingTiles)
      Utils.shuffle(pool); // not shuffling increases quality!

    var i=0;
    while (i < pool.length && attempts++ < 6) {
      tile = pool[i++];
      tileToSolve = tile;
      var clearedTile = tile,
          clearedTileValue = tile.value; 
      tile.clear();
      self.state.save('breakdown');
      //console.log('save breakdown')
      if (solve()) {
        self.state.restore('breakdown');
        attempts = 0;
      } else {
        self.state.restore('breakdown');
        clearedTile.value = clearedTileValue;
      }
    }
    tileToSolve = null;
    self.state.save('empty');
    quality = Math.round(100 * (getEmptyTiles().length / (width * height)));

    // mark remaining tiles as system
    each(function() {
      if (!this.isEmpty)
        this.system = true;
    })
  }

  function markRow(y) {
    for (var x=0; x<width; x++)
      tile(x,y).mark();
    return self;
  }
  
  function unmarkRow(y) {
    for (var x=0; x<width; x++)
      tile(x,y).unmark();
    return self;
  }

  function markCol(x) {
    for (var y=0; y<height; y++)
      tile(x,y).mark();
    return self;
  }
  
  function unmarkCol(x) {
    for (var y=0; y<height; y++)
      tile(x,y).unmark();
    return self;
  }

  function unmark(x, y) {
    if (typeof x == 'number' && typeof y == 'number') {
      tile(x,y).unmark();
      return self;
    }
    for (var y=0; y<height; y++)
      for (var x=0; x<width; x++)
        tile(x,y).unmark();
    return self;
  }

  function mark(x, y) {
    tile(x,y).mark();
    return self;
  }

  function getWrongTiles() {
    var wrongTiles = [];
    each(function(x,y,i,tile){
      var currentValue = tile.value,
          okValue = self.state.getValueForTile('full',x,y);
      if (currentValue > 0 && currentValue != okValue)
        wrongTiles.push(tile);
    })
    return wrongTiles;
  }

  function getValues() {
    var values = [];
    each(function(){ values.push(this.value)});
    return values;
  }


  this.each = each;
  this.render = render;
  this.getIndex = getIndex;
  this.tile = tile;
  this.generate = generate;
  this.generateFast = generateFast;
  this.breakDown = breakDown;
  this.breakDownSimple = breakDownSimple;
  this.clear = clear;
  this.load = load;
  this.solve = solve;
  this.step = step;
  this.isValid = isValid;
  this.ease = ease;
  this.size = size;
  this.markRow = markRow;
  this.unmarkRow = unmarkRow;
  this.markCol = markCol;
  this.unmarkCol = unmarkCol;
  this.mark = mark;
  this.unmark = unmark;
  this.getValues = getValues;
  this.setValue = setValue;
  this.getColInfo = getColInfo;
  this.getRowInfo = getRowInfo;

  this.activateDomRenderer = function() {
    render = this.render = domRenderer;
    noRender = false;
  }

  this.__defineGetter__('tiles', function() { return tiles; })
  this.__defineGetter__('width', function() { return width; })
  this.__defineGetter__('height', function() { return height; })
  this.__defineGetter__('emptyTileCount', function() { return getEmptyTiles().length; })
  this.__defineGetter__('emptyTiles', function() { return getEmptyTiles(); })
  this.__defineGetter__('wrongTiles', function() { return getWrongTiles(); })
  this.__defineGetter__('rendered', function() { return rendered; })
  this.__defineGetter__('id', function() { return id; })
  this.__defineGetter__('quality', function() { return quality; })
  this.__defineGetter__('info', function() { return gridInfo; })
  this.__defineGetter__('maxPerRow', function() { return maxPerRow; })
  this.__defineGetter__('maxPerCol', function() { return maxPerCol; })
  this.__defineGetter__('hint', function() { return hint; })

  load();
}function Tile(value, grid, index) {
  var self = this,
      x = this.x = index % grid.width,
      y = this.y = Math.floor(index  / grid.width),
      id = this.id = x + ',' + y,
      reg0 = new RegExp('0','g'),
      possibleValues = [],
      emptyColPairWith = null, // other pair that this tile is an empty pair with
      emptyRowPairWith = null; // other pair that this tile is an empty pair with

  var Directions = {
    Left: 'Left',
    Right: 'Right',
    Up: 'Up',
    Down: 'Down'
  }
  
  // prepare ids for simple backtracking
  this.id1 = id + '=' + 1;
  this.id2 = id + '=' + 2;

  function clear() {
    setValue(0);
  }

  function traverse(hor, ver) {
    var newX = x + hor,
        newY = y + ver;
    return grid.tile(newX, newY);
  }

  function right() { return move(Directions.Right); };
  function left() { return move(Directions.Left); };
  function up() { return move(Directions.Up); };
  function down() { return move(Directions.Down); };
  
  function move(dir) { 
    switch(dir) {
      case Directions.Right: 
        return traverse(1, 0);
      case Directions.Left: 
        return traverse(-1, 0);
      case Directions.Up: 
        return traverse(0, -1);
      case Directions.Down: 
        return traverse(0, 1);
    }
  }

  function setValue(v) {
    value = v;
    grid.setValue(x,y,index,v);
    if (!grid.rendered)
      grid.render();
    else {
      var $tile = $('#tile-' + x + '-' + y);
      $tile.removeClass().addClass('tile tile-' + value);
    }
    return self;
  }

  function isPartOfTripleX() {
    var partOfTripleX = false,
        v = value;
    if (!v) return false;
    var l = Directions.Left, r = Directions.Right;
    partOfTripleX = 
      (move(l).value == v && move(l).move(l).value == v) ||
      (move(r).value == v && move(r).move(r).value == v) ||
      (move(l).value == v && move(r).value == v);
    return partOfTripleX;
  }
  
  function isPartOfTripleY() {
    var partOfTripleY = false,
        v = value;
    if (!v) return false;
    var u = Directions.Up, d = Directions.Down;
    partOfTripleY = 
      (move(u).value == v && move(u).move(u).value == v) ||
      (move(d).value == v && move(d).move(d).value == v) ||
      (move(u).value == v && move(d).value == v);
    return partOfTripleY;
  }

  function isPartOfTriple() {
    return partOfTripleX() || partOfTripleY();
  }

  function collect(hint) {
    if (value > 0) 
      return self;
    
    possibleValues = [1, 2];
    emptyRowPairWith = null;
    emptyColPairWith = null;

    // first pass is to check four doubles, in betweens, and 50/50 row/col spread
    for (var v = 1; v <= 2; v++) {
      var opp = v == 1? 2 : 1;

      // check doubles and in betweens
      for (var dir in Directions) {
        if (move(dir).value == v && move(dir).move(dir).value == v) {
          possibleValues = [opp];

          // set the hint
          if (hint && hint.active)
            hint.mark(self, v == 2? HintType.MaxTwoOrange : HintType.MaxTwoBlue);

          return self;
        }
      }

      if ((move(Directions.Left).value == v && move(Directions.Right).value == v) ||  
          (move(Directions.Up).value == v && move(Directions.Down).value == v)) {
        possibleValues = [opp];

        // set the hint
        if (hint && hint.active)
          hint.mark(self, v == 2? HintType.MaxTwoOrange : HintType.MaxTwoBlue);

        return self;
      }
    }

    // quick check for too many 1 or 2
    var rowInfo = grid.getRowInfo(y);
    if (rowInfo.nr1s >= grid.maxPerRow) {
      possibleValues = [2];
      if (hint && hint.active)
        hint.mark(self, HintType.RowMustBeBalanced);
      return self;
    }
    if (rowInfo.nr2s >= grid.maxPerRow) {
      possibleValues = [1];
      if (hint && hint.active)
        hint.mark(self, HintType.RowMustBeBalanced);
      return self;
    }
    if (rowInfo.nr0s == 2) {
      rowInfo.str.replace(reg0,function(m,i){
        if (i != self.x) 
          emptyRowPairWith = grid.tile(i,self.y);
      });
    }
    var colInfo = grid.getColInfo(x);
    if (colInfo.nr1s >= grid.maxPerCol) {
      possibleValues = [2];
      if (hint && hint.active)
        hint.mark(self, HintType.ColMustBeBalanced);
      return self;
    }
    if (colInfo.nr2s >= grid.maxPerCol) {
      possibleValues = [1];
      if (hint && hint.active)
        hint.mark(self, HintType.ColMustBeBalanced);
      return self;
    }
    if (colInfo.nr0s == 2) {
      colInfo.str.replace(reg0,function(m,i){
        if (i != self.y) 
          emptyColPairWith = grid.tile(self.x,i);
      });
    }

    return self;
  }

  function mark() {
    var $tile = $('#tile-' + x + '-' + y);
    $tile.addClass('marked');
    return self;
  }

  function unmark() {
    var $tile = $('#tile-' + x + '-' + y);
    $tile.removeClass('marked');
    return self;
  }

  this.right = right;
  this.left = left;
  this.up = up;
  this.down = down;
  this.move = move;
  this.clear = clear;
  this.collect = collect;
  this.mark = mark;
  this.unmark = unmark;
  this.isPartOfTripleX = isPartOfTripleX;
  this.isPartOfTripleY = isPartOfTripleY;
  this.isPartOfTriple = isPartOfTriple;

  this.__defineGetter__('value', function() { return value; })
  this.__defineSetter__('value', function(v) { return setValue(v); })
  this.__defineGetter__('isEmpty', function() { return value == 0; })
  this.__defineGetter__('possibleValues', function() { return possibleValues; })
  this.__defineSetter__('possibleValues', function(v) { possibleValues = v; })
  this.__defineGetter__('emptyRowPairWith', function() { return emptyRowPairWith; })
  this.__defineGetter__('emptyColPairWith', function() { return emptyColPairWith; })
}function generateGridAndSolution(size) {
	  var d = new Date();
	  var grid = new Grid(size);
	  grid.generateFast();
	  var result = {};
	  result.size = size;
	  result.full = grid.getValues();
    var quality = 0,
	      qualityThreshold = {
	        4: 60,
	        6: 60,
	        8: 60,
	        10: 60
	      },
	      attempts = 0;
	  // quality control makes sure grids get proper 
    do {
      if (attempts > 0) {
        grid.clear();
        grid.state.restore('full')
      }
      grid.breakDown();
      quality = grid.quality;
    }
    while (quality < qualityThreshold[size] && attempts++ < 42);

	  //grid.breakDown();
	  var values = grid.getValues();
	  result.empty = grid.getValues();
	  result.quality = grid.quality;
	  result.ms = new Date() - d;
	  self.postMessage(JSON.stringify(result));
	}
var Utils = new Utility();
function Hint() { this.active = false; }self.onmessage = function(e) {generateGridAndSolution(e.data.size)}; 
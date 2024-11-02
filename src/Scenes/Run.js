class Run extends Phaser.Scene {
  constructor() {
      super("runScene");
  }

  init(data) {
      this.all = data.all;
      this.tiles = [];
      this.grid = [];
      this.DIM = 20;
      this.drawn = Array(this.DIM * this.DIM).fill(null); // Initialize with nulls for all cells
      this.ready = false;
      this.brakes = false;
      //this.seed = 4532323321;
      this.choiceStack = [];
      this.entropyTexts = [];
      this.rotationLog = [];
  }

      // DEFINE ADJACENCIES FOR TILESET HERE!!
  makeTilesArray(path){
      let tileImages;
      let check = this.all.filter(item => item.key == path);
      if(check.length > 0){ tileImages = check[0].array; }
      else{ 
      console.log(`please enter the name of a directory in "tiles/" that contains tile images
          > "${path}" does not contain tile images.`); 
      return false;
      }
      switch(path){
        case "map-test":
            this.tiles[0] = new Tile(tileImages[0], ['AAB', 'CCC', 'DDD', 'BAA'], 0.05);
            this.tiles[1] = new Tile(tileImages[1], ['CCC', 'BAA', 'AAB', 'CCC'], 0.05);
            this.tiles[2] = new Tile(tileImages[2], ['CCC', 'BAA', 'AAA', 'AAB'], 0.05);
            this.tiles[3] = new Tile(tileImages[3], ['CCC', 'CCC', 'BAA', 'AAB'], 0.05);
            this.tiles[4] = new Tile(tileImages[4], ['BAA', 'AAA', 'AAB', 'CCC'], 0.05);
            this.tiles[5] = new Tile(tileImages[5], ['AAA', 'AAA', 'AAA', 'AAA'], 0.05);
            this.tiles[6] = new Tile(tileImages[6], ['AAB', 'CCC', 'BAA', 'AAA'], 0.05);
            this.tiles[7] = new Tile(tileImages[7], ['BAA', 'AAB', 'CCC', 'CCC'], 0.05);
            this.tiles[8] = new Tile(tileImages[8], ['AAA', 'AAB', 'CCC', 'CAA'], 0.05);
            this.tiles[9] = new Tile(tileImages[9], ['AAA', 'AAB', 'BAA', 'AAA'], 0.05);
            this.tiles[10] = new Tile(tileImages[10], ['AAA', 'AAA', 'AAB', 'BAA'], 0.05);
            this.tiles[11] = new Tile(tileImages[11], ['AAB', 'BAA', 'AAA', 'AAA'], 0.05);
            this.tiles[12] = new Tile(tileImages[12], ['BAA', 'AAA', 'AAA', 'AAB'], 0.05);
            this.tiles[13] = new Tile(tileImages[13], ['CCC', 'CCC', 'CCC', 'CCC'], 0.9);
            this.tiles[14] = new Tile(tileImages[13], ['CCC', 'CCC', 'CCC', 'CCC'], 0.9);
            this.tiles[15] = new Tile(tileImages[13], ['CCC', 'CCC', 'CCC', 'CCC'], 0.9);
            this.tiles[16] = new Tile(tileImages[13], ['CCC', 'CCC', 'CCC', 'CCC'], 0.9);
            break;
        case "rail":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], 1);
            this.tiles[1] = new Tile(tileImages[1], ['ABA', 'ABA', 'ABA', 'AAA'], 1);
            this.tiles[2] = new Tile(tileImages[2], ['BAA', 'AAB', 'AAA', 'AAA'], 1);
            this.tiles[3] = new Tile(tileImages[3], ['BAA', 'AAA', 'AAB', 'AAA'], 1);
            this.tiles[4] = new Tile(tileImages[4], ['ABA', 'ABA', 'AAA', 'AAA'], 1);
            this.tiles[5] = new Tile(tileImages[5], ['ABA', 'AAA', 'ABA', 'AAA'], 1);
            this.tiles[6] = new Tile(tileImages[6], ['ABA', 'ABA', 'ABA', 'ABA'], 1);
            break;
        case "circuit":
        case "circuit-coding-train":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], 1);
            this.tiles[1] = new Tile(tileImages[1], ['BBB', 'BBB', 'BBB', 'BBB'], 1);
            this.tiles[2] = new Tile(tileImages[2], ['BBB', 'BCB', 'BBB', 'BBB'], 1);
            this.tiles[3] = new Tile(tileImages[3], ['BBB', 'BDB', 'BBB', 'BDB'], 1);
            this.tiles[4] = new Tile(tileImages[4], ['ABB', 'BCB', 'BBA', 'AAA'], 1);
            this.tiles[5] = new Tile(tileImages[5], ['ABB', 'BBB', 'BBB', 'BBA'], 1);
            this.tiles[6] = new Tile(tileImages[6], ['BBB', 'BCB', 'BBB', 'BCB'], 1);
            this.tiles[7] = new Tile(tileImages[7], ['BDB', 'BCB', 'BDB', 'BCB'], 1);
            this.tiles[8] = new Tile(tileImages[8], ['BDB', 'BBB', 'BCB', 'BBB'], 1);
            this.tiles[9] = new Tile(tileImages[9], ['BCB', 'BCB', 'BBB', 'BCB'], 1);
            this.tiles[10] = new Tile(tileImages[10], ['BCB', 'BCB', 'BCB', 'BCB'], 1);
            this.tiles[11] = new Tile(tileImages[11], ['BCB', 'BCB', 'BBB', 'BBB'], 1);
            this.tiles[12] = new Tile(tileImages[12], ['BBB', 'BCB', 'BBB', 'BCB'], 1);
            break;
        case "demo":
        case "polka":
        case "roads":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], 1);
            this.tiles[1] = new Tile(tileImages[1], ['AAA', 'BBB', 'BBB', 'BBB'], 1);
            this.tiles[2] = new Tile(tileImages[2], ['BBB', 'AAA', 'BBB', 'BBB'], 1);
            this.tiles[3] = new Tile(tileImages[3], ['BBB', 'BBB', 'BBB', 'AAA'], 1);
            this.tiles[4] = new Tile(tileImages[4], ['BBB', 'BBB', 'AAA', 'BBB'], 1);
            break;
        case "mountains": // fix adjacencies ??
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], 1);
            this.tiles[1] = new Tile(tileImages[1], ['BAB', 'BBB', 'BBB', 'BBB'], 1);
            this.tiles[2] = new Tile(tileImages[2], ['BBB', 'BAB', 'BBB', 'BBB'], 1);
            this.tiles[3] = new Tile(tileImages[3], ['BBB', 'BBB', 'BBB', 'BAB'], 1);
            this.tiles[4] = new Tile(tileImages[4], ['BBB', 'BBB', 'BAB', 'BBB'], 1);
            break;
        case "pipes": 
        case "demo-tracks": 
        case "train-tracks":
        case "kenney-simple":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], 1);
            this.tiles[1] = new Tile(tileImages[1], ['AAA', 'ABA', 'ABA', 'ABA'], 1);
            this.tiles[2] = new Tile(tileImages[2], ['ABA', 'AAA', 'ABA', 'ABA'], 1);
            this.tiles[3] = new Tile(tileImages[3], ['ABA', 'ABA', 'ABA', 'AAA'], 1);
            this.tiles[4] = new Tile(tileImages[4], ['ABA', 'ABA', 'AAA', 'ABA'], 1);
            break;
        case "kenney-all":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], 1);
            this.tiles[1] = new Tile(tileImages[1], ['AAA', 'ABA', 'ABA', 'AAA'], 1);
            this.tiles[2] = new Tile(tileImages[2], ['AAA', 'AAA', 'ABA', 'ABA'], 1);
            this.tiles[3] = new Tile(tileImages[3], ['AAA', 'ABA', 'ABA', 'AAA'], 1);
            this.tiles[4] = new Tile(tileImages[4], ['AAA', 'AAA', 'ABA', 'ABA'], 1);
            this.tiles[5] = new Tile(tileImages[5], ['AAA', 'ABA', 'ABA', 'ABA'], 1);
            this.tiles[6] = new Tile(tileImages[6], ['ABA', 'AAA', 'ABA', 'AAA'], 1);
            this.tiles[7] = new Tile(tileImages[7], ['AAA', 'ABA', 'AAA', 'ABA'], 1);
            this.tiles[8] = new Tile(tileImages[8], ['ABA', 'ABA', 'ABA', 'ABA'], 1);
            this.tiles[9] = new Tile(tileImages[9], ['AAA', 'AAA', 'ABA', 'AAA'], 1);
            this.tiles[10] = new Tile(tileImages[10], ['AAA', 'AAA', 'AAA', 'ABA'], 1);
            this.tiles[11] = new Tile(tileImages[11], ['ABA', 'ABA', 'AAA', 'AAA'], 1);
            this.tiles[12] = new Tile(tileImages[12], ['ABA', 'AAA', 'AAA', 'ABA'], 1);
            this.tiles[13] = new Tile(tileImages[13], ['ABA', 'ABA', 'AAA', 'AAA'], 1);
            this.tiles[14] = new Tile(tileImages[14], ['ABA', 'AAA', 'AAA', 'ABA'], 1);
            this.tiles[15] = new Tile(tileImages[15], ['ABA', 'ABA', 'AAA', 'ABA'], 1);
            this.tiles[16] = new Tile(tileImages[16], ['ABA', 'ABA', 'ABA', 'AAA'], 1);
            this.tiles[17] = new Tile(tileImages[17], ['ABA', 'AAA', 'ABA', 'ABA'], 1);
            this.tiles[18] = new Tile(tileImages[18], ['ABA', 'AAA', 'AAA', 'AAA'], 1);
            this.tiles[19] = new Tile(tileImages[19], ['AAA', 'ABA', 'AAA', 'AAA'], 1);
            break;
        case "kenney-curvy":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], 1);
            this.tiles[1] = new Tile(tileImages[1], ['AAA', 'ABA', 'ABA', 'AAA'], 1);
            this.tiles[2] = new Tile(tileImages[2], ['AAA', 'AAA', 'ABA', 'ABA'], 1);
            this.tiles[3] = new Tile(tileImages[3], ['AAA', 'ABA', 'ABA', 'ABA'], 1);
            this.tiles[4] = new Tile(tileImages[4], ['ABA', 'AAA', 'ABA', 'AAA'], 1);
            this.tiles[5] = new Tile(tileImages[5], ['AAA', 'ABA', 'AAA', 'ABA'], 1);
            this.tiles[6] = new Tile(tileImages[6], ['ABA', 'ABA', 'ABA', 'ABA'], 1);
            this.tiles[7] = new Tile(tileImages[7], ['AAA', 'AAA', 'ABA', 'AAA'], 1);
            this.tiles[8] = new Tile(tileImages[8], ['AAA', 'AAA', 'AAA', 'ABA'], 1);
            this.tiles[9] = new Tile(tileImages[9], ['ABA', 'ABA', 'AAA', 'AAA'], 1);
            this.tiles[10] = new Tile(tileImages[10], ['ABA', 'AAA', 'AAA', 'ABA'], 1);
            this.tiles[11] = new Tile(tileImages[11], ['ABA', 'ABA', 'AAA', 'ABA'], 1);
            this.tiles[12] = new Tile(tileImages[12], ['ABA', 'ABA', 'ABA', 'AAA'], 1);
            this.tiles[13] = new Tile(tileImages[13], ['ABA', 'AAA', 'ABA', 'ABA'], 1);
            this.tiles[14] = new Tile(tileImages[14], ['ABA', 'AAA', 'AAA', 'AAA'], 1);
            this.tiles[15] = new Tile(tileImages[15], ['AAA', 'ABA', 'AAA', 'AAA'], 1);
            break;
        default: 
            console.log(`problem with path '${path}'`)
            break;
      }
      for (let i = 0; i < this.tiles.length - 1; i++) {
          this.tiles[i].index = i;
      }
      
      console.log(this.tiles)
      const initialTileCount = this.tiles.length;
      for (let i = 0; i < initialTileCount; i++) {
      let tempTiles = [];
      for (let j = 0; j < 4; j++) {
          tempTiles.push(this.tiles[i].rotate(j, path));
      }
      tempTiles = this.removeDuplicatedTiles(tempTiles);
      this.tiles = this.tiles.concat(tempTiles);
      }
      console.log(this.tiles)

      // make weights array
      this.tileWeights = [];
      for(let tile of this.tiles){
        this.tileWeights.push(tile.weight)
      }
      
      // Generate the adjacency rules based on edges
      for (let i = 0; i < this.tiles.length; i++) {
      const tile = this.tiles[i];
      tile.analyze(this.tiles);
      }
      this.startOver();
      return true;
  }

  removeDuplicatedTiles(tiles) {
      const uniqueTilesMap = {};
      let i = 0;
      for (const tile of tiles) {
        let uniqueify = tile.edges.every(val => val === tile.edges[0]); // true if all elems are the same
        let key = tile.edges.join(','); // ex: "ABB,BCB,BBA,AAA"
        if(uniqueify){ key += `${i}`; i++; }
        uniqueTilesMap[key] = tile;
      }
      return Object.values(uniqueTilesMap);
  }

  startOver() {
      // Create cell for each spot on the grid
      if(!this.entropyTexts){
        this.entropyTexts = Array.from({ length: this.DIM }, () => Array(this.DIM).fill(null));
    }
      else{
        this.entropyTexts.forEach(row => row.forEach(text => text.destroy()));
        this.entropyTexts = Array.from({ length: this.DIM }, () => Array(this.DIM).fill(null));
      }
      for (let i = 0; i < this.DIM * this.DIM; i++) {
          this.grid[i] = new Cell(this.tiles.length, this.tileWeights);
      }
  }
  // Linear Congruential Generator based on values from Knuth and H. W. Lewis
  seededRandom(seed) {
    let m = 2 ** 32;
    let a = 1664525;
    let c = 1013904223;
    seed = (a * seed + c) % m;
    return seed / m;
  }
  
  getRandomWithSeed(array, seed){
    if(!seed){seed = Math.random()*10133204323}
    const randomIndex = Math.floor(this.seededRandom(seed) * array.length);
    return array[randomIndex];
  }

  create() {
      this.canvas = {width: config.width, height: config.height}
      const directory = "tiles/"

      //Reload key
      this.reload = this.input.keyboard.addKey('R');

      this.ready = this.makeTilesArray("map-test");
  }

  checkValid(arr, valid) {
      //console.log(arr, valid);
      for (let i = arr.length - 1; i >= 0; i--) {
        // VALID: [BLANK, RIGHT]
        // ARR: [BLANK, UP, RIGHT, DOWN, LEFT]
        // result in removing UP, DOWN, LEFT
        let element = arr[i];
        // console.log(element, valid.includes(element));
        if (!valid.includes(element)) {
          arr.splice(i, 1);
        }
      }
      // console.log(arr);
      // console.log("----------");
  }

    update() {
        if(this.ready){ this.WFC(); }
        if(this.brakes) { this.stopWFC() }

        if (Phaser.Input.Keyboard.JustDown(this.reload)){
          // this.seed = Math.random();
          // noise.seed(this.seed);
          // this.scene.restart();
          this.clearGrid();
        }
    }

    // TODO: scene slows down when "Go" is clicked several times. Likely mem leak -- FIND AND FIX
    stopWFC() {
      if (this.drawn) {
          for (let d of this.drawn) {
              if (d) d.destroy();
          }
      }
      this.tiles = [];
      this.grid = [];
      this.drawn = [];
      this.entropyTexts.forEach(row => row.forEach(text => text.destroy()));
      this.entropyTexts = [];
      this.rotationLog = [];
      this.ready = false;
      this.brakes = false;
  }

    WFC() {
        const w = this.canvas.width / this.DIM;
        const h = this.canvas.height / this.DIM;
  
        // Draw only cells that need updating
        for (let j = 0; j < this.DIM; j++) {
            for (let i = 0; i < this.DIM; i++) {
                let xPos = i * w + w / 2;
                let yPos = j * h + h / 2;
                let cell = this.grid[i + j * this.DIM];
                const entropy = cell.options.length;
                if(!cell.collapsed && this.entropyTexts[j][i] == undefined){
                    this.entropyTexts[j][i] = this.add.text(xPos, yPos, `${entropy}`, { fontFamily: 'Arial', fontSize: 12, color: 'white'});
                } else if(!cell.collapsed){
                  this.entropyTexts[j][i].setText(`${entropy}`)
                }
                if (cell && cell.collapsed && !this.drawn[i + j * this.DIM]) {
                    let index = cell.options[0];
                    if (this.tiles[index]) {
                        this.drawn[i + j * this.DIM] = this.add.image(xPos, yPos, this.tiles[index].img)
                        this.drawn[i + j * this.DIM].setScale(
                            w / this.drawn[i + j * this.DIM].width,
                            h / this.drawn[i + j * this.DIM].height);
                        this.rotationLog[i + j * this.DIM] = this.tiles[index].rotate_flag;
                    }
                }
            }
        }
  
      // Get cells with the least entropy
      let minEntropy = Infinity;
      let minEntropyCells = [];
      for (let cell of this.grid) {
          if (!cell.collapsed) {
              const entropy = cell.options.length;
              if (entropy < minEntropy) {
                  minEntropy = entropy;
                  minEntropyCells = [cell];
              } else if (entropy === minEntropy) {
                  minEntropyCells.push(cell);
              }
          }
      }
  
      // If all cells are collapsed, exit
      if (minEntropyCells.length === 0) {
            this.handleRotation(); // found that it works best to do this after solving so we don't have to worry about backtracking
            this.ready = false;
            return;
      }
  
      // Collapse a random cell with minimum entropy
      const cell = this.getRandomWithSeed(minEntropyCells,this.seed);
      cell.collapsed = true;

      // Save state before choice for backtracking
      this.choiceStack.push({
          cellIndex: this.grid.indexOf(cell),
          remainingOptions: [...cell.options]
      });
      
      const pick = this.getRandomWithSeed(cell.options, this.seed);
      if (pick === undefined) {
          this.backtrack();
          return;
      }
      cell.options = [pick];
      //console.log(cell.options)
  
      // Update neighbors based on adjacency rules, checking for deadlocks
      if (!this.updateNeighbors(cell)) {
          this.backtrack();  // Trigger backtracking if neighbors have no options
      }
      if(minEntropy == Infinity){
        this.brakes = true;
      }
  }
  
  // Update neighbors and validate adjacency constraints, returns false if stuck
  updateNeighbors(cell) {
      let updated = true;
      for (let j = 0; j < this.DIM; j++) {
          for (let i = 0; i < this.DIM; i++) {
              let index = i + j * this.DIM;
              let cell = this.grid[index];
  
              if (!cell || cell.collapsed) continue;
  
              let options = Array.from({ length: this.tiles.length }, (_, i) => i);
  
              // Check valid options from each direction
              if (j > 0) {
                  let up = this.grid[i + (j - 1) * this.DIM];
                  let validOptions = [];
                  for (let option of up.options) {
                      if (this.tiles[option] && this.tiles[option].down) {
                          validOptions = validOptions.concat(this.tiles[option].down);
                      }
                  }
                  this.checkValid(options, validOptions);
              }
              if (i < this.DIM - 1) {
                  let right = this.grid[i + 1 + j * this.DIM];
                  let validOptions = [];
                  for (let option of right.options) {
                      if (this.tiles[option] && this.tiles[option].left) {
                          validOptions = validOptions.concat(this.tiles[option].left);
                      }
                  }
                  this.checkValid(options, validOptions);
              }
              if (j < this.DIM - 1) {
                  let down = this.grid[i + (j + 1) * this.DIM];
                  let validOptions = [];
                  for (let option of down.options) {
                      if (this.tiles[option] && this.tiles[option].up) {
                          validOptions = validOptions.concat(this.tiles[option].up);
                      }
                  }
                  this.checkValid(options, validOptions);
              }
              if (i > 0) {
                  let left = this.grid[i - 1 + j * this.DIM];
                  let validOptions = [];
                  for (let option of left.options) {
                      if (this.tiles[option] && this.tiles[option].right) {
                          validOptions = validOptions.concat(this.tiles[option].right);
                      }
                  }
                  this.checkValid(options, validOptions);
              }
  
              // Update cell options if they have changed
              cell.options = options;
              if (options.length === 0) {
                  updated = false;
              } else if (options.length === 1) {
                  cell.collapsed = true;
              }
            const entropy = cell.options.length;
            this.entropyTexts[j][i].setText(entropy.toString())
          }
      }
      return updated;
  }
  
  // Improved backtracking mechanism
  backtrack() {
      if (this.choiceStack.length === 0) {
          this.clearGrid();  // Restart if no choices left to backtrack
          this.seed *= 2;
          return;
      }
  
      // Pop the last choice from the stack and undo it
      const lastChoice = this.choiceStack.pop();
      const { cellIndex, remainingOptions } = lastChoice;
      const cell = this.grid[cellIndex];
  
      remainingOptions.splice(remainingOptions.indexOf(cell.options[0]), 1);
  
      if (remainingOptions.length > 0) {
          cell.options = remainingOptions;
          cell.collapsed = false;  // Reopen the cell for processing
          this.choiceStack.push({ cellIndex, remainingOptions });  // Push updated choice back to stack
          // Update neighbors recursively to avoid deadlocks after each backtrack
          if (!this.updateNeighbors(cell)) {
              this.backtrack();
          }
      } else {
          this.backtrack();  // If no options, backtrack further
      }
  }
  
  clearGrid() {
    // Reset grid, drawn cells, and other states
    this.grid = Array(this.DIM * this.DIM).fill(null).map(() => new Cell(this.tiles.length, this.tileWeights));
    this.entropyTexts.forEach(row => row.forEach(text => text.destroy()));
    this.entropyTexts = Array.from({ length: this.DIM }, () => Array(this.DIM).fill(null));
    this.drawn.forEach(d => { if (d) d.destroy(); });
    this.drawn = Array(this.DIM * this.DIM).fill(null);
    this.ready = true;  // Reset ready state
    
    }

    // rotate tiles properly
    handleRotation(){
        for (let j = 0; j < this.DIM; j++) {
            for (let i = 0; i < this.DIM; i++) {
                let r = this.rotationLog[i + j * this.DIM];
                if(r) this.drawn[i + j * this.DIM].setRotation((Math.PI / 2) * r);
            }
        }
    }
    
}
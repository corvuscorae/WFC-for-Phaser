class Run extends Phaser.Scene {
    constructor() {
        super("runScene");
    }
    
    removeDuplicatedTiles(tiles) {
        const uniqueTilesMap = {};
        for (const tile of tiles) {
          const key = tile.edges.join(','); // ex: "ABB,BCB,BBA,AAA"
          uniqueTilesMap[key] = tile;
        }
        return Object.values(uniqueTilesMap);
    }


    init(data) {
        this.all = data.all;
        this.tiles = [];
        this.grid = [];
        this.DIM = 20;
        this.ready = false;
        this.brakes = false;

        console.log(this.all)
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
        case "rail":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], undefined , this);
            this.tiles[1] = new Tile(tileImages[1], ['ABA', 'ABA', 'ABA', 'AAA'], undefined , this);
            this.tiles[2] = new Tile(tileImages[2], ['BAA', 'AAB', 'AAA', 'AAA'], undefined , this);
            this.tiles[3] = new Tile(tileImages[3], ['BAA', 'AAA', 'AAB', 'AAA'], undefined , this);
            this.tiles[4] = new Tile(tileImages[4], ['ABA', 'ABA', 'AAA', 'AAA'], undefined , this);
            this.tiles[5] = new Tile(tileImages[5], ['ABA', 'AAA', 'ABA', 'AAA'], undefined , this);
            this.tiles[6] = new Tile(tileImages[6], ['ABA', 'ABA', 'ABA', 'ABA'], undefined , this);
            break;
        case "circuit":
        case "circuit-coding-train":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], undefined , this);
            this.tiles[1] = new Tile(tileImages[1], ['BBB', 'BBB', 'BBB', 'BBB'], undefined , this);
            this.tiles[2] = new Tile(tileImages[2], ['BBB', 'BCB', 'BBB', 'BBB'], undefined , this);
            this.tiles[3] = new Tile(tileImages[3], ['BBB', 'BDB', 'BBB', 'BDB'], undefined , this);
            this.tiles[4] = new Tile(tileImages[4], ['ABB', 'BCB', 'BBA', 'AAA'], undefined , this);
            this.tiles[5] = new Tile(tileImages[5], ['ABB', 'BBB', 'BBB', 'BBA'], undefined , this);
            this.tiles[6] = new Tile(tileImages[6], ['BBB', 'BCB', 'BBB', 'BCB'], undefined , this);
            this.tiles[7] = new Tile(tileImages[7], ['BDB', 'BCB', 'BDB', 'BCB'], undefined , this);
            this.tiles[8] = new Tile(tileImages[8], ['BDB', 'BBB', 'BCB', 'BBB'], undefined , this);
            this.tiles[9] = new Tile(tileImages[9], ['BCB', 'BCB', 'BBB', 'BCB'], undefined , this);
            this.tiles[10] = new Tile(tileImages[10], ['BCB', 'BCB', 'BCB', 'BCB'], undefined , this);
            this.tiles[11] = new Tile(tileImages[11], ['BCB', 'BCB', 'BBB', 'BBB'], undefined , this);
            this.tiles[12] = new Tile(tileImages[12], ['BBB', 'BCB', 'BBB', 'BCB'], undefined , this);
            break;
        case "demo":
        case "polka":
        case "roads":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], undefined , this);
            this.tiles[1] = new Tile(tileImages[1], ['AAA', 'BBB', 'BBB', 'BBB'], undefined , this);
            this.tiles[2] = new Tile(tileImages[2], ['BBB', 'AAA', 'BBB', 'BBB'], undefined , this);
            this.tiles[3] = new Tile(tileImages[3], ['BBB', 'BBB', 'BBB', 'AAA'], undefined , this);
            this.tiles[4] = new Tile(tileImages[4], ['BBB', 'BBB', 'AAA', 'BBB'], undefined , this);
            break;
        case "mountains": // fix adjacencies ??
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], undefined , this);
            this.tiles[1] = new Tile(tileImages[1], ['BAB', 'BBB', 'BBB', 'BBB'], undefined , this);
            this.tiles[2] = new Tile(tileImages[2], ['BBB', 'BAB', 'BBB', 'BBB'], undefined , this);
            this.tiles[3] = new Tile(tileImages[3], ['BBB', 'BBB', 'BBB', 'BAB'], undefined , this);
            this.tiles[4] = new Tile(tileImages[4], ['BBB', 'BBB', 'BAB', 'BBB'], undefined , this);
            break;
        case "pipes": 
        case "demo-tracks": 
        case "train-tracks":
        case "kenney-simple":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], undefined , this);
            this.tiles[1] = new Tile(tileImages[1], ['AAA', 'ABA', 'ABA', 'ABA'], undefined , this);
            this.tiles[2] = new Tile(tileImages[2], ['ABA', 'AAA', 'ABA', 'ABA'], undefined , this);
            this.tiles[3] = new Tile(tileImages[3], ['ABA', 'ABA', 'ABA', 'AAA'], undefined , this);
            this.tiles[4] = new Tile(tileImages[4], ['ABA', 'ABA', 'AAA', 'ABA'], undefined , this);
            break;
        case "kenney-all":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], undefined , this);
            this.tiles[1] = new Tile(tileImages[1], ['AAA', 'ABA', 'ABA', 'AAA'], undefined , this);
            this.tiles[2] = new Tile(tileImages[2], ['AAA', 'AAA', 'ABA', 'ABA'], undefined , this);
            this.tiles[3] = new Tile(tileImages[3], ['AAA', 'ABA', 'ABA', 'AAA'], undefined , this);
            this.tiles[4] = new Tile(tileImages[4], ['AAA', 'AAA', 'ABA', 'ABA'], undefined , this);
            this.tiles[5] = new Tile(tileImages[5], ['AAA', 'ABA', 'ABA', 'ABA'], undefined , this);
            this.tiles[6] = new Tile(tileImages[6], ['ABA', 'AAA', 'ABA', 'AAA'], undefined , this);
            this.tiles[7] = new Tile(tileImages[7], ['AAA', 'ABA', 'AAA', 'ABA'], undefined , this);
            this.tiles[8] = new Tile(tileImages[8], ['ABA', 'ABA', 'ABA', 'ABA'], undefined , this);
            this.tiles[9] = new Tile(tileImages[9], ['AAA', 'AAA', 'ABA', 'AAA'], undefined , this);
            this.tiles[10] = new Tile(tileImages[10], ['AAA', 'AAA', 'AAA', 'ABA'], undefined , this);
            this.tiles[11] = new Tile(tileImages[11], ['ABA', 'ABA', 'AAA', 'AAA'], undefined , this);
            this.tiles[12] = new Tile(tileImages[12], ['ABA', 'AAA', 'AAA', 'ABA'], undefined , this);
            this.tiles[13] = new Tile(tileImages[13], ['ABA', 'ABA', 'AAA', 'AAA'], undefined , this);
            this.tiles[14] = new Tile(tileImages[14], ['ABA', 'AAA', 'AAA', 'ABA'], undefined , this);
            this.tiles[15] = new Tile(tileImages[15], ['ABA', 'ABA', 'AAA', 'ABA'], undefined , this);
            this.tiles[16] = new Tile(tileImages[16], ['ABA', 'ABA', 'ABA', 'AAA'], undefined , this);
            this.tiles[17] = new Tile(tileImages[17], ['ABA', 'AAA', 'ABA', 'ABA'], undefined , this);
            this.tiles[18] = new Tile(tileImages[18], ['ABA', 'AAA', 'AAA', 'AAA'], undefined , this);
            this.tiles[19] = new Tile(tileImages[19], ['AAA', 'ABA', 'AAA', 'AAA'], undefined , this);
            break;
        case "kenney-curvy":
            this.tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA'], undefined , this);
            this.tiles[1] = new Tile(tileImages[1], ['AAA', 'ABA', 'ABA', 'AAA'], undefined , this);
            this.tiles[2] = new Tile(tileImages[2], ['AAA', 'AAA', 'ABA', 'ABA'], undefined , this);
            this.tiles[3] = new Tile(tileImages[3], ['AAA', 'ABA', 'ABA', 'ABA'], undefined , this);
            this.tiles[4] = new Tile(tileImages[4], ['ABA', 'AAA', 'ABA', 'AAA'], undefined , this);
            this.tiles[5] = new Tile(tileImages[5], ['AAA', 'ABA', 'AAA', 'ABA'], undefined , this);
            this.tiles[6] = new Tile(tileImages[6], ['ABA', 'ABA', 'ABA', 'ABA'], undefined , this);
            this.tiles[7] = new Tile(tileImages[7], ['AAA', 'AAA', 'ABA', 'AAA'], undefined , this);
            this.tiles[8] = new Tile(tileImages[8], ['AAA', 'AAA', 'AAA', 'ABA'], undefined , this);
            this.tiles[9] = new Tile(tileImages[9], ['ABA', 'ABA', 'AAA', 'AAA'], undefined , this);
            this.tiles[10] = new Tile(tileImages[10], ['ABA', 'AAA', 'AAA', 'ABA'], undefined , this);
            this.tiles[11] = new Tile(tileImages[11], ['ABA', 'ABA', 'AAA', 'ABA'], undefined , this);
            this.tiles[12] = new Tile(tileImages[12], ['ABA', 'ABA', 'ABA', 'AAA'], undefined , this);
            this.tiles[13] = new Tile(tileImages[13], ['ABA', 'AAA', 'ABA', 'ABA'], undefined , this);
            this.tiles[14] = new Tile(tileImages[14], ['ABA', 'AAA', 'AAA', 'AAA'], undefined , this);
            this.tiles[15] = new Tile(tileImages[15], ['AAA', 'ABA', 'AAA', 'AAA'], undefined , this);
            break;
        default: 
            console.log(`problem with path '${path}'`)
            break;
        }
        for (let i = 0; i < this.tiles.length - 1; i++) {
            this.tiles[i].index = i;
        }
        
        const initialTileCount = this.tiles.length;
        for (let i = 0; i < initialTileCount; i++) {
        let tempTiles = [];
        for (let j = 0; j < 4; j++) {
            // TODO: fix rotate() in Tile.js
            // tempTiles.push(this.tiles[i].rotate(j));
        }
        tempTiles = this.removeDuplicatedTiles(tempTiles);
        this.tiles = this.tiles.concat(tempTiles);
        }
        //console.log(tiles.length);
        
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
        for (const tile of tiles) {
            const key = tile.edges.join(','); // ex: "ABB,BCB,BBA,AAA"
            uniqueTilesMap[key] = tile;
        }
        return Object.values(uniqueTilesMap);
    }

    startOver() {
        // Create cell for each spot on the grid
        for (let i = 0; i < this.DIM * this.DIM; i++) {
            this.grid[i] = new Cell(this.tiles.length);
        }
    }

    create() {
        this.canvas = {width: config.width, height: config.height}
        const directory = "tiles/"
        /*
        // USER INPUT
        let div = document.createElement("div");
        div.innerHTML = "directory: ";
        div.style.x = 50;
        div.style.y = this.canvas.height + 25;
        document.body.appendChild(div);
      
        let input = document.createElement("input");
        input.style.x = 50;
        input.style.y = this.canvas.height + 50;
        document.body.appendChild(input);

        let button = document.createElement("button");
        button.innerHTML = "GO";
        button.style.x = input.x + input.width;
        button.style.y = input.y;
        document.body.appendChild(button);

        button.addEventListener("click", () => {
            if(!this.ready && input.value.length > 0){
                this.ready = this.makeTilesArray(input.value);
            }
            // TODO: scene slows down when "Go" is clicked several times. Likely mem leak -- FIND AND FIX
            else if(this.ready && input.value.length > 0){
                //this.stopWFC();
                ////let path = directory + input.value;
                //this.ready = this.makeTilesArray(input.value);
                this.scene.start("runScene", {
                    all: this.all,
                });
            }
        });
        */

        this.ready = this.makeTilesArray("demo");
    }

    startOver() {
        // Create cell for each spot on the grid
        for (let i = 0; i < this.DIM * this.DIM; i++) {
            this.grid[i] = new Cell(this.tiles.length);
        }
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
    }

    // TODO: scene slows down when "Go" is clicked several times. Likely mem leak -- FIND AND FIX
    stopWFC(){
        for(let d of this.drawn){ d.destroy(); }
        this.textures = [];
        this.tiles = [];
        this.grid = [];
        this.ready = false;
        this.brakes = false;
      }
      
    WFC() {
        this.drawn = [];
        const w = this.canvas.width / this.DIM;
        const h = this.canvas.height / this.DIM;
        for (let j = 0; j < this.DIM; j++) {
          for (let i = 0; i < this.DIM; i++) {
            let cell = this.grid[i + j * this.DIM];
            if (cell.collapsed) {
                let index = cell.options[0];
                //this.add.image(this.tiles[index].img, i * w, j * h, w, h);
                this.drawn.push(this.add.image(i * w, j * h, this.tiles[index].img)
                    .setScale(1,1)
                    .setOrigin(0,0)
                );
            } else {
              //noFill();
              //stroke(51);
              //rect(i * w, j * h, w, h);
              this.drawn.push(this.add.rectangle(i * w, j * h, w, h, "black")
                .setOrigin(0,0)
              );
            }
          }
        }
      
        // Pick cell with least entropy
        let gridCopy = this.grid.slice();
        gridCopy = gridCopy.filter((a) => !a.collapsed);
      
        if (gridCopy.length == 0) {
          //this.brakes = true;
          return;
        }
        gridCopy.sort((a, b) => {
          return a.options.length - b.options.length;
        });
      
        let len = gridCopy[0].options.length;
        let stopIndex = 0;
        for (let i = 1; i < gridCopy.length; i++) {
          if (gridCopy[i].options.length > len) {
            stopIndex = i;
            break;
          }
        }
      
        if (stopIndex > 0) gridCopy.splice(stopIndex);
        const cell = Phaser.Utils.Array.GetRandom(gridCopy);
        cell.collapsed = true;
        const pick = Phaser.Utils.Array.GetRandom(cell.options);
        if (pick === undefined) {
          this.startOver();
          //this.brakes = true;
          return;
        }
        cell.options = [pick];
      
        const nextGrid = [];
        for (let j = 0; j < this.DIM; j++) {
          for (let i = 0; i < this.DIM; i++) {
            let index = i + j * this.DIM;
            if (this.grid[index].collapsed) {
              nextGrid[index] = this.grid[index];
            } else {
              let options = new Array(this.tiles.length).fill(0).map((x, i) => i);
              // Look up
              if (j > 0) {
                let up = this.grid[i + (j - 1) * this.DIM];
                let validOptions = [];
                for (let option of up.options) {
                  let valid = this.tiles[option].down;
                  validOptions = validOptions.concat(valid);
                }
                this.checkValid(options, validOptions);
              }
              // Look right
              if (i < this.DIM - 1) {
                let right = this.grid[i + 1 + j * this.DIM];
                let validOptions = [];
                for (let option of right.options) {
                  let valid = this.tiles[option].left;
                  validOptions = validOptions.concat(valid);
                }
                this.checkValid(options, validOptions);
              }
              // Look down
              if (j < this.DIM - 1) {
                let down = this.grid[i + (j + 1) * this.DIM];
                let validOptions = [];
                for (let option of down.options) {
                  let valid = this.tiles[option].up;
                  validOptions = validOptions.concat(valid);
                }
                this.checkValid(options, validOptions);
              }
              // Look left
              if (i > 0) {
                let left = this.grid[i - 1 + j * this.DIM];
                let validOptions = [];
                for (let option of left.options) {
                  let valid = this.tiles[option].right;
                  validOptions = validOptions.concat(valid);
                }
                this.checkValid(options, validOptions);
              }
      
              // I could immediately collapse if only one option left?
              nextGrid[index] = new Cell(options);
            }
          }
      
        }
      
        this.grid = nextGrid;
      }
}
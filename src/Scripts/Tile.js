function reverseString(s) {
  let arr = s.split('');
  arr = arr.reverse();
  return arr.join('');
}

function compareEdge(a, b) {
  return a == reverseString(b);
}

class Tile {
  constructor(img, edges, i, scene) {
    this.img = img;
    this.edges = edges;
    this.up = [];
    this.right = [];
    this.down = [];
    this.left = [];
    this.scene = scene;

    if (i !== undefined) {
      this.index = i;
    }
  }

  analyze(tiles) {
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];

      // Tile can't match itself
      if (tile.index === this.index) continue;

      // UP
      if (compareEdge(tile.edges[2], this.edges[0])) {
        this.up.push(i);
      }
      // RIGHT
      if (compareEdge(tile.edges[3], this.edges[1])) {
        this.right.push(i);
      }
      // DOWN
      if (compareEdge(tile.edges[0], this.edges[2])) {
        this.down.push(i);
      }
      // LEFT
      if (compareEdge(tile.edges[1], this.edges[3])) {
        this.left.push(i);
      }
    }
  }

  // TODO: fix
  rotate(num) {
    let scene = Run;
    const w = this.img.width;
    const h = this.img.height;
    //const newImg = new Image(Run, w / 2, h / 2);
    //newImg.imageMode(CENTER);
    //newImg.translate(w / 2, h / 2);
    //newImg.angle = (Phaser.Math.TAU * num);
    const newImg = this.scene.add.graphics({x: w, y: h});
    newImg.setOrigin(0,0);
    newImg.rotateCanvas(Phaser.Math.TAU * num);
    newImg.generateTexture(this.img.key, w, h);
    //console.log(newImg)
    
    const newEdges = [];
    const len = this.edges.length;
    for (let i = 0; i < len; i++) {
      newEdges[i] = this.edges[(i - num + len) % len];
    }
    return new Tile(newImg, newEdges, this.index);
  }
}

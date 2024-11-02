function reverseString(s) {
  let arr = s.split('');
  arr = arr.reverse();
  return arr.join('');
}

function compareEdge(a, b) {
  return a == reverseString(b);
}

class Tile {
  constructor(img, edges, weight, i, rotate_flag) {
    this.img = img;
    this.edges = edges;
    this.weight = weight;
    this.up = [];
    this.right = [];
    this.down = [];
    this.left = [];

    this.index = i;
    this.rotate_flag = rotate_flag;
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

  rotate(num) {
    const w = this.img.width;
    const h = this.img.height;
    
    const newEdges = [];
    const len = this.edges.length;
    for (let i = 0; i < len; i++) {
      newEdges[i] = this.edges[(i - num + len) % len];
    }
    return new Tile(this.img, newEdges, this.weight, this.index, num);
  }
}

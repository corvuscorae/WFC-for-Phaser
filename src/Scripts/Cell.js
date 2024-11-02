class Cell {
    constructor(value, weights) {
      this.collapsed = false;
      
      if (value instanceof Array) {
        this.options = value;
      } else {
        this.options = [];
        for (let i = 0; i < value; i++) {
          this.options[i] = i;
        }
      }

      if(weights) {
        this.weights = weights;
        this.options = this.applyWeight();
      }
    }
  
    applyWeight(){
      let result = [...this.options];
      for(let i = 0; i < this.options.length; i++) {
          let multiplier = Math.floor(10 * this.weights[i]);
          if(multiplier == 0) continue;
          let add = new Array(multiplier).fill(this.options[i]);
          result = result.concat(add);
      }
      return result;
    }
  }
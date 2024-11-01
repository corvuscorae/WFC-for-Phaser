class Init extends Phaser.Scene {
    constructor() {
        super("initScene");

        this.all = [];
    }

    preload() {
        this.load.setPath("./tiles/");
        
        // naming convention: [blank, down, left, right, up].png
        let directionDirectories = [  
            "demo",
            "demo-tracks",
            "mountains",
            "pipes",
            "polka",
            "roads",
            "train-tracks",
            "kenney-simple"
        ]
    
      // naming convention: [i].png 
      let indexedDirectories = [  
        {path: "circuit", num: 13},
        {path: "circuit-coding-train", num: 13},
        {path: "rail", num: 7},
        {path: "kenney-all", num: 20},
        {path: "kenney-curvy", num: 16},
        {path: "map-test", num: 14},
      ]
    
      for(let dir of indexedDirectories){
        let imageKeys = [];
        for (let i = 0; i < dir.num; i++) { 
            imageKeys[i] = `${dir.path}_${i}`;
            this.load.image(imageKeys[i],`${dir.path}/${i}.png`); 
        }
        this.all.push({ key: dir.path, array: imageKeys });
      }
    
      for(let dir of directionDirectories){
        let imageKeys = [];
        for (let i = 0; i < 5; i++) { 
          imageKeys[0] = `${dir}_blank`;
          imageKeys[1] = `${dir}_down`;
          imageKeys[2] = `${dir}_left`;
          imageKeys[3] = `${dir}_right`;
          imageKeys[4] = `${dir}_up`;
          this.load.image(imageKeys[0],`${dir}/blank.png`);
          this.load.image(imageKeys[1],`${dir}/down.png`);
          this.load.image(imageKeys[2],`${dir}/left.png`);
          this.load.image(imageKeys[3],`${dir}/right.png`);
          this.load.image(imageKeys[4],`${dir}/up.png`);
        };
        this.all.push({ key: dir, array: imageKeys });
      }
    }

    create() {
        this.scene.start("runScene", {
            all: this.all,
        });

        //update instruction text
        document.getElementById('description').innerHTML = `
        <h2>WFC.js</h2><br>
        R: Restart Scene (to regenerate map)<br>`;
    }
}
const {Engine, World, Bodies,Mouse, MouseConstraint, Constraint} = Matter;

let ground;
const boxes = [];
let bird;
let world;
let engine;
let mConstraint;
let slingshot;

function setup() {
  createCanvas(800, 400);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2, height-10, width, 20);
  for(let i = 0; i < 3; i++){
    boxes[i] = new Box(600,300-i*75,50, 75);
  }
  box = new Box(450, 300, 50, 75);
  bird = new Bird(150, 300, 16);

  slingshot = new SlingShot(150, 300, bird.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world,mConstraint);
}

function keyPressed() {
  if( key == ' '){
    World.remove(world, bird.body);
    bird = new Bird(150, 300, 16);
    slingshot.attach(bird.body);
  }
}

function mouseReleased(){
  setTimeout(()=>{
    slingshot.fly();
  }, 100);
}

function draw() {
  background(0);
  Engine.update(engine);
  ground.show();
  for(let box of boxes ){

    box.show();
  }
  bird.show();
  slingshot.show();
}

const lifespan = 450;
let count = 0;
let generation = 0;
let population;
const maxForce = 0.2;
let target;
let rx;
let ry;
let rw;
let rh;

function setup() {
    createCanvas(innerWidth, innerHeight-100);
    population = new Population();
}
  
function draw() {
    background(220);

    drawBoard();

    // obstacle
    rx = width/2;
    ry = height/2;
    rw = width/3-100;
    rh = 20;
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(rx, ry, rw, rh);

    textSize(20);
    fill(0);
    strokeWeight(1.5);
    text(`generation frame: ${count} \n generation: ${generation}`, 100, 100);
    population.run();
    count++;

    if(count === lifespan){
        population.calcFitness();
        population.select();
        count = 0;
        generation++;
    }
}

const drawBoard = () => {
    target = createVector(width/2, 120);
 
    // inner circle
    noStroke();
    fill(210, 4, 45);
    circle(target.x, target.y, 43);
    
    // small   
    noFill();
    strokeWeight(4);
    stroke(0, 71, 171);
    arc(target.x, target.y, 50, 50, TWO_PI, PI);
    arc(target.x, target.y, 50, 50, PI, TWO_PI);

    // bigger
    stroke(0, 71, 171);
    arc(target.x, target.y, 100, 100, PI, TWO_PI);
    stroke(210, 4, 45);
    arc(target.x, target.y, 100, 100, TWO_PI, PI);

    // even bigger  
    stroke(0, 71, 171);
    arc(target.x, target.y, 140, 140, TWO_PI, PI);
    stroke(210, 4, 45);
    arc(target.x, target.y, 140, 140, PI, TWO_PI);

    // biggest
    stroke(0);
    strokeWeight(27);
    arc(target.x, target.y, 170, 170, TWO_PI, PI);
    arc(target.x, target.y, 170, 170, PI, TWO_PI);          
}

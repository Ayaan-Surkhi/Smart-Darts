class Dart{
    constructor(dna){

        if(dna) this.DNA = dna;
        else this.DNA = new DNA();

        this.pos = createVector(width/2, height-50);
        this.vel = createVector();
        this.acc = createVector();

        this.crashed = false;
        this.completed = false;
        this.count = 0;
        this.fitness = 0;
    }

    applyForce(force){
        this.acc.add(force);
    }

    update(){
        const d = dist(this.pos.x, this.pos.y, target.x, target.y);

        if(d < 30){
            this.completed = true;
            this.pos = target.copy();
            this.count = count;
            this.playBullsEye();
        }

        if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
            this.crashed = true;
        }

        if(this.pos.x > rx-(rw/2) && this.pos.x < rx+(rw/2) && this.pos.y > ry && this.pos.y < ry+rh){
            this.crashed = true;
        }

        this.applyForce(this.DNA.genes[count]);

        if(!this.crashed && !this.completed){
            this.vel.add(this.acc);
            this.pos.add(this.vel);       
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    show(){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        noStroke();
        fill(109, 15, 109);
        rectMode(CENTER);
        rect(0, 0, 60, 7);
        triangle(40, 0, 25, -15, 25, 15);
        pop();
    }

    playBullsEye = (() => {
        let executed = false;
        return () => {
            if (!executed) {
                executed = true;

                const bullsEye = new Audio('/audio/BullsEye.mp4');
                bullsEye.play();    
            }
        };
    })();

    calcFitness(){
        const d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, width, width, 0);    
        
        if(this.completed){
            this.fitness *= 10;
        }

        if(this.crashed){
            this.fitness /= 10;
        }
    }
}
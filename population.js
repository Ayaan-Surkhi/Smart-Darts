class Population{
    constructor(){
        this.darts = [];
        this.popSize = 25;
    
        for(let i = 0;i < this.popSize;i++){
            this.darts[i] = new Dart();
        }
    }

    run(){
        for (let i = 0; i < this.popSize; i++) {
            this.darts[i].update();
            this.darts[i].show();
        }
    }

    calcFitness(){
        for (let i = 0; i < this.popSize; i++) {
            this.darts[i].calcFitness();
        }

        const completedDarts = this.darts.map(dart => {
            return dart.count;
        });

        const fastest = Math.min(...completedDarts);
    
        for (let i = 0; i < this.darts; i++) {
            if(this.darts[i].count === fastest){
                this.darts[i].fitness *= 10;
            }
        }
    }

    select(){
        let maxFitness = 0;
        for (let i = 0; i < this.popSize; i++) {
            if(this.darts[i].fitness > maxFitness){
                maxFitness = this.darts[i].fitness;
            }
        }

        let newDarts = [];
        for (let i = 0; i < this.popSize; i++) {
            const parentA = this.acceptReject(maxFitness).DNA;
            const parentB = this.acceptReject(maxFitness).DNA;            
 
            const child = parentA.crossOver(parentB);
            child.mutate();
            newDarts[i] = new Dart(child);
        }        

        this.darts = newDarts;
    }

    acceptReject(maxFitness){
        let preventInfinite = 0;

        while(true){
            const parent = random(this.darts);
            const r = random(maxFitness);

            if(r < parent.fitness){
                return parent;
            }

            preventInfinite++;

            if(preventInfinite > 10000){
                return null;
            }
        }
    }
}
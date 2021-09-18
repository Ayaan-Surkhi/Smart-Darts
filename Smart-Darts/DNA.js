class DNA{
    constructor(genes){
        if(genes) this.genes = genes;
        else {
        this.genes = [];

        for (let i = 0; i < lifespan; i++) {
            this.genes[i] = p5.Vector.random2D();            
            this.genes[i].setMag(maxForce);
        }
      }
    }

    crossOver(partner){
        const newgenes = [];
        const mid = random(this.genes.length);
        for (let i = 0; i < lifespan; i++) {
            if(mid > i){
                newgenes[i] = this.genes[i]; 
            }else{
                newgenes[i] = partner.genes[i];
            }
        }

        return new DNA(newgenes);
    }

    mutate(){
        for (let i = 0; i < this.genes; i++) {
            if(random(1) < 0.02){
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxForce);
            }            
        }
    }
}
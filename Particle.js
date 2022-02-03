class Particle{
    constructor(x,y,mass= 20){
        this.position= createVector(x,y)
        this.velocity= createVector(0,0)
        this.accelaration= createVector(0,0)
        this.mass= mass
        this.anchored= false
    }

    update(){
        if(!this.anchored){
            this.velocity.add(this.accelaration)
            this.position.add(this.velocity.mult(0.97))
        }
        else{
            this.velocity.mult(0)
        }
        this.accelaration.mult(0)
        
    }

    applyForce(force){
        this.accelaration.add(force.copy().div(this.mass))
    }

    draw(){
        stroke(255);
        fill(150,150,200)
        ellipse(this.position.x, this.position.y, 5,5);
    }

    anchor(){
        this.anchored= true
    }

    free(){
        this.anchored= false
    }

}
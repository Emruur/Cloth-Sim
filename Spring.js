class Spring {
    constructor(p1, p2,rest = 80,k = 8) {
        this.k = k;
        this.p1 = p1;
        this.p2 = p2;
        this.rest = rest;
    }

    update() {
        
        let force = p5.Vector.sub(this.p1.position, this.p2.position);
        let x = force.mag() - this.rest;

        if(x>0){
            force.normalize().mult(this.k * x);
            this.p2.applyForce(force.mult());
            this.p1.applyForce(force.mult(-1));
        }
    }

    draw() {
        stroke(200);
        strokeWeight(2);
        line(this.p1.position.x, this.p1.position.y, this.p2.position.x, this.p2.position.y);
    }
}

let gravity;
let particles = [];
let springs = [];

let particleSpacing = 25;
let particleWidth;
let particleLength = 10;
let margin= particleSpacing*3;


let previousMousePosition;

let wind
let xoff= 0

function setup() {
    createCanvas(windowWidth, windowHeight);
    gravity = createVector(0, 10);
	wind= createVector(0,0);
    previousMousePosition = createVector(0, 0);

    particleWidth= int((width / particleSpacing))-6;

    //Initialize Particles in a grid structure
    for (let i = 0; i < particleWidth; i++) {
        let x = margin + i * particleSpacing;
        let column = [];
        for (let j = 0; j < particleLength; j++) {
            let y = particleSpacing * j;
            column.push(new Particle(x, y));
        }
        particles.push(column);
    }

    // Bind particles with springs
    for (let i = 0; i < particleWidth; i++) {
        for (let j = 0; j < particleLength; j++) {
            let notLastColumn = i != particleWidth - 1;
            let notLastRow = j != particleLength - 1;
            let notFirstColumn = i != 0;

            // bind to its right 1,0 if not final column
            if (notLastColumn) {
                // bind to 1,0
                let spring = new Spring(particles[i][j], particles[i + 1][j]);
                springs.push(spring);
            }

            // its bottom 0,1 if not final row
            if (notLastRow) {
                console.log(i,j)
                //bind 0,1
                let spring = new Spring(particles[i][j], particles[i][j + 1]);
                springs.push(spring);
            }

            // its diagonal 1,1 if both not last column AND row
            if (notLastColumn && notLastRow) {
                //bind to 11
                let spring = new Spring(
                    particles[i][j],
                    particles[i + 1][j + 1],
                    40 * sqrt(2),
                );
                springs.push(spring);
            }

            if(notFirstColumn && notLastRow){
                //bind to -1 1

                let spring = new Spring(
                    particles[i][j],
                    particles[i - 1][j + 1],
                    40 * sqrt(2),
                );
                springs.push(spring);
            }
        }
    }

    //anchor the first row of particles
    for (let i = 0; i < particleWidth; i++) {
        particles[i][0].anchor();
    }
}

function draw() {
    background(0);
    previousMousePosition.set(mouseX, mouseY);
	wind.x= map(noise(xoff),0,1,-15,15)
	wind.y= map(noise(xoff+1000),0,1,-5,5)
	xoff += 0.02

    for (let spring of springs) {
        spring.update();
        spring.draw();
    }
    for (let particleColumn of particles) {
        for (let particle of particleColumn) {
            particle.applyForce(gravity);
            particle.applyForce(wind);
            particle.update();
            //particle.draw();
        }
    }
}



function mouseDragged() {
    for (let spring of springs) {
        if (
            doIntersect(
                previousMousePosition,
                createVector(mouseX, mouseY),
                spring.p1.position,
                spring.p2.position
            )){
				console.log(springs.indexOf(spring))
				springs.splice(springs.indexOf(spring),1)
        }
    }
}

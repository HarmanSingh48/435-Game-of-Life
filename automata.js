
class Automata {
    constructor(game) {
        Object.assign(this,{game})
        this.automata = [];
        this.height = 100;
        this.width = 200;

        this.tickCount = 0;
        this.ticks = 0;

        this.speed = parseInt(document.getElementById("speed").value, 10);
        


        for (let col = 0; col < this.width; col++) {
            this.automata.push([]);
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = 0;
            }
        }
        this.loadRandomAutomata();
    };

    //Borrowed from Prof. Marriott's example code for debugging and development
    loadRandomAutomata() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = randomInt(2);
            }
        }
    };

    createStripedPattern() {
        let hSpace = this.width / 20; //Get vertical and horizontal spacing intervals for the stripes

        for(let row = 0; row < this.height; row++) {
            for(let col = 0; col < this.width; col += hSpace) {
                for(let i = 0; i < hSpace; i++) {
                    this.automata[col + i][row] = 1;
                }
                col += hSpace;
            }
        }
    }

    createGridPattern() {//I tried creating a checkerboard pattern, but it didn't work out right. It is still an interesting pattern, nonetheless
        let hSpace = this.width / 20; //Get vertical and horizontal spacing intervals for the stripes
        let vSpace = this.height / 20;

        for(let row = 0; row < this.height; row++) {
            for(let col = 0; col < this.width; col += hSpace) {
                for(let i = 0; i < hSpace; i++) {//fill in interval-amount of squares and...
                    this.automata[col + i][row] = 1;
                }
                col += hSpace;//...skip interval-amount of grid squares
            }
        }
        for(let col = 0; col < this.width; col++) {
            for(let row = vSpace; row < this.height; row += vSpace) {
                for(let i = 0; i < vSpace; i++) {
                    this.automata[col][row + i] = 1;
                }
                row += vSpace;
            }
        }
    }

    //Returns the count of live, neighboring cells
    count(col, row) {
        let count = 0;


        for(let i = -1; i <= 1; i++) {
            for(let j = -1; j <=1; j++) {
                if((col + i >=0 && col + 1 < this.width) && (row + j >=0 && row + j < this.height)){//Checking neighbors to the left, right, up, down, and diagonals
                    if(this.automata[col + i][row + j]) {
                        count++;
                    }
                }
            }
        }
        count -= this.automata[col][row]; //If the current location contains an entity, subtract it since it was counted above
        return count;
        
    };

    clear() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = 0;
            }
        }
    }

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);

        //Checking whether to advance the sim one tick for this current cycle
        if (this.tickCount++ >= this.speed && this.speed != 120) {
            //Reset tick counter and update the total ticks
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            //init the next game board
            let next = [];
            for (let col = 0; col < this.width; col++) {
                next.push([]);
                for (let row = 0; row < this.height; row++) {
                    next[col].push(0);
                }
            }
            //Check game rules 1-4 to determine the state of the next game canvas
            for (let col = 0; col < this.width; col++) {
                for (let row = 0; row < this.height; row++) {
                    //Check Rule 2: Any live cell with two or three live neighbors survives to the next generation.
                    if (this.automata[col][row] && (this.count(col, row) === 2 || this.count(col, row) === 3)) {
                        next[col][row] = 1;
                    }
                    //Check Rule 3: Any dead cell with exactly three live neighbors becomes alive, as if by reproduction.
                    if (!this.automata[col][row] && this.count(col, row) === 3) next[col][row] = 1;
                    //By exclusion, Rules 1 and 4 are satisfied.
                }
            }
            //Set the next canvas
            this.automata = next;
        }

    };

    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "Red";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.automata[col][row];
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    };
}
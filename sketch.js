let symbolSize = 60;
let stream;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    textSize(symbolSize);
    stream = new Stream();
    //generate symbols in setup
    stream.generateSymbols();
}

function draw() {
    background(0)
    //render stream (of symbols) in draw
    stream.render();
}
// Symbol class
function Symbol(x, y, speed) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(2, 20));

    this.setToRandomSymbol = function() {
        // set switch interval
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x3400 + round(random(0, 6592)) // Chinese
            );
        }
    }

    this.render = function() {
        fill(0, 255, 70);
        text(this.value, this.x, this.y);
        this.rain();
        this.setToRandomSymbol();
    }

    this.rain = function() {
        if (this.y >= height) {
            this.y = 0;
        } else {
            this.y += this.speed;
        }
        //Ternerary operator, syntax shortcut
        //this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }


}

function Stream() {
    this.symbols = [];
    //Each stream should know how many symobls it has (5 - 30)
    this.totalSymbols = round(random(5, 30));
    //Each stream should know how fast it's traveling at (5 - 20)
    this.speed = random(5, 20);
    //Responsibility of each stream to create all of its symbols
    //use a loop
    this.generateSymbols = function () {
        let y = 0; //Start at top of page
        let x = width / 2 // Middle of canvas

        for (let i = 0; i < this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize; //symbolSize is in pixels, y is decremented
        }
    }

    this.render = function () {
        this.symbols.forEach(function(symbol) {
            fill(0, 255, 70);
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
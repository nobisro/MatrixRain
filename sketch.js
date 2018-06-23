let symbolSize = 26;
let streamLength = window.innerWidth / symbolSize;
let streams = [];

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0, 150 );
    let x = 0;
  
    for (let i = 0; i < streamLength; i++) {
        let stream = new Stream();
        stream.generateSymbols(x, random(-1000, 0));
        streams.push(stream);
        x += symbolSize;
    }
    textSize(symbolSize);

}

function draw() {
    background(0, 120);
    streams.forEach(function(stream) {
        stream.render();
    });
    
}

// Symbol class
function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(6, 30));
    this.first = first;

    this.setToRandomSymbol = function() {
        // set switch interval
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x30A0 + round(random(-96, 96))
                // 0x3400 + round(random(0, 6592)) 
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
    this.totalSymbols = round(random(5, 20));
    //Each stream should know how fast it's traveling at (5 - 20)
    this.speed = random(5, 15);
    //Responsibility of each stream to create all of its symbols
    //use a loop
    this.generateSymbols = function (x, y) {
        let first = round(random(0, 4)) == 1; // true = 1 == 1
        for (let i = 0; i < this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize; //symbolSize is in pixels, y is decremented
            first = false;
        }
    }

    this.render = function () {
        this.symbols.forEach(function(symbol) {
            if (symbol.first) {
                fill(190, 255, 190);
            } else {
                fill(0, 255, 70);
        }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
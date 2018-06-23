let symbol;
let symbolSize = 60;
function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    symbol = new Symbol(
        width / 2,
        0,
        random(5, 10)
    );
    symbol.setToRandomSymbol();
    textSize(symbolSize);
}

function draw() {
    background(0)
    symbol.render();
}
// Symbol class
function Symbol(x, y, speed) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;

    this.setToRandomSymbol = function() {
       this.value = String.fromCharCode(
           0x3400 + round(random(0, 6592)) // Chinese
       ); 
    }

    this.render = function() {
        fill(0, 255, 70);
        text(this.value, this.x, this.y);
        this.rain();
    }

    this.rain = function() {
        this.y += this.speed;
    }


}

function Stream() {

}
let zoff = 0;
var circleRadius = 2;
let xStep=0;
let yStep=0;
var circlesNum =1;
let size;
let allData;
let deepSleep;
let shallowSleep;
let startSleep;
let stopSleep;
let totalSleep;
let deepSleepPer;
let rem;
let remPer;
let sleepSpeed;
let cStart;
let cStop;
let pause=false;
let save=false;
let canvas;

function setup() {
    canvas= createCanvas(600, 600);
    canvas.parent("blob");
    allData = sessionStorage.getItem('day');


    let date = JSON.parse(allData);
    console.log(allData);

    deepSleep=parseInt(date.deepSleepTime);
    shallowSleep=parseInt(date.shallowSleepTime);


    startSleep=moment(date.start);
    stopSleep =moment(date.stop);
    totalSleep=stopSleep.diff(startSleep,'minutes');
    totalSleep = totalSleep - date.wakeTime;
    console.log(totalSleep);
    size = map(totalSleep,240,720,20,150);

    rem = totalSleep - deepSleep - shallowSleep;
    
    deepSleepPer = threesimple(totalSleep,deepSleep);
    console.log(deepSleepPer);
    if (deepSleepPer>=13 ){
        deepSleepPer=map(deepSleepPer,13,30,2,0.5);
    }
    else{
        deepSleepPer=map(deepSleepPer,5,13,10,2);
    }
    remPer = threesimple(totalSleep,rem);
    remPer=map(remPer,0,40,0.01,0.3);
    
    sleepSpeed=map(totalSleep, 240,720, 0.04,0.005)


    document.getElementById('date').innerHTML = moment(date.start).format("dddd, D-M-YYYY");


    let cols = createPalette("https://coolors.co/5a4195-fee568-f2ae48-1fff79-0a9f5c-0078da-003b6b");
    if((startSleep.hours()>=3) &&(startSleep.hours()<6))
            cStart = cols[0];
    else if ((startSleep.hours()>=6) &&(startSleep.hours()<9))
        cStart = cols[1];
    else if ((startSleep.hours()>=9) &&(startSleep.hours()<13))
        cStart = cols[2];
    else if ((startSleep.hours()>=13) &&(startSleep.hours()<17))
        cStart = cols[3];
    else if ((startSleep.hours()>=17) &&(startSleep.hours()<20))
        cStart = cols[3];
    else if ((startSleep.hours()>=20) &&(startSleep.hours()<23))
        cStart = cols[4];
    else if ((startSleep.hours()>=23) || (startSleep.hours()<3))
        cStart = cols[5];
        

    if((stopSleep.hours()>=3) &&(stopSleep.hours()<6))
        cStop = cols[0];
    else if ((stopSleep.hours()>=6) &&(stopSleep.hours()<9))
        cStop = cols[1];
    else if ((stopSleep.hours()>=9) &&(stopSleep.hours()<13))
        cStop= cols[2];
    else if ((stopSleep.hours()>=13) &&(stopSleep.hours()<17))
        cStop = cols[3];
    else if ((stopSleep.hours()>=17) &&(stopSleep.hours()<20))
        cStop = cols[3];
    else if ((stopSleep.hours()>=20) &&(stopSleep.hours()<23))
        cStop = cols[4];
    else if ((stopSleep.hours()>=23) || (stopSleep.hours()<3))
        cStop = cols[5];

    if(pause) noLoop();
     
    
   

}

function draw() {
    background(255);
    drawingContext.shadowBlur = 60;
    drawingContext.shadowColor = cStop;
    circles(size); 
}

function keyPressed() {
    if ( key == 'p' ) {
        pause = !pause;
        if(pause)
            noLoop()
        else
            loop()

    }

    if(key == 's'){
        saveCanvas(canvas, 'sleepBlob', 'png');

    }
}

function circles(size){
    beginShape();

    noStroke();
    for (let a = 0; a < TWO_PI; a += 0.02) {
        let xoff = map(cos(a), -1, 1, 0, deepSleepPer);
        let yoff = map(sin(a), -1, 1, 0, deepSleepPer);
        const r = map(noise(xoff, yoff,zoff), 0, 1, size, size+150);
        let x = r * cos(a) + width/2;
        let y = r * sin(a) + height/2;
        var xNoise = noise(xStep);
        var yNoise = noise(yStep);
        var xCircle = map(xNoise, 0, 1, -size, size);
        var yCircle = map(yNoise, 0, 1, -size, size);
        let gradient= drawingContext.createRadialGradient(
            width/2+xCircle/2,height/2+yCircle/2, 30, width/2+xCircle,height/2+yCircle, 300
        )
        let c3 = addAlpha(cStart,0.1)
        gradient.addColorStop(0, cStop);
        gradient.addColorStop(remPer, cStart);
        gradient.addColorStop(1, c3);
        drawingContext.fillStyle = gradient;
        curveVertex(x, y);
        
    }
    endShape(CLOSE);
    zoff += sleepSpeed;
    xStep += 0.02;
    yStep += 0.022;
}




function createPalette(url) {
	let slashIndex = url.lastIndexOf("/");
	let colStr = url.slice(slashIndex + 1);
	let cols = colStr.split("-");
	for (let i = 0; i < cols.length; i++) cols[i] = "#" + cols[i];
	return cols;
}

function threesimple(a,b){
    return x= (b*100)/a;
 }




function addAlpha(color, opacity) {
     var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
     return color + _opacity.toString(16).toUpperCase();
}


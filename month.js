
let save=false;

let index;
allData = sessionStorage.getItem('month');
let allDataP = JSON.parse(allData);
firstDay= allDataP[0];
let weekDay = moment(firstDay.date);
let k = weekDay.day();

console.log(weekDay.day());
let sketch1 = function(p) {
    p.deepSleep
    p.shallowSleep
    p.startSleep
    p.stopSleep
    p.totalSleep
    p.size
    p.deepSleepPer
    p.sleepSpeed
    p.remPer
    p.cStart
    p.cStop
    p.zoff=0;
    p.xStep =0;
    p.yStep=0;
    p.pause=false;
    p.setup = function() {
        p.createCanvas(p.windowWidth/7, p.windowWidth/7);
        //allData2 = sessionStorage.getItem('week');
        //let date = JSON.parse(allData2);

        date= allDataP[p.index];

        
        p.deepSleep=parseInt(date.deepSleepTime);
        p.shallowSleep=parseInt(date.shallowSleepTime);
        

        p.startSleep=moment(date.start);
        p.stopSleep =moment(date.stop);
        p.totalSleep=p.stopSleep.diff(p.startSleep,'minutes');
        p.totalSleep = p.totalSleep - date.wakeTime;

        //p.size = p.map(p.totalSleep,240,720,20,150);
        p.size = p.map(p.totalSleep,240,720,10,(p.windowWidth/7)*0.25);
        p.rem = p.totalSleep - p.deepSleep - p.shallowSleep;

        p.deepSleepPer = threesimple(p.totalSleep,p.deepSleep);

        if (p.deepSleepPer>=13 ){
            p.deepSleepPer=p.map(p.deepSleepPer,13,30,2,0.5);
        }
        else{
            p.deepSleepPer=p.map(p.deepSleepPer,5,13,10,2);
        }
        p.remPer = threesimple(p.totalSleep,p.rem);
        p.remPer=p.map(p.remPer,0,40,0.01,0.3);

        p.sleepSpeed=p.map(p.totalSleep, 240,720, 0.04,0.005)


        //document.getElementById('date').innerHTML = moment(date.start).format("dddd, D-M-YYYY");


        let cols = createPalette("https://coolors.co/5a4195-fee568-f2ae48-1fff79-0a9f5c-0078da-003b6b");
        if((p.startSleep.hours()>=3) &&(p.startSleep.hours()<6))
                p.cStart = cols[0];
        else if ((p.startSleep.hours()>=6) &&(p.startSleep.hours()<9))
            p.cStart = cols[1];
        else if ((p.startSleep.hours()>=9) &&(p.startSleep.hours()<13))
            p.cStart = cols[2];
        else if ((p.startSleep.hours()>=13) &&(p.startSleep.hours()<17))
            p.cStart = cols[3];
        else if ((p.startSleep.hours()>=17) &&(p.startSleep.hours()<20))
            p.cStart = cols[3];
        else if ((p.startSleep.hours()>=20) &&(p.startSleep.hours()<23))
            p.cStart = cols[4];
        else if ((p.startSleep.hours()>=23) || (p.startSleep.hours()<3))
            p.cStart = cols[5];
            

        if((p.stopSleep.hours()>=3) &&(p.stopSleep.hours()<6))
            p.cStop = cols[0];
        else if ((p.stopSleep.hours()>=6) &&(p.stopSleep.hours()<9))
            p.cStop = cols[1];
        else if ((p.stopSleep.hours()>=9) &&(p.stopSleep.hours()<13))
            p.cStop= cols[2];
        else if ((p.stopSleep.hours()>=13) &&(p.stopSleep.hours()<17))
            p.cStop = cols[3];
        else if ((p.stopSleep.hours()>=17) &&(p.stopSleep.hours()<20))
            p.cStop = cols[3];
        else if ((p.stopSleep.hours()>=20) &&(p.stopSleep.hours()<23))
            p.cStop = cols[4];
        else if ((p.stopSleep.hours()>=23) || (p.stopSleep.hours()<3))
            p.cStop = cols[5];
    
        if(p.pause) p.noLoop();
           
    };
    p.draw = function() {
        
        p.background(255);
        p.drawingContext.shadowBlur = 60;
       // p.drawingContext.shadowColor = p.cStop;
       
       
       
        //p.noLoop();
        if(p.deepSleep!=0){
            circles();
        }
    };
    function circles(){
       
        p.beginShape();
        p.noStroke();
        console.log(p.width);
        for (let a = 0; a < p.TWO_PI; a += 0.02) {
            let xoff = p.map(p.cos(a), -1, 1, 0, p.deepSleepPer);
            let yoff = p.map(p.sin(a), -1, 1, 0, p.deepSleepPer);
            const r = p.map(p.noise(xoff, yoff,p.zoff), 0, 1, p.size, p.size+150);
            
            let x = r * p.cos(a) + p.width/2;
            let y = r * p.sin(a) + p.height/2;
        
    
    
    
            var xNoise = p.noise(p.xStep);
            var yNoise = p.noise(p.yStep);
            
            p.xCircle = p.map(xNoise, 0, 1, -p.size, p.size);
            p.yCircle = p.map(yNoise, 0, 1, -p.size, p.size);
            
            
            let gradient= p.drawingContext.createRadialGradient(
                p.width/2+p.xCircle/2,p.height/2+p.yCircle/2, 15, p.width/2+p.xCircle,p.height/2+p.yCircle, 300
            )
           

            let c3 = addAlpha(p.cStart,0.1)
            
            gradient.addColorStop(0, p.cStop);
            gradient.addColorStop(p.remPer, p.cStart);
            gradient.addColorStop(1, c3);
            p.drawingContext.fillStyle = gradient;
            p.curveVertex(x, y);
            
        }
        p.endShape(p.CLOSE);
        p.zoff += p.sleepSpeed;
        p.xStep += 0.02;
        p.yStep += 0.022;

    }
    p.keyPressed= function() {
        
        if ( p.key == 'p' ) {
            console.log("yo");
            p.pause = !p.pause;
            if(p.pause)
                p.noLoop()
            else
                p.loop()
    
        }
    
        
    }
    
};

let empty = function(p){
    p.setup = function(){
        p.createCanvas(p.windowWidth/7, p.windowWidth/7);
        
    }
}

document.addEventListener('keydown', function(e){
    
    if(e.key == 's'){
        html2canvas(document.getElementById('blob')).then(function(canvas) {
            saveAs(canvas.toDataURL(), 'file-name.png');
           });
        

    }
    
});

if (k!=0){
    for(let j=0; j<k; j++){
        let emp= new p5(empty, 'week1');
    }
}
//let i = k;
for(let i=0; i<31;i++){

    if(k>=0 && k<7){
        let myp= new p5(sketch1, 'week1');
        myp.index=i;

    }
    if(k>=7 && k<14){
        let myp= new p5(sketch1, 'week2');
        myp.index=i;
    }
    if(k>=14 && k<21){
        let myp= new p5(sketch1, 'week3');
        myp.index=i;
    }
    if(k>=21 && k<28){
        let myp= new p5(sketch1, 'week4');
        myp.index=i;
    }
    if(k>=28){
        let myp= new p5(sketch1, 'week5');
        myp.index=i;

    }
    k++;
}
        
function keyPressed() {
    if ( key == 'p' ) {
        console.log("yo");
        pause = !pause;
        if(pause)
            noLoop()
        else
            loop()

    }

    if(key == 's'){
        

    }
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

function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}

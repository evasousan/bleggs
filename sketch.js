
let dateB;
let dateE;
let selectedDate;

let csvFile;

let value;
myStorage = window.sessionStorage;



function sleep(file){

  
  d3.csv(file).then(function(data) {
 
    csvFile=data;
    console.log(data);
    
    dateB= data[0].date;
    dateE=data[data.length-1].date;

    console.log(dateB);
    console.log(dateE);
    dateB = moment(dateB, "MM-DD-YYYY");
    dateE = moment(dateE, "MM-DD-YYYY");
    console.log(dateB);
    console.log(dateE);
    

    pickOption();
  

  });

  
  
  
}

function readFiles(){
  var files=document.getElementById("csv").files;
  for(let i = 0; i<files.length;i++ ){
    var file = files[i];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {

      sleep(event.target.result);
    });
    reader.readAsDataURL(file);

  }
  

}

function display(){

  let valueDate = moment(document.getElementById("datePick").value).format("MM/D/YYYY");
  console.log(valueDate);

  if (value =="day"){
    document.getElementById("link").setAttribute("href","graph.html");
    
    for(let i=0; i<csvFile.length; i++){
      //console.log(csvFile[i].date.toString());
      //console.log(valueDate.toString());
      if (csvFile[i].date.toString() == valueDate.toString()){
        
        sessionStorage.setItem('day',JSON.stringify(csvFile[i]));
        
      }
    }

  }

  if(value =="week"){
    let csvArray =[];
    document.getElementById("link").setAttribute("href","week.html");
    for(let i=0; i<csvFile.length; i++){
      if (csvFile[i].date.toString() == valueDate.toString()){
        for( let j=0;j<7;j++){
          csvArray[j]= csvFile[j+i];

        }
        sessionStorage.setItem('week',JSON.stringify(csvArray));
      }
    }

  }

  if(value =="month"){
    let csvArray =[];
    document.getElementById("link").setAttribute("href","month.html");
    for(let i=0; i<csvFile.length; i++){
      console.log(csvFile[i].date.toString());
      if (csvFile[i].date.toString() == valueDate.toString()){
        for( let j=0;j<31;j++){
          csvArray[j]= csvFile[j+i];

        }
        sessionStorage.setItem('month',JSON.stringify(csvArray));
      }
    }

  }

 

}



let button = document.getElementById('gotoform');

if (button){
  button.addEventListener('click', function(){
    document.getElementById('intro').style.display = "none";
    document.getElementById('gotoform').style.display = "none";
    document.getElementById('csv').style.display = "inline";
    document.getElementById('confirmcsv').style.display = "inline";
  
  });


}

let confirmB = document.getElementById('confirmcsv');

if (confirmB){
  
  confirmB.addEventListener('click', readFiles,false);
  

}


function pickOption(){
  document.getElementById('csv').style.display = "none";
  document.getElementById('confirmcsv').style.display = "none";
  
  document.getElementById('wrapper').style.display = "inline";
  document.getElementById('day').addEventListener('click',function(){
    value = document.getElementById('day').value;
    dateRange();
  },false)
  document.getElementById('week').addEventListener('click',function(){
    value = document.getElementById('week').value;
    dateRange();
  },false)
  document.getElementById('month').addEventListener('click',function(){
    value = document.getElementById('month').value;
    dateRange();
  },false)

}
function dateRange(){

  document.getElementById('date').innerHTML = moment(dateB).format("MM/DD/YYYY");
  document.getElementById('date2').innerHTML = moment(dateE).format("MM/DD/YYYY");
  document.getElementById('wrapper').style.display = "none";
  document.getElementById('day2').style.display = "inline";
  document.getElementById('datePick').setAttribute('min', moment(dateB).format("MM/DD/YYYY"));
  document.getElementById('datePick').setAttribute('max', moment(dateE).format("MM/DD/YYYY"));

}



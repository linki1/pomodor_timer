const worckTime = document.getElementById('Worck');
const relaxTime = document.getElementById('Relax');
const breackTime = document.getElementById('Breack');
const timer = document.getElementById('timer');
const plusBtn = document.getElementById('plusbtn');
const minusBtn = document.getElementById('minusbtn');
const logosatrt = document.getElementById('strelement');
const resetbtn = document.querySelector('.btn');
const subdiv = document.querySelectorAll('.subdiv');
const tomatslap = document.getElementById('tomatslap');
const ctx = tomatslap.getContext("2d");
const img = new Image();
console.log(ctx instanceof CanvasRenderingContext2D);
img.src = 'img/tomataparticul.png';

ctx.st
console.log(`1:${worckTime.textContent} ,\n2:${relaxTime.textContent} , \n3:${breackTime},\n 4:${timer},\n5:${plusBtn},\n6:${minusBtn}`)
let allTimemin = 25;
let iter = 0;
window.addEventListener('load',()=>{
    timer.textContent= formatMinutesToTime(allTimemin);
    worckTime.textContent =formatMinutesToTime(allTimemin);
    breackTime.textContent =formatMinutesToTime(allTimemin/5);
    relaxTime.textContent =formatMinutesToTime(allTimemin+5);
})
plusBtn.addEventListener('click',()=>{
    console.log("+"+allTimemin);
   if((allTimemin/60).toFixed(0)<=24){
    allTimemin += 5;
    timer.textContent= formatMinutesToTime(allTimemin);
    worckTime.textContent =formatMinutesToTime(allTimemin);
    breackTime.textContent =formatMinutesToTime(allTimemin/5);
      if(iter==4){
     relaxTime.textContent =formatMinutesToTime(allTimemin+5);   
     iter = 0;
    }
    ++iter
    
   }
   else{
    return
   }
})
minusBtn.addEventListener('click',()=>{
    console.log("-"+allTimemin);
   if(allTimemin > 0){
    allTimemin -= 5;
    timer.textContent= formatMinutesToTime(allTimemin);
    worckTime.textContent =formatMinutesToTime(allTimemin);
    breackTime.textContent =formatMinutesToTime(allTimemin/5);
    relaxTime.textContent =formatMinutesToTime(allTimemin+5);   
    
   }
   else{
    return
   }
})
let reset = false;
resetbtn.addEventListener('click',()=>{
    if(!reset){
     reset = true;
    }
    else{
        reset = false
    }
})
let stopparctical = false;
let check = false;
 logosatrt.addEventListener('click',()=>{
 if(!check){
  logosatrt.style.clipPath = 'polygon(13% 0, 13% 100%, 30% 100%, 30% 0, 61% 0, 61% 100%, 34% 100%, 20% 100%, 78% 100%, 77% 0)';
  check = true;
  for (let i = 0; i < subdiv.length; i++) {
    subdiv[i].style.animation ='shadowtap 3s ease-in-out infinite alternate';
    
  }
  timerchange(allTimemin,allTimemin/5,allTimemin+5,check);
  partical(stopparctical);
  stopparctical = true;
  
 }
 else{
      logosatrt.style.clipPath = 'polygon(100% 50%, 0 1%, 0 100%)';
      
      check = false;
      timerchange(allTimemin,allTimemin/5,allTimemin+5,check);
        for (let i = 0; i < subdiv.length; i++) {
    subdiv[i].style.animation ='none';
     partical(stopparctical);
     stopparctical = false;
  }
 }
 })
let restinterval = null;
let timeiter = 0;
let member = 0;
let current=0;
let bigCurrent=0;
 function timerchange(time, rest, bigrest,) {
if((current==0&& bigCurrent==0)|| reset){
   current = time;
 bigCurrent =bigrest; 
}
 

  if (restinterval) {
    clearInterval(restinterval); 
  }

 
  restinterval = setInterval(() => {
    if (!check) {
      clearInterval(restinterval); 
      console.log(current);
      return;
      
    }

    if ((timeiter % 2) === 0 && timeiter <= 8) {
      console.log(timeiter, current + ' work');
      timer.textContent = formatMinutesToTime(current);
      --current;
      if (current < 0) {
        timeiter++;
        clearInterval(restinterval);
        timerchange(rest, time, bigrest);
      }
    } else if ((timeiter % 2) !== 0 && timeiter <= 8) {
      console.log(current + ' rest');
      timer.textContent = formatMinutesToTime(current);
      --current;
      if (current < 0) {
        timeiter++;
        clearInterval(restinterval);
        timerchange(rest, time, bigrest);
      }
    } else {
      console.log(bigCurrent + " big rest");
      timer.textContent = formatMinutesToTime(bigCurrent);
      --bigCurrent;
      if (bigCurrent < 0) {
        timeiter = 0;
        clearInterval(restinterval);
        timerchange(rest, time, bigrest);
      }
    }

  }, 60000);
}
let particalarr = [];
function partical() {
    if(!stopparctical){
        clearInterval(partint);
         particalarr=[];
            ctx.clearRect(0, 0, tomatslap.width, tomatslap.height);
    }
    var partint = setInterval(() => {
        if(!stopparctical){
            clearInterval(partint);
            particalarr=[];
            ctx.clearRect(0, 0, tomatslap.width, tomatslap.height);
            return;
        }
        if (particalarr.length <= 10) {
            for (let i = 0; i < 5; i++) {
                let random = randomcordimation();
                particalarr.push({
                    x: random.x,
                    y: random.y
                });
            }
        }

        ctx.clearRect(0, 0, tomatslap.width, tomatslap.height);

        for (let i = 0; i < particalarr.length; i++) {
            let p = particalarr[i];
            console.log(tomatslap.height)
            p.y += Math.floor((Math.random()*(20-1)+1));
            if(p.y>tomatslap.height){
                particalarr.splice(i, 1);
                 continue;
            }
            ctx.drawImage(img, p.x, p.y, 50, 50);
        }

    }, 100); 
}
function randomcordimation(){
  let y = Math.floor((Math.random()*(55-64)+64));
  let x = Math.floor((Math.random()*(200-90)+60));
  let cord = {
    x:x,
    y:y
  }
  return cord;
}

function formatMinutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return ` ${hours} H ${mins} min`;
}

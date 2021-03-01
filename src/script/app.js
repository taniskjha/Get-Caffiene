let duration = document.getElementById("duration");
let timeElememt = document.getElementById("time");
let startButton = document.getElementById("startButton");
let cancelButton = document.getElementById("cancelButton")
let header = document.getElementById("header")
let caffieneInterval = 0;
let startButtonState = false;


const startButton_clickHandler = (e) => {
    if(startButtonState === false){
      caffieneInterval = duration.value
      if(caffieneInterval !== 0) {
        countdown(caffieneInterval);
        startButtonState = true;
        startButton.style.background = '#b91c1c'
        startButton.innerHTML = "Stop Now !"
      } 
    } 
    else{ 
        chrome.runtime.sendMessage({message: "stop clicked!"});
        startButtonState = false;
        startButton.style.background = '#b45309'
        startButton.innerHTML = "Start Now"
        chrome.browserAction.setBadgeText({text:''});
        window.location.reload(true);
        window.close();
        }
  }


const countdown = (time) => {
    let t = time;
    let x = setInterval((function(){
      setInterval(function() {
        if(startButtonState === true){
          chrome.browserAction.setBadgeText({text:''+t});
          t--;
          if(t<0){
            chrome.runtime.sendMessage({message: "reload"});
            t = time;
          }
          
        }
        else { 
          clearInterval(x);
          chrome.browserAction.setBadgeText({text:''});
        }
      }, 1000);  
    })(), 0);
  }

  const stopCaffiene = () => {
    window.setInterval(() => { 
         var date = new Date();
         if(date.getHours() === timeElememt.value && date.getSeconds() < 10){ 
             window.close();
         }
     }, 10000); 
  }

const updateHeaderInnterHtml = () => {
    let timeElememtText = timeElememt.options[timeElememt.selectedIndex].text.split(':')[0];
    header.innerHTML =  `Get caffiene every ${duration.value} Seconds till ${timeElememtText} pm`;
}

document.addEventListener('DOMContentLoaded', function () {
    startButton.addEventListener('click', startButton_clickHandler);
    cancelButton.addEventListener("click", () => {
    window.close()
    });
    stopCaffiene()
  });
  

document.body.onload = () => {
    duration.addEventListener('click', updateHeaderInnterHtml);
    timeElememt.addEventListener('click', updateHeaderInnterHtml);
}

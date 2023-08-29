var slides = document.getElementsByClassName("slides");
slides[0].classList.add("active");
var slNum = slides.length - 1;
var slider = 0;
var index = 0;
index = 0;
is_playing = false;


var play_btn = document.getElementById("play");
play_btn.addEventListener("click", play);
//document.getElementById("mainImg-wrap").addEventListener("load", start());
document.getElementById("stop").addEventListener("click", stop);


//Start Interval
function start() {
    console.log("Run Method: Start!!!!!");
    //if (!is_playing) {
    //    play_btn.addEventListener("click", play);
    //}
    resetStates();
    stop();
    //Show Current Image
    slides[0].classList.add("active");
    //Start Interval
    slider = setInterval(next, 1500);
    is_playing = true;
}



//Play
function play() {
    if (is_playing == false) {
        is_playing = true;
        slider = setInterval(next, 1500);
        play_btn.removeEventListener("click", play);
    }
  }
  
  //Stop Interval
  function stop() {
    is_playing = false;
    clearInterval(slider);
    play_btn.addEventListener("click", play);
  }

function swapClass(elem, name) {
    elem = elem.classList;
    if (elem.contains(name)) {
        elem.remove(name);
    } else {
        elem.add(name);
    }
}

function swapImg(direction) {
        next(direction);
}


function next(direction) {
    if (direction != null && direction == 1) {
        //step left
        index--;
        index = index < 0 ? slNum : index;
    } else {
        //step right
        index++;
    }

    //Current Slide
    var slideIndex = index % slNum;
    var current = slides[slideIndex];

    console.log("Active Image:" + slideIndex + "; Index: " + index);

    //Refresh All Active Slides
    resetStates();
    var actives = document.getElementsByClassName("active");
    console.log("Found: " + actives.length);
    //Activate Current Slide
    swapClass(current, "active");
    actives = document.getElementsByClassName("active");
    console.log("After swapClass Found: " + actives.length);
}

function resetStates() {
    slides = document.getElementsByClassName("slides");
    for (i = 0; i < slNum; i++) {
        var curr = slides[i].classList;
        if (curr.contains("active")) {
            curr.remove("active");
        }
    }
}

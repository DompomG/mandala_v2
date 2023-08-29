var slides = document.getElementsByClassName("slides");
var maxSteps = slides.length - 1;
var count = 0;
index = 0;

document.getElementById("mainImg-wrap").addEventListener("load", start(count));


//Start Interval
function start(curr_count) {
    current = document.getElementsByClassName("slides")
    generations = document.getElementsByClassName("generated")
    if (!is_playing) {
        play_btn.addEventListener("click", play);
    }
    if (generations.length == 0) {
        console.log("Waiting for successful Generation!")     
    } else {
        resetStates;
        stop();
        //Show Current Image
        slides[curr_count].classList.add("active");
        //Start Interval
        slider = setInterval(next, 1500);
        is_playing = true;
    }
}

//Stop Interval
function stop() {
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
        index = index < 0 ? maxSteps - 1 : index;
    } else {
        //step right
        index++;
    }
    count++;
    slide_list = document.getElementById("mainImg-wrap");
    slides = slide_list.getElementsByClassName("slides");

    //Current Slide
    var slideIndex = (index % maxSteps) + maxSteps;
    var current = slides[slideIndex];

    console.log("Active Image:" + slideIndex + "; Index: " + index);

    //Refresh All Active Slides
    resetStates;
    //Activate Current Slide
    swapClass(current, "active");
}

function resetStates() {
    for (i = 0; i < allNum; i++) {
      var curr = slides[i].classList;
      if (curr.contains("active")) {
        curr.remove("active");
      }
    }
  }
  
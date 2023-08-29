//Params
//var slide_list = document.getElementById("mainImg-wrap");
var slides = document.getElementsByClassName("slides");
//var item_list = document.getElementById("list");
var items = document.getElementsByClassName("item");
var item_clicked;

var allNum = slides.length;
var slNum = slides.length - 1;
var maxSteps = Math.floor(slNum / items.length);
var indexInterval = [0, maxSteps, maxSteps * 2];

var id = 0;
var index = 0;
var idIindex = 0;
var slider = 0;
var currentSlide = 0;

//Play Button
var play_btn = document.getElementById("play");
var playing;
var is_playing = false;

console.log("Slides: " + slNum + "; Selection Items: " + items.length);

//EventListeners
//Set Item Event Listeners
for (var i = 0; i < items.length; i++) {
  items[i].addEventListener("click", start);
  console.log("Added EventListener: " + i);
}


//Stop
var btn = document.getElementById("stop");
const stop_btn = btn.addEventListener("click", stop);

//Initial Active Status
function initState() {
  for (i = 0; i < items.length; i++) {
    //items[i].classList.add("activeList");
    items[i].classList.add("active-border-blinker");
  }
}
document.getElementById("list").addEventListener("load", initState());

//Start Interval
function start() {
  id = Array.from(this.parentNode.children).indexOf(this) - 1;
  //if (!is_playing) {
  //  play_btn.addEventListener("click", play);
  //}
  stop();
  activeItem(this);
  resetStates();
  //Show Initial Image
  slides[id * maxSteps].classList.add("active");
  //Start Interval
  slider = setInterval(next, 1500);
  is_playing = true;
}

//Play
function play() {
  slider = setInterval(next, 1500);
  play_btn.removeEventListener("click", play);
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
  if (is_playing == true) {
    next(direction);
  }
}

function activeItem(selectedItem) {
  //Remove Initial Animation
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("active-border-blinker");
  }
  //Remove Pre Selected Item Active Status
  var actives = document.getElementsByClassName("item-active");
  if (actives.length > 0) {
    for(let i = 0; i < actives.length; i++) {
      actives[i].classList.remove("item-active");
    }
    selectedItem.classList.remove("darken-state");
  }
  //Set Current Item Active
  selectedItem.classList.add("item-active");
  //Darken Other Items
  for (let i = 0; i < items.length; i++) {
    if(i != id) {
      items[i].classList.add("darken-state");
    }
  }

  //Set Submit Button Active
  submitButton = document.getElementById("start").classList;
  submitButton.add("btn-active");
  submitButton.add("active-blinker");
  //Anable Active Submit Button
  document.getElementById("value").value = currentSlide.toString();
  document.getElementById("submit").type = "submit";
}


function next(direction) {
  resetValues;
  if (direction != null && direction == 1) {
    //step left
    index--;
    index = index < 0 ? maxSteps - 1 : index;
  } else {
    //step right
    index++;
  }

  slide_list = document.getElementById("mainImg-wrap");
  slides = slide_list.getElementsByClassName("slides");

  //Current Slide
  var slideIndex = (index % maxSteps) + indexInterval[id];
  var current = slides[slideIndex];

  //Pass Slide Value 
  document.getElementById("value").value = slideIndex.toString();
  console.log("Active Image:" + slideIndex + "; Index: " + index);

  //Refresh All Active Slides
  resetStates();
  //Activate Current Slide
  swapClass(current, "active");
}


function hideElement(elem) {
  elem = elem.classList;
  if (elem.contains("active")) {
    elem.remove("active");
  }
}

function resetValues() {
  slide_list = document.getElementById("mainImg-wrap");
  slides = slide_list.getElementsByClassName("slides");
  //item_list = document.getElementById("list");
  items = document.getElementsByClassName("item");
  allNum = slides.length;
  slNum = slides.length - 1;
  maxSteps = Math.floor(slNum / items.length);
  indexInterval = [0, maxSteps, maxSteps * 2];
}

function resetStates() {
  resetValues;
  for (i = 0; i < allNum; i++) {
    var curr = slides[i].classList;
    if (curr.contains("active")) {
      curr.remove("active");
    }
  }
}


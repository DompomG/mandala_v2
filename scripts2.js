//Params
var slide_list = document.getElementById("mainImg-wrap");
var slides = slide_list.getElementsByClassName("slides");
var item_list = document.getElementById("list");
var items = item_list.getElementsByClassName("item");
var item_clicked;
var actives = 0;

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
//Item Handler
for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", itemEvent(items[i]));
}
//Item Handler
function itemEvent(this_item) {
  console.log("Item id: " + id + "; Item: " + this_item + "clicked!");
  start(this_item);
  if (!is_playing) {
    is_playing = true;
    play_btn.addEventListener("click", play);
  }
}

//Play
function play() {
  resetValues;
  slider = setInterval(next, 1500);
  play_btn.removeEventListener("click", play);

}

//Stop
var btn = document.getElementById("stop");
const stop_btn = btn.addEventListener("click", stop);

//Initial Active Status
function initState() {
  for (let i = 0; i < items.length; i++) {
    items[i].classList.add("activeList");
    items[i].classList.add("active-border-blinker");
  }
}
document.getElementById("list").addEventListener("load", initState());

//Start Interval
function start(this_item) {
  id = Array.from(this_item.parentNode.children).indexOf(this_item) - 1;
  console.log("Id is: " + id);
  stop();
  resetStates(slides);
  activeItem(this_item);
  //Show Initial Image
  slides[id * maxSteps].classList.add("active");
  //Start Interval
  slider = setInterval(next, 1500);
  is_playing = true;
}

//Stop Interval
function stop() {
  clearInterval(slider);
  play_btn.addEventListener("click", play);
  is_playing = false;
}

function swapClass(elem, name) {
  elem = elem.classList;
  if (elem.contains(name)) {
    elem.remove(name);
  } else {
    elem.add(name);
  }
}

//Set Active States
function activeItem(currentItem) {
  //Remove Pre Selected Item Active Status
  resetValues;
  var elem = document.getElementsByClassName("item-active");
  if (elem.length > 0) {
    preItem = elem[0].classList;
    preItem.remove("item-active");
    currentItem.classList.remove("darken-state");
  }

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    item.classList.remove("active-border-blinker");
  }

  //Set Selected Item Active
  currentItem.classList.add("item-active");
  //Darken other
  index_other = ((id + 1) % (items.length));
  items[index_other].classList.add("darken-state");

  //Set Submit Button Active
  submitButton = document.getElementById("start").classList;
  submitButton.add("btn-active");
  submitButton.add("active-blinker");
  //Anable Active Submit Button
  document.getElementById("value").value = currentSlide.toString();
  document.getElementById("submit").type = "submit";
}

// Swipe Left or Right
function swapImg(direction) {
  next(direction);
}

function next(direction) {
  resetValues;

  if (direction != null && direction == 1) {
    //left
    index--;
    index = index < 0 ? maxSteps - 1 : index;
  } else {
    //right
    index++;
  }

  slide_list = document.getElementById("mainImg-wrap");
  slides = slide_list.getElementsByClassName("slides");

  var tempIndex = (index % maxSteps) + indexInterval[id];
  var current = slides[tempIndex];
  console.log("Active Image:" + tempIndex + "; Index: " + index);

  resetStates(slides);
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
  item_list = document.getElementById("list");
  items = item_list.getElementsByClassName("item");
  allNum = slides.length;
  slNum = slides.length - 1;
  maxSteps = Math.floor(slNum / items.length);
  indexInterval = [0, maxSteps, maxSteps * 2];
}

function resetStates() {
  resetValues;
  for (let i = 0; i < allNum; i++) {
    let curr_slide = slides[i].classList;
    if (curr_slide.contains("active")) {
      curr_slide.remove("active");
    }
  }
  for (let i = 0; i < items.length; i++) {
    let curr_item = items[i].classList;
    if (curr_item.contains("darken-state")) {
      curr_item.remove("darken-state");
    }
  }
}


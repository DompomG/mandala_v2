//Params
var slides = document.getElementsByClassName("slides");
var items = document.getElementsByClassName("item");
var item_clicked;

var allNum = slides.length;
var slNum = slides.length - 1;
var maxSteps = Math.floor(slNum / items.length);
var indexInterval = [0, maxSteps, maxSteps * 2];

var category_id = 1;
var index = 0;
var activeIndex = index % items.length;
var idIindex = 0;
var slider = 0;
var currentSlide = 0;
var is_playing = false;
var item_id = 0;

//EVENTLISTENERS:
//Init Item
var init = document.getElementById("mainImg-wrap").addEventListener("load", activeItem(0));

//Stop Button
document.getElementById("stop").addEventListener("click", stop);
//Play Button
var play_btn = document.getElementById("play");
play_btn.addEventListener("click", play);
//Item List
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener("click", activateItem);
}
//Generate(Start) Button
generate = document.getElementById("start");
generate.addEventListener("click", showLoadingGif);

function showLoadingGif() {
    stop();
    resetStates();
    document.getElementById("loadingGif").classList.add("active");
}

//FUNCTION: Activate Item (onClick)
function activateItem() {
    category_id = document.getElementById("value").value

    item_id = Array.from(this.parentNode.children).indexOf(this) - 1;
    console.log("Category Id: " + category_id + "!!!!! GOT IT!!!!")
    index = item_id;
    activeIndex = index;
    //Reset Actives
    resetStates();
    //Set Active Item
    activeItem(item_id);
    //Show Current Image
    slides[item_id].classList.add("active");
}

//FUNCTION: Start Interval
function start() {
    resetStates();
    stop();
    activeItem(activeIndex);
    //Show Current Image
    console.log("activeInde: " + activeIndex);
    slides[activeIndex].classList.add("active");
    //Start Interval
    slider = setInterval(next, 1500);
    is_playing = true;
}

//FUNCTION: Handle Active Item
function activeItem(selectedItem) {
    category_id = document.getElementById("value").value
    console.log("Category_id: " + category_id + "!!");
    if (selectedItem == null) selectedItem = 0;
    console.log("curr_active_id: " + selectedItem + "curr item_id: " + item_id + "!!!!!");
    selectedItem = document.getElementsByClassName("act");
    //Remove Initial Animation
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active-border-blinker");
    }
    //Remove Pre Selected Item Active Status
    var actives = document.getElementsByClassName("item-active");
    if (actives.length > 0) {
        for (let i = 0; i < actives.length; i++) {
            actives[i].classList.remove("item-active");
        }
        selectedItem.classList.remove("darken-state");
    }
    //Set Current Item Active
    items[selectedItem].classList.add("item-active");
    //Darken Other Items
    for (let i = 0; i < items.length; i++) {
        if (i != selectedItem) {
            items[i].classList.add("darken-state");
        }
    }
    //Set Submit Button Active
    submitButton = document.getElementById("start").classList;
    if (submitButton.contains("btn-active") == false) {
        submitButton.add("btn-active");
        submitButton.add("active-blinker");
        //Anable Active Submit Button
        document.getElementById("submit").type = "submit";
    }
    //Pass Value
    document.getElementById("value").value = id.toString();
}

//FUNCTION: Next 
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
    activeIndex = index % items.length + indexInterval[category_id];
    console.log("activeIndex: " + activeIndex + "; items: " + items.length);
    var current = slides[activeIndex];

    //Pass Slide Value 
    document.getElementById("value").value = activeIndex.toString();
    console.log("Active Image:" + activeIndex + "; Index: " + index);

    //Refresh All Active Slides
    resetStates();
    activeItem(activeIndex);
    //Activate Current Slide
    swapClass(current, "active");
}

//FUNCTION: Swapp Class
function swapClass(elem, name) {
    elem = elem.classList;
    if (elem.contains(name)) {
        elem.remove(name);
    } else {
        elem.add(name);
    }
}

//FUNCTION: Play
function play() {
    if (is_playing == false) {
        is_playing = true;
        slider = setInterval(next, 1500);
        play_btn.removeEventListener("click", play);
    }
}

//FUNCTION: Stop Interval
function stop() {
    is_playing = false;
    clearInterval(slider);
    play_btn.addEventListener("click", play);
}

//FUNCTION: Reset Active Status
function resetStates() {
    for (i = 0; i < allNum; i++) {
        var curr = slides[i].classList;
        if (curr.contains("active")) {
            curr.remove("active");
        }
    }
}
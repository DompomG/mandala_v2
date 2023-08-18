    //Params
    var slide_list = document.getElementById("mainImg-wrap");
    var slides = slide_list.getElementsByClassName("slides");
    var item_list = document.getElementById("list");
    var items = item_list.getElementsByClassName("item");
    var allNum = slides.length;
    var slNum = slides.length - 1;
    var maxSteps = Math.floor(slNum / items.length);
    var slider = 0;
    var index = 0;
    var actives = 0;
    var idIindex = 0;
    var id = 0;
    var currentSlide = 0;

    console.log("Slides: " + slNum + "; Selection Items: " + items.length);

    //EventListeners
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener("click", start);
      console.log("Added EventListener: " + i);
    }
    //Stop Button
    var btn = document.getElementById("stop");
    const stop_btn = btn.addEventListener("click", stop);

    function start() {
      id = Array.from(this.parentNode.children).indexOf(this) - 1;
      activeItem(this);
      stop();
      resetAll();
      swapClass(slides[slNum], "active");
      slider = setInterval(next, 1500);
    }

    function stop() {
      clearInterval(slider);
    }
    


    function swapClass(elem, name) {
      elem = elem.classList;
      if (elem.contains(name)) {
        elem.remove(name);
      } else {
        elem.add(name);
      }
    }

    function activeItem(curr) {
      var elem = document.getElementsByClassName("item-active");
      if (elem.length > 0) {
        elem[0].classList.remove("item-active");

      }
      curr.classList.add("item-active");
      submit = document.getElementById("start");
      submit.classList.add("btn-active");
      
      document.getElementById("value").value=currentSlide.toString();
      document.getElementById("submit").type="submit";

    }

    function swapImg(direction) {
      next(direction);
    }

    function next(direction) {
      slide_list = document.getElementById("mainImg-wrap");
      slides = slide_list.getElementsByClassName("slides");
      
      var indexInterval = [0, maxSteps, maxSteps*2] 


      var tempIndex = (index % maxSteps) + indexInterval[id];
      var current = slides[tempIndex];
      currentSlide = tempIndex;
      console.log("Active Image:" + tempIndex + "; Index: " + index);

      resetAll();
      swapClass(current, "active");

      if (direction != null && direction == 1) {
        //slide left
        index--;
        index = index < 0 ? maxSteps - 1 : index;
      } else {
        //slide right
        index++;
      }
    }

    function hideElement(elem) {
      elem = elem.classList;
      if (elem.contains("active")) {
        elem.remove("active");
      }
    }

    function resetAll() {
      slides = document.getElementsByClassName("slides");
      for (i = 0; i < allNum; i++) {
        var curr = slides[i].classList;
        if (curr.contains("active")) {
          curr.remove("active");
        }
      }
    }
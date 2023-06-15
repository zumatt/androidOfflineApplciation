const infoButtonOpen = document.querySelector(".info-button-open");
const infoButtonClose = document.querySelector(".info-button-close");
const infoBox = document.querySelector(".info-box");
const indicators = document.querySelector(".slide-indicator");
const indicator = Array.from(indicators.children);
const closeBox = document.querySelector(".close-box");

function openInfo() {
  document.getElementById("infoText").style.display = "block";
  document.getElementById("myInfoBox").style.width = "436px";
  document.getElementById("myInfoBox").style.left = "calc(100% - 436px)";
  document.getElementById('hoverBg').classList.remove('page2Bg');
  document.getElementById('hoverBg').classList.remove('page3Bg');
  document.getElementById('hoverBg').classList.remove('imageActiveBg');
  document.getElementById('ambienteAlpino').classList.remove('alpinoOpacity');
  closeBox.style.width = "calc(100% - 436px)";
  prev.classList.add("is-hidden");
  next.classList.add("is-hidden");
  audio.pause();
  for (var i = 0; i < iconImg.length; i++) {
    removeClass();
  };
  for (var j = 0; j < items.length; j++) {
    items[j].style.opacity = 0;
  };

};

function closeInfo() {
  document.getElementById("infoText").style.display = "none";
  document.getElementById("myInfoBox").style.width = "0";
  document.getElementById("myInfoBox").style.left = "100%";
  prev.classList.remove("is-hidden");
  next.classList.remove("is-hidden");
  closeBox.style.width = "0";
}

let slider = document.querySelector('.slider'),
  sliderList = slider.querySelector('.slider-list'),
  sliderTrack = slider.querySelector('.slider-track'),
  slides = slider.querySelectorAll('.slide'),
  arrows = slider.querySelector('.slider-arrows'),
  prev = arrows.children[0],
  next = arrows.children[1],
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  swipeStartTime,
  swipeEndTime,
  getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex === --slides.length);

  },
  swipeStart = function() {
    let evt = getEvent();

    if (allowSwipe) {

      swipeStartTime = Date.now();
      
      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  },
  swipeAction = function() {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }

      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      swipeEndTime = Date.now();
      if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
        indicate();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function() {
  let target = event.target;

  if (target.classList.contains('next')) {
    slideIndex++;
    indicate();
  } else if (target.classList.contains('prev')) {
    slideIndex--;
    indicate();
  } else {
    return;
  }

  slide();
  
});

indicate = function(){
 if(slideIndex === 0){
  indicator[0].classList.remove('is-hidden');
  indicator[1].classList.add('is-hidden');
  indicator[2].classList.add('is-hidden');
  console.log("slide 1");
 } else if (slideIndex === 1){
  indicator[0].classList.add('is-hidden');
  indicator[1].classList.remove('is-hidden');
  indicator[2].classList.add('is-hidden');
  console.log("slide 2");
 } else if (slideIndex === 2){
  indicator[0].classList.add('is-hidden');
  indicator[1].classList.add('is-hidden');
  indicator[2].classList.remove('is-hidden');
  console.log("slide 3");
 };
};


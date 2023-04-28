var isBusy = false;
const evento = new Event("end");
var audio = new Audio();
const iconImg = document.querySelectorAll('.icon');
var mainAudio = document.querySelectorAll('.main-audio');
var noAudio = document.querySelectorAll('.no-audio');
var items = document.getElementsByClassName("audioControl");
var btnAudio = document.querySelectorAll('.btnAudio');

for (var i = 0; i < iconImg.length; i++) {
  var iconType = iconImg[i].getAttribute('data-type');
  var iconSrc = "assets/icons/" + iconType + ".svg";
  iconImg[i].style.backgroundImage = 'url(' + iconSrc + ')';

  iconImg[i].addEventListener("click", function () {
    if ((event.target.classList.contains('image')) == true) {
      removeClass();
    } else {
      removeClass();
      var imgName = event.target.getAttribute("content");
      var imgSrc = "assets/images/" + imgName + ".jpg";
      this.style.backgroundImage = 'url(' + imgSrc + ')';
      this.classList.remove('icon');
      this.classList.add('image');
      this.classList.add('active');
      console.log('clicked ' + imgName);
    }
  });
};

for (var i = 0; i < noAudio.length; i++) {
  noAudio[i].addEventListener("click", function () {
    audio.pause();
    for (var j = 0; j < items.length; j++) {
      items[j].style.opacity = 0;
    };
  });
};

for (var i = 0; i < mainAudio.length; i++) {
  mainAudio[i].addEventListener("click", function () {
    if ((event.target.classList.contains('active')) == true) {
      removeClass();
    } else { 
      removeClass();
      this.classList.add('active');
    }
  });
}

function removeClass() {
  for (var i = 0; i < iconImg.length; i++) {
    var iconType = iconImg[i].getAttribute('data-type');
    var iconSrc = "assets/icons/" + iconType + ".svg";
    iconImg[i].style.backgroundImage = 'url(' + iconSrc + ')';
    iconImg[i].classList.remove('image');
    iconImg[i].classList.remove('active');
    iconImg[i].classList.add('icon');
  }
  for (var i = 0; i < mainAudio.length; i++) {
    mainAudio[i].classList.remove('active');
  }
}


$(".btnAudio").on("click", function () { 
  console.log("active is: " + event.target.classList.contains('active'));
  
  if ((event.target.classList.contains('active') == true) ) {
    var src =
      "./assets/sounds/" +
      this.id +
      ".mp3"; /* AUDIO FILE NAME SAME INTO THE HTML AUDIO LOAD */
    audio.src = src;
    audio.dispatchEvent(evento);

    isBusy = true;
  
    for (var i = 0; i < items.length; i++) {
      items[i].style.opacity = 1;
    }
  
    audio.play();
  
    audio.addEventListener("timeupdate", () => {
      var seconds = audio.currentTime;
      minutes = Math.floor(seconds / 60);
      minutes = minutes >= 10 ? minutes : "0" + minutes;
      seconds = Math.floor(seconds % 60);
      seconds = seconds >= 10 ? seconds : "0" + seconds;
      document.getElementById(
        "progressAudioTime"
      ).innerHTML = `${minutes}:${seconds}`;
      // document.getElementById("progressAudioBar").value =
      //   (audio.currentTime / audio.duration) * 100;
    });
  
    audio.addEventListener("ended", () => {
      isBusy = false;
      for (var i = 0; i < iconImg.length; i++) {
        var iconType = iconImg[i].getAttribute('data-type');
        var iconSrc = "assets/icons/" + iconType + ".svg";
        iconImg[i].style.backgroundImage = 'url(' + iconSrc + ')';
        iconImg[i].classList.remove('image');
        iconImg[i].classList.add('icon');
        console.log("Audio Finished");
        for (var j = 0; j < items.length; j++) {
          items[j].style.opacity = 0;
        }
      } 
    });
  
    audio.addEventListener("end", () => {
      audio.pause();
      console.log("audio paused");
    });
  
  } else if ( (event.target.classList.contains('active') == false)) {
    audio.pause();
    console.log("here");
    for (var i = 0; i < items.length; i++) {
      items[i].style.opacity = 0;
    }
  }
});


var preload = new Array();

// List the images to be loaded, each 
//   image assigned to preload[#], with 
//   consecutive numbering starting at 0.

preload[0] = "assets/images/aquila_reale.jpg";
preload[1] = "assets/images/arvicola_delle_nevi.jpg";
preload[2] = "assets/images/camoscio_F.jpg";
preload[3] = "assets/images/camoscio_M.jpg";
preload[4] = "assets/images/codirosso_spazzacamino.jpg";
preload[5] = "assets/images/codirossone.jpg";
preload[6] = "assets/images/coturnice.jpg";
preload[7] = "assets/images/culbianco.jpg";
preload[8] = "assets/images/gracchio_alpino.jpg";
preload[9] = "assets/images/gracchio_corallino.jpg";
preload[10] = "assets/images/lucertola_vivipera.jpg";
preload[11] = "assets/images/marasso.jpg";
preload[12] = "assets/images/marmotta.jpg";
preload[13] = "assets/images/merlo_dal_collare.jpg";
preload[14] = "assets/images/passera_scopaiola.jpg";
preload[15] = "assets/images/picchio_muraiolo.jpg";
preload[16] = "assets/images/salamandra_nera.jpg";
preload[17] = "assets/images/sordone.jpg";
preload[18] = "assets/images/spioncello.jpg";
preload[19] = "assets/images/stambecco_alpino_F.jpg";
preload[20] = "assets/images/stambecco_alpino_M.jpg";
preload[21] = "assets/images/topo_selvatico_alpino.jpg";
preload[22] = "assets/images/toporagno_alpino.jpg";

// Leave the next 5 lines as they are.
var loadedimages = new Array();
for (var i = 0; i < preload.length; i++) {
  loadedimages[i] = new Image();
  loadedimages[i].src = preload[i];
}
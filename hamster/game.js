let currentZone, flooded, suited, hasStick, scaredyFish, finished, hunger,
  wheelRotation, grassStick, collectedGrass, grassPile, eaten, draining, battery,
  insideDoorPower, doorBattery, hasFood, bubbleNum, eating, flooding, timer,
batterytimer
;

let objects = {
  airlock: {
    position: {top: 432, left:413}, 
    src: "unflooded.png", 
    action: null,
  },
  flood: {
    position: {top: 375, left:420}, 
    src: "water.png", 
    action: null,
    hidden: true
  },
  border: {
    position: {top: 425, left:414}, 
    src: "border.png",
    action: null
  },
  background: {
    position: {top: 8, left:8}, 
    src: "background.png", 
    action: null
  },
  heart: {
    position: {top:330, left: 280},
    src: "heart.png", 
    action: null,
    hidden:true
  },
  /*
  light: {
    position: {top: 285, left:237}, 
    src: "light.png", 
    action: null
  },*/
  yellow: {
    position: {top: 323, left:165}, 
    src: "yellow.png", 
    action: null
  },
  grass: {
    position: {top: 380, left:592}, 
    src: "grass.png", 
    action: useGrass
  },
  /*
  grass2: {
    position: {top: 400, left:150}, 
    src: "grass.png", 
    action: null
  },*/
  ladder: {
    position: {top: 380, left:300}, 
    src: "ladder.png", 
    action: useLadder
  },
  clockface: {
    position: {top: 60, left:635}, 
    src: "clockface.png", 
    action: null
  },
  clockhand: {
    position: {top: 60, left:635}, 
    src: "clockhand.png", 
    action: null
  },
  wheel: {
    position: {top: 413, left:168}, 
    src: "wheel.png", 
    action: useWheel
  },
  wheelstand: {
    position: {top: 465, left:176}, 
    src: "wheelstand.png", 
    action: useWheel
  },
  /*lightning: {
    position: {top: 430, left: 435}, 
    src: "lightning.png", 
    action: null,
    hidden: true
  },*/
  insideDoor: {
    position: {top: 450, left: 425}, 
    src: "insidedoor.png", 
    action: useInsideDoor
  },
  greenLight: {
    position: {top: 314, left: 125}, 
    src: "green.png", 
    action: null,
    hidden: true
  },
  greenDoor: {
    position: {top: 434, left: 410}, 
    src: "smallgreen.png", 
    action: null,
    hidden: true
  },
  greenPump: {
    position: {top: 203, left: 234}, 
    src: "green.png", 
    action: null,
    hidden: true
  },
  barfillLight: {
    position: {top: 310, left: 120}, 
    src: "battery.png", 
    action: null,
  },
  barfillDoor: {
    position: {top: 430, left: 405}, 
    src: "smallbattery.png", 
    action: null,
  },
  barfillPump: {
    position: {top: 200, left: 230}, 
    src: "battery.png", 
    action: null,
  },
  drain: {
    position: {top: 498, left: 480}, 
    src: "drain.png", 
    action: useDrain
  },
  eject: {
    position: {top: 44, left: 280},
    src: "eject.png",
    hidden: true
  },
  retry: {
    position: {top: 44, left: 280},
    src: "retry.png",
    action: retry,
    hidden: true
  },
  /*
  hook: {
    position: {top: 385, left: 585}, 
    src: "hook.png", 
    action: useHook
  },*/
  spacesuit: {
    position: {top: 500, left: 500}, 
    src: "spacesuit.png", 
    action: useSpaceSuit
  },
  outsideDoor: {
    position: {top: 470, left: 530}, 
    src: "outsidedoor.png", 
    action: useOutsideDoor
  },
  bubble3: {
    position: {top: 410, left: 565}, 
    src: "bubble1.png", 
    action: null,
    hidden: true
  },
  bubble2: {
    position: {top: 433, left: 555}, 
    src: "bubble2.png", 
    action: null,
    hidden: true
  },
  bubble1: {
    position: {top: 456, left: 560}, 
    src: "bubble3.png", 
    action: null,
    hidden: true
  },
  ham: {
    position: {top: 280, left:350}, 
    src: "hamtop.png", 
    action: useHam
  },
  stick: {
    position: {top: 348, left:260}, 
    src: "stick.png", 
    action: useStick
  },
  food: {
    position: {top: 348, left:260}, 
    src: "food.png", 
    action: useFood,
    hidden: true
  },
  fish: {
    position: {top: 494, left:598}, 
    src: "fish.png", 
    action: useFish
  },
  /*grassPile: {
    position: {top: 528, left:350}, 
    src: "food.png", 
    action: useGrassPile,
    hidden: true
  },*/
  redbit: {
    position: {top: 0, left: 0},
    src: "redbit.png",
    action: null,
    hidden: true
  },
  greenham: {
    position: {top: 0, left: 0},
    src: "greenham.png",
    action: null,
    hidden: true
  },
  battery: {
    position: {top: 0, left: 0},
    src: "hambattery.png",
    action: null,
    hidden: true
  },
  submarine: {
    position: {left: 640, top: 400},
    src: "hamsub.png",
    action: null,
    hidden: true
  },
  playagain: {
    position: {left: 348, top: 338},
    src: "playagain.png",
    action: retry,
    hidden: true
  }
  /*
  darkness: {
    position: {left: 8, top: 8},
    src: "darkness.png",
    action: null
  }*/
} 

let images = [


"background.png",
"barfill.png",
"battery.png",
"border.png",
"bubble1.png",
"bubble2.png",
"bubble3.png",
"clock.png",
"clockface.png",
"clockhand.png",
"cutgrass.png",
"darkness.png",
"dialog.png",
"door.png",
"drain.png",
"eject.png",
"fish.png",
"flooded.png",
"food.png",
"grass.png",
"grassstick.png",
"green.png",
"greenham.png",
"ham.png",
"hambattery.png",
"hambottom.png",
"hamster.png",
"hamsub.png",
"hamtop.png",
"hamwheel.png",
"heart.png",
"hook.png",
"insidedoor.png",
"intro.png",
"ladder.png",
"light.png",
"lightning.png",
"outsidedoor.png",
"redbit.png",
"sidegrass.png",
"sleep.png",
"smallbattery.png",
"smallgreen.png",
"spaceham.png",
"spacesuit.png",
"stick.png",
"unflooded.png",
"water.png",
"wheel.png",
"wheelstand.png",
"yellow.png"
];

let startImage
function preload(){
  images.map(img => {
    let dummy = new Image()
    dummy.src = img;
  })
  startImage = new Image();
  startImage.src = "pic/intro.png";
  startImage.onclick = start;
  document.body.appendChild(startImage);
}

function start(){
  stopmusic();
  play();
  startImage.style.hidden="hidden";

  flooded = false;
  suited = false;
  scaredyFish = false;
  hasStick = false;
  grassStick = false;
  collectedGrass = false;
  grassPile = false;
  eaten = false;
  draining = false;
  finished = false;
  insideDoorPower = false;
  hasFood = false;
  eating = false;
  flooding = false;
  batterytimer=null;
  clearTimeout(timer);
  battery = 0;
  doorBattery = 0;
  time = 0;
  hunger = 0;
  bubbleNum = 0;


  Object.keys(objects).forEach((object) => {
    let image = new Image();
    image.src = "pic/"+objects[object].src;
    image.onclick = objects[object].action;
    image.style.position = "absolute";
    image.style.left = objects[object].position.left;
    image.style.top = objects[object].position.top;
    image.setAttribute('draggable', false);
    objects[object].dom = image;
    if(objects[object].hidden) image.style.visibility = "hidden";
    document.body.appendChild(image);
  });
  transition(zones.top);
  addClass(objects.yellow, "slow-flash");
  addClass(objects.clockhand, "clock-spin");

  timer = setTimeout(() => {
    if(!finished) eject()
  }, 60000);
  //addClass(objects.darkness, "dark-flash");
}

function retry(){
  start();
}

function play(){
  let music = document.getElementById("music");
  music.autoplay = true;
  music.loop = false;
  music.load();

  //let playButton = document.getElementById("play");
  //playButton.style.visibility= "hidden";
  //loop();
}


let zones = {
  top: {
    src: "hamtop.png",
    position: {left: 272, top: 352}
  },
  ladder: {
    src: "hamladder.png",
    position: {left: 350, top: 300}
  },
  bottom: {
    src: "hambottom.png",
    position: {left: 320, top: 517}
  },

  wheel: {
    src: "hamwheel.png",
    position: {left: 240, top: 488}
  },

  airlock: {
    src: "hambottom.png",
    position: {left: 440, top: 500}
  },

  outside: {
    src: "hamoutside.png",
    position: {left: 560, top: 500}
  },

  submarine: {
    src: "submarine.png",
    position: {left: 640, top: 400}
  }
}

function changePic(object, newPic){
  object.dom.src = "pic/" + newPic;
}

function transition(zone) {
  if(!eating) { //would be better having a general notion of business
    currentZone = zone;
    if(!suited){
      changePic(objects.ham, zone.src);
    }
    toggleWheel(currentZone === zones.wheel);
    move(objects.ham, zone.position);
    if(hasStick) stickToHamster();
    
    if(hasFood) foodToHamster();
    
    batteryToHamster(); //could make conditional
    if(currentZone === zones.top && finished) {
      end();
    }
  }
}


function wheelnoise(){
  document.getElementById("wheelnoise").play()
}
function winnoise(){
  document.getElementById("winnoise").play()
}
function losenoise(){
  document.getElementById("losenoise").play()
}
function batterynoise1(){
  document.getElementById("battery1").play()
}
function batterynoise2(){
  document.getElementById("battery2").play()
}

function end() {
  eating = true;
  stopmusic();
  winnoise();
  changePic(objects.ham, "sleep.png");

  setTimeout(
    ()=>{
    hide(objects.heart, false);
  }, 3000)
  setTimeout(()=>{
    hide(objects.playagain, false);
    objects.playagain.dom.style.cursor = "pointer";
  }, 5000)
}

function useLadder() {
  if(currentZone === zones.top){
    transition(zones.bottom);
  } else if(currentZone === zones.bottom){
    transition(zones.top);
  }
}

function toggleWheel(toSpin){
  if(toSpin){
    addClass(objects.wheel, "spin");

    wheelnoise();
    addClass(objects.ham, "wobble");
  } else {
    removeClass(objects.wheel, "spin");
    removeClass(objects.ham, "wobble");
  }
}

function chargeBattery(){
  battery++;
  if(battery >= 40){

    /*
    hide(objects.greenLight, true);
    hide(objects.greenPump, true);
    hide(objects.barfillLight, true);
    hide(objects.barfillPump, true);*/

    removeClass(objects.yellow, "slow-flash");
    finished = true;
    hunger = 3;
    transition(zones.top);
  } else setTimeout(chargeBattery, 100)
}

function chargeDoor(){
  doorBattery++;
  if(doorBattery >= 40){
    hunger = 1;
    insideDoorPower = true;

    //hide(objects.insideDoor, true)
    /*
    hide(objects.greenDoor, true);
    hide(objects.greenLight, true);
    hide(objects.greenPump, true);

    hide(objects.barfillDoor, true);
    hide(objects.barfillLight, true);
    hide(objects.barfillPump, true);*/

    transition(zones.bottom);
  } else setTimeout(chargeDoor, 100)
}

function useWheel() {
  if(currentZone === zones.bottom) {
    if(hunger == 0 && !hasStick){
      transition(zones.wheel);

      hide(objects.greenDoor, false);
      hide(objects.greenLight, false);
      hide(objects.greenPump, false);

      hide(objects.barfillDoor, false);
      hide(objects.barfillLight, false);
      hide(objects.barfillPump, false);

      addClass(objects.greenDoor, "fillbar-horizontal");
      addClass(objects.greenLight, "fillbar-horizontal-tohalf");
      addClass(objects.greenPump, "fillbar-horizontal-tohalf");

      batterynoise1();
      chargeDoor();

    } else if(hunger === 1 && !eating) {
      flashBattery();
    } else if(hunger === 2) {
      transition(zones.wheel);

      hide(objects.greenLight, false);
      hide(objects.greenPump, false);

      hide(objects.barfillLight, false);
      hide(objects.barfillPump, false);

      addClass(objects.greenLight, "fillbar-horizontal-tofull");
      addClass(objects.greenPump, "fillbar-horizontal-tofull");
      batterynoise2();
      chargeBattery();
    }
  }
}

function flashBattery() {
  hide(objects.battery, false);
  hide(objects.redbit, false);
  addClass(objects.redbit, "flash")
  batteryToHamster()
  setTimeout(unflashBattery, 2000); //works badly if you click several times
}

function unflashBattery() {
  hide(objects.battery, true);
  hide(objects.redbit, true);
}

function useHam() {
}

function hasClass(object, whichClass){
  object.dom.classList.includes(toAdd);
}

function addClass(object, toAdd){
  object.dom.classList.add(toAdd);
}

function removeClass(object, toRemove){
  object.dom.classList.remove(toRemove);
}

function useInsideDoor() {
  if(currentZone === zones.bottom) {
    if(!insideDoorPower){
      //hide(objects.lightning, false);
      //addClass(objects.lightning, "flash");
      //setTimeout(() => {hide(objects.lightning, true)}, 2000)
    } else transition(zones.airlock);
  } else if(currentZone === zones.airlock && !flooded) {
    if(suited){
      useHook();
    }
    transition(zones.bottom);
  }
}

function bubble(){
  if(draining){
    bubbleNum = (bubbleNum + 1) % 3;
    if(bubbleNum === 0) {
      hide(objects.bubble1, true);
      hide(objects.bubble2, false);
    }
    if(bubbleNum === 1) {
      hide(objects.bubble2, true);
      hide(objects.bubble3, false);
    }
    if(bubbleNum === 2) {
      hide(objects.bubble3, true);
      hide(objects.bubble1, false);
    }
    setTimeout(bubble, 300);
  } else {
    hide(objects.bubble1, true);
    hide(objects.bubble2, true);
    hide(objects.bubble3, true);
  }

}

function toggleFlood(toFlood){
  if(toFlood){
    flooded = true;
    hide(objects.flood, false);
    addClass(objects.flood, "fillbar");
    flooding = true;
    setTimeout(()=>flooding=false, 2500)
  } else if(draining == false && flooded == true && flooding == false) {
    objects.flood.dom.classList.remove("fillbar")
    objects.flood.dom.classList.add("drain")
    draining = true;

    bubbleNum = 1;
    bubble();

    setTimeout(() => {
      flooded = false;
      objects.flood.dom.classList.remove("drain")
      hide(objects.flood, true);
      draining = false;
    }, 3200)
  }
}

function useOutsideDoor() {
  if(currentZone === zones.outside) {
    transition(zones.airlock);
  } else if(currentZone === zones.airlock && suited && !draining) {
    transition(zones.outside);
    toggleFlood(true);
  }
}

function stopmusic(){
  document.getElementById("music").pause();
  document.getElementById("wheelnoise").pause();
  document.getElementById("battery1").pause();
  document.getElementById("battery2").pause();
}

function eject() {
  stopmusic();
  losenoise();
  hide(objects.eject, false);
  currentZone = zones.submarine;
  //hide(objects.submarine, false);
  hide(objects.ham, true);
  removeClass(objects.wheel, "spin");
  if(hasStick){
    hide(objects.stick, true);
  }
  if(hasFood){
    hide(objects.food, true);
  }

  setTimeout(()=>{
    hide(objects.retry, false);
    objects.retry.dom.style.cursor = "pointer";
  },6000)
  //addClass(objects.submarine, "fly-away");
}

function useSpaceSuit() {
  if(currentZone === zones.airlock) {
    changePic(objects.ham, "spaceham.png");
    hide(objects.spacesuit, true);
    suited = true;
  }
}

function useDrain(){
  if(currentZone == zones.airlock){
    toggleFlood(false);
  }
}

function useHook() {
  if(currentZone === zones.airlock && !flooded) {
    changePic(objects.ham, "ham.png");
    hide(objects.spacesuit, false);
    suited = false;
  }
}

function useGrass() {
  if(currentZone === zones.outside && scaredyFish && !collectedGrass){
    eating = true;
    collectedGrass = true;
    addClass(objects.ham, "wobblestep");
    setTimeout(()=> {
      eating = false
      removeClass(objects.ham, "wobblestep");
      collectedGrass = true;
      hasFood = true;
      hide(objects.food, false);
      foodToHamster();
    }, 2000)
    //grassStick = true;
    // changePic(objects.grass, "cutgrass.png");
    //changePic(objects.stick, "grassstick.png")
    //hide(objects.grass, true);
  }
}

/*
function useGrassPile() {
  if(currentZone === zones.top && grassPile) {
    grassPile = false;
    hide(objects.grassPile, true);
    hunger = 2;
  }
}*/

function useFish() {
  if(currentZone === zones.outside && hasStick && !scaredyFish) {
    scaredyFish = true;
    addClass(objects.stick, "poke");
    setTimeout(() => {
      hide(objects.stick, true);
      addClass(objects.fish, "fish-away")
    }, 700)
  }
}

function move(object, position){
  object.dom.style.left = position.left;
  object.dom.style.top = position.top;
}

function hide(object, hiding){
  if(hiding){
    object.dom.style.visibility = "hidden"
  } else {
    object.dom.style.visibility = "visible"
  }
}

function stickToHamster(){
  move(objects.stick, {
    top: parseInt(objects.ham.dom.style.top) + 6,
    left: parseInt(objects.ham.dom.style.left) + 20});
}

function foodToHamster(){
  move(objects.food, {
    top: parseInt(objects.ham.dom.style.top) + 10,
    left: parseInt(objects.ham.dom.style.left) + 20});
}

function useFood(){
  if(currentZone === zones.top || currentZone === zones.bottom){
    hasFood = false;
    eating = true;
    addClass(objects.ham, "wobble");
    hide(objects.battery, false);
    hide(objects.greenham, false);
    addClass(objects.greenham, "fillbar")
    setTimeout(() => {
      eating = false;
      removeClass(objects.ham, "wobble");
      hide(objects.battery, true);
      hide(objects.greenham, true);
      hide(objects.food, true);
      hunger = 2;
    }, 3000);
  }
}

function batteryToHamster(){
  move(objects.battery, {
    top: parseInt(objects.ham.dom.style.top) - 28,
    left: parseInt(objects.ham.dom.style.left) + 21});
  move(objects.redbit, {
    top: parseInt(objects.ham.dom.style.top) - 20,
    left: parseInt(objects.ham.dom.style.left) + 21});
  move(objects.greenham, {
    top: parseInt(objects.ham.dom.style.top) - 24,
    left: parseInt(objects.ham.dom.style.left) + 24});
}

function useStick() {
  if(currentZone === zones.top){
    if(hasStick){
      move(objects.stick, {left: 260, top:348});
      objects.stick.dom.style.transform = "rotate(0deg)";
      /*if(grassStick) {
        grassStick = false;
        changePic(objects.stick, "stick.png");
        hide(objects.grassPile, false);
        grassPile = true;
      }*/
    } else {
      stickToHamster();
      objects.stick.dom.style.transform = "rotate(90deg)"
    }
    hasStick = !hasStick;
  }
}

preload();
//start();

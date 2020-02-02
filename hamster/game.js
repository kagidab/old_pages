let currentZone, flooded, suited, hasStick, scaredyFish, finished, hunger,
  collectedGrass, grassPile, draining, battery, startImage, zones,
  insideDoorPower, doorBattery, hasFood, busy, flooding, timer, objects, sounds = {}, images;

let HIDE = true, SHOW = false;

let imagePath = "pic/";

function allKeys(fromObject){
  return Object.keys(fromObject).map((key) => fromObject[key]);
}

async function preload(){
  startImage = new Image();
  startImage.src = imagePath + "intro.png";
  document.body.appendChild(startImage);

  await fetch("objects.json")
    .then(response => response.json())
    .then(response => objects = response)

  await fetch("zones.json")
    .then(response => response.json())
    .then(response => zones = response)

  await fetch("sounds.json")
    .then(response => response.json())
    .then(response => allKeys(response).forEach(
      sound => {
        soundDom = document.createElement("audio");
        soundDom.src = sound.src;
        soundDom.setAttribute("preload", "true");
        soundDom.setAttribute("controls", "none");
        soundDom.style.display = "none";
        document.body.appendChild(soundDom);

        sound.dom = soundDom;
        sound.play = function(){ this.dom.play(); }
        sound.stop = function(){ this.dom.pause(); }
        sound.reset = function(){ this.dom.currentTime = 0; }
        sounds[sound.name] = sound;
      }
    ))

  await fetch("images.json")
    .then(response => response.json())
    .then(response => 
      response.map(
        image => { let load = new Image(); load.src = imagePath + image; 
        }
      )
    )

  objects.ladder.action = useLadder;
  objects.wheel.action = useWheel;
  objects.wheelstand.action = useWheel;
  objects.insideDoor.action = useInsideDoor;
  objects.outsideDoor.action = useOutsideDoor;
  objects.drain.action = useDrain;
  objects.retry.action = retry;
  objects.outsideDoor.action = useOutsideDoor;
  objects.stick.action = useStick;
  objects.food.action = useFood;
  objects.fish.action = useFish;
  objects.playagain.action = retry;
  objects.spacesuit.action = useSpaceSuit;
  objects.grass.action = useGrass;

  startImage.onclick = start;
}

function start(){
  stopSound();
  sounds.music.play();
  startImage.style.hidden = "hidden";
  clearTimeout(timer);

  flooded = false, suited = false, scaredyFish = false, hasStick = false,
    collectedGrass = false, draining = false,
    finished = false, insideDoorPower = false, hasFood = false, busy = false,
    flooding = false, hunger = 0;

  allKeys(objects).forEach((object) => {
    let image = new Image();
    image.src = "pic/" + object.src;
    image.onclick = object.action;
    image.style.position = "absolute";
    image.style.left = object.position.left;
    image.style.top = object.position.top;
    image.setAttribute('draggable', false);
    object.dom = image;
    if(object.hidden) image.style.visibility = "hidden";
    document.body.appendChild(image);
  });
  transition(zones.top);

  addClass(objects.greenDoor, "empty");
  addClass(objects.greenPump, "empty");
  addClass(objects.greenLight, "empty");

  addClass(objects.yellow, "slow-flash");
  addClass(objects.clockhand, "clock-spin");

  timer = setTimeout(() => { if(!finished) eject() }, 60000);
}

function retry(){
  start();
}

function changePic(object, newPic){
  object.dom.src = "pic/" + newPic;
}

function transition(zone) {
  if(!busy) { //would be better having a general notion of business
    currentZone = zone;
    if(!suited) changePic(objects.ham, zone.src);
    toggleWheel(currentZone === zones.wheel);
    move(objects.ham, zone.position);
    if(hasStick) stickToHamster();
    if(hasFood) foodToHamster();
    batteryToHamster(); //could make conditional
  }
}

function end() {
  busy = true;
  stopEverything();
  sounds.win.play();
  changePic(objects.ham, "sleep.png");

  setTimeout( () => { hide(objects.heart, SHOW); }, 3000)
  setTimeout( () => {
    hide(objects.playagain, SHOW);
    objects.playagain.dom.style.cursor = "pointer";
  }, 5000)
}

function useLadder() {
  switch(currentZone){
    case zones.top: transition(zones.bottom); break;
    case zones.bottom: transition(zones.top); break;
  }
}

function toggleWheel(toSpin){
  if(toSpin){
    addClass(objects.wheel, "spin", 4000); 
    addClass(objects.ham, "wobble", 4000);
    sounds.wheel.play();
  }
}

function chargeBattery(){
  transition(zones.wheel);

  addClass(objects.greenLight, "fillbar-horizontal-tofull");
  addClass(objects.greenPump, "fillbar-horizontal-tofull");
  sounds.battery2.play();
  setTimeout(() => {
    removeClass(objects.yellow, "slow-flash");
    finished = true;
    transition(zones.top);
    end();
  }, 4000)
}

function chargeDoor(){
  transition(zones.wheel);

  addClass(objects.greenDoor, "fillbar-horizontal");
  addClass(objects.greenLight, "fillbar-horizontal-tohalf");
  addClass(objects.greenPump, "fillbar-horizontal-tohalf");

  sounds.battery1.play();
  setTimeout(() => {
    hunger = 1;
    insideDoorPower = true;
    transition(zones.bottom);
  }, 4000)
}

function useWheel() {
  if(currentZone === zones.bottom && !busy && !hasStick) {
    switch(hunger){
      case 0: chargeDoor(); break;
      case 1: flashBattery(); break;
      case 2: chargeBattery(); break;
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

function hasClass(object, whichClass){
  object.dom.classList.includes(toAdd);
}

function addClass(object, toAdd, timeLimit){
  object.dom.classList.add(toAdd);
  if(timeLimit !== undefined){
    setTimeout(() => removeClass(object, toAdd), timeLimit);
  }
}

function removeClass(object, toRemove){
  object.dom.classList.remove(toRemove);
}

function suitDown(){
  changePic(objects.ham, "ham.png");
  hide(objects.spacesuit, false);
  suited = false;
}

function useInsideDoor() {
  if(currentZone === zones.bottom && insideDoorPower) {
    transition(zones.airlock);
  } else if(currentZone === zones.airlock && !flooded) {
    if(suited) suitDown();
    transition(zones.bottom);
  }
}

function bubble(){
  if(draining) {
    hide(objects.bubble1, SHOW);
    hide(objects.bubble3, HIDE);
    setTimeout(bubble2, 300);
  } else {
    hide(objects.bubble1, HIDE);
    hide(objects.bubble2, HIDE);
    hide(objects.bubble3, HIDE);
  }
}

function bubble2(){
  hide(objects.bubble1, HIDE);
  hide(objects.bubble2, SHOW);
  setTimeout(bubble3, 300);
}

function bubble3(){
  hide(objects.bubble2, HIDE);
  hide(objects.bubble3, SHOW);
  setTimeout(bubble, 300);
}

function toggleFlood(toFlood){
  if(toFlood){
    flooded = true;
    flooding = true;
    hide(objects.flood, SHOW);
    addClass(objects.flood, "fillbar");
    setTimeout(() => flooding = false, 2500)
  } else if(draining == false && flooded == true && flooding == false) {
    removeClass(objects.flood, "fillbar");
    addClass(objects.flood, "drain", 3200);
    draining = true;
    bubble();

    setTimeout(() => {
      flooded = false;
      hide(objects.flood, HIDE);
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

function stopSound() {
  allKeys(sounds).forEach((sound) => {
    sound.stop();
    sound.reset();
  });
}

function stopEverything(){
  stopSound();
  removeClass(objects.wheel, "spin");
  hide(objects.battery, HIDE);
  hide(objects.redbit, HIDE);
  hide(objects.greenham, HIDE);
  if(hasStick){ hide(objects.stick, true); }
  if(hasFood){ hide(objects.food, true); }
}

function eject() {
  stopEverything();
  sounds.youlose.play();
  hide(objects.eject, false);
  hide(objects.ham, true);
  currentZone = zones.submarine;

  setTimeout(()=>{
    hide(objects.retry, false);
    objects.retry.dom.style.cursor = "pointer";
  },6000)
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

function useGrass() {
  if(currentZone === zones.outside && scaredyFish && !collectedGrass){
    busy = true;
    collectedGrass = true;
    addClass(objects.ham, "wobblestep", 2000);
    setTimeout(() => {
      busy = false
      collectedGrass = true;
      hasFood = true;
      hide(objects.food, false);
      foodToHamster();
    }, 2000)
  }
}

function useFish() {
  if(currentZone === zones.outside && hasStick && !scaredyFish) {
    scaredyFish = true;
    addClass(objects.stick, "poke");
    setTimeout(() => {
      hide(objects.stick, true);
      hasStick = false;
      addClass(objects.fish, "fish-away")
    }, 700)
  }
}

function move(object, position){
  object.dom.style.left = position.left;
  object.dom.style.top = position.top;
}

function hide(object, hiding){
  object.dom.style.visibility = hiding? "hidden" : "visible";
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
    busy = true;
    addClass(objects.ham, "wobble", 3000);
    hide(objects.battery, SHOW);
    hide(objects.greenham, SHOW);
    hide(objects.redbit, HIDE);
    addClass(objects.greenham, "fillbar")
    setTimeout(() => {
      busy = false;
      hide(objects.battery, HIDE);
      hide(objects.greenham, HIDE);
      hide(objects.food, HIDE);
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
    } else {
      stickToHamster();
      objects.stick.dom.style.transform = "rotate(90deg)"
    }
    hasStick = !hasStick;
  }
}

preload();

`use strict`;

let maxClicks = 25;
let attampt = 0;

let arrayOfObjests = [];

let firstImage;
let seconedImage;
let thirdImage;
let mainId = document.getElementById("container");
let ButtonResult=document.getElementById('ButtonResult');
let containerImg=document.getElementById('containerImg');
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");

let arrayOFSrcImages = [
  "bag.jpg",
  "banana.jpg",
  "bathroom.jpg",
  "boots.jpg",
  "breakfast.jpg",
  "bubblegum.jpg",
  "chair.jpg",
  "cthulhu.jpg",
  "dog-duck.jpg",
  "dragon.jpg",
  "pen.jpg",
  "pet-sweep.jpg",
  "scissors.jpg",
  "shark.jpg",
  "sweep.png",
  "tauntaun.jpg",
  "unicorn.jpg",
  "usb.gif",
  "water-can.jpg",
  "wine-glass.jpg",
];
let arrayOFNameImages = [
  "bag",
  "banana",
  "bathroom",
  "boots",
  "breakfast",
  "bubblegum",
  "chair",
  "cthulhu",
  "dog-duck",
  "dragon",
  "pen",
  "pet-sweep",
  "scissors",
  "shark",
  "sweep",
  "tauntaun",
  "unicorn",
  "usb",
  "water-can",
  "wine-glass",
];

function Busmall(nameProduct, src) {
  this.nameProduct = nameProduct;
  this.src = "/img/" + src;
  this.timeShown = 0;
  this.vote = 0;
  // console.log(this);
  arrayOfObjests.push(this);
}

function createObjects() {
  // console.log("we are in ")
  for (let i = 0; i < arrayOFSrcImages.length; i++) {
    new Busmall(arrayOFNameImages[i], arrayOFSrcImages[i]);
  }
}

function generateRandomIndex() {
  let randomIndex = Math.floor(Math.random() * arrayOfObjests.length);
  return randomIndex;
}


function chooseThreeRandomImages() {
  firstImage = generateRandomIndex();
  seconedImage = generateRandomIndex();
  thirdImage = generateRandomIndex();

  let bool = true;
  while (bool) {
    if (firstImage === seconedImage) {
      seconedImage = generateRandomIndex();
    } else if (firstImage === thirdImage) {
      thirdImage = generateRandomIndex();
    } else if (seconedImage === thirdImage) {
      thirdImage = generateRandomIndex();
    } else {
      bool = false;
    }

  }

  image1.setAttribute("src", arrayOfObjests[firstImage].src);
  containerImg.appendChild(image1);
arrayOfObjests[firstImage].timeShown++;
containerImg.appendChild(image2);
  image2.setAttribute("src", arrayOfObjests[seconedImage].src);
  arrayOfObjests[seconedImage].timeShown++;
  containerImg.appendChild(image3);
  image3.setAttribute("src", arrayOfObjests[thirdImage].src);
  arrayOfObjests[thirdImage].timeShown++;
  //console.log(firstImage+" "+seconedImage+"  "+thirdImage);
}

createObjects();
chooseThreeRandomImages();

//console.log(arrayOfObjests);


image1.addEventListener("click", Clicking);
image2.addEventListener("click", Clicking);
image3.addEventListener("click", Clicking);
function Clicking(event) {
    let paraEl;
  attampt++;
  console.log(attampt);
  if (attampt <= maxClicks) {
    if (event.target.id === "firstImage") {
      arrayOfObjests[firstImage].vote++;
    } else if (event.target.id === "seconedImage") {
      arrayOfObjests[seconedImage].vote++;
    } else {
      arrayOfObjests[thirdImage].vote++;
    }
    
  } else {
    image1.removeEventListener("click", Clicking);
    image2.removeEventListener("click", Clicking);
    image3.removeEventListener("click", Clicking);
  }

  chooseThreeRandomImages();

//  console.log(arrayOfObjests);
}

ButtonResult.addEventListener("click",clickButton);

function clickButton(event){
    let ulEl=document.createElement('ul');
    mainId.appendChild(ulEl);
    let liEl;
    for(let i=0;i<arrayOfObjests.length;i++){
        liEl=document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent=`${arrayOfObjests[i].nameProduct} had ${arrayOfObjests[i].vote} votes and was seen ${arrayOfObjests[i].timeShown} times`
    }
    ButtonResult.removeEventListener("click",clickButton);
}

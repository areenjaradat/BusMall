`use strict`;

let maxClicks = 25;
let attampt = 1;

let arrayOfObjests = [];

let firstImage;
let seconedImage;
let thirdImage;
let mainId = document.getElementById("container");
let ButtonResult = document.getElementById("ButtonResult");
let containerImg = document.getElementById("containerImg");
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");
let arrayOfRanndom = [];

let arrayOfVotes = [];
let arrayOfImageDisplayed = [];

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

  while (arrayOfRanndom.includes(randomIndex)) {
    randomIndex = Math.floor(Math.random() * arrayOfObjests.length);
    //console.log("hi")
  }

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

  arrayOfRanndom[0] = firstImage;
  arrayOfRanndom[1] = seconedImage;
  arrayOfRanndom[2] = thirdImage;
  //console.log(image1,image2,image3)
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

  // console.log(attampt);
  // fix error for id of image here

  if (attampt <= maxClicks) {
    if (event.target.id === "image1") {
      arrayOfObjests[firstImage].vote++;
    } else if (event.target.id === "image2") {
      arrayOfObjests[seconedImage].vote++;
    } else {
      arrayOfObjests[thirdImage].vote++;
    }
  } else {
    image1.removeEventListener("click", Clicking);
    image2.removeEventListener("click", Clicking);
    image3.removeEventListener("click", Clicking);
    savedVotes();
  }

  chooseThreeRandomImages();
 
  //  console.log(arrayOfObjests);
}

ButtonResult.addEventListener("click", clickButton);

function clickButton(event) {
  
  /*createElement();*/
  createChart();
  ButtonResult.removeEventListener("click", clickButton);
 // savedVotes();
  
}
 
function createElement() {
  let ulEl = document.createElement("ul");
  mainId.appendChild(ulEl);
  let liEl;
  for (let i = 0; i < arrayOfObjests.length; i++) {
    liEl = document.createElement("li");
    ulEl.appendChild(liEl);
  //liEl.textContent = `${arrayOfObjests[i].nameProduct} had ${arrayOfObjests[i].vote} votes and was seen ${arrayOfObjests[i].timeShown} times`;
    liEl.textContent = `${arrayOfObjests[i].nameProduct} had ${arrayOfObjests[i].vote} votes`;
  }
}

function createChart() {
  for (let i = 0; i < arrayOfObjests.length; i++) {
    arrayOfVotes.push(arrayOfObjests[i].vote);
    arrayOfImageDisplayed.push(arrayOfObjests[i].timeShown);
  }

  var ctx = document.getElementById("Chart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: arrayOFNameImages,
      datasets: [
        {
          label: "Buses Vote",
          backgroundColor: "#F3E5AB",
          borderColor: "rgb(255, 99, 132)",
          data: arrayOfVotes,
        },
        {
          label: "Image  Displayed",
          backgroundColor: "#F2BB66",
          borderColor: "rgb(155,100,30)",
          data: arrayOfImageDisplayed,
        },
      ],
    },

    options: {},
  });
}

function savedVotes() {
  
  let busesMall = JSON.stringify(arrayOfObjests);
  localStorage.setItem("busesmall", busesMall);
  console.log(arrayOfObjests)
}

function gettingBusMall() {
  let getBusMall = localStorage.getItem("busesmall");
  let contents = JSON.parse(getBusMall);
  console.log(contents);

  if (contents) {
    arrayOfObjests = contents;
  }
  let para = document.createElement("p");
  mainId.appendChild(para);
  para.textContent = "last voting result";
  createElement();
}

gettingBusMall();
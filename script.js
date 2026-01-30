let range = document.querySelector(".range");
let passwordLimit = document.querySelector(".password-limit");
let copyButton = document.querySelector(".copy-button");
let generateBtn = document.querySelector(".generate-button");
let passwordInput = document.querySelector(".pass");
let teller = document.querySelector(".teller");
let allCheckBoxes = document.querySelectorAll(".check-box");
let forSymbol = document.querySelector("#symbol");
let forNumber = document.querySelector("#number");
let forLowercase = document.querySelector("#lowercase");
let forUppercase = document.querySelector("#uppercase");
let light = document.querySelector(".light");
let sym = '`!@#$%^&*();:""<>.,/*}{][|?';

let limitValue = 10;
function dragHandler() {
  range.value = limitValue;
  passwordLimit.innerText = limitValue;
  const min = range.min;
  const max = range.max;
  range.style.backgroundSize = `${
    ((limitValue - min) * 100) / (max - min)
  }% 100%`;
}

range.addEventListener("input", (e) => {
  limitValue = range.value;
  dragHandler();
});

dragHandler();

let ct = 0;
allCheckBoxes.forEach((checkBox) => {
  checkBox.addEventListener("click", () => {
    if (checkBox.checked) {
      ct += 1;
    }
    if (limitValue < ct) {
      limitValue = ct;
      dragHandler();
    }
  });
});

function randomValueGenerator(min, max) {
  return Math.floor((max - min) * Math.random()) + min;
}
function generateUpperCase() {
  return String.fromCharCode(randomValueGenerator(65, 91));
}
function generateLowerCase() {
  return String.fromCharCode(randomValueGenerator(97, 123));
}
function generateNumber() {
  return randomValueGenerator(0, 10);
}
function symbolGenerator() {
  return sym[randomValueGenerator(0, sym.length)];
}

function strengthGenerator() {
  let count = 0;
  if (forSymbol.checked) {
    count++;
  }
  if (forLowercase.checked) {
    count++;
  }
  if (forUppercase.checked) {
    count++;
  }
  if (forNumber.checked) {
    count++;
  }
  if (
    (count >= 3 && limitValue >= 6) ||
    (count >= 2 && limitValue >= 10) ||
    (count >= 1 && limitValue >= 15)
  ) {
    light.style.backgroundColor = "lightgreen";
  } else {
    light.style.backgroundColor = `red`;
  }
}

async function copyInput() {
  try {
    await navigator.clipboard.writeText(passwordInput.value);
    teller.innerText = "Copied";
  } catch (error) {
    teller.innerText = "Failed";
  }
  teller.classList.add("active");
  setTimeout(() => {
    teller.classList.remove("active");
    teller.innerText = "";
  }, 1000);
}

copyButton.addEventListener("click", () => {
  if (passwordInput.value) {
    copyInput();
  }
});

generateBtn.addEventListener("click", () => {
  let Arr = [],
    password = "";
  if (forLowercase.checked) {
    Arr.push(generateLowerCase);
  }
  if (forUppercase.checked) {
    Arr.push(generateUpperCase);
  }
  if (forNumber.checked) {
    Arr.push(generateNumber);
  }
  if (forSymbol.checked) {
    Arr.push(symbolGenerator);
  }

  limitValue = Math.max(limitValue, Arr.length);
  dragHandler();
  for (let i = 0; i < Arr.length; i++) {
    password += Arr[i]();
  }
  for (let i = 0; i < limitValue - Arr.length; i++) {
    try {
      password += Arr[randomValueGenerator(0, Arr.length)]();
    } catch (err) {
      console.log(err);
    }
  }

  passwordInput.value = password;
  strengthGenerator();
});

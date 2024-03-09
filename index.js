// ---------------------------------------------
// Percentage
function calculatePercentage(min, max, value) {
    // Ensure the value is within bounds
    if (value < min) value = min;
    if (value > max) value = max;
    
    // Calculate the percentage
    var percentage = ((value - min) / (max - min)) * 100;
    return percentage;
}

// ---------------------------------------------
// SLIDER
// Select html elements
let rangeSliderEl = document.getElementById("rangeSlider");
let rangeInputEl = document.getElementById("rangeInput");

// Style track of the slider
function styleRange(){
    rangeSliderEl.style.background = `linear-gradient(to right, #10B981 ${calculatePercentage(rangeSliderEl.min,rangeSliderEl.max,rangeSliderEl.value)}%, #273549 ${calculatePercentage(rangeSliderEl.min,rangeSliderEl.max,rangeSliderEl.value)}%)`;
}

// Add styled track to slider
styleRange()

// Add oninput fucntions
rangeSliderEl.oninput = changeInput;
rangeInputEl.oninput = changeSlider;

// Add slider functions
function changeInput(){
    rangeInputEl.value = this.value;
    // Add styled track to slider
    styleRange()
    // Change password when changing the num of characters
    generatePassword();
}

function changeSlider(){
    // later display errors if user selects more or less than max min
    if (this.value > 40){
        this.value = 40;
        rangeSliderEl.value = this.value;
    } else {
        rangeSliderEl.value = this.value;
    }
    // Add styled track to slider
    styleRange()
    
    // Change password when changing the num of characters
    generatePassword();   
}

// ---------------------------------------------
// GENERATING PASSWORD
// Set variables for generating password
let passwordLength = rangeSliderEl.value;
let useNumbers = true;
let useSpecialChars = true;

// Set all separate variables for arrays
const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialChars = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];


// Select html elements
const passwordEl = document.getElementById("password-el");
const numberCheckEl = document.getElementById("numbersCheck");
const specialCheckEl = document.getElementById("specialCheck");
const tooltip = document.getElementById("btn-tooltip");

// Add oninput functions
numberCheckEl.oninput = changeNumCheck;
specialCheckEl.oninput = changeSpecCheck;

// Add check functions
function changeNumCheck(){
    if (useNumbers){
        useNumbers = false;
    } else {
        useNumbers = true;
    }
    // Change password when changing the num of characters
    generatePassword();  
}

function changeSpecCheck(){
    if (useSpecialChars){
        useSpecialChars = false;
    } else {
        useSpecialChars = true;
    }
    // Change password when changing the num of characters
    generatePassword();  
}



function generatePassword(){
    // Set current password length
    passwordLength = rangeSliderEl.value;

    // Set one arrays object
    const arraysObj = {
        letters: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
        numbers: [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        specialChars: ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"]
    };

    // Reset password
    passwordEl.textContent = "";

    if (useNumbers && useSpecialChars){
        getNewPassword(arraysObj);
    } else if (useNumbers && !useSpecialChars){
        delete arraysObj.specialChars;
        getNewPassword(arraysObj);
    } else if (!useNumbers && useSpecialChars){
        delete arraysObj.numbers;
        getNewPassword(arraysObj);
    } else {
        delete arraysObj.specialChars;
        delete arraysObj.numbers;
        getNewPassword(arraysObj);
    }
}

// Generate number + spec chars password
function getNewPassword(arraysObj){

    // Get keys of arrays from the object
    const keys = Object.keys(arraysObj);

    // Loop as long as password length
    for (let i = 0; i < passwordLength; i++){

        // Get random key from keys
        const randomKey = keys[Math.floor(Math.random()*keys.length)];

        // create a span for single char
        const singleChar = document.createElement('span');

        // Add color class to span if num 
        if (randomKey === "numbers"){
            singleChar.classList.add("blue");
        } else if (randomKey === "specialChars"){
            singleChar.classList.add("orange");
        }

        // Choose random array
        let randomArray = arraysObj[randomKey];

        // Select a char from that array
        let randomChar = randomArray[Math.floor(Math.random()*randomArray.length)]

        // add it to the span and to the password
        singleChar.textContent += randomChar;
        passwordEl.appendChild(singleChar);
    }
}

// First time - Generate password right after opening the app
generatePassword()

// ---------------------------------------------
// COPY TO CLIPBOARD

const copyBtn = document.querySelector('.copyBtn');

copyBtn.addEventListener('click', ()=> {
    const text = copyBtn.firstElementChild.innerText;
    copyToClipboard(text);
    tooltip.textContent = "Coppied to clipboard!"
});

copyBtn.addEventListener("mouseleave", () => {
    tooltip.textContent = "Click to copy"
});

function copyToClipboard(text){
    navigator.clipboard.writeText(text);
}

// ---------------------------------------------
// REGENERATE PASSWORD

const regBtn = document.getElementById('reg-pass');
regBtn.onclick = generatePassword;

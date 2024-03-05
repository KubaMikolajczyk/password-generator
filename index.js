// ---------------------------------------------
// SLIDER
// Select html elements
let rangeSliderEl = document.getElementById("rangeSlider");
let rangeInputEl = document.getElementById("rangeInput");

// Add oninput fucntions
rangeSliderEl.oninput = changeInput;
rangeInputEl.oninput = changeSlider;

// Add slider functions
function changeInput(){
    rangeInputEl.value = this.value;
    // Change password when changing the num of characters
    generatePassword();
}

function changeSlider(){
    // later display errors if user selects more or less than max min
    if (this.value > 60){
        this.value = 60;
        rangeSliderEl.value = this.value;
    } else {
        rangeSliderEl.value = this.value;
    }
    // Change password when changing the num of characters
    generatePassword();   
}

// ---------------------------------------------
// GENERATING PASSWORD
// Set variables for generating password
let passwordLength = rangeSliderEl.value;
let useNumbers = true;
let useSpecialChars = true;
const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialChars = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"];
let password = "";

// Select html elements
let passwordEl = document.getElementById("password-el");
let numberCheckEl = document.getElementById("numbersCheck");
let specialCheckEl = document.getElementById("specialCheck");

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

    // Reset password
    password = "";
    let allArrays = [numbers, letters, specialChars];

    if (useNumbers && useSpecialChars){
        password = getNewPassword(allArrays);
    } else if (useNumbers && !useSpecialChars){
        // Remove special chars from arrays list
        allArrays.pop();
        password = getNewPassword(allArrays);
    } else if (!useNumbers && useSpecialChars){
        // Remove numbers from arrays list
        allArrays.shift();
        password = getNewPassword(allArrays);
    } else {
        // Remove numbers and special chars from arrays list
        allArrays.pop();
        allArrays.shift();
        password = getNewPassword(allArrays);
    }

    // Set new password text
    passwordEl.textContent = password;
}

// Generate number + spec chars password
function getNewPassword(allArrays){
    let newPassword = "";
    // Loop as long as password length
    for (let i = 0; i < passwordLength; i++){
        // Choose random array
        let randomArray = allArrays[Math.floor(Math.random()*allArrays.length)];
        // Select a char from that array
        let randomChar = randomArray[Math.floor(Math.random()*randomArray.length)]
        // add it to the password
        newPassword += randomChar;
    }
    return newPassword;
}

// First time - Generate password right after opening the app
generatePassword()
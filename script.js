const inputSlider = document.querySelector("[data-lengthSlider]");
const lenngthDisplay = document.querySelector("[data-lengthNumber]");

const PasswordDisplay = document.querySelector("[data-PasswordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '!@#$%^&*({)}[]|~`.<>,/*-+';



let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

// set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    lenngthDisplay.innerText = passwordLength;
};

function setIndicator(color) {
    indicator.computedStyleMap.backgroundColor = color;
};

function getRandomInteger(min,max) {

    return Math.floor(Math.random() * (max-min)) + min;
};

function generateRandomNumber() {
    return getRandomInteger(0,9);
};

function generateLowerCase() {
    return String.fromCharCode(getRandomInteger(97,123));
};


function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65,91));
};

function generateSymbols() {
    const randNum = getRandomInteger(0, symbols.length);

    return symbols.charAt(randNum);
};

function calcStrength() {

}

async function copyContent() {
    try{
        await navigator.clipboard.writeText(PasswordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "failed";
    }

    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}; 

function shufflePassword(shufflePassword) {
    //Fisher Yates Method
    for(let i=shufflePassword.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = shufflePassword[i];
        shufflePassword[i] = shufflePassword[j];
        shufflePassword[j] = temp;
    }
    let str = "";
    shufflePassword.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    //special condition
    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});


copyBtn.addEventListener('click', () => {
    if(PasswordDisplay.value){
        copyContent();
    }
})


generateBtn.addEventListener('click' , () => {

    //none of the checkbox are selected
    if(checkCount<=0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    //let's star find new password
    password = "";

    //let's put the stuff mentioned by checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password += generateSymbols();
    // }

    let funcArr  = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbols);


    //compulsory addition
    for(let i=0; i<funcArr.length; i++)
    {
        password += funcArr[i]();
    }

    //remaining addition
    for(let i=0; i<passwordLength-funcArr.length; i++)
    { 
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    //shuffle the passwrd
    password = shufflePassword(Array.from(password));

    //shpw in UI
    PasswordDisplay.value = password;

    //claculate strength
    calcStrength(); 
})
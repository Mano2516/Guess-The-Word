let gameName ="Guess The Word";
document.querySelector("h1").innerHTML=gameName;
document.querySelector("footer").innerHTML=`${gameName} Game Created By MaNo`

let numOfTries = 6;
let numOfLetters = 6;
let currentTry = 1;

let numOfHints = 2;

let wordToGuess = "";

let messageArea = document.querySelector(".message");

const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];

wordToGuess =words[Math.floor(Math.random()*words.length)].toLocaleLowerCase();

document.querySelector(".hint span").innerHTML = numOfHints;

let hintBtn =document.querySelector(".hint");

hintBtn.addEventListener("click", getHint)

function generateInput(){

    let inputsContainer = document.querySelector(".inputs");

    for(let i =1 ;i <= numOfTries;i++){

        let tryDiv= document.createElement("div");

        tryDiv.classList.add(`try-${i}`);

        tryDiv.innerHTML= `<span> Try ${i} </span>`;

        if(i!== 1){

            tryDiv.classList.add("disabled-inputs")

        }

        for(let j =1 ; j<=numOfLetters; j++){

            let input = document.createElement('input')

            input.type="text";

            input.id =`guess-${i}-letter-${j}`;

            input.setAttribute('maxlength','1')

            tryDiv.appendChild(input)

        }

        inputsContainer.appendChild(tryDiv);

    }

    inputsContainer.children[0].children[1].focus();

    let inputsDisabled = document.querySelectorAll(".disabled-inputs input");

    inputsDisabled.forEach((input)=>(input.disabled = true));

    let inputs = document.querySelectorAll("input");

    inputs.forEach((input ,index)=>{
        input.addEventListener ("input", function(){

            this.value= this.value.toUpperCase();

            let nextInput = inputs[index + 1];

            if(nextInput)nextInput.focus();

        });

        input.addEventListener("keydown" , function(event){

            // console.log(event)

            let currentIndex= Array.from(inputs).indexOf(event.target); /// you can use this instead of event.target

            if(event.key === "ArrowRight"){

                let nextInput = currentIndex + 1 ;

                if(nextInput <inputs.length )inputs[nextInput].focus();

            }

            if(event.key === "ArrowLeft"){

                let preInput = currentIndex - 1 ;

                if(preInput >= 0 ) inputs[preInput].focus();

            }

        })

    })

}

// console.log(wordToGuess)

let guessBtn = document.querySelector(".check");

guessBtn.addEventListener("click", handleGuesss)

function handleGuesss () {

let successGuess = true;



for(let i =1 ; i<= numOfLetters ;i++) {

    const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);

    let letter = inputField.value.toLowerCase();

    // console.log(letter);

    let actualLetter= wordToGuess[i-1];

    if (actualLetter===letter) {

        inputField.classList.add("yes-in-place")

    }else if (wordToGuess.includes(letter) && letter!==""){

        inputField.classList.add("not-in-place")

        successGuess = false;

    }else{

        inputField.classList.add("no")

        successGuess = false;

        }

    }

    if(successGuess){

        messageArea.innerHTML= `You Won The Word Is <span> ${wordToGuess} </span>`;

        if(numOfHints===2) {
            messageArea.innerHTML= `You Won  <span> Witout Any Hint</span> `;
        }

        let allTries = document.querySelectorAll(".inputs > div");

        allTries.forEach((tryDiv)=>{

            tryDiv.classList.add("disabled-inputs")

        })

        guessBtn.disabled=true;

        hintBtn.disabled =true;

    }else{

        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");

        let currentElement = document.querySelectorAll(`.try-${currentTry} input`)

        currentElement.forEach((input)=>(input.disabled=true));

        currentTry++;

        let nextTryInput = document.querySelectorAll(`.try-${currentTry} input`);

        nextTryInput.forEach((input)=>(input.disabled = false));

        let el =document.querySelector(`.try-${currentTry}`);

        if(el) {

            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");

            el.children[1].focus();

        }else {

            guessBtn.disabled=true;

            hintBtn.disabled =true;

            messageArea.innerHTML= `You Lost The Word Is <span>${wordToGuess}</span>`

        }

    }

}
function getHint(){

    if(numOfHints>0){

        numOfHints--;

        document.querySelector(".hint span").innerHTML=numOfHints;

    }
    if(numOfHints===0){

        hintBtn.disabled=true;

    }

    let enabledInputs = document.querySelectorAll("input:not([disabled])");

    let emptyEnabled  = Array.from(enabledInputs).filter((input)=> input.value ==="");

    

    if(emptyEnabled.length > 0){

        let randomIndex = Math.floor(Math.random() * emptyEnabled.length);

        // console.log(randomIndex)

        let randomInput = emptyEnabled[randomIndex]

        let indexToFill = Array.from(enabledInputs).indexOf(randomInput);

        if(indexToFill !== -1){

            randomInput.value= wordToGuess[indexToFill].toUpperCase();

        }

    }

}

function handelBackspace(event){

    if(event.key==="Backspace"){

        let inputs = document.querySelectorAll("input:not([disabled])");

        let currentIndex= Array.from(inputs).indexOf(document.activeElement);

        if(currentIndex>0){

            let currentInput = inputs[currentIndex];

            let preInput = inputs[currentIndex - 1];

            currentInput.value="";

            preInput.value="";

            preInput.focus();
        }

    }

}

document.addEventListener("keydown", handelBackspace)

window.onload= function () {

    generateInput();

};

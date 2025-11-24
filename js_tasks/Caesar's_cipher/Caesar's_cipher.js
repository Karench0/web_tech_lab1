const inputFieldWord = document.querySelector("#myInputWord");
const Shift = document.querySelector("#Shift");
const cipher = document.querySelector("#cipher");
const decipher = document.querySelector("#decipher");
const answer = document.querySelector("[data-answer]");
const shiftInfo = document.querySelector('[data-shift]');
const russianAlphabetArray = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я']; 
let count = 0;

cipher.addEventListener("click", ()=>{
    const inputWord = inputFieldWord.value;
    const ShiftAmount = Number(Shift.value) || 1;
    count += ShiftAmount;
    shiftInfo.innerHTML = `По умолчанию шаг = 1. Сейчас: ${count}`
    Shift.value = "";
    cesar(inputWord, ShiftAmount, "encode")
});

decipher.addEventListener("click", ()=>{
    const inputWord = inputFieldWord.value;
    const ShiftAmount = Number(Shift.value) || 1;
    count = 0;
    shiftInfo.innerHTML = `По умолчанию шаг = 1.`
    inputFieldWord.value = "";
    Shift.value = "";
    cesar(inputWord, ShiftAmount, "decode")
});

function cesar(str, shift, action) {
    const array = [];
    let word = ""; 
    
    for (const x of str) {
        array.push({
            letter: x,
            register: isUpperCase(x),
        });
    }

    for (const i of array) {
        const currentLetter = i.letter.toLowerCase();
        const index = russianAlphabetArray.indexOf(currentLetter);

        if (index === -1) {
            word += i.letter;
            continue;
        }

        let newIndex;
        const len = russianAlphabetArray.length;

        if (action == "encode") {
            newIndex = (index + shift) % len;
        } else if (action == "decode") {
            newIndex = (index - shift) % len;
            if (newIndex < 0){
                newIndex += len;
            };
        }

        const newLetter = russianAlphabetArray[newIndex];

        if (i.register) {
            word += newLetter.toUpperCase();
        } else {
            word += newLetter;
        }
    }

    if (answer) answer.innerText = word;
    inputFieldWord.value = word; 
    return word;
}


function isUpperCase(str) {
  return str === str.toUpperCase();
}
   

// эзтыхз фзъзъз
// расшифрованное слово хакуна матата

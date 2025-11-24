const inputFieldNum = document.querySelector("#myInputNum");
const answer = document.querySelector("[data-answer]");
const answBtn = document.querySelector("#answBtn"); // Кнопка "Посчитать"

answBtn.addEventListener('click', () => {
    
    const num = inputFieldNum.value; 

    if (inputFieldNum.value.trim() === "") {
        answer.textContent = "Введите число!";
        return;
    }
    answer.textContent = String(minDigit(num));
    inputFieldNum.value = '';
});

function minDigit(x){
    const numbers = [];
    let min = 10;
    for (const number of x){
        numbers.push(String(number));
    };
    for (let i = 0; i< numbers.length; i++){
        if (min > numbers[i]){
            min = numbers[i];
        };
    };
    return min;
};



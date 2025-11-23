const inputFieldNum = document.querySelector("#myInputNum");
const inputFieldPow = document.querySelector("#myInputPow");
const buttonNum = document.querySelector("#clearBtnNum"); // Кнопка очистки числа
const buttonPow = document.querySelector("#clearBtnPow"); // Кнопка очистки степени
const answer = document.querySelector("[data-answer]");
const answBtn = document.querySelector("#answBtn"); // Кнопка "Посчитать"

answBtn.addEventListener('click', () => {
    
    const num = Number(inputFieldNum.value); 
    const power = Number(inputFieldPow.value);

    
    if (inputFieldNum.value.trim() === "" || inputFieldPow.value.trim() === "") {
        answer.textContent = "Введите оба числа!";
        return;
    }
    answer.textContent = Math.pow(num, power); 
});

answBtn.addEventListener('click', function() {
    inputFieldNum.value = '';
    inputFieldPow.value = '';
});



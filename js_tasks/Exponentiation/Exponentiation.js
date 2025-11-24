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
    answer.textContent = String(pow(num, power));
    inputFieldNum.value = '';
    inputFieldPow.value = ''; 
});
function pow(x, n){
    return x**n;
}

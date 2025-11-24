const inputFieldNum1 = document.querySelector("#myInputNum1");
const inputFieldNum2 = document.querySelector("#myInputNum2");
const answer = document.querySelector("[data-answer]");
const answBtn = document.querySelector("#answBtn");
answBtn.addEventListener('click', () => {
    const num1 = Number(inputFieldNum1.value); 
    const num2 = Number(inputFieldNum2.value);
    if (inputFieldNum1.value.trim() === "" || inputFieldNum2.value.trim() === "") {
        answer.textContent = "Введите оба числа!";
        return;
    }
    
    answer.textContent = String(gcd(num1, num2))
    inputFieldNum1.value = '';
    inputFieldNum2.value = ''; 
});

function gcd(a, b){
    let min;
    let max = 0;
    if (a < b){
        min = a;
    } else {
        min = b;
    };
    for(let i = 0; i < min; i++){
        if (a % i == 0 & b % i == 0){
            max = i;
        }
    };
    return max;
};


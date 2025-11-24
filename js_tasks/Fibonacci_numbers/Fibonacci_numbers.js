const inputFieldNum = document.querySelector("#myInputNum");
const answer = document.querySelector("[data-answer]");
const answBtn = document.querySelector("#answBtn"); // Кнопка "Посчитать"

answBtn.addEventListener('click', () => {
    
    const num = Number(inputFieldNum.value); 

    if (inputFieldNum.value.trim() === "") {
        answer.textContent = "Введите число!";
        return;
    }
    answer.textContent = String(fibb(num));
    inputFieldNum.value = '';
});

function fibb(n){
    const Fibonacci = [1, 1];
    for (let i = 2; i < n; i++){
        Fibonacci.push(Fibonacci[i - 2] + Fibonacci[i - 1]);
    };
    return Fibonacci[n - 1];
};

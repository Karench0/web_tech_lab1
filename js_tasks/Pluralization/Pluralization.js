const inputFieldNum = document.querySelector("#myInputNum");
const answer = document.querySelector("[data-answer]");
const answBtn = document.querySelector("#answBtn"); // Кнопка "Посчитать"

answBtn.addEventListener('click', () => {
    
    const num = Number(inputFieldNum.value); 

    if (inputFieldNum.value.trim() === "") {
        answer.textContent = "Введите число!";
        return;
    }
    answer.textContent = "В результате выполнения запроса было найдено " + String(num) + " " + pluralizeRecords(num)
    inputFieldNum.value = '';
});

function pluralizeRecords(n){
    if(n % 10 == 1 && n % 100 != 11){
        return "запись"
    }else if((n % 10 == 2 || n % 10 == 3 || n % 10 == 4) && 
    (n % 100 != 12 && n % 100 != 13 && n % 100 != 14)){
        return "записи"
    }else return "записей"   
};



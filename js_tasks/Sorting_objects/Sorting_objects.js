const inputFieldNum = document.querySelector("#myInputNum");
const form = document.querySelector('#my-form');
const tbody = document.querySelector('#table_body');
const id_sort = document.querySelector('[data-id]');
const age_sort = document.querySelector('[data-age]');
const users = [];

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const ageInput = form.querySelector('#age');
    const ageValue = Number(ageInput.value);
    const nameInput = form.querySelector('#name');
    const nameValue = nameInput.value;
    if (nameValue.trim() != "" && ageValue.trim() != ""){
        users.push({
            id: users.length,
            name: nameValue,
            age: ageValue,
        })
        InnerTable(users);
        ageInput.value = "";
        nameInput.value = "";  
    } else {
        alert("Введите все значения")
    }

    

    
});

age_sort.addEventListener('click', () => {
    getSortedArray(users, "age");
    InnerTable(users);
});
id_sort.addEventListener('click', () => {
    getSortedArray(users, "id");
    InnerTable(users);
});

function getSortedArray(array, key){
    let n;
    for (let i = 0; i < array.length; i++){
        for(let k = 0; k < array.length - 1; k++){
            if (array[k][key] > array[k+1][key]){
                n = array[k];
                array[k] = array[k+1];
                array[k+1] = n;
            }
        };  
    };
    return array;
};

function InnerTable(data){
    tbody.innerHTML ="";
    for (let x of data){
        tbody.innerHTML += `<tr><td>${x.id}</td><td>${x.name}</td><td>${x.age}</td></tr>`
        console.log(x)
    }
}

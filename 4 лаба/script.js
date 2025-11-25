const soupSelected = document.querySelector("#select_soup");
const dishSelected = document.querySelector("#select_dish");
const drinkSelected = document.querySelector("#select_drink");


const soups = 
[{
    id: "soup1",
    price: 350,
    name: "Борщ домашний",
    weight: 300,
    img: "супы/1.png",
},
{
    id: "soup2",
    price: 320,
    name: "Тыквенный крем-суп",
    weight: 250,
    img: "супы/2.png",
},
{
    id: "soup3",
    price: 300,
    name: "Харчо",
    weight: 300,
    img: "супы/3.png",
}]

const dishes = 
[{
    id: "dish1",
    price: 550,
    name: "Стейк из говядины с овощами гриль",
    weight: 350,
    alt: "Мясо",
    img: "Главные_блюда/1.png",
},
{
    id: "dish2",
    price: 450,
    name: "Паста Карбонара",
    weight: 300,
    alt: "Паста",
    img: "Главные_блюда/2.png",
},
{
    id: "dish3",
    price: 480,
    name: "Лосось на пару",
    weight: 280,
    alt: "Рыба",
    img: "Главные_блюда/3.png",
}]

const drinks = 
[{
    id: "drink1",
    price: 120,
    name: "Апельсиновый сок",
    weight: 0.3,
    alt: "Сок",
    img: "Напитки/1.png",
},
{
    id: "drink2",
    price: 150,
    name: "Капучино",
    weight: 0.2,
    alt: "Кофе",
    img: "Напитки/2.png",
},
{
    id: "drink3",
    price: 80,
    name: "Вода минеральная",
    weight: 0.5,
    alt: "Вода",
    img: "Напитки/3.png",
}]


render();

function render() {
    soupRender()
    dishRender()
    drinkRender()
};

function soupRender(){
    const soup_block = document.querySelector("#soup_block");
    for (x of soups.sort((a, b) => a.name > b.name ? 1 : -1)){
        soup_block.innerHTML += 
       `<div class="dish-card">
            <img src="${x.img}" alt="Суп" height="450px">
            <p class="price">${x.price} ₽</p>
            <p class="name">${x.name}</p>
            <p class="weight">${x.weight} г</p>
            <button id="${x.id}">Добавить</button>
        </div>`
    };
};

function dishRender(){
    const dish_block = document.querySelector("#dish_block");
    for (x of dishes.sort((a, b) => a.name > b.name ? 1 : -1)){
        dish_block.innerHTML += 
       `<div class="dish-card">
            <img src="${x.img}" alt="${x.alt}"  height="450px">
            <p class="price">${x.price} ₽</p>
            <p class="name">${x.name}</p>
            <p class="weight">${x.weight} г</p>
            <button id="${x.id}">Добавить</button>
        </div>`
    };
};

function drinkRender(){
    const drink_sorted =  drinks.sort((a, b) => a.name > b.name ? 1 : -1);
    drink_block.innerHTML = "";
    for (x of drinks.sort((a, b) => a.name > b.name ? 1 : -1)){
        drink_block.innerHTML += 
       `<div class="dish-card">
            <img src="${x.img}" alt="${x.alt}" height="450px">
            <p class="price">${x.price} ₽</p>
            <p class="name">${x.name}</p>
            <p class="weight">${x.weight} л</p>
            <button id="${x.id}">Добавить</button>
        </div>`
    };
};
function sortArray(array){
    const arr = []
    for (x of array){
        arr.push(x.name)
    }
    arr.sort;
    for(let i = 0; i < array.length; i++){
        for(let k = 0; k < arr.length; k++){

        }
    }
}
const soup1 = document.querySelector("#soup1");
const soup2 = document.querySelector("#soup2");
const soup3 = document.querySelector("#soup3");
const dish1 = document.querySelector("#dish1");
const dish2 = document.querySelector("#dish2");
const dish3 = document.querySelector("#dish3");  
const drink1 = document.querySelector("#drink1");
const drink2 = document.querySelector("#drink2");
const drink3 = document.querySelector("#drink3");
const resetButton = document.querySelector("[data-button-reset]");

function changeValue(id){
    const merged = [...soups, ...dishes, ...drinks];
    for (x of merged){
        if (x.id == id){
            return x.name;
        };
    };
};

soup1.addEventListener("click",()=>{
    soupSelected.textContent = changeValue(soup1.id);
})
soup2.addEventListener("click",()=>{
    soupSelected.textContent = changeValue(soup2.id);
})
soup3.addEventListener("click",()=>{
    soupSelected.textContent = changeValue(soup3.id);
})
dish1.addEventListener("click",()=>{
    dishSelected.textContent = changeValue(dish1.id);
})
dish2.addEventListener("click",()=>{
    dishSelected.textContent = changeValue(dish2.id);
})
dish3.addEventListener("click",()=>{
    dishSelected.textContent = changeValue(dish3.id);
})
drink1.addEventListener("click",()=>{
    drinkSelected.textContent = changeValue(drink1.id);
})
drink2.addEventListener("click",()=>{
    drinkSelected.textContent = changeValue(drink2.id);
})
drink3.addEventListener("click",()=>{
    drinkSelected.textContent = changeValue(drink3.id);
})
resetButton.addEventListener("click", ()=>{
    soupSelected.textContent = "Блюдо не выбрано";
    dishSelected.textContent = "Блюдо не выбрано";
    drinkSelected.textContent = "Блюдо не выбрано";
})
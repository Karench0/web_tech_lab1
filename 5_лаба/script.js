const soupSelected = document.querySelector("#select_soup");
const dishSelected = document.querySelector("#select_dish");
const drinkSelected = document.querySelector("#select_drink");
const resetButton = document.querySelector("[data-button-reset]");


const soups = 
[{
    id: "soup1",
    price: 350,
    name: "Борщ домашний",
    weight: 300,
    img: "супы/1.png",
    type: "meat",
},
{
    id: "soup2",
    price: 320,
    name: "Тыквенный крем-суп",
    weight: 250,
    img: "супы/2.png",
    type: "vegan",
},
{
    id: "soup3",
    price: 300,
    name: "Харчо",
    weight: 300,
    img: "супы/3.png",
    type: "meat",
},
{
    id: "soup4",
    price: 350,
    name: "Грибной крем суп",
    weight: 370,
    img: "супы/4.png",
    type: "vegan",
},
{
    id: "soup5",
    price: 280,
    name: "Том-ям",
    weight: 330,
    img: "супы/5.png",
    type: "fish",
},
{
    id: "soup6",
    price: 360,
    name: "Уха из минтая",
    weight: 290,
    img: "супы/6.png",
    type: "fish",
},
]

const dishes = 
[{
    id: "dish1",
    price: 550,
    name: "Стейк из говядины с овощами гриль",
    weight: 350,
    alt: "Мясо",
    img: "Главные_блюда/1.png",
    type: "meat",
},
{
    id: "dish2",
    price: 450,
    name: "Паста Карбонара",
    weight: 300,
    alt: "Паста",
    img: "Главные_блюда/2.png",
    type: "meat",
},
{
    id: "dish3",
    price: 480,
    name: "Лосось на пару",
    weight: 280,
    alt: "Рыба",
    img: "Главные_блюда/3.png",
    type: "fish",
},
{
    id: "dish4",
    price: 300,
    name: "Овощи на гриле",
    weight: 300,
    alt: "Овощи",
    img: "Главные_блюда/4.png",
    type: "vegan",
},
{
    id: "dish5",
    price: 590,
    name: "Тако на овощах",
    weight: 300,
    alt: "Тако",
    img: "Главные_блюда/5.png",
    type: "vegan",
},
{
    id: "dish6",
    price: 590,
    name: "Паста с лососем",
    weight: 350,
    alt: "Паста ",
    img: "Главные_блюда/6.png",
    type: "fish",
},
]                                                 

const drinks = 
[{
    id: "drink1",
    price: 120,
    name: "Апельсиновый сок",
    weight: 0.3,
    alt: "Сок",
    img: "Напитки/1.png",
    type: "cold",
},
{
    id: "drink2",
    price: 150,
    name: "Капучино",
    weight: 0.2,
    alt: "Кофе",
    img: "Напитки/2.png",
    type: "warm",
},
{
    id: "drink3",
    price: 80,
    name: "Вода минеральная",
    weight: 0.5,
    alt: "Вода",
    img: "Напитки/3.png",
    type: "cold",
},
{
    id: "drink4",
    price: 100,
    name: "Зеленый чай",
    weight: 0.3,
    alt: "чай",
    img: "Напитки/4.png",
    type: "warm",
},
{
    id: "drink5",
    price: 120,
    name: "Яблочный сок",
    weight: 0.3,
    alt: "Сок",
    img: "Напитки/5.png",
    type: "cold",
},
{
    id: "drink6",
    price: 200,
    name: "Черный чай",
    weight: 0.3,
    alt: "чай",
    img: "Напитки/6.png",
    type: "warm",
},
]
const salads = [
  {
    id: "salad1",
    price: 330,
    name: "Корейский салат с овощами и яйцом",
    weight: 0.25,
    alt: "Салат с яйцом",
    img: "Салаты/1.png",
    type: "vegan",
  },
  {
    id: "salad2",
    price: 370,
    name: "Цезарь с цыпленком",
    weight: 0.22,
    alt: "Цезарь",
    img: "Салаты/2.png",
    type: "meat",
  },
  {
    id: "salad3",
    price: 350,
    name: "Капрезе с моцареллой",
    weight: 0.235,
    alt: "Капрезе",
    img: "Салаты/3.png",
    type: "vegan", 
  },
  {
    id: "salad4",
    price: 420,
    name: "Нисуаз с тунцом",
    weight: 0.25,
    alt: "Нисуаз",
    img: "Салаты/4.png",
    type: "fish",
  },
  {
    id: "salad5",
    price: 310,
    name: "Греческий салат",
    weight: 0.24,
    alt: "Греческий",
    img: "Салаты/5.png",
    type: "vegan",
  },
  {
    id: "salad6",
    price: 390,
    name: "Салат с креветками и рукколой",
    weight: 0.21,
    alt: "Салат с креветками",
    img: "Салаты/6.png",
    type: "fish",
  },
];

const desserts = [
  {
    id: "dessert1",
    price: 220,
    name: "Пахлава",
    weight: 0.3,
    alt: "Пахлава",
    img: "Десерты/1.png",
    type: "medium",
  },
  {
    id: "dessert2",
    price: 240,
    name: "Чизкейк Нью-Йорк",
    weight: 0.125,
    alt: "Чизкейк",
    img: "Десерты/2.png",
    type: "small",
  },
  {
    id: "dessert3",
    price: 260,
    name: "Шоколадный торт",
    weight: 0.125,
    alt: "Шоколадный торт",
    img: "Десерты/3.png",
    type: "small",
  },
  {
    id: "dessert4",
    price: 150,
    name: "Шарик мороженого",
    weight: 0.05,
    alt: "Мороженое",
    img: "Десерты/4.png",
    type: "small",
  },
  {
    id: "dessert5",
    price: 450,
    name: "Сет мини-пирожных",
    weight: 0.4,
    alt: "Ассорти пирожных",
    img: "Десерты/5.png",
    type: "large",
  },
  {
    id: "dessert6",
    price: 320,
    name: "Тирамису",
    weight: 0.18,
    alt: "Тирамису",
    img: "Десерты/6.png",
    type: "medium",
  },
];


render();

function render() {
    soupRender();
    dishRender();
    drinkRender();
    saladRender();
    dessertsRender();
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
    const drink_block = document.querySelector("#drink_block");
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

function saladRender(){
    const salad_block = document.querySelector("#salad_block");
    for (x of salads.sort((a, b) => a.name > b.name ? 1 : -1)){
        salad_block.innerHTML += 
       `<div class="dish-card">
            <img src="${x.img}" alt="${x.alt}" height="450px">
            <p class="price">${x.price} ₽</p>
            <p class="name">${x.name}</p>
            <p class="weight">${x.weight} л</p>
            <button id="${x.id}">Добавить</button>
        </div>`
    };
};

function dessertsRender(){
    const dessert_block = document.querySelector("#dessert_block");
    for (x of desserts.sort((a, b) => a.name > b.name ? 1 : -1)){
        dessert_block.innerHTML += 
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

function changeValue(id){
    const merged = [...soups, ...dishes, ...drinks];
    for (x of merged){
        if (x.id == id){
            return x.name;
        };
    };
};

function setupCategoryListener(containerId, displayElement) {
    const container = document.querySelector(containerId);

    container.addEventListener('click', (event) => {
        const button = event.target.closest('button');

        if (button) {
            displayElement.textContent = changeValue(button.id);
        }
    });
}

setupCategoryListener("#soup_block", soupSelected);
setupCategoryListener("#dish_block", dishSelected);
setupCategoryListener("#drink_block", drinkSelected);

resetButton.addEventListener("click", ()=>{
    soupSelected.textContent = "Блюдо не выбрано";
    dishSelected.textContent = "Блюдо не выбрано";
    drinkSelected.textContent = "Блюдо не выбрано";
})
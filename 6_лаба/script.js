const soupSelected = document.querySelector("#select_soup");
const dishSelected = document.querySelector("#select_dish");
const drinkSelected = document.querySelector("#select_drink");
const dessertSelected = document.querySelector("#select_desserts");
const saladSelected = document.querySelector("#select_salad");
const totalPriceElement = document.querySelector("#total_price");

const soupInput = document.querySelector("#soup_input");
const dishInput = document.querySelector("#dish_input");
const drinkInput = document.querySelector("#drink_input");
const dessertInput = document.querySelector("#dessert_input");
const saladInput = document.querySelector("#salad_input");

const resetButton = document.querySelector("[data-button-reset]");

let currentOrder = {
    soup: null,
    dish: null,
    drink: null,
    salad: null,
    dessert: null
};

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
    name: "Стейк из баранины с овощами гриль",
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

function soupRender(filterType = null) {
    const soup_block = document.querySelector("#soup_block");
    soup_block.innerHTML = ''; 
    
    let currentSoups = soups;
    if (filterType && filterType !== 'all') {
        currentSoups = soups.filter(item => item.type === filterType);
    }

   
    for (let x of currentSoups.sort((a, b) => a.name > b.name ? 1 : -1)) {
        soup_block.innerHTML += 
        `<div class="dish-card" data-kind="${x.type}">
            <img src="${x.img}" alt="Суп" height="450px">
            <p class="price">${x.price} ₽</p>
            <p class="name">${x.name}</p>
            <p class="weight">${x.weight} г</p>
            <button id="${x.id}">Добавить</button>
        </div>`;
    }
}

function dishRender(filterType = null) {
    const dish_block = document.querySelector("#dish_block");
    dish_block.innerHTML = '';

    let currentDishes = dishes;
    if (filterType && filterType !== 'all') {
        currentDishes = dishes.filter(item => item.type === filterType);
    }

    for (let x of currentDishes.sort((a, b) => a.name > b.name ? 1 : -1)) {
        dish_block.innerHTML += 
        `<div class="dish-card" data-kind="${x.type}">
            <img src="${x.img}" alt="${x.alt}" height="450px">
            <p class="price">${x.price} ₽</p>
            <p class="name">${x.name}</p>
            <p class="weight">${x.weight} г</p>
            <button id="${x.id}">Добавить</button>
        </div>`;
    }
}

function drinkRender(filterType = null) {
    const drink_block = document.querySelector("#drink_block");
    drink_block.innerHTML = '';

    let currentDrinks = drinks;
    if (filterType && filterType !== 'all') {
        currentDrinks = drinks.filter(item => item.type === filterType);
    }

    for (let x of currentDrinks.sort((a, b) => a.name > b.name ? 1 : -1)) {
        drink_block.innerHTML += 
        `<div class="dish-card" data-kind="${x.type}">
            <img src="${x.img}" alt="${x.alt}" height="450px">
            <p class="price">${x.price} ₽</p>
            <p class="name">${x.name}</p>
            <p class="weight">${x.weight} л</p>
            <button id="${x.id}">Добавить</button>
        </div>`;
    }
}

function saladRender(filterType = null) {
    const salad_block = document.querySelector("#salad_block");
    salad_block.innerHTML = '';

    let currentSalads = salads;
    if (filterType && filterType !== 'all') {
        currentSalads = salads.filter(item => item.type === filterType);
    }

    for (let x of currentSalads.sort((a, b) => a.name > b.name ? 1 : -1)) {
        salad_block.innerHTML += 
        `<div class="dish-card" data-kind="${x.type}">
            <img src="${x.img}" alt="${x.alt}" height="450px">
            <p class="price">${x.price} ₽</p>
            <p class="name">${x.name}</p>
            <p class="weight">${x.weight} л</p>
            <button id="${x.id}">Добавить</button>
        </div>`;
    }
}

function dessertsRender(filterType = null) {
    const dessert_block = document.querySelector("#dessert_block");
    dessert_block.innerHTML = '';

    let currentDesserts = desserts;
    if (filterType && filterType !== 'all') {
        currentDesserts = desserts.filter(item => item.type === filterType);
    }

    for (let x of currentDesserts.sort((a, b) => a.name > b.name ? 1 : -1)) {
        dessert_block.innerHTML += 
        `<div class="dish-card" data-kind="${x.type}">
            <img src="${x.img}" alt="${x.alt}" height="450px">
            <p class="price">${x.price} ₽</p>
            <p class="name">${x.name}</p>
            <p class="weight">${x.weight} л</p>
            <button id="${x.id}">Добавить</button>
        </div>`;
    }
}


const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        const category = button.dataset.category;
        const kind = button.dataset.kind;
        
        document.querySelectorAll(`.filter-btn[data-category="${category}"]`).forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        switch(category) {
            case 'soup':
                soupRender(kind);
                break;
            case 'dish':
                dishRender(kind);
                break;
            case 'salad':
                saladRender(kind);
                break;
            case 'drink':
                drinkRender(kind);
                break;
            case 'dessert':
                dessertsRender(kind);
                break;
        }
    });
});

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
    const merged = [...soups, ...dishes, ...drinks, ...salads, ...desserts];
    for (const x of merged){
        if (x.id === id){
            return x.name;
        }
    }
}


function setupCategoryListener(containerId, displayElement) {
    const container = document.querySelector(containerId);

    container.addEventListener('click', (event) => {
        const button = event.target.closest('button');

        if (button) {
            displayElement.textContent = changeValue(button.id);
        }
    });
}

// Логика ограничения времени доставки (минимум +30 минут от текущего времени)
function setupDeliveryTime() {
    const deliveryTypeRadios = document.querySelectorAll('input[name="delivery_type"]');
    const timeInput = document.getElementById('time_val');
    
    // Устанавливаем шаг 5 минут (300 секунд)
    timeInput.step = 300; 

    // Функция для расчета минимума (+30 минут + округление до 5 минут)
    function setMinTime() {
        const now = new Date();
        
        // 1. Добавляем 30 минут к текущему времени
        let targetTime = new Date(now.getTime() + 30 * 60 * 1000);
        
        // 2. Округляем минуты вверх до кратного 5
        const minutes = targetTime.getMinutes();
        const remainder = minutes % 5;
        
        if (remainder !== 0) {
            // Если минут, например, 33, то остаток 3. Нужно добавить (5-3)=2 минуты
            const minutesToAdd = 5 - remainder;
            targetTime.setMinutes(minutes + minutesToAdd);
        }
        // Сбрасываем секунды для чистоты (чтобы было ровно :00)
        targetTime.setSeconds(0);

        // 3. Форматируем в строку HH:MM
        const hours = targetTime.getHours().toString().padStart(2, '0');
        const mins = targetTime.getMinutes().toString().padStart(2, '0');
        const minTimeString = `${hours}:${mins}`;
        
        timeInput.min = minTimeString;
        
        // Если текущее введенное значение меньше нового минимума или не кратно 5 — сбрасываем
        // (Браузер сам подсветит ошибку шага, но лучше сбросить недопустимое прошлое время)
        if (timeInput.value && timeInput.value < minTimeString) {
             // Можно либо сбросить, либо автоматически выставить минимум
             // timeInput.value = minTimeString; // Раскомментируйте, если хотите авто-подстановку
             timeInput.value = ''; 
        }
    }
    
    // Обработчики переключения радио-кнопок
    deliveryTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'time') {
                timeInput.disabled = false;
                timeInput.required = true; // Делаем обязательным
                setMinTime();
            } else {
                timeInput.disabled = true;
                timeInput.required = false;
                timeInput.value = '';
            }
        });
    });
    
    // Инициализация при загрузке
    if (!document.getElementById('delivery_time').checked) {
         timeInput.disabled = true;
    } else {
         setMinTime();
    }
    
    // Обновление минимума каждую минуту
    setInterval(setMinTime, 60 * 1000);
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', setupDeliveryTime);


// Запускаем настройку времени при загрузке страницы

function recalculateTotal() {
    let total = 0;
    for (let key in currentOrder) {
        if (currentOrder[key]) {
            total += currentOrder[key].price;
        }
    }
    totalPriceElement.textContent = total;
}

function addToOrder(category, id, dataArray, displayElement, inputElement) {
    // Ищем объект блюда в массиве по ID
    const item = dataArray.find(dish => dish.id === id);
    
    if (item) {
        // 1. Обновляем визуальное отображение: Название + Цена
        displayElement.textContent = `${item.name} (${item.price} ₽)`;
        
        // 2. Записываем ID блюда в скрытый инпут для отправки формы
        inputElement.value = item.id;
        
        // 3. Сохраняем в объект заказа для подсчета суммы
        currentOrder[category] = item;
        
        // 4. Пересчитываем итог
        recalculateTotal();
    }
}

// Настраиваем слушатели событий для каждой секции
function setupCategoryListener(containerId, categoryName, dataArray, displayEl, inputEl) {
    const container = document.querySelector(containerId);
    
    container.addEventListener('click', (event) => {
        // Проверяем, что клик был по кнопке или внутри неё
        const button = event.target.closest('button');
        
        if (button) {
            // Вызываем функцию добавления
            addToOrder(categoryName, button.id, dataArray, displayEl, inputEl);
        }
    });
}

setupCategoryListener("#soup_block", "soup", soups, soupSelected, soupInput);
setupCategoryListener("#dish_block", "dish", dishes, dishSelected, dishInput);
setupCategoryListener("#drink_block", "drink", drinks, drinkSelected, drinkInput);
setupCategoryListener("#salad_block", "salad", salads, saladSelected, saladInput);
setupCategoryListener("#dessert_block", "dessert", desserts, dessertSelected, dessertInput);

resetButton.addEventListener("click", () => {
    soupSelected.textContent = "Блюдо не выбрано";
    dishSelected.textContent = "Блюдо не выбрано";
    drinkSelected.textContent = "Блюдо не выбрано";
    saladSelected.textContent = "Блюдо не выбрано";
    dessertSelected.textContent = "Блюдо не выбрано";

    soupInput.value = "";
    dishInput.value = "";
    drinkInput.value = "";
    saladInput.value = "";
    dessertInput.value = "";

    currentOrder = {
        soup: null,
        dish: null,
        drink: null,
        salad: null,
        dessert: null
    };

    recalculateTotal();
});



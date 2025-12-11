// scripts/order.js
import { soups, dishes, drinks, salads, desserts, saveOrder, getSavedOrder, getDishById } from './data.js';

const orderBar = document.querySelector('#order-bar');
const barPrice = document.querySelector('#bar-price');
const linkCheckout = document.querySelector('#link-checkout');

// Локальное состояние
export let currentOrder = {
    soup: null,
    dish: null,
    drink: null,
    salad: null,
    dessert: null,
};

// Правила комбо (обязательные категории)
const combos = {
    combo1: ['soup', 'dish', 'salad', 'drink'],
    combo2: ['soup', 'dish', 'drink'],
    combo3: ['soup', 'salad', 'drink'],
    combo4: ['dish', 'salad', 'drink'],
    combo5: ['dish', 'drink']
};

function recalculate() {
    // 1. Считаем сумму
    const total = Object.values(currentOrder).reduce((acc, item) => acc + (item ? item.price : 0), 0);
    if (barPrice) barPrice.textContent = total;

    // 2. Сохраняем в LocalStorage
    saveOrder(currentOrder);

    // 3. Управляем видимостью панели
    const isEmpty = total === 0;
    if (orderBar) {
        if (isEmpty) orderBar.classList.add('hidden');
        else orderBar.classList.remove('hidden');
    }

    // 4. Проверяем валидность ДЛЯ ТЕКУЩЕГО ВЫБРАННОГО КОМБО
    // Находим активную радио-кнопку
    const selectedComboInput = document.querySelector('input[name="combo_type"]:checked');
    if (selectedComboInput && linkCheckout) {
        const comboType = selectedComboInput.value;
        const requiredCategories = combos[comboType];
        
        // Проверяем, все ли обязательные категории выбраны
        const missing = requiredCategories.filter(cat => !currentOrder[cat]);
        const isValid = missing.length === 0;

        if (isValid) {
            linkCheckout.classList.remove('disabled');
            linkCheckout.style.backgroundColor = '#ff6b6b'; // Красный (активный)
        } else {
            linkCheckout.classList.add('disabled');
            linkCheckout.style.backgroundColor = '#bdc3c7'; // Серый (неактивный)
        }
    }
}

// === УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ (СКРЫТИЕ СЕКЦИЙ) ===
function updateFormInterface() {
    const selectedComboInput = document.querySelector('input[name="combo_type"]:checked');
    if (!selectedComboInput) return;
    
    const comboType = selectedComboInput.value;
    const requiredCategories = combos[comboType];

    // Список всех основных категорий (десерт всегда доступен)
    const allCategories = ['soup', 'dish', 'salad', 'drink'];

    allCategories.forEach(cat => {
        const sectionId = `section-${cat}`;
        const section = document.getElementById(sectionId);

        // Проверяем, нужна ли категория
        const isRequired = requiredCategories.includes(cat);

        if (isRequired) {
            // Показываем секцию
            if (section) section.classList.remove('hidden');
        } else {
            // Скрываем секцию
            if (section) section.classList.add('hidden');
            
            // Если мы скрываем категорию, но там уже было выбрано блюдо — удаляем его из заказа
            if (currentOrder[cat]) {
                currentOrder[cat] = null;
            }
        }
    });
    
    recalculate(); // Пересчитываем (вдруг удалили скрытое блюдо)
}

function addToOrder(category, id, dataArray) {
    const item = dataArray.find(d => d.id === id);
    if (item) {
        currentOrder[category] = item;
        recalculate();
    }
}

export function initOrder() {
    // 1. Загружаем из хранилища
    const savedIds = getSavedOrder();
    if (savedIds.soup) currentOrder.soup = getDishById(savedIds.soup);
    if (savedIds.dish) currentOrder.dish = getDishById(savedIds.dish);
    if (savedIds.drink) currentOrder.drink = getDishById(savedIds.drink);
    if (savedIds.salad) currentOrder.salad = getDishById(savedIds.salad);
    if (savedIds.dessert) currentOrder.dessert = getDishById(savedIds.dessert);

    // 2. Инициализируем радио-кнопки комбо
    const comboRadios = document.querySelectorAll('input[name="combo_type"]');
    comboRadios.forEach(radio => {
        radio.addEventListener('change', updateFormInterface);
    });

    // 3. Вызываем обновление интерфейса (оно скроет лишние секции и вызовет recalculate)
    updateFormInterface();

    // 4. Вешаем слушатели на кнопки "Добавить"
    setupListeners(); 
}

function setupListeners() {
    ['soup', 'dish', 'salad', 'drink', 'dessert'].forEach(cat => {
        const container = document.querySelector(`#${cat}_block`);
        if(container) {
            container.addEventListener('click', (e) => {
                const btn = e.target.closest('button');
                // Проверяем dataset.dishId (важно для нашей логики с data-атрибутом)
                if(btn && btn.dataset.dishId) {
                    const data = (cat==='soup'?soups : cat==='dish'?dishes : cat==='salad'?salads : cat==='drink'?drinks:desserts);
                    addToOrder(cat, parseInt(btn.dataset.dishId), data);
                }
            });
        }
    });
}

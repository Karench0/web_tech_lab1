import { soups, dishes, drinks, salads, desserts } from './data.js';

const soupSelected    = document.querySelector('#select_soup');
const dishSelected    = document.querySelector('#select_dish');
const drinkSelected   = document.querySelector('#select_drink');
const dessertSelected = document.querySelector('#select_desserts');
const saladSelected   = document.querySelector('#select_salad');
const totalPriceEl    = document.querySelector('#total_price');

const soupInput    = document.querySelector('#soup_input');
const dishInput    = document.querySelector('#dish_input');
const drinkInput   = document.querySelector('#drink_input');
const dessertInput = document.querySelector('#dessert_input');
const saladInput   = document.querySelector('#salad_input');

const resetButton  = document.querySelector('[data-button-reset]');
const orderForm    = document.querySelector('form');

// === КОНФИГУРАЦИЯ КОМБО ===
// Здесь прописано, какие категории ОБЯЗАТЕЛЬНЫ для каждого типа
const combos = {
    combo1: ['soup', 'dish', 'salad', 'drink'],
    combo2: ['soup', 'dish', 'drink'],
    combo3: ['soup', 'salad', 'drink'],
    combo4: ['dish', 'salad', 'drink'],
    combo5: ['dish', 'drink']
};

export let currentOrder = {
  soup: null,
  dish: null,
  drink: null,
  salad: null,
  dessert: null,
};

function recalculateTotal() {
  const total = Object.values(currentOrder)
    .filter(Boolean)
    .reduce((sum, item) => sum + item.price, 0);

  totalPriceEl.textContent = total;
}

function addToOrder(category, id, dataArray, displayElement, inputElement) {
  const item = dataArray.find(dish => dish.id === id);
  
  if (!item) {
      console.error(`Блюдо с id=${id} не найдено в категории ${category}`);
      return;
  }

  displayElement.textContent = `${item.name} (${item.price} ₽)`;
  inputElement.value = item.id;
  currentOrder[category] = item;
  recalculateTotal();
}

// Функция очистки категории (используется при смене комбо)
function clearItem(category, displayEl, inputEl) {
    currentOrder[category] = null;
    displayEl.textContent = "Блюдо не выбрано";
    inputEl.value = "";
}

// === УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ ФОРМЫ И СТРАНИЦЫ ===
function updateFormInterface() {
    // 1. Узнаем, какое комбо выбрано
    const selectedComboInput = document.querySelector('input[name="combo_type"]:checked');
    if (!selectedComboInput) return;
    
    const comboType = selectedComboInput.value;
    const requiredCategories = combos[comboType];

    // Список категорий, которые могут скрываться
    const allCategories = ['soup', 'dish', 'salad', 'drink'];

    allCategories.forEach(cat => {
        // А. Работаем с формой заказа (скрываем строки)
        const rowId = `row-${cat}`;
        const row = document.getElementById(rowId);
        
        // Б. Работаем с секциями на странице (скрываем карточки)
        const sectionId = `section-${cat}`;
        const section = document.getElementById(sectionId);

        // Проверяем, нужна ли категория в этом комбо
        const isRequired = requiredCategories.includes(cat);

        if (isRequired) {
            // ПОКАЗЫВАЕМ (удаляем класс hidden)
            if (row) row.classList.remove('hidden');
            if (section) section.classList.remove('hidden');
        } else {
            // СКРЫВАЕМ (добавляем класс hidden)
            if (row) row.classList.add('hidden');
            if (section) section.classList.add('hidden');
            
            // Очищаем данные, если пользователь уже успел что-то выбрать в скрываемой категории
            if (cat === 'soup') clearItem('soup', soupSelected, soupInput);
            if (cat === 'dish') clearItem('dish', dishSelected, dishInput);
            if (cat === 'salad') clearItem('salad', saladSelected, saladInput);
            if (cat === 'drink') clearItem('drink', drinkSelected, drinkInput);
        }
    });
    
    // Десерты всегда доступны, их не трогаем

    recalculateTotal();
}


function setupCategoryListener(containerSelector, category, dataArray, displayEl, inputEl) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.addEventListener('click', (event) => {
    // Ищем кнопку с классом или просто тег button
    const button = event.target.closest('button');
    
    // Проверяем, что это кнопка "Добавить" (у нее есть наш атрибут)
    if (!button || !button.dataset.dishId) return;
    
    event.preventDefault();

    // Получаем ID и превращаем в число (потому что в JSON id: 1, а не "1")
    const id = parseInt(button.dataset.dishId);
    
    addToOrder(category, id, dataArray, displayEl, inputEl);
  });
}

// === МОДАЛЬНОЕ ОКНО ===
function showModal(message, onConfirm) {
    let modal = document.querySelector('.modal-overlay');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Внимание!</h3>
                <p class="modal-message"></p>
                <div class="modal-buttons">
                    <button class="modal-btn cancel">Отмена</button>
                    <button class="modal-btn confirm">Ок</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.cancel').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    modal.querySelector('.modal-message').textContent = message;
    
    const oldConfirm = modal.querySelector('.confirm');
    const newConfirm = oldConfirm.cloneNode(true);
    oldConfirm.parentNode.replaceChild(newConfirm, oldConfirm);

    newConfirm.addEventListener('click', () => {
        modal.style.display = 'none';
        if (onConfirm) onConfirm();
    });

    modal.style.display = 'flex';
}

function validateOrder(requiredCategories) {
    const missing = [];
    const labels = {
        soup: 'Суп',
        dish: 'Главное блюдо',
        salad: 'Салат',
        drink: 'Напиток',
        dessert: 'Десерт'
    };

    requiredCategories.forEach(cat => {
        if (!currentOrder[cat]) {
            missing.push(labels[cat]);
        }
    });

    if (missing.length > 0) {
        const msg = `В выбранном комбо не хватает: ${missing.join(', ')}. Продолжить без них?`;
        return { isValid: false, message: msg };
    }
    return { isValid: true };
}

export function initOrder() {
  setupCategoryListener('#soup_block',    'soup',    soups,    soupSelected,    soupInput);
  setupCategoryListener('#dish_block',    'dish',    dishes,   dishSelected,    dishInput);
  setupCategoryListener('#drink_block',   'drink',   drinks,   drinkSelected,   drinkInput);
  setupCategoryListener('#salad_block',   'salad',   salads,   saladSelected,   saladInput);
  setupCategoryListener('#dessert_block', 'dessert', desserts, dessertSelected, dessertInput);

  // Слушатель для переключателей комбо
  const comboRadios = document.querySelectorAll('input[name="combo_type"]');
  comboRadios.forEach(radio => {
      radio.addEventListener('change', updateFormInterface);
  });

  // Инициализация при загрузке (скрыть лишнее сразу)
  updateFormInterface();

  if (resetButton) {
      resetButton.addEventListener('click', () => {
        clearItem('soup', soupSelected, soupInput);
        clearItem('dish', dishSelected, dishInput);
        clearItem('drink', drinkSelected, drinkInput);
        clearItem('salad', saladSelected, saladInput);
        clearItem('dessert', dessertSelected, dessertInput);
        recalculateTotal();
      });
  }

  if (orderForm) {
      orderForm.addEventListener('submit', (event) => {
          event.preventDefault();
          
          const isEmpty = Object.values(currentOrder).every(v => v === null);
          if (isEmpty) {
              showModal("Ничего не выбрано! Соберите ваш ланч.");
              return;
          }

          // Определяем правила для ТЕКУЩЕГО выбранного комбо
          const selectedComboInput = document.querySelector('input[name="combo_type"]:checked');
          const comboType = selectedComboInput ? selectedComboInput.value : 'combo1';
          const requiredRules = combos[comboType]; // Берем правила из объекта combos
          
          const result = validateOrder(requiredRules);

          if (!result.isValid) {
              showModal(result.message, () => {
                  orderForm.submit(); 
              });
          } else {
              orderForm.submit();
          }
      });
  }
}

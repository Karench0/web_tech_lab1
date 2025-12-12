import { loadDishes, getSavedOrder, getDishById, soups, dishes, drinks, salads, desserts, API_URL, API_KEY, clearSavedOrder } from './data.js';
import { setupDeliveryTime } from './deliveryTime.js';

document.addEventListener('DOMContentLoaded', async () => {
    await loadDishes(); // Сначала грузим меню
    renderCheckout();   // Потом рисуем выбранное
    setupDeliveryTime(); // Логика времени
});

const form = document.getElementById('order-form');

function renderCheckout() {
    const savedIds = getSavedOrder();
    const container = document.getElementById('checkout-list');
    const emptyMsg = document.getElementById('empty-message');
    const formSummary = {
        soup: document.getElementById('summary-soup'),
        dish: document.getElementById('summary-dish'),
        salad: document.getElementById('summary-salad'),
        drink: document.getElementById('summary-drink'),
        dessert: document.getElementById('summary-dessert')
    };
    const formInputs = {
        soup: document.getElementById('soup_id'),
        dish: document.getElementById('dish_id'),
        salad: document.getElementById('salad_id'),
        drink: document.getElementById('drink_id'),
        dessert: document.getElementById('dessert_id')
    };
    
    container.innerHTML = '';
    let total = 0;
    let hasItems = false;

    // Проходим по категориям
    ['soup', 'dish', 'salad', 'drink', 'dessert'].forEach(cat => {
        const id = savedIds[cat];
        if (id) {
            const item = getDishById(id);
            if (item) {
                hasItems = true;
                total += item.price;

                // 1. Рисуем карточку с кнопкой "Удалить"
                const card = document.createElement('div');
                card.className = 'dish-card';
                card.innerHTML = `
                    <img src="${item.image}" height="100">
                    <p class="name">${item.name}</p>
                    <p class="price">${item.price} ₽</p>
                    <button class="remove-btn" data-cat="${cat}">Удалить</button>
                `;
                container.appendChild(card);

                // 2. Заполняем форму справа
                formSummary[cat].textContent = `${item.name} (${item.price} ₽)`;
                formInputs[cat].value = item.id;
            }
        }
    });

    document.getElementById('form-total-price').textContent = total;

    if (!hasItems) {
        emptyMsg.classList.remove('hidden');
        form.querySelector('button[type="submit"]').disabled = true;
    } else {
        emptyMsg.classList.add('hidden');
    }

    // Слушатель удаления
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const cat = e.target.dataset.cat;
            // Удаляем из localStorage
            savedIds[cat] = null;
            localStorage.setItem('lunch_order', JSON.stringify(savedIds));
            // Перерисовываем
            renderCheckout();
        }
    });
}

// ОТПРАВКА ФОРМЫ
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    // Формируем объект для API (имена полей должны совпадать с ТЗ!)
    // Внимание: в ТЗ поля называются 'soup_id', 'drink_id' (мы их в hidden input так и назвали)
    // Но 'main_course_id' для главного блюда.
    
    // Добавляем флаг subscribe (checkbox не передает false)
    formData.set('subscribe', formData.get('subscribe') ? true : false); 
    
    // Превращаем в JSON (или можно слать FormData, если API позволяет, но в ТЗ сказано JSON предпочтительно)
    const body = {};
    formData.forEach((value, key) => {
        // ID должны быть числами
        if (key.includes('_id') && value) {
             body[key] = parseInt(value);
        } else if (key === 'delivery_time' && value === '') {
             // Пустое время не шлем
        } else {
             body[key] = value;
        }
    });

    // Валидация времени по ТЗ
    if (body.delivery_type === 'now') {
        delete body.delivery_time; // Убираем время если "как можно скорее"
    }

    try {
        const response = await fetch(`${API_URL}/orders?api_key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const resData = await response.json();
            alert(`Заказ оформлен! ID заказа: ${resData.id}`); // Лучше модалку
            clearSavedOrder();
            window.location.href = 'laba8.html'; // Редирект на главную
        } else {
            const errorData = await response.json();
            alert(`Ошибка: ${errorData.error}`);
        }
    } catch (err) {
        alert('Сетевая ошибка при отправке');
    }
});

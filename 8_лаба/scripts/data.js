export const API_KEY = 'df3ddd20-e6f4-42a6-a275-d7ac1de8a55f'; 
export const API_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';

// Приватные массивы
let soups = [];
let dishes = [];
let drinks = [];
let salads = [];
let desserts = [];

export async function loadDishes() {
    try {
        const response = await fetch(`${API_URL}/dishes?api_key=${API_KEY}`);
        const data = await response.json();

        soups = data.filter(item => item.category === 'soup').sort((a, b) => a.name.localeCompare(b.name));
        dishes = data.filter(item => item.category === 'main-course').sort((a, b) => a.name.localeCompare(b.name));
        salads = data.filter(item => item.category === 'salad').sort((a, b) => a.name.localeCompare(b.name));
        drinks = data.filter(item => item.category === 'drink').sort((a, b) => a.name.localeCompare(b.name));
        desserts = data.filter(item => item.category === 'dessert').sort((a, b) => a.name.localeCompare(b.name));

        console.log("Блюда загружены");
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }
}

export function getSavedOrder() {
    const saved = localStorage.getItem('lunch_order');
    if (saved) {
        return JSON.parse(saved);
    }
    return { soup: null, dish: null, drink: null, salad: null, dessert: null };
}

export function saveOrder(order) {
    // Сохраняем только ID (объекты слишком жирные)
    const orderIds = {
        soup: order.soup ? order.soup.id : null,
        dish: order.dish ? order.dish.id : null,
        drink: order.drink ? order.drink.id : null,
        salad: order.salad ? order.salad.id : null,
        dessert: order.dessert ? order.dessert.id : null,
    };
    localStorage.setItem('lunch_order', JSON.stringify(orderIds));
}

export function clearSavedOrder() {
    localStorage.removeItem('lunch_order');
}

// Вспомогательная функция: найти объект блюда по ID среди всех загруженных
export function getDishById(id) {
    const all = [...soups, ...dishes, ...drinks, ...salads, ...desserts];
    return all.find(item => item.id === id);
}

export { soups, dishes, drinks, salads, desserts };

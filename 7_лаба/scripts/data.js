// Приватные массивы (никто снаружи их не трогает напрямую)
let soups = [];
let dishes = [];
let drinks = [];
let salads = [];
let desserts = [];

// Функция загрузки данных
export async function loadDishes() {
    try {
        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
        const data = await response.json();

        // Сортируем данные по нашим локальным массивам
        soups = data.filter(item => item.category === 'soup').sort((a, b) => a.name.localeCompare(b.name));
        dishes = data.filter(item => item.category === 'main-course').sort((a, b) => a.name.localeCompare(b.name));
        salads = data.filter(item => item.category === 'salad').sort((a, b) => a.name.localeCompare(b.name));
        drinks = data.filter(item => item.category === 'drink').sort((a, b) => a.name.localeCompare(b.name));
        desserts = data.filter(item => item.category === 'dessert').sort((a, b) => a.name.localeCompare(b.name));
        console.log(soups)
        console.log("Блюда загружены!"); 
    } catch (error) {
        console.error('Ошибка загрузки:', error);
    }
}
console.log(soups)
export { soups, dishes, drinks, salads, desserts };


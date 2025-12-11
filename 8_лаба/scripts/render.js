// scripts/render.js
import { soups, dishes, drinks, salads, desserts } from './data.js';

const weightUnits = {
  soup: 'г',
  dish: 'г',
  drink: 'л',
  salad: 'л',    
  dessert: 'г', // Поправил на граммы для десертов
};

function renderCategory({ data, containerSelector, category }) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = '';
  const unit = weightUnits[category] ?? 'г';

  // Если данных нет (фильтр вернул 0), можно показать сообщение, но пока просто пусто
  if (data.length === 0) return;

  const items = [...data].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  const cardsHtml = items.map(item => `
    <div class="dish-card" data-kind="${item.kind}">
      <img src="${item.image}" alt="${item.name}" height="450">
      <p class="price">${item.price} ₽</p>
      <p class="name">${item.name}</p>
      <p class="weight">${item.count}</p> <!-- API возвращает count как строку '350 г' -->
      <button class="add-btn" data-dish-id="${item.id}">Добавить</button>
    </div>
  `).join('');

  container.innerHTML = cardsHtml;
}

export function renderAll() {
  renderCategory({ data: soups,    containerSelector: '#soup_block',    category: 'soup' });
  renderCategory({ data: dishes,   containerSelector: '#dish_block',    category: 'dish' });
  renderCategory({ data: drinks,   containerSelector: '#drink_block',   category: 'drink' });
  renderCategory({ data: salads,   containerSelector: '#salad_block',   category: 'salad' });
  renderCategory({ data: desserts, containerSelector: '#dessert_block', category: 'dessert' });
}

export function renderFiltered(category, kind) {
  const map = {
    soup:   { data: soups,   selector: '#soup_block' },
    dish:   { data: dishes,  selector: '#dish_block' },
    drink:  { data: drinks,  selector: '#drink_block' },
    salad:  { data: salads,  selector: '#salad_block' },
    dessert:{ data: desserts,selector: '#dessert_block' },
  };

  const cfg = map[category];
  if (!cfg) return;

  let list = cfg.data;
  if (kind && kind !== 'all') {
    // ВАЖНО: В API поле называется 'kind', а не 'type'
    list = list.filter(item => item.kind === kind);
  }

  renderCategory({ data: list, containerSelector: cfg.selector, category });
}

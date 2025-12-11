// render.js
import { soups, dishes, drinks, salads, desserts } from './data.js';

const weightUnits = {
  soup: 'г',
  dish: 'г',
  drink: 'л',
  salad: 'л',    
  dessert: 'л',
};

function renderCategory({ data, containerSelector, category }) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = '';

  const unit = weightUnits[category] ?? 'г';

  const items = [...data].sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  const cardsHtml = items.map(item => `
    <div class="dish-card" data-kind="${item.kind}"> <!-- Тут item.kind, не category! -->
      <img src="${item.image}" alt="${item.name}" height="450">
      <p class="price">${item.price} ₽</p>
      <p class="name">${item.name}</p>
      <p class="weight">${item.count}</p>
      <!-- ВАЖНО: Добавили data-dish-id -->
      <button class="add-btn" data-dish-id="${item.id}">Добавить</button>
    </div>
  `).join('');

  container.innerHTML = cardsHtml;
}

export function renderAll() {
  renderCategory({ data: soups,   containerSelector: '#soup_block',    category: 'soup' });
  renderCategory({ data: dishes,  containerSelector: '#dish_block',    category: 'dish' });
  renderCategory({ data: drinks,  containerSelector: '#drink_block',   category: 'drink' });
  renderCategory({ data: salads,  containerSelector: '#salad_block',   category: 'salad' });
  renderCategory({ data: desserts,containerSelector: '#dessert_block', category: 'dessert' });
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
    list = list.filter(item => item.type === kind);
  }

  renderCategory({ data: list, containerSelector: cfg.selector, category });
}

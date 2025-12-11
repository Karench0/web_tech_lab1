import { loadDishes } from './data.js'; // Импортируем функцию загрузки
import { renderAll, renderFiltered } from './render.js';
import { initOrder } from './order.js';
import { setupDeliveryTime } from './deliveryTime.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. СНАЧАЛА ЖДЕМ ЗАГРУЗКИ ДАННЫХ
  await loadDishes(); 
  
  // 2. И ТОЛЬКО ПОТОМ РИСУЕМ ИНТЕРФЕЙС
  // Если вызвать это раньше, массивы будут пустыми
  renderAll();
  initOrder();
  setupDeliveryTime();

  // Навешиваем кнопки фильтров (тот же код, что был)
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      const kind     = button.dataset.kind;

      document
        .querySelectorAll(`.filter-btn[data-category="${category}"]`)
        .forEach(btn => btn.classList.remove('active'));

      button.classList.add('active');

      renderFiltered(category, kind);
    });
  });
});

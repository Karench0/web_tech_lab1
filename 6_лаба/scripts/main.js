// main.js
import { renderAll, renderFiltered } from './render.js';
import { initOrder } from './order.js';
import { setupDeliveryTime } from './deliveryTime.js';

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initOrder();
  setupDeliveryTime();

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

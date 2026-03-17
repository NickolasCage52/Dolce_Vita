/**
 * filters.js — фильтрация каталога и портфолио
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // Фильтры каталога
    const catalogFilters = document.querySelectorAll('.catalog__filters .filter-btn');
    const productCards = document.querySelectorAll('.catalog__grid .product-card');

    if (catalogFilters.length && productCards.length) {
      catalogFilters.forEach(function(btn) {
        btn.addEventListener('click', function() {
          const filter = this.dataset.filter;

          // Обновляем активную кнопку
          catalogFilters.forEach(function(b) {
            b.classList.toggle('active', b === btn);
          });

          // Показываем/скрываем карточки с анимацией opacity
          productCards.forEach(function(card) {
            const category = card.dataset.category;
            const show = filter === 'all' || category === filter;
            card.classList.toggle('product-card--hidden', !show);
          });
        });
      });
    }

    // Фильтры портфолио
    const portfolioFilters = document.querySelectorAll('.portfolio__filters .filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio__masonry .portfolio-item');

    if (portfolioFilters.length && portfolioItems.length) {
      portfolioFilters.forEach(function(btn) {
        btn.addEventListener('click', function() {
          const filter = this.dataset.portfolioFilter;

          portfolioFilters.forEach(function(b) {
            b.classList.toggle('active', b === btn);
          });

          portfolioItems.forEach(function(item) {
            const category = item.dataset.portfolioCategory;
            const show = filter === 'all' || category === filter;
            item.classList.toggle('portfolio-item--hidden', !show);
          });
        });
      });
    }
  });
})();

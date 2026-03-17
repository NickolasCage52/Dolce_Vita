/**
 * slider.js — слайдер отзывов с автопрокруткой и свайпом
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.reviews__track');
    const prevBtn = document.querySelector('.reviews__prev');
    const nextBtn = document.querySelector('.reviews__next');
    const dotsContainer = document.querySelector('.reviews__dots');

    if (!track || !track.children.length) return;

    const cards = Array.from(track.querySelectorAll('.review-card'));
    const total = cards.length;
    let current = 0;
    let autoplayTimer = null;
    const AUTOPLAY_INTERVAL = 5000;

    // Создаём точки-индикаторы
    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Перейти к отзыву ' + (i + 1));
        btn.classList.toggle('active', i === 0);
        btn.addEventListener('click', function() {
          goTo(i);
        });
        dotsContainer.appendChild(btn);
      }
    }

    function goTo(index) {
      current = (index + total) % total;
      const offset = -current * 100;
      track.style.transform = 'translateX(' + offset + '%)';

      // Обновляем точки
      const dots = dotsContainer ? dotsContainer.querySelectorAll('button') : [];
      dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === current);
      });

      resetAutoplay();
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startAutoplay() {
      autoplayTimer = setInterval(next, AUTOPLAY_INTERVAL);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Обработчики кнопок
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Свайп для мобильных
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
    }

    createDots();
    startAutoplay();

    // Останавливаем автопрокрутку при наведении
    const slider = document.querySelector('.reviews__slider');
    if (slider) {
      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);
    }
  });
})();

/**
 * animations.js — IntersectionObserver для анимации появления и счётчик цифр
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // 1. Анимация появления блоков при скролле
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    animateElements.forEach(function(el) {
      observer.observe(el);
    });

    // 2. Счётчик цифр (анимация 0 → целевое значение)
    const trustNumbers = document.querySelectorAll('.trust__number[data-target]');

    function animateCounter(element, target, duration) {
      const start = 0;
      const startTime = performance.now();
      const isDecimal = target % 1 !== 0;

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 2); // easeOutQuad
        const current = start + (target - start) * easeProgress;
        element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = isDecimal ? target.toFixed(1) : target;
        }
      }

      requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          if (!isNaN(target)) {
            animateCounter(el, target, 1500);
            counterObserver.unobserve(el);
          }
        }
      });
    }, { threshold: 0.5 });

    trustNumbers.forEach(function(el) {
      counterObserver.observe(el);
    });
  });
})();

/**
 * navigation.js — навигация: sticky header, мобильное меню, плавный скролл
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const burgerBtn = document.querySelector('.header__burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    const navLinks = document.querySelectorAll('.header__nav a, .mobile-menu__list a');

    // 1. Sticky header — изменение фона при скролле
    if (header) {
      window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 80);
      });

      // Начальное состояние при загрузке
      header.classList.toggle('scrolled', window.scrollY > 80);
    }

    // 2. Мобильное меню (бургер)
    if (burgerBtn && mobileMenu) {
      burgerBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open', isOpen);
        burgerBtn.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);

        // Анимация бургера в крестик
        burgerBtn.classList.toggle('header__burger--open', isOpen);
      });

      // Закрытие при клике по ссылке
      navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          body.classList.remove('menu-open');
          burgerBtn.setAttribute('aria-expanded', 'false');
          burgerBtn.classList.remove('header__burger--open');
        });
      });
    }

    // 3. Плавный скролл к якорям
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  });
})();

/**
 * forms.js — валидация форм и заглушка отправки
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // Форма корпоративных клиентов
    const corporateForm = document.getElementById('corporateForm');
    if (corporateForm) {
      corporateForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = corporateForm.querySelector('[name="name"]').value.trim();
        const contact = corporateForm.querySelector('[name="contact"]').value.trim();

        if (!name || !contact) {
          alert('Пожалуйста, заполните поля «Имя» и «Телефон или email».');
          return;
        }

        showSuccessMessage(corporateForm, 'Спасибо! Мы свяжемся с вами в ближайшее время.');
      });
    }

    // Форма записи на консультацию
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
      consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = consultationForm.querySelector('[name="name"]').value.trim();
        const phone = consultationForm.querySelector('[name="phone"]').value.trim();

        if (!name || !phone) {
          alert('Пожалуйста, заполните имя и контакт для связи.');
          return;
        }

        showSuccessMessage(consultationForm, 'Спасибо! Мы свяжемся с вами в ближайшее время.');
      });
    }

    function showSuccessMessage(form, message) {
      const wrap = form.closest('.corporate__form-wrap') || form.closest('.consultation');
      if (!wrap) return;

      const existingMsg = wrap.querySelector('.form-success-message');
      if (existingMsg) {
        existingMsg.remove();
      }

      const msg = document.createElement('p');
      msg.className = 'form-success-message';
      msg.style.cssText = 'margin-top: 20px; padding: 16px; background: rgba(196, 168, 130, 0.2); border: 1px solid var(--color-accent); color: var(--color-text); font-size: 16px;';
      msg.textContent = message;
      form.appendChild(msg);

      form.reset();

      setTimeout(function() {
        msg.remove();
      }, 5000);
    }
  });
})();

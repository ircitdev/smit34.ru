/**
 * Modal Manager - Управление модальным окном с настройками из JSON
 *
 * Параметры конфигурации (modal-config.json):
 * - enabled: true/false - показывать ли модальное окно
 * - showOnEveryPageLoad: true - показывать при каждой загрузке, false - использовать cookie
 * - cookieExpirationMinutes: время жизни cookie в минутах (например, 1440 = 24 часа)
 * - cookieName: имя cookie для отслеживания показа
 * - title: заголовок модального окна
 * - content: массив блоков контента
 */

(function() {
  'use strict';

  var ModalManager = {
    config: null,
    modalElement: null,

    // Инициализация
    init: function() {
      var self = this;
      this.loadConfig(function(config) {
        if (config) {
          self.config = config;
          self.processModal();
        }
      });
    },

    // Загрузка конфигурации из JSON файла
    loadConfig: function(callback) {
      var self = this;
      var xhr = new XMLHttpRequest();
      var cacheBuster = '?v=' + Date.now();

      xhr.open('GET', 'js/modal-config.json' + cacheBuster, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 0) {
            try {
              var config = JSON.parse(xhr.responseText);
              callback(config);
            } catch (e) {
              console.error('Modal Manager: Ошибка парсинга JSON конфигурации', e);
              self.showModalFallback();
              callback(null);
            }
          } else {
            console.error('Modal Manager: Не удалось загрузить конфигурацию', xhr.status);
            self.showModalFallback();
            callback(null);
          }
        }
      };
      xhr.onerror = function() {
        console.error('Modal Manager: Ошибка сети при загрузке конфигурации');
        self.showModalFallback();
        callback(null);
      };

      try {
        xhr.send();
      } catch(e) {
        console.error('Modal Manager: Не удалось отправить запрос', e);
        self.showModalFallback();
        callback(null);
      }
    },

    // Fallback - показать модалку без загрузки JSON
    showModalFallback: function() {
      if (typeof UIkit !== 'undefined') {
        var modalEl = document.querySelector('#modal-example');
        if (modalEl) {
          UIkit.modal(modalEl).show();
        }
      }
    },

    // Обработка показа модального окна
    processModal: function() {
      // Проверяем, включено ли модальное окно
      if (!this.config.enabled) {
        this.hideModal();
        return;
      }

      // Проверяем, нужно ли показывать (cookie логика)
      if (!this.config.showOnEveryPageLoad) {
        if (this.getCookie(this.config.cookieName)) {
          // Cookie существует, не показываем модальное окно
          this.hideModal();
          return;
        }
      }

      // Показываем модальное окно
      this.renderModal();
      this.showModal();

      // Устанавливаем cookie если не показываем каждый раз
      if (!this.config.showOnEveryPageLoad) {
        this.setCookie(
          this.config.cookieName,
          'true',
          this.config.cookieExpirationMinutes
        );
      }
    },

    // Рендеринг контента модального окна
    renderModal: function() {
      var modalBody = document.querySelector('#modal-example .notice-body');
      if (!modalBody) {
        console.error('Modal Manager: Не найден контейнер .notice-body');
        return;
      }

      // Обновляем заголовок
      var titleElement = document.querySelector('#modal-example .notice-title');
      if (titleElement && this.config.title) {
        titleElement.textContent = this.config.title;
      }

      // Очищаем текущий контент
      modalBody.innerHTML = '';

      // Генерируем новый контент из конфигурации
      var content = this.config.content;
      for (var i = 0; i < content.length; i++) {
        var block = content[i];
        var element = this.createContentBlock(block);
        if (element) {
          modalBody.appendChild(element);
        }
      }
    },

    // Создание блока контента по типу
    createContentBlock: function(block) {
      var element;

      switch (block.type) {
        case 'paragraph':
          element = document.createElement('p');
          element.innerHTML = block.text;
          break;

        case 'heading':
          element = document.createElement('h5');
          element.style.fontSize = '.6em';
          element.innerHTML = block.text;
          break;

        case 'footer':
          element = document.createElement('p');
          element.className = 'notice-footer-text';
          element.innerHTML = block.text;
          break;

        case 'separator':
          element = document.createElement('hr');
          break;

        case 'list':
          element = document.createElement('ul');
          element.style.fontSize = '.5em';
          for (var i = 0; i < block.items.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = block.items[i];
            element.appendChild(li);
          }
          break;

        case 'html':
          element = document.createElement('div');
          element.innerHTML = block.html;
          break;

        default:
          console.warn('Modal Manager: Неизвестный тип блока', block.type);
          return null;
      }

      return element;
    },

    // Показать модальное окно с задержкой после прелоадера
    showModal: function() {
      var delay = 4000; // Задержка 4 секунды после скрытия прелоадера
      var checkCount = 0;
      var maxChecks = 150; // 15 секунд максимум (150 * 100ms)
      var modalDisplayed = false;

      // Функция показа модалки (с защитой от повторного вызова)
      var displayModal = function() {
        if (modalDisplayed) return;
        modalDisplayed = true;

        setTimeout(function() {
          if (typeof UIkit !== 'undefined') {
            var modalEl = document.querySelector('#modal-example');
            if (modalEl) {
              UIkit.modal(modalEl).show();
            }
          }
        }, delay);
      };

      // Проверяем глобальный флаг с интервалом
      var checkPreloader = function() {
        checkCount++;

        // ТОЛЬКО проверяем глобальный флаг window.preloaderHidden
        // Не проверяем наличие элемента, т.к. он может быть ещё не в DOM
        if (window.preloaderHidden === true) {
          displayModal();
        } else if (checkCount < maxChecks) {
          setTimeout(checkPreloader, 100);
        } else {
          // Fallback - показываем в любом случае после 15 секунд
          displayModal();
        }
      };

      // Начинаем проверку
      checkPreloader();
    },

    // Скрыть модальное окно
    hideModal: function() {
      var modalEl = document.querySelector('#modal-example');
      if (modalEl) {
        modalEl.style.display = 'none';
      }
    },

    // Установка cookie
    setCookie: function(name, value, minutes) {
      var expires = '';
      if (minutes) {
        var date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax';
    },

    // Получение cookie
    getCookie: function(name) {
      var nameEQ = name + '=';
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nameEQ) === 0) {
          return decodeURIComponent(cookie.substring(nameEQ.length));
        }
      }
      return null;
    },

    // Удаление cookie (для отладки)
    deleteCookie: function(name) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  };

  // Запуск после загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      ModalManager.init();
    });
  } else {
    ModalManager.init();
  }

  // Экспортируем для возможности управления из консоли
  window.ModalManager = ModalManager;

})();

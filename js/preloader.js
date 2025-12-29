/**
 * Preloader - Прелоадер с индикатором загрузки
 */

// Глобальный флаг - устанавливаем СРАЗУ в false
window.preloaderHidden = false;

(function() {
  'use strict';

  var Preloader = {
    preloader: null,
    progressBar: null,
    percentText: null,
    siteContent: null,
    progress: 0,
    resourcesLoaded: 0,
    totalResources: 0,
    minDisplayTime: 800, // Минимальное время показа прелоадера (0.8 секунды)
    startTime: 0,
    isReadyToHide: false,
    minTimeElapsed: false,

    init: function() {
      var self = this;
      this.startTime = Date.now();
      this.preloader = document.getElementById('preloader');
      this.progressBar = document.querySelector('.preloader-progress-bar');
      this.percentText = document.querySelector('.preloader-percent');
      this.siteContent = document.getElementById('site-content');

      if (!this.preloader) return;

      // Считаем ресурсы для загрузки
      this.countResources();

      // Отслеживаем загрузку ресурсов
      this.trackResources();

      // Минимальное время показа прелоадера
      setTimeout(function() {
        self.minTimeElapsed = true;
        if (self.isReadyToHide) {
          self.hidePreloader();
        }
      }, this.minDisplayTime);

      // Fallback - скрыть прелоадер через 5 секунд в любом случае
      setTimeout(function() {
        Preloader.hidePreloader();
      }, 5000);
    },

    countResources: function() {
      // Считаем только изображения с высоким приоритетом (не lazy)
      var images = document.querySelectorAll('img:not([loading="lazy"])');
      this.totalResources = images.length;

      // Минимум 5 для плавности
      if (this.totalResources < 5) {
        this.totalResources = 5;
      }
    },

    trackResources: function() {
      var self = this;
      var images = document.querySelectorAll('img:not([loading="lazy"])');

      // Если изображений нет, симулируем загрузку
      if (images.length === 0) {
        this.simulateLoading();
        return;
      }

      // Отслеживаем загрузку каждого изображения (только не lazy)
      for (var i = 0; i < images.length; i++) {
        var img = images[i];

        if (img.complete) {
          self.resourceLoaded();
        } else {
          img.addEventListener('load', function() {
            self.resourceLoaded();
          });
          img.addEventListener('error', function() {
            self.resourceLoaded();
          });
        }
      }

      // Дополнительно отслеживаем window.onload
      window.addEventListener('load', function() {
        // Устанавливаем 100%
        self.setProgress(100);
        // Отмечаем готовность к скрытию
        self.isReadyToHide = true;
        // Скрываем только если минимальное время прошло
        if (self.minTimeElapsed) {
          setTimeout(function() {
            self.hidePreloader();
          }, 300);
        }
      });
    },

    simulateLoading: function() {
      var self = this;
      var currentProgress = 0;
      var duration = this.minDisplayTime;
      var steps = 20;
      var stepTime = duration / steps;

      var interval = setInterval(function() {
        currentProgress += 100 / steps;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          self.setProgress(100);
          self.isReadyToHide = true;
          if (self.minTimeElapsed) {
            setTimeout(function() {
              self.hidePreloader();
            }, 300);
          }
        } else {
          self.setProgress(Math.floor(currentProgress));
        }
      }, stepTime);
    },

    resourceLoaded: function() {
      this.resourcesLoaded++;
      var percent = Math.floor((this.resourcesLoaded / this.totalResources) * 100);
      if (percent > 100) percent = 100;
      this.setProgress(percent);
    },

    setProgress: function(percent) {
      this.progress = percent;
      if (this.progressBar) {
        this.progressBar.style.width = percent + '%';
      }
      if (this.percentText) {
        this.percentText.textContent = percent + '%';
      }
    },

    hidePreloader: function() {
      if (!this.preloader) return;
      if (this.preloader.classList.contains('preloader-hide')) return;

      var self = this;

      // Устанавливаем 100%
      this.setProgress(100);

      // Небольшая задержка перед скрытием
      setTimeout(function() {
        // Прелоадер уезжает вниз
        self.preloader.classList.add('preloader-hide');

        // Показываем контент с анимацией
        setTimeout(function() {
          if (self.siteContent) {
            self.siteContent.classList.add('site-visible');
          }

          // Устанавливаем глобальный флаг и вызываем событие
          window.preloaderHidden = true;
          var event = new CustomEvent('preloaderHidden');
          document.dispatchEvent(event);

          // Удаляем прелоадер из DOM через секунду
          setTimeout(function() {
            if (self.preloader && self.preloader.parentNode) {
              self.preloader.parentNode.removeChild(self.preloader);
            }
          }, 1000);
        }, 400);
      }, 200);
    }
  };

  // Запуск сразу
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      Preloader.init();
    });
  } else {
    Preloader.init();
  }

  // Экспорт для отладки
  window.Preloader = Preloader;

})();

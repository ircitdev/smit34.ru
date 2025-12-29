window.template_path='/local/templates/smit34'

/* === Separator between script blocks === */

if(!window.BX)window.BX={message:function(mess){if(typeof mess=='object') for(var i in mess) BX.message[i]=mess[i]; return true;}};

/* === Separator between script blocks === */

(window.BX||top.BX).message({'LANGUAGE_ID':'ru','FORMAT_DATE':'DD.MM.YYYY','FORMAT_DATETIME':'DD.MM.YYYY HH:MI:SS','COOKIE_PREFIX':'BITRIX_SM','USER_ID':'','SERVER_TIME':'1669977513','SERVER_TZ_OFFSET':'10800','USER_TZ_OFFSET':'0','USER_TZ_AUTO':'Y','bitrix_sessid':'e8183734179c6601502b5f02497dd063','SITE_ID':'s1'});(window.BX||top.BX).message({'JS_CORE_LOADING':'Загрузка...','JS_CORE_NO_DATA':'- Нет данных -','JS_CORE_WINDOW_CLOSE':'Закрыть','JS_CORE_WINDOW_EXPAND':'Развернуть','JS_CORE_WINDOW_NARROW':'Свернуть в окно','JS_CORE_WINDOW_SAVE':'Сохранить','JS_CORE_WINDOW_CANCEL':'Отменить','JS_CORE_H':'ч','JS_CORE_M':'м','JS_CORE_S':'с','JSADM_AI_HIDE_EXTRA':'Скрыть лишние','JSADM_AI_ALL_NOTIF':'Показать все','JSADM_AUTH_REQ':'Требуется авторизация!','JS_CORE_WINDOW_AUTH':'Войти','JS_CORE_IMAGE_FULL':'Полный размер'});

      

/* === Separator between script blocks === */


// Обработчик клика на кнопку "Подключиться"
document.addEventListener('DOMContentLoaded', function() {
// Находим все кнопки "Подключиться"
const connectButtons = document.querySelectorAll('.servicesCart__gotoCart');
connectButtons.forEach(function(button) {
button.addEventListener('click', function(e) {
e.preventDefault();
// Ждем загрузки виджета AIDA
if (window.aidaWidgetInstance) {
window.aidaWidgetInstance.open();
} else {
// Если виджет еще не загружен, ждем его
setTimeout(function() {
if (window.aidaWidgetInstance) {
window.aidaWidgetInstance.open();
}
}, 1000);
}
});
});

// Функция для открытия чата с сообщением
function openChatWithMessage(message) {
if (window.aidaWidgetInstance) {
// Открываем чат
window.aidaWidgetInstance.open();
// Ждем немного, чтобы чат открылся, затем отправляем сообщение
setTimeout(function() {
// Ищем поле ввода сообщения в чате
const messageInput = document.querySelector('#aida-widget-container textarea, #aida-widget-container input[type="text"]');
if (messageInput) {
messageInput.value = message;
messageInput.focus();
// Триггерим событие input для обновления состояния
messageInput.dispatchEvent(new Event('input', { bubbles: true }));
} else {
// Если не нашли поле ввода, можно попробовать через API виджета
if (window.aidaWidgetInstance.sendMessage) {
window.aidaWidgetInstance.sendMessage(message);
}
}
}, 500);
} else {
// Если виджет еще не загружен, пробуем позвонить по телефону
window.location.href = 'tel:55-35-59';
}
}

// Обработчик для кнопки "АССИСТЕНТ"
const virtualAssistantBtn = document.getElementById('virtual-assistant-btn');
if (virtualAssistantBtn) {
virtualAssistantBtn.addEventListener('click', function(e) {
// Проверяем, мобильное устройство или нет
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

if (isMobile) {
// На мобильных устройствах позволяем работать стандартной ссылке tel:
// Не вызываем preventDefault(), чтобы сработал звонок
return true;
} else {
// На компьютере открываем чат
e.preventDefault();
e.stopPropagation();
openChatWithMessage('Мне нужна помощь');
}
});
}

// Обработчик для кнопки WiFi-роутера
const wifiRouterBtn = document.getElementById('wifi-router-connect-btn');
if (wifiRouterBtn) {
wifiRouterBtn.addEventListener('click', function(e) {
e.preventDefault();
e.stopPropagation();
openChatWithMessage('Хочу подключить интернет');
});
}
});


/* === Separator between script blocks === */


// Инициализация AOS - ждем загрузки библиотеки
window.addEventListener('load', function() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      delay: 0
    });
  }
});


/* === Separator between script blocks === */


// Инициализация 3D tilt эффекта - ждем загрузки библиотеки и DOM
window.addEventListener('load', function() {
  // Проверяем что VanillaTilt загружен
  if (typeof VanillaTilt !== 'undefined') {
    // Инициализация 3D tilt эффекта для карточек услуг
    const serviceCards = document.querySelectorAll(".bl_servicesList_colDummy");
    if (serviceCards.length > 0) {
      VanillaTilt.init(serviceCards, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05
      });
    }

    // Инициализация 3D tilt эффекта для карточек тарифов
    const tarifCards = document.querySelectorAll(".bl_colv1_type4");
    if (tarifCards.length > 0) {
      VanillaTilt.init(tarifCards, {
        max: 12,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.03
      });
    }

    // Инициализация 3D tilt эффекта для элементов тарифов ТВ
    const tvTarifs = document.querySelectorAll(".bl_tarifElem1");
    if (tvTarifs.length > 0) {
      VanillaTilt.init(tvTarifs, {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2
      });
    }

    // Инициализация 3D tilt эффекта для дополнительных услуг
    const dopServices = document.querySelectorAll(".bl_colv3");
    if (dopServices.length > 0) {
      VanillaTilt.init(dopServices, {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.02
      });
    }

    // Инициализация 3D tilt эффекта для дополнительных пакетов каналов
    const channelPackages = document.querySelectorAll(".bl_colV2");
    if (channelPackages.length > 0) {
      VanillaTilt.init(channelPackages, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.15,
        scale: 1.02
      });
    }
  }
});


/* === Separator between script blocks === */


// === ИНДИКАТОР ПРОГРЕССА ЧТЕНИЯ ===
window.addEventListener('scroll', function() {
  const progressBar = document.querySelector('.reading-progress');
  if (progressBar) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }
});

// === КНОПКА "НАВЕРХ" ===
// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
  // Создаем кнопку
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.setAttribute('aria-label', 'Наверх');
  document.body.appendChild(scrollToTopBtn);

  // Показываем/скрываем кнопку при прокрутке
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // Клик по кнопке - прокрутка наверх
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// === АНИМАЦИЯ ЦИФР (COUNTUP) ===
document.addEventListener('DOMContentLoaded', function() {
  // Функция для инициализации CountUp когда элемент попадает в область видимости
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const animateNumbers = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');

        // Получаем число из текста
        const text = entry.target.textContent;
        const numberMatch = text.match(/(\d+)/);

        if (numberMatch) {
          const finalNumber = parseInt(numberMatch[1]);
          const prefix = text.substring(0, numberMatch.index);
          const suffix = text.substring(numberMatch.index + numberMatch[1].length);

          // Создаем CountUp
          const countUp = new countUp.CountUp(entry.target, finalNumber, {
            duration: 2,
            separator: ' ',
            prefix: prefix,
            suffix: suffix
          });

          if (!countUp.error) {
            countUp.start();
          }
        }
      }
    });
  };

  const numberObserver = new IntersectionObserver(animateNumbers, observerOptions);

  // Наблюдаем за ценами
  document.querySelectorAll('.bl_tarifElem1__price').forEach(el => {
    numberObserver.observe(el);
  });

  // Наблюдаем за количеством каналов
  document.querySelectorAll('.bl_tarifElem1__channels').forEach(el => {
    numberObserver.observe(el);
  });

  // Наблюдаем за ценами в дополнительных пакетах
  document.querySelectorAll('.bl_colV2__price').forEach(el => {
    numberObserver.observe(el);
  });
});

// === ПАРАЛЛАКС ДЛЯ ФОНОВЫХ СЕКЦИЙ ===
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.aboutus, .bl_pg2018101_block2');

  parallaxElements.forEach(element => {
    const speed = 0.5;
    element.style.backgroundPositionY = -(scrolled * speed) + 'px';
  });
});

// === УЛУЧШЕННАЯ ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРЕЙ ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Пропускаем пустые якори и якорь #
    if (href === '#' || href === '') {
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80; // Отступ для фиксированного меню

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// === ДОБАВЛЕНИЕ КЛАССА ДЛЯ АНИМИРОВАННЫХ ЦЕН ===
document.querySelectorAll('.bl_tarifElem1__price, .bl_colV2__price').forEach(el => {
  const numberMatch = el.textContent.match(/(\d+)/);
  if (numberMatch) {
    el.classList.add('animated-price');
  }
});

// === УЛУЧШЕННОЕ МОБИЛЬНОЕ МЕНЮ ===
document.addEventListener('DOMContentLoaded', function() {
  const menuWrap = document.querySelector('.topmenu__wrap');
  const menuBtn = document.querySelector('.topmenu__mbtn');

  if (menuWrap && menuBtn) {
    // Создаем кнопку закрытия
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-menu-close';
    closeBtn.innerHTML = '✕';
    closeBtn.setAttribute('aria-label', 'Закрыть меню');
    menuWrap.appendChild(closeBtn);

    // Закрытие по клику на кнопку "✕"
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      menuBtn.click();
    });

    // Закрытие меню по клику на backdrop (затемненный фон)
    menuWrap.addEventListener('click', function(e) {
      if (e.target === menuWrap) {
        menuBtn.click();
      }
    });

    // Закрытие меню по клавише Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menuWrap.classList.contains('topmenu__wrap-active')) {
        menuBtn.click();
      }
    });

    // Блокировка прокрутки body при открытом меню
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          if (menuWrap.classList.contains('topmenu__wrap-active')) {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        }
      });
    });

    observer.observe(menuWrap, { attributes: true });
  }
});


/* === Separator between script blocks === */


// === АВТОМАТИЧЕСКОЕ ВОСПРОИЗВЕДЕНИЕ ВИДЕО ТАРИФОВ ПРИ ПОПАДАНИИ В ЗОНУ ВИДИМОСТИ ===
document.addEventListener('DOMContentLoaded', function() {
  // Список тарифов, которые нужно обрабатывать
  const tarifImages = [
    'tar_etoprosto.png',
    'tar_smit.png',
    'tar_super.png',
    'tar_bezgranic.png',
    'tar_dlatebya.png'
  ];

  // Объект для хранения предзагруженных видео
  const preloadedVideos = {};

  // Объект для отслеживания уже проигранных видео
  const playedVideos = new Set();

  // Функция для получения имени файла из пути
  function getFileName(path) {
    return path.split('/').pop().split('\\').pop();
  }

  // Функция для замены расширения на .MP4
  function replaceExtensionToMP4(imageSrc) {
    return imageSrc.replace(/\.(png|jpg|jpeg|gif)$/i, '.MP4');
  }

  // Функция предзагрузки видео
  function preloadVideo(videoSrc) {
    if (preloadedVideos[videoSrc]) {
      return preloadedVideos[videoSrc];
    }

    const video = document.createElement('video');
    video.preload = 'auto';
    video.src = videoSrc;
    video.muted = true;
    video.loop = true; // Проигрываем по кругу
    video.playsInline = true;
    video.style.display = 'none';

    // Добавляем в DOM для начала загрузки
    document.body.appendChild(video);

    // Загружаем видео
    video.load();

    preloadedVideos[videoSrc] = video;
    return video;
  }

  // Находим все карточки тарифов с классом bl_colv1_type4
  const tarifCards = document.querySelectorAll('.bl_colv1_type4');

  // Предзагружаем все видео
  const videosToPreload = [];
  tarifCards.forEach(function(card) {
    const img = card.querySelector('.bl_colv1__type4Img');
    if (!img) return;

    const imgSrc = img.getAttribute('src');
    const fileName = getFileName(imgSrc);

    if (tarifImages.includes(fileName)) {
      const videoSrc = replaceExtensionToMP4(imgSrc);
      videosToPreload.push(videoSrc);
    }
  });

  // Запускаем предзагрузку с небольшой задержкой, чтобы не мешать загрузке страницы
  setTimeout(function() {
    videosToPreload.forEach(function(videoSrc) {
      preloadVideo(videoSrc);
    });
  }, 500);

  // Создаем Intersection Observer для отслеживания видимости карточек
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.5 // 50% карточки должно быть видно
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const card = entry.target;
        const videoSrc = card.getAttribute('data-video-src');

        // Проверяем, не проигрывалось ли уже это видео
        if (!playedVideos.has(videoSrc)) {
          playedVideos.add(videoSrc);
          playVideoOnce(card);
        }
      }
    });
  }, observerOptions);

  // Функция для циклического проигрывания видео
  function playVideoOnce(card) {
    const img = card.querySelector('.bl_colv1__type4Img');
    if (!img) return;

    const videoSrc = card.getAttribute('data-video-src');

    // Получаем предзагруженное видео или создаем новое
    let preloadedVideo = preloadedVideos[videoSrc];
    let videoElement;

    if (preloadedVideo) {
      // Клонируем предзагруженное видео
      videoElement = preloadedVideo.cloneNode(true);
    } else {
      // Создаем новое видео, если предзагрузка не успела
      videoElement = document.createElement('video');
      videoElement.src = videoSrc;
      videoElement.muted = true;
      videoElement.loop = true; // Проигрываем по кругу
      videoElement.playsInline = true;
    }

    videoElement.className = 'block bl_colv1__type4Img tarif-video';
    videoElement.style = img.getAttribute('style') || '';
    videoElement.style.display = 'block';
    videoElement.style.opacity = '0';
    videoElement.style.transition = 'opacity 0.5s ease-in-out';

    // Добавляем плавный переход для изображения
    img.style.transition = 'opacity 0.5s ease-in-out';

    // Вставляем видео после изображения
    img.parentNode.insertBefore(videoElement, img.nextSibling);

    // Запускаем воспроизведение с плавным появлением
    videoElement.play().then(function() {
      // Плавно скрываем изображение
      img.style.opacity = '0';

      // Плавно показываем видео
      setTimeout(function() {
        videoElement.style.opacity = '1';
      }, 50);
    }).catch(function(error) {
      console.log('Ошибка воспроизведения видео:', error);
      // В случае ошибки возвращаем картинку
      videoElement.remove();
      img.style.opacity = '1';
    });
  }

  // Обрабатываем каждую карточку и добавляем в observer
  tarifCards.forEach(function(card) {
    const img = card.querySelector('.bl_colv1__type4Img');
    if (!img) return;

    const imgSrc = img.getAttribute('src');
    const fileName = getFileName(imgSrc);

    // Проверяем, входит ли это изображение в наш список
    if (!tarifImages.includes(fileName)) return;

    const videoSrc = replaceExtensionToMP4(imgSrc);

    // Сохраняем путь к видео в data-атрибуте карточки
    card.setAttribute('data-video-src', videoSrc);

    // Добавляем карточку в observer
    observer.observe(card);
  });
});

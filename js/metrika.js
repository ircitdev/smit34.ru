/* ========================================
   Яндекс.Метрика для smit34.ru
   ID счётчика: 105460811
   ======================================== */

(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105460811', 'ym');

// Инициализация счётчика с расширенными возможностями
ym(105460811, 'init', {
    ssr:true,  // Server Side Rendering
    webvisor:true,  // Вебвизор
    clickmap:true,  // Карта кликов
    ecommerce:"dataLayer",  // E-commerce
    accurateTrackBounce:true,  // Точный показатель отказов
    trackLinks:true  // Отслеживание исходящих ссылок
});

/* ========================================
   ЦЕЛИ ЯНДЕКС.МЕТРИКИ
   ======================================== */

// Функция для отправки цели
function ymGoal(goalName, params) {
    if (typeof ym !== 'undefined') {
        ym(105460811, 'reachGoal', goalName, params);
        console.log('Цель отправлена:', goalName, params);
    }
}

// ЦЕЛЬ 1: Клик на кнопку "Подключить" (тарифы)
document.addEventListener('DOMContentLoaded', function() {
    // Кнопки подключения тарифов
    const connectButtons = document.querySelectorAll('.bl_add2cartBtn');
    connectButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const serviceId = this.getAttribute('data-service-id') || 'unknown';
            ymGoal('connect_tariff', {
                service: serviceId,
                button_text: this.textContent.trim()
            });
        });
    });

    // ЦЕЛЬ 12: Клик на кнопку "Перейти в корзину"
    const cartButtons = document.querySelectorAll('.abonent__inner.servicesCart__gotoCart');
    cartButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            ymGoal('goto_cart', {
                button_text: this.textContent.trim()
            });
        });
    });

    // ЦЕЛЬ 2: Клик на "Виртуальный ассистент"
    const assistantBtn = document.getElementById('virtual-assistant-btn');
    if (assistantBtn) {
        assistantBtn.addEventListener('click', function() {
            ymGoal('click_assistant', {
                source: 'header'
            });
        });
    }

    // ЦЕЛЬ 3: Просмотр раздела тарифов (скролл до блока)
    const tarifSections = document.querySelectorAll('[class*="tarif"]');
    if (tarifSections.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !entry.target.dataset.ymViewed) {
                    entry.target.dataset.ymViewed = 'true';
                    ymGoal('view_tariffs', {
                        section: entry.target.className
                    });
                }
            });
        }, { threshold: 0.5 });

        tarifSections.forEach(function(section) {
            observer.observe(section);
        });
    }

    // ЦЕЛЬ 4: Клик на телефон/контакты
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            ymGoal('click_phone', {
                number: this.getAttribute('href').replace('tel:', '')
            });
        });
    });

    // ЦЕЛЬ 5: Переход по соцсетям
    const socialLinks = document.querySelectorAll('a[href*="vk.com"], a[href*="ok.ru"], a[href*="youtube.com"], a[href*="instagram.com"], a[href*="t.me"]');
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const social = this.getAttribute('href').match(/(vk|ok|youtube|instagram|t\.me)/);
            ymGoal('click_social', {
                network: social ? social[0] : 'unknown',
                url: this.getAttribute('href')
            });
        });
    });

    // ЦЕЛЬ 6: Скролл до футера (вовлеченность)
    const footer = document.querySelector('.bl_footer2, footer');
    if (footer && 'IntersectionObserver' in window) {
        const footerObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !entry.target.dataset.ymFooterViewed) {
                    entry.target.dataset.ymFooterViewed = 'true';
                    ymGoal('scroll_to_footer');
                }
            });
        }, { threshold: 0.3 });

        footerObserver.observe(footer);
    }

    // ЦЕЛЬ 7: Время на сайте более 30 секунд (вовлеченность)
    setTimeout(function() {
        ymGoal('engaged_30sec');
    }, 30000);

    // ЦЕЛЬ 8: Время на сайте более 60 секунд (высокая вовлеченность)
    setTimeout(function() {
        ymGoal('engaged_60sec');
    }, 60000);

    // ЦЕЛЬ 9: Клик на редиректы поддержки
    const supportLinks = document.querySelectorAll('a[href*="/supvk"], a[href*="/suptg"], a[href*="/supwhatsup"], a[href*="/supmax"]');
    supportLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const channel = this.getAttribute('href').match(/sup(\w+)/);
            ymGoal('click_support', {
                channel: channel ? channel[1] : 'unknown'
            });
        });
    });

    // ЦЕЛЬ 10: Клик на кнопку WiFi роутера (специальное предложение)
    const wifiRouterBtn = document.getElementById('wifi-router-connect-btn');
    if (wifiRouterBtn) {
        wifiRouterBtn.addEventListener('click', function() {
            ymGoal('connect_wifi_router', {
                type: 'special_offer'
            });
        });
    }

    // ЦЕЛЬ 11: Открытие чата AIDA
    // Отслеживаем событие открытия виджета AIDA
    if (window.aidaWidgetInstance) {
        const originalOpen = window.aidaWidgetInstance.open;
        window.aidaWidgetInstance.open = function() {
            ymGoal('open_aida_chat');
            return originalOpen.apply(this, arguments);
        };
    }
});

/* ========================================
   ЦЕЛИ, КОТОРЫЕ НУЖНО НАСТРОИТЬ В МЕТРИКЕ:
   ========================================

   Зайдите в Яндекс.Метрику → Настройки → Цели
   и создайте следующие JavaScript цели:

   1. connect_tariff - Клик "Подключить тариф"
   2. click_assistant - Клик "Виртуальный ассистент"
   3. view_tariffs - Просмотр раздела тарифов
   4. click_phone - Клик на телефон
   5. click_social - Переход в соцсети
   6. scroll_to_footer - Скролл до футера
   7. engaged_30sec - Время на сайте 30+ сек
   8. engaged_60sec - Время на сайте 60+ сек
   9. click_support - Клик на канал поддержки
   10. connect_wifi_router - Подключение WiFi роутера
   11. open_aida_chat - Открытие чата AIDA
   12. goto_cart - Переход в корзину

   Тип цели: JavaScript событие
   Идентификатор цели: (название из списка выше)
   ======================================== */

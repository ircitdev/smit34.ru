# Modal Manager - Инструкция по управлению модальным окном

## Обзор

Modal Manager - это система управления модальным окном на сайте smit34.ru. Позволяет легко настраивать содержимое, частоту показа и включать/выключать модальное окно без редактирования HTML кода.

## Файлы системы

| Файл | Описание |
|------|----------|
| `js/modal-config.json` | Конфигурация модального окна (настройки + контент) |
| `js/modal-manager.js` | JavaScript модуль управления |
| `js/modal-instruction.md` | Эта инструкция |

---

## Интеграция с прелоадером

**Важно:** Модальное окно показывается **через 4 секунды после скрытия прелоадера**, а не сразу после загрузки страницы.

### Как это работает

1. Прелоадер загружает страницу и показывает прогресс
2. После завершения загрузки прелоадер устанавливает `window.preloaderHidden = true`
3. Modal Manager проверяет этот флаг каждые 100ms
4. Когда флаг становится `true`, ждёт 4 секунды и показывает модалку

### Задержка показа

Задержка в 4 секунды настраивается в `js/modal-manager.js`:
```javascript
var delay = 4000; // Задержка 4 секунды после скрытия прелоадера
```

### Fallback

Если прелоадер не скроется в течение 15 секунд, модальное окно покажется принудительно.

---

## Настройка modal-config.json

### Основные параметры

```json
{
  "enabled": true,
  "showOnEveryPageLoad": false,
  "cookieExpirationMinutes": 1440,
  "cookieName": "smit_modal_shown",
  "title": "Внимание!",
  "content": [...]
}
```

### Описание параметров

| Параметр | Тип | Описание |
|----------|-----|----------|
| `enabled` | boolean | `true` - показывать окно, `false` - отключить |
| `showOnEveryPageLoad` | boolean | `true` - показывать при каждой загрузке страницы, `false` - использовать cookie |
| `cookieExpirationMinutes` | number | Через сколько минут снова показать окно (работает только если `showOnEveryPageLoad: false`) |
| `cookieName` | string | Имя cookie для отслеживания показа |
| `title` | string | Заголовок модального окна |
| `content` | array | Массив блоков контента |

---

## Примеры настроек

### Отключить модальное окно
```json
{
  "enabled": false
}
```

### Показывать при каждой загрузке страницы
```json
{
  "enabled": true,
  "showOnEveryPageLoad": true
}
```

### Показывать 1 раз в 2 минуты
```json
{
  "enabled": true,
  "showOnEveryPageLoad": false,
  "cookieExpirationMinutes": 2
}
```

### Показывать 1 раз в час
```json
{
  "cookieExpirationMinutes": 60
}
```

### Показывать 1 раз в 24 часа (1 день)
```json
{
  "cookieExpirationMinutes": 1440
}
```

### Показывать 1 раз в неделю
```json
{
  "cookieExpirationMinutes": 10080
}
```

### Показывать 1 раз в месяц
```json
{
  "cookieExpirationMinutes": 43200
}
```

---

## Типы блоков контента

### Параграф (paragraph)
Обычный текст с поддержкой HTML.

```json
{
  "type": "paragraph",
  "text": "Текст параграфа с <b>жирным</b> и <a href='#'>ссылкой</a>."
}
```

### Заголовок (heading)
Заголовок h5 с уменьшенным размером.

```json
{
  "type": "heading",
  "text": "Заголовок раздела"
}
```

### Футер/Подвал (footer)
Текст с особым стилем (зеленый, жирный).

```json
{
  "type": "footer",
  "text": "Благодарим за понимание!"
}
```

### Разделитель (separator)
Горизонтальная линия `<hr>`.

```json
{
  "type": "separator"
}
```

### Список (list)
Маркированный список.

```json
{
  "type": "list",
  "items": [
    "Первый пункт",
    "Второй пункт",
    "Третий пункт"
  ]
}
```

### HTML (html)
Произвольный HTML код.

```json
{
  "type": "html",
  "html": "<div class='custom'>Произвольный HTML</div>"
}
```

---

## Полный пример конфигурации

```json
{
  "enabled": true,
  "showOnEveryPageLoad": false,
  "cookieExpirationMinutes": 1440,
  "cookieName": "smit_modal_shown",
  "title": "Важное объявление!",
  "content": [
    {
      "type": "paragraph",
      "text": "Уважаемые абоненты!"
    },
    {
      "type": "paragraph",
      "text": "Сообщаем вам о <b>важных изменениях</b> в работе нашей компании."
    },
    {
      "type": "separator"
    },
    {
      "type": "heading",
      "text": "Новые тарифы"
    },
    {
      "type": "list",
      "items": [
        "Тариф «Базовый» - 500 руб/мес",
        "Тариф «Стандарт» - 700 руб/мес",
        "Тариф «Премиум» - 1000 руб/мес"
      ]
    },
    {
      "type": "paragraph",
      "text": "Подробности на <a href='https://smit34.ru' target='_blank'>нашем сайте</a>."
    },
    {
      "type": "footer",
      "text": "Спасибо за выбор нашей компании!"
    }
  ]
}
```

---

## Отладка в браузере

Откройте консоль браузера (F12 → Console) и используйте команды:

### Проверить состояние прелоадера
```javascript
console.log('Прелоадер скрыт:', window.preloaderHidden);
```

### Удалить cookie (чтобы снова увидеть модалку)
```javascript
ModalManager.deleteCookie('smit_modal_shown');
location.reload();
```

### Проверить текущую конфигурацию
```javascript
console.log(ModalManager.config);
```

### Показать модальное окно вручную (сразу)
```javascript
UIkit.modal('#modal-example').show();
```

### Скрыть модальное окно
```javascript
ModalManager.hideModal();
```

### Проверить значение cookie
```javascript
ModalManager.getCookie('smit_modal_shown');
```

---

## Порядок загрузки скриптов

**Важно:** В `index.html` скрипты должны быть в правильном порядке:

```html
<!-- Preloader Script - должен быть ДО modal-manager -->
<script src="js/preloader.js"></script>

<!-- Modal Manager - управление модальным окном из JSON конфига -->
<script src="js/modal-manager.js"></script>
```

Прелоадер устанавливает глобальный флаг `window.preloaderHidden = false` в самом начале, поэтому он должен загружаться первым.

---

## Частые вопросы

### Почему модальное окно не показывается?

1. Проверьте `enabled: true` в конфигурации
2. Возможно, cookie еще не истекла - удалите её через консоль
3. Проверьте консоль браузера на наличие ошибок
4. Убедитесь, что прелоадер корректно завершает работу (`window.preloaderHidden === true`)

### Почему модальное окно показывается слишком рано?

Проверьте:
1. Порядок загрузки скриптов (preloader.js должен быть до modal-manager.js)
2. Наличие строки `window.preloaderHidden = false;` в начале preloader.js

### Как изменить задержку показа модалки?

В файле `js/modal-manager.js` найдите:
```javascript
var delay = 4000; // Задержка 4 секунды после скрытия прелоадера
```
Измените значение `4000` на нужное (в миллисекундах).

### Как изменить стиль модального окна?

Стили находятся в `css/styles.css` в секции `.notice-modal`. Основные классы:
- `.notice-modal` - контейнер
- `.notice-header` - шапка с заголовком
- `.notice-title` - заголовок
- `.notice-body` - тело с контентом
- `.notice-footer-text` - текст подвала

### Как добавить картинку?

Используйте тип `html`:
```json
{
  "type": "html",
  "html": "<img src='images/banner.jpg' style='max-width:100%'>"
}
```

### Как добавить кнопку?

Используйте тип `html`:
```json
{
  "type": "html",
  "html": "<a href='tel:+78442553559' class='uk-button uk-button-primary'>Позвонить</a>"
}
```

---

## Глобальные переменные

| Переменная | Описание |
|------------|----------|
| `window.preloaderHidden` | Флаг от прелоадера: `true` когда прелоадер скрылся |
| `window.ModalManager` | Объект для управления модальным окном из консоли |

---

## Важно помнить

1. **JSON должен быть валидным** - используйте двойные кавычки `"`, экранируйте специальные символы
2. **Кэширование** - браузер может кэшировать JSON файл, добавлен cache buster
3. **Cookie** - работает только в пределах одного домена
4. **Мобильные устройства** - модальное окно адаптивное
5. **Прелоадер** - модалка ждёт завершения прелоадера перед показом

---

## Контакты для поддержки

При возникновении проблем обращайтесь к разработчику.

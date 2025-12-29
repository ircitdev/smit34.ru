# Preloader - Инструкция по использованию

## Описание

Прелоадер - это экран загрузки, который показывается пользователю во время загрузки страницы. Он отображает логотип, текст "Идет загрузка" и процент загруженных ресурсов.

## Файлы

- `js/preloader.js` - основной скрипт прелоадера
- `css/styles.css` - стили прелоадера (секция "ПРЕЛОАДЕР")
- `index.html` - HTML-разметка прелоадера

## Как работает

### 1. Инициализация

При загрузке скрипта:
1. Устанавливается глобальный флаг `window.preloaderHidden = false`
2. После загрузки DOM вызывается `Preloader.init()`

### 2. Подсчёт ресурсов

Прелоадер считает:
- Все изображения на странице (`document.images`)
- 5 видео файлов из папки `index_img/`:
  - `tar_etoprosto.MP4`
  - `tar_smit.MP4`
  - `tar_super.MP4`
  - `tar_bezgranic.MP4`
  - `tar_dlatebya.MP4`

Минимальное количество ресурсов = 10 (для плавности анимации).

### 3. Отслеживание загрузки

- Для каждого изображения отслеживаются события `load` и `error`
- Для каждого видео отслеживается событие `canplaythrough`
- При загрузке каждого ресурса обновляется процент

### 4. Минимальное время показа

Прелоадер показывается **минимум 2 секунды** (`minDisplayTime: 2000`).

Это означает:
- Даже если все ресурсы загрузились за 0.5 сек, прелоадер будет виден 2 секунды
- Если ресурсы грузятся 5 секунд, прелоадер скроется после их загрузки

### 5. Fallback таймер

Если по какой-то причине ресурсы не загрузились, прелоадер принудительно скрывается через **10 секунд**.

### 6. Скрытие прелоадера

Последовательность скрытия:
1. Устанавливается прогресс 100%
2. Задержка 200ms
3. Добавляется класс `preloader-hide` (прелоадер уезжает вниз)
4. Задержка 400ms
5. Контенту сайта добавляется класс `site-visible` (появление снизу)
6. Устанавливается `window.preloaderHidden = true`
7. Вызывается событие `preloaderHidden`
8. Через 1 секунду прелоадер удаляется из DOM

## Глобальные переменные и события

### window.preloaderHidden

Глобальный флаг для других скриптов:
- `false` - прелоадер ещё работает
- `true` - прелоадер скрылся

Пример использования:
```javascript
if (window.preloaderHidden === true) {
  // Прелоадер уже скрылся
}
```

### Событие preloaderHidden

Вызывается когда прелоадер скрывается:
```javascript
document.addEventListener('preloaderHidden', function() {
  // Прелоадер скрылся
});
```

### window.Preloader

Объект прелоадера доступен глобально для отладки:
```javascript
// Принудительно скрыть прелоадер
window.Preloader.hidePreloader();

// Посмотреть текущий прогресс
console.log(window.Preloader.progress);
```

## Настройка

### Изменение минимального времени показа

В файле `js/preloader.js`:
```javascript
minDisplayTime: 2000, // Минимальное время в миллисекундах
```

### Изменение списка видео для предзагрузки

В файле `js/preloader.js`:
```javascript
videoFiles: [
  'index_img/tar_etoprosto.MP4',
  'index_img/tar_smit.MP4',
  // ... добавить или удалить файлы
],
```

### Изменение fallback таймера

В файле `js/preloader.js`:
```javascript
// Fallback - скрыть прелоадер через 10 секунд
setTimeout(function() {
  Preloader.hidePreloader();
}, 10000); // Изменить значение
```

## HTML-разметка

```html
<!-- Прелоадер -->
<div id="preloader">
  <div class="preloader-content">
    <div class="preloader-logo">
      <img src="upload/medialibrary/f86/f86fb52ca88dd8a6182cd5316b2b1c23.png" alt="SmIT" width="120">
    </div>
    <div class="preloader-text">Идет загрузка</div>
    <div class="preloader-progress">
      <div class="preloader-progress-bar"></div>
    </div>
    <div class="preloader-percent">0%</div>
  </div>
</div>

<!-- Основной контент сайта -->
<div id="site-content">
  <!-- ... контент страницы ... -->
</div>
```

**Важно:** Весь контент сайта должен быть внутри `#site-content`.

## CSS-классы

| Класс | Описание |
|-------|----------|
| `#preloader` | Контейнер прелоадера (полноэкранный) |
| `.preloader-content` | Центрированный контент |
| `.preloader-logo` | Логотип с пульсацией |
| `.preloader-text` | Текст "Идет загрузка" |
| `.preloader-progress` | Контейнер прогресс-бара |
| `.preloader-progress-bar` | Заполняемая полоса прогресса |
| `.preloader-percent` | Текст с процентом |
| `.preloader-hide` | Класс для анимации скрытия (уезжает вниз) |
| `#site-content` | Контейнер контента (изначально скрыт) |
| `.site-visible` | Класс для показа контента (появление снизу) |

## Стилизация

Основные стили в `css/styles.css`:

```css
/* Фон прелоадера */
#preloader {
  background: url(https://aida.smit34.ru/widget/pattern.jpg) repeat;
  background-color: #1a1a2e;
}

/* Цвет текста и прогресс-бара */
.preloader-text {
  color: #96c93f;
}

.preloader-progress-bar {
  background: linear-gradient(90deg, #96c93f 0%, #7eb32d 100%);
}
```

## Интеграция с модальным окном

Модальное окно (modal-manager.js) использует флаг `window.preloaderHidden` для определения момента показа. Модалка появляется через 4 секунды после скрытия прелоадера.

## Отладка

Открыть консоль браузера и использовать:

```javascript
// Проверить состояние
console.log('Прелоадер скрыт:', window.preloaderHidden);
console.log('Прогресс:', window.Preloader.progress);
console.log('Загружено ресурсов:', window.Preloader.resourcesLoaded);
console.log('Всего ресурсов:', window.Preloader.totalResources);

// Принудительно скрыть
window.Preloader.hidePreloader();
```

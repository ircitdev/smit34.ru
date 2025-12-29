# Руководство по конвертации изображений в WebP

## Что такое WebP?

WebP — современный формат изображений от Google:
- **На 25-35% меньше** чем JPEG при том же качестве
- **На 26% меньше** чем PNG
- Поддержка прозрачности (как PNG)
- Поддержка анимации (как GIF)

## 🚀 Быстрая конвертация

### Способ 1: Python скрипт (Рекомендуется)

1. **Установите Pillow:**
```bash
pip install Pillow
```

2. **Запустите скрипт:**
```bash
python convert_to_webp.py
```

Скрипт автоматически:
- Найдет все изображения на сайте
- Конвертирует в WebP с качеством 85%
- Покажет сколько места сэкономлено

### Способ 2: Онлайн-сервисы

**Squoosh (Google) - Лучший выбор**
- Сайт: https://squoosh.app/
- Преимущества: Видно сравнение, настройка качества
- Как использовать:
  1. Перетащите изображение
  2. Выберите справа формат **WebP**
  3. Установите качество **80-85**
  4. Скачайте

**CloudConvert - Для пакетной конвертации**
- Сайт: https://cloudconvert.com/png-to-webp
- Можно загрузить сразу много файлов

**TinyPNG - Сжатие + WebP**
- Сайт: https://tinypng.com/
- Сначала сжимает, потом можно конвертировать в WebP

### Способ 3: Программы Windows

**XnConvert (Бесплатная)**
- Скачать: https://www.xnview.com/en/xnconvert/
- Пакетная обработка
- Много настроек

**GIMP (Бесплатная)**
- Скачать: https://www.gimp.org/
- Открыть → Экспорт → Выбрать .webp
- Качество: 80-85

**Photoshop (Платная)**
- Нужен плагин WebPShop
- Скачать: https://github.com/webmproject/WebPShop

## 📋 Какие изображения конвертировать?

На вашем сайте приоритетные изображения:

### Высокий приоритет (большие файлы)
1. `images/map.jpg` - Карта покрытия (большая!)
2. `index_img/tar_etoprosto.png` - Тариф "Это просто"
3. `index_img/tar_super.png` - Тариф "Супер"
4. `index_img/tar_dlatebya.png` - Тариф "Для тебя"
5. `index_img/tar_smit.png` - Тариф "SmIT"
6. `index_img/tar_bezgranic.png` - Тариф "Без границ"

### Средний приоритет
7. `upload/medialibrary/f86/f86fb52ca88dd8a6182cd5316b2b1c23.png` - Логотип
8. Все изображения в `images/` (дополнительные пакеты каналов)

### Низкий приоритет (маленькие файлы)
- SVG файлы - не конвертировать! Они уже оптимальны
- Иконки меньше 10 KB - экономия минимальная

## 🔧 Как использовать WebP на сайте

### Вариант 1: Тег `<picture>` (Рекомендуется)

Поддерживает старые браузеры + новые с WebP:

```html
<picture>
  <source srcset="images/map.webp" type="image/webp">
  <img src="images/map.jpg" alt="Карта покрытия" loading="lazy">
</picture>
```

**Как это работает:**
- Современные браузеры загрузят `.webp` (меньший размер)
- Старые браузеры загрузят `.jpg` (запасной вариант)

### Вариант 2: Только WebP (Если не нужна поддержка IE)

```html
<img src="images/map.webp" alt="Карта покрытия" loading="lazy">
```

## 📝 Обновление index.html

Замените изображения тарифов:

### Было:
```html
<img class="block bl_colv1__type4Img" alt=""
     src="index_img/tar_etoprosto.png" loading="lazy">
```

### Стало:
```html
<picture>
  <source srcset="index_img/tar_etoprosto.webp" type="image/webp">
  <img class="block bl_colv1__type4Img" alt="Тариф Это просто"
       src="index_img/tar_etoprosto.png" loading="lazy">
</picture>
```

### Карта покрытия

Было (строка 270):
```html
<img id="u15597_img" style="width:100%; margin:0 auto"
     alt="" src="images/map.jpg" loading="lazy">
```

Стало:
```html
<picture>
  <source srcset="images/map.webp" type="image/webp">
  <img id="u15597_img" style="width:100%; margin:0 auto"
       alt="Карта покрытия" src="images/map.jpg" loading="lazy">
</picture>
```

## 📊 Ожидаемая экономия

| Файл | Размер до | WebP | Экономия |
|------|-----------|------|----------|
| map.jpg | ~500 KB | ~300 KB | ~40% |
| tar_*.png | ~200 KB каждый | ~120 KB | ~40% |
| Логотип | ~50 KB | ~30 KB | ~40% |

**Итого:** Экономия ~1-2 MB на первой загрузке страницы!

## ⚙️ Настройки качества

Рекомендации по качеству WebP:

- **Фотографии:** 80-85 (оптимально)
- **Графика с текстом:** 85-90 (важна четкость)
- **Фоновые изображения:** 75-80 (можно ниже)
- **Логотипы:** 90-95 (важна четкость)

## 🌐 Поддержка браузерами

WebP поддерживается:
- ✅ Chrome 23+ (2012)
- ✅ Firefox 65+ (2019)
- ✅ Edge 18+ (2018)
- ✅ Safari 14+ (2020)
- ✅ Opera 12.1+ (2012)

НЕ поддерживается:
- ❌ Internet Explorer (все версии)
- ❌ Safari до версии 14

**Решение:** Используйте тег `<picture>` для совместимости!

## 🔍 Проверка результатов

После конвертации и обновления сайта:

1. **Визуально проверьте:**
   - Откройте сайт в Chrome
   - Проверьте качество изображений

2. **Проверьте размер:**
   - F12 → Network → Images
   - Убедитесь что загружаются `.webp` файлы

3. **Тест скорости:**
   - Google PageSpeed: https://pagespeed.web.dev/
   - GTmetrix: https://gtmetrix.com/

## 📦 Пакетная конвертация всех изображений

Если хотите конвертировать ВСЕ изображения сайта:

### Windows (PowerShell)
```powershell
# Установить cwebp
# Скачать: https://developers.google.com/speed/webp/download

# Конвертировать все JPG
Get-ChildItem -Recurse -Include *.jpg,*.jpeg | ForEach-Object {
    cwebp -q 85 $_.FullName -o ($_.FullName -replace '\.(jpg|jpeg)$','.webp')
}

# Конвертировать все PNG
Get-ChildItem -Recurse -Include *.png | ForEach-Object {
    cwebp -q 85 $_.FullName -o ($_.FullName -replace '\.png$','.webp')
}
```

## 🎯 Следующие шаги

1. ✅ Конвертируйте изображения в WebP
2. ✅ Обновите HTML с тегом `<picture>`
3. ✅ Загрузите WebP файлы на FTP
4. ✅ Загрузите обновленный index.html
5. ✅ Проверьте сайт в браузере

## 💡 Дополнительные советы

### Автоматическая конвертация на сервере

Если у вас есть доступ к `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Проверяем поддержку WebP
  RewriteCond %{HTTP_ACCEPT} image/webp

  # Если есть WebP версия, загружаем её
  RewriteCond %{REQUEST_FILENAME}.webp -f
  RewriteRule ^(.+)\.(jpe?g|png)$ $1.$2.webp [T=image/webp,E=accept:1,L]
</IfModule>

<IfModule mod_headers.c>
  Header append Vary Accept env=REDIRECT_accept
</IfModule>

AddType image/webp .webp
```

Это автоматически будет отдавать WebP браузерам которые его поддерживают!

---

**Создано:** 2 декабря 2025
**Автор:** Claude Code

#!/usr/bin/env python3
"""
Конвертация изображений в WebP формат
Требуется: pip install Pillow
"""

from PIL import Image
import os
import sys

# Список изображений для конвертации
IMAGES_TO_CONVERT = [
    'images/map.jpg',
    'index_img/tar_etoprosto.png',
    'index_img/tar_super.png',
    'index_img/tar_dlatebya.png',
    'index_img/tar_smit.png',
    'index_img/tar_bezgranic.png',
    'upload/medialibrary/f86/f86fb52ca88dd8a6182cd5316b2b1c23.png',
]

# Качество WebP (0-100, рекомендуется 80-85)
WEBP_QUALITY = 85

def convert_to_webp(input_path, quality=WEBP_QUALITY):
    """Конвертировать изображение в WebP"""
    if not os.path.exists(input_path):
        print(f'⚠ Файл не найден: {input_path}')
        return False

    try:
        # Открываем изображение
        img = Image.open(input_path)

        # Конвертируем в RGB если нужно
        if img.mode in ('RGBA', 'LA', 'P'):
            # Сохраняем прозрачность для PNG
            pass
        elif img.mode != 'RGB':
            img = img.convert('RGB')

        # Генерируем путь для WebP
        base_name = os.path.splitext(input_path)[0]
        output_path = base_name + '.webp'

        # Сохраняем как WebP
        img.save(output_path, 'WEBP', quality=quality)

        # Получаем размеры файлов
        input_size = os.path.getsize(input_path)
        output_size = os.path.getsize(output_path)
        saved_percent = ((input_size - output_size) / input_size) * 100

        # Форматируем размеры
        def format_size(size):
            for unit in ['B', 'KB', 'MB']:
                if size < 1024:
                    return f"{size:.1f} {unit}"
                size /= 1024
            return f"{size:.1f} GB"

        print(f'✓ {os.path.basename(input_path):30} → {os.path.basename(output_path):30}')
        print(f'  {format_size(input_size):>10} → {format_size(output_size):>10} (сжато на {saved_percent:.1f}%)')

        return True

    except Exception as e:
        print(f'✗ Ошибка при конвертации {input_path}: {e}')
        return False

def main():
    """Основная функция"""
    print('=' * 70)
    print(' Конвертация изображений в WebP формат')
    print('=' * 70)
    print()

    # Проверяем Pillow
    try:
        from PIL import Image
    except ImportError:
        print('✗ ОШИБКА: Pillow не установлен!')
        print()
        print('Установите командой:')
        print('  pip install Pillow')
        print()
        return 1

    success_count = 0
    total_count = len(IMAGES_TO_CONVERT)

    for img_path in IMAGES_TO_CONVERT:
        if convert_to_webp(img_path, WEBP_QUALITY):
            success_count += 1
        print()

    print('=' * 70)
    print(f' Конвертировано: {success_count} из {total_count} изображений')
    print('=' * 70)
    print()

    if success_count > 0:
        print('✓ Файлы WebP созданы!')
        print()
        print('Следующий шаг: Обновите HTML для использования WebP')
        print('Смотрите инструкцию ниже.')
        print()
        print_html_example()

    return 0 if success_count == total_count else 1

def print_html_example():
    """Печатает пример использования WebP в HTML"""
    print('─' * 70)
    print('Пример использования WebP в HTML:')
    print('─' * 70)
    print()
    print('<!-- Для браузеров с поддержкой WebP будет загружен WebP,')
    print('     для старых браузеров - оригинальный формат -->')
    print()
    print('<picture>')
    print('  <source srcset="images/map.webp" type="image/webp">')
    print('  <img src="images/map.jpg" alt="Карта покрытия" loading="lazy">')
    print('</picture>')
    print()
    print('─' * 70)
    print()

if __name__ == '__main__':
    sys.exit(main())

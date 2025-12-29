#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Конвертация всех изображений сайта в WebP формат
"""

from PIL import Image
import os
import glob
import sys

# Исправляем проблемы с кодировкой в Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# Папки для конвертации
FOLDERS = [
    'index_img',
    'images'
]

# Качество WebP
WEBP_QUALITY = 85

def get_size_str(size_bytes):
    """Форматирование размера файла"""
    for unit in ['B', 'KB', 'MB']:
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} GB"

def convert_to_webp(input_path, quality=WEBP_QUALITY):
    """Конвертировать изображение в WebP"""
    try:
        # Открываем изображение
        img = Image.open(input_path)

        # Конвертируем в RGB если нужно (кроме PNG с прозрачностью)
        if img.mode == 'P':
            img = img.convert('RGBA')
        elif img.mode not in ('RGB', 'RGBA'):
            img = img.convert('RGB')

        # Генерируем путь для WebP
        base_name = os.path.splitext(input_path)[0]
        output_path = base_name + '.webp'

        # Пропускаем если уже есть
        if os.path.exists(output_path):
            return None

        # Сохраняем как WebP
        img.save(output_path, 'WEBP', quality=quality, method=6)

        # Получаем размеры файлов
        input_size = os.path.getsize(input_path)
        output_size = os.path.getsize(output_path)
        saved_percent = ((input_size - output_size) / input_size) * 100
        saved_bytes = input_size - output_size

        return {
            'input': input_path,
            'output': output_path,
            'input_size': input_size,
            'output_size': output_size,
            'saved_percent': saved_percent,
            'saved_bytes': saved_bytes
        }

    except Exception as e:
        print(f'  ✗ Ошибка: {os.path.basename(input_path)} - {e}')
        return False

def main():
    """Основная функция"""
    print('=' * 80)
    print('  Конвертация изображений в WebP формат')
    print('=' * 80)
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

    all_results = []
    skipped_count = 0

    # Обрабатываем каждую папку
    for folder in FOLDERS:
        if not os.path.exists(folder):
            print(f'⚠ Папка не найдена: {folder}')
            continue

        print(f'[>] Papka: {folder}/')
        print('-' * 80)

        # Находим все изображения
        patterns = [
            os.path.join(folder, '*.jpg'),
            os.path.join(folder, '*.jpeg'),
            os.path.join(folder, '*.png'),
            os.path.join(folder, '**', '*.jpg'),
            os.path.join(folder, '**', '*.jpeg'),
            os.path.join(folder, '**', '*.png')
        ]

        files = []
        for pattern in patterns:
            files.extend(glob.glob(pattern, recursive=True))

        # Убираем дубликаты
        files = list(set(files))
        files.sort()

        if not files:
            print('  Нет изображений для конвертации')
            print()
            continue

        folder_results = []

        for img_path in files:
            result = convert_to_webp(img_path, WEBP_QUALITY)

            if result is None:
                skipped_count += 1
            elif result:
                folder_results.append(result)
                all_results.append(result)

                # Печатаем результат
                filename = os.path.basename(result['input'])
                saved = result['saved_percent']
                input_size = get_size_str(result['input_size'])
                output_size = get_size_str(result['output_size'])

                print(f'  [OK] {filename[:50]:50} {input_size:>10} -> {output_size:>10} ({saved:>5.1f}%)')

        # Статистика по папке
        if folder_results:
            total_saved = sum(r['saved_bytes'] for r in folder_results)
            print()
            print(f'  [STATS] Ekonomleno v papke: {get_size_str(total_saved)}')

        print()

    # Общая статистика
    print('=' * 80)
    print('  ИТОГИ')
    print('=' * 80)
    print()

    if all_results:
        total_input = sum(r['input_size'] for r in all_results)
        total_output = sum(r['output_size'] for r in all_results)
        total_saved = total_input - total_output
        avg_saved = (total_saved / total_input * 100) if total_input > 0 else 0

        print(f'  [+] Konvertirovano fajlov:  {len(all_results)}')
        if skipped_count > 0:
            print(f'  [-] Propusheno (uzhe est):  {skipped_count}')
        print()
        print(f'  [SIZE] Iskhodnyj razmer:      {get_size_str(total_input)}')
        print(f'  [SIZE] Razmer posle WebP:     {get_size_str(total_output)}')
        print(f'  [SAVE] Ekonomleno:            {get_size_str(total_saved)} ({avg_saved:.1f}%)')
        print()
        print('-' * 80)
        print()
        print('[SUCCESS] Konvertaciya zavershena uspeshno!')
        print()
        print('Следующие шаги:')
        print('  1. Проверьте качество изображений')
        print('  2. Обновите HTML для использования WebP (см. WEBP_GUIDE.md)')
        print('  3. Загрузите WebP файлы на сервер')
        print()
    else:
        print('  ℹ Нет файлов для конвертации')
        if skipped_count > 0:
            print(f'  ({skipped_count} файлов уже конвертированы)')
        print()

    return 0

if __name__ == '__main__':
    import sys
    sys.exit(main())

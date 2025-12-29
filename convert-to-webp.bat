@echo off
echo ========================================
echo  Конвертация изображений в WebP
echo ========================================
echo.

REM Проверяем наличие Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ОШИБКА: Node.js не установлен!
    echo.
    echo Установите Node.js: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Устанавливаем sharp (если еще не установлен)
echo Проверка зависимостей...
if not exist "node_modules\sharp" (
    echo Установка sharp...
    call npm install sharp
)

echo.
echo Создание скрипта конвертации...

REM Создаем JS скрипт для конвертации
(
echo const sharp = require('sharp'^);
echo const fs = require('fs'^);
echo const path = require('path'^);
echo.
echo async function convertToWebP(inputPath, quality = 80^) {
echo   const parsed = path.parse(inputPath^);
echo   const outputPath = path.join(parsed.dir, parsed.name + '.webp'^);
echo.
echo   try {
echo     await sharp(inputPath^)
echo       .webp({ quality: quality }^)
echo       .toFile(outputPath^);
echo.
echo     const inputSize = fs.statSync(inputPath^).size;
echo     const outputSize = fs.statSync(outputPath^).size;
echo     const saved = ((1 - outputSize / inputSize^) * 100^).toFixed(1^);
echo.
echo     console.log(`✓ ${path.basename(inputPath^)} -^> ${path.basename(outputPath^)} (Сжато на ${saved}%%^)`^);
echo   } catch (err^) {
echo     console.error(`✗ Ошибка: ${inputPath} - ${err.message}`^);
echo   }
echo }
echo.
echo // Конвертируем все PNG и JPG изображения
echo const imagesToConvert = [
echo   'images/map.jpg',
echo   'index_img/tar_etoprosto.png',
echo   'index_img/tar_super.png',
echo   'index_img/tar_dlatebya.png',
echo   'index_img/tar_smit.png',
echo   'index_img/tar_bezgranic.png',
echo   'upload/medialibrary/f86/f86fb52ca88dd8a6182cd5316b2b1c23.png',
echo   'local/templates/smit34/images/connect2﹖v=78.png',
echo   'local/templates/smit34/images/phone﹖v=78.png'
echo ];
echo.
echo (async (^) =^> {
echo   console.log('Начало конвертации...\\n'^);
echo.
echo   for (const img of imagesToConvert^) {
echo     if (fs.existsSync(img^)^) {
echo       await convertToWebP(img, 85^);
echo     } else {
echo       console.log(`⚠ Файл не найден: ${img}`^);
echo     }
echo   }
echo.
echo   console.log('\\n✓ Конвертация завершена!'^);
echo }^)(^);
) > webp-converter.js

echo.
echo Запуск конвертации...
echo.

node webp-converter.js

echo.
echo ========================================
echo  Готово!
echo ========================================
echo.
echo Теперь обновите HTML для использования WebP:
echo - Используйте тег ^<picture^> для поддержки старых браузеров
echo.
pause

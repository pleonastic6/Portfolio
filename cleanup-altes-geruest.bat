@echo off
REM ---------------------------------------------------------------
REM  Einmalig ausfuehren: entfernt die Dateien des ersten Geruests,
REM  die durch die neue Struktur ersetzt wurden.
REM  Danach kann diese .bat geloescht werden.
REM ---------------------------------------------------------------
cd /d "%~dp0"

echo Entferne alte Ordner...
if exist "src\components\layout"   rd /s /q "src\components\layout"
if exist "src\components\sections" rd /s /q "src\components\sections"
if exist "src\components\ui"       rd /s /q "src\components\ui"
if exist "src\content"             rd /s /q "src\content"

echo Entferne alte Dateien...
if exist "src\hooks\useTheme.ts"      del /q "src\hooks\useTheme.ts"
if exist "src\hooks\useReveal.ts"     del /q "src\hooks\useReveal.ts"
if exist "src\i18n\de.json"           del /q "src\i18n\de.json"
if exist "src\i18n\en.json"           del /q "src\i18n\en.json"
if exist "src\styles\components.css"  del /q "src\styles\components.css"

echo.
echo Fertig. Jetzt einmal:  npm install  und dann  npm run dev
pause

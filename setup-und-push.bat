@echo off
cd /d "%~dp0"

call :run > "%~dp0deploy-log.txt" 2>&1
type "%~dp0deploy-log.txt"
echo.
pause
exit /b

:run
echo [1/5] npm install
call npm install
if errorlevel 1 goto :fail

echo.
echo [2/5] Alte Geruest-Dateien aus Git entfernen
git rm -r -q --ignore-unmatch src/components/layout src/components/sections src/components/ui src/content src/hooks/useTheme.ts src/hooks/useReveal.ts src/i18n/de.json src/i18n/en.json src/styles/components.css public/fonts cleanup-altes-geruest.bat fix-deploy.bat
git add .gitignore

echo.
echo [3/5] Build pruefen
call npm run build
if errorlevel 1 goto :fail

echo.
echo [4/5] Commit
git commit -m "Altes Geruest entfernt"

echo.
echo [5/5] Push
git push
if errorlevel 1 goto :fail

echo.
echo ERGEBNIS: OK
exit /b 0

:fail
echo.
echo ERGEBNIS: ABGEBROCHEN - Meldung oben lesen. Nichts wurde gepusht.
exit /b 1

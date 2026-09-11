@echo off
rem ---------------------------------------------------------------
rem  Baut das Projekt und schiebt den aktuellen Stand zu GitHub.
rem  Alles Wichtige landet zusaetzlich in push-log.txt.
rem  Gepusht wird nur, wenn der Build vorher sauber durchlaeuft.
rem ---------------------------------------------------------------
cd /d "%~dp0"

call :run > "%~dp0push-log.txt" 2>&1
type "%~dp0push-log.txt"
echo.
pause
exit /b

:run
echo [1/5] Abhaengigkeiten installieren
call npm install
if errorlevel 1 goto :fail

echo.
echo [2/5] Typen und Build pruefen
call npm run build
if errorlevel 1 goto :fail

echo.
echo [3/5] Aenderungen vormerken
git add -A
if errorlevel 1 goto :fail

rem Wenn nichts vorgemerkt ist, gibt es auch nichts zu committen.
git diff --cached --quiet
if not errorlevel 1 (
  echo Keine Aenderungen - es wird nur gepusht, falls noch etwas aussteht.
  goto :push
)

echo.
echo [4/5] Commit
git commit -m "Pixellogo zurueck in Noir et Or, Aurum Labyrinth als helles Theme"
if errorlevel 1 goto :fail

:push
echo.
echo [5/5] Push
git push
if errorlevel 1 goto :fail

echo.
echo ERGEBNIS: OK - GitHub Pages baut jetzt neu, das dauert ein bis zwei Minuten.
exit /b 0

:fail
echo.
echo ERGEBNIS: ABGEBROCHEN - Meldung oben lesen. Es wurde nichts gepusht.
exit /b 1

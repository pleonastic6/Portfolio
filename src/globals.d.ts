/**
 * Die Startsequenz in index.html laeuft ausserhalb der Anwendung und legt ihr
 * Versprechen am Fenster ab. Hier steht, wie es aussieht.
 */
declare global {
  interface Window {
    __addd?: { fertig: Promise<void> }
  }
}

export {}

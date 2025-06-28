// src/storage.js

const LOCAL_STORAGE_KEY = 'japanReiseziele';

/**
 * Speichert ein Array von Reisezielen im localStorage.
 * @param {Array<string>} reisezieleArray Das Array der Reiseziele.
 */
export function saveReiseziele(reisezieleArray) {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reisezieleArray));
        console.log("Reiseziele im localStorage gespeichert.", reisezieleArray);
    } catch (e) {
        console.error('Fehler beim Speichern der Reiseziele im localStorage:', e);
    }
}

/**
 * Lädt ein Array von Reisezielen aus dem localStorage.
 * @returns {Array<string>} Das geladene Array der Reiseziele oder ein leeres Array.
 */
export function loadReiseziele() {
    try {
        const savedReisezieleJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedReisezieleJSON) {
            console.log("Reiseziele aus localStorage geladen.");
            return JSON.parse(savedReisezieleJSON);
        }
    } catch (e) {
        console.error('Fehler beim Laden/Parsen der Reiseziele aus localStorage:', e);
    }
    return []; // Gib immer ein leeres Array zurück, wenn nichts gefunden oder Fehler
}
// utils.js

/**
 * Gibt ein zufälliges Element aus einem Array zurück.
 * @param {Array} array Das Array, aus dem ein Element ausgewählt werden soll.
 * @returns {*} Ein zufälliges Element aus dem Array.
 */
export function getRandomElement(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return undefined; // Oder einen Fehler werfen, je nach Anforderung
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

/**
 * Eine weitere Helferfunktion, z.B. zum Formatieren von Zahlen.
 * @param {number} num Die zu formatierende Zahl.
 * @param {number} decimalPlaces Die Anzahl der Dezimalstellen.
 * @returns {string} Die formatierte Zahl als String.
 */
export function formatNumber(num, decimalPlaces = 2) {
    return num.toFixed(decimalPlaces);
}

// Beispiel für einen Default Export (optional, hier nicht direkt verwendet)
// export default { getRandomElement, formatNumber };
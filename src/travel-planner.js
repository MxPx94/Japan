  // script2.js

// Importieren der Helferfunktion aus utils.js
import { getRandomElement, formatNumber } from './utils.js'; // Pfad beachten!

document.addEventListener('DOMContentLoaded', () => {
    // Testen der importierten Funktion
    const myColors = ['Red', 'Green', 'Blue', 'Yellow'];
    console.log('Zufällige Farbe:', getRandomElement(myColors)); // Nutzt die importierte Funktion

    const price = 123.4567;
    console.log('Formatierter Preis:', formatNumber(price, 2)); // Nutzt die importierte Funktion
})


// src/travel-planner.js

import { addDestinationForm, destinationInput, reisezieleListe } from './dom-elements.js';
import { saveReiseziele, loadReiseziele } from './storage.js';
import { addDestinationToDOM, clearReisezieleDOM } from './ui.js';

let reisezieleArray = [];

/**
 * Initialisiert den Reiseplaner.
 * Ruft die gespeicherten Reiseziele ab und zeigt sie an.
 */
export function initTravelPlanner() {
    if (!addDestinationForm || !destinationInput || !reisezieleListe) {
        console.warn("Reiseplaner-Elemente nicht gefunden. Initialisierung übersprungen.");
        return;
    }

    reisezieleArray = loadReiseziele();
    reisezieleArray.forEach(destinationText => {
        addDestinationToDOM(destinationText, handleDeleteDestination);
    });

    addDestinationForm.addEventListener('submit', handleAddDestination);

    console.log("Reiseplaner initialisiert.");
}

/**
 * Behandelt das Hinzufügen eines neuen Reiseziels.
 * @param {Event} event Das Submit-Event des Formulars.
 */
function handleAddDestination(event) {
    event.preventDefault();
    const destinationText = destinationInput.value.trim();

    if (destinationText !== "") {
        if (!reisezieleArray.includes(destinationText)) {
            addDestinationToDOM(destinationText, handleDeleteDestination);
            reisezieleArray.push(destinationText);
            saveReiseziele(reisezieleArray);
            destinationInput.value = '';
        } else {
            alert('Dieses Reiseziel wurde bereits hinzugefügt!');
        }
    } else {
        alert('Bitte geben Sie ein Reiseziel ein!');
    }
}

/**
 * Behandelt das Löschen eines Reiseziels.
 * @param {string} destinationText Der Text des zu löschenden Reiseziels.
 */
function handleDeleteDestination(destinationText) {
    reisezieleArray = reisezieleArray.filter(item => item !== destinationText);
    saveReiseziele(reisezieleArray);
    console.log(`Reiseziel "${destinationText}" gelöscht.`);
}
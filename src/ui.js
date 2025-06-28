// src/ui.js
import { reisezieleListe } from './dom-elements.js'; // Importiere die Liste

/**
 * Fügt ein Reiseziel zum DOM hinzu und erstellt einen Lösch-Button.
 * @param {string} destinationText Der Text des Reiseziels.
 * @param {function(string): void} onDeleteCallback Callback-Funktion, die aufgerufen wird, wenn ein Element gelöscht wird.
 */
export function addDestinationToDOM(destinationText, onDeleteCallback) {
    const listItem = document.createElement('li');
    listItem.textContent = destinationText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.backgroundColor = '#d9534f';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.borderRadius = '3px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.transition = 'background-color 0.2s ease';

    deleteButton.addEventListener('mouseover', () => {
        deleteButton.style.backgroundColor = '#c9302c';
    });
    deleteButton.addEventListener('mouseout', () => {
        deleteButton.style.backgroundColor = '#d9534f';
    });

    deleteButton.addEventListener('click', () => {
        reisezieleListe.removeChild(listItem);
        onDeleteCallback(destinationText); // Benachrichtige die Hauptlogik über die Löschung
    });

    listItem.appendChild(deleteButton);
    reisezieleListe.appendChild(listItem);
}

/**
 * Löscht alle Elemente aus der Reiseliste im DOM.
 */
export function clearReisezieleDOM() {
    reisezieleListe.innerHTML = '';
}
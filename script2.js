// script2.js
// ... (bestehende Imports) ...
import { getRandomElement, formatNumber } from './utils.js';
import { initTravelPlanner } from './src/travel-planner.js'; // Für den Reiseplaner


document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialisiert.');

    // Teste importierte Helferfunktionen
    const myColors = ['Red', 'Green', 'Blue', 'Yellow'];
    console.log('Zufällige Farbe (aus utils.js):', getRandomElement(myColors));
    console.log('Formatierter Preis (aus utils.js):', formatNumber(123.9876, 3));

    // Initialisiere den Reiseplaner
    if (document.getElementById('addDestinationForm')) {
        initTravelPlanner();
    }




    // --- HIER IST DIE ANPASSUNG FÜR DIE JAPANISCHEN SPRICHWÖRTER ---
    const japaneseProverbDisplay = document.getElementById('japaneseProverb');
    const germanProverbDisplay = document.getElementById('germanProverb');
    const nextProverbButton = document.getElementById('nextProverbButton');
    const proverbErrorDisplay = document.getElementById('proverbError');
    const proverbCard = document.querySelector('.proverb-card');

    // Prüfe, ob die Elemente für die Sprichwörter auf der Seite existieren
    if (japaneseProverbDisplay && germanProverbDisplay && nextProverbButton) {
        console.log("Initialisiere Japanische Sprichwörter.");

        let allProverbs = []; // Array für alle Sprichwörter
        let currentProverbIndex = -1; // Index des aktuell angezeigten Sprichworts

        // Funktion zum Laden der Sprichwörter aus einer JSON-Datei
        async function loadProverbs() {
            proverbErrorDisplay.textContent = ''; // Fehlermeldung zurücksetzen
            proverbCard.classList.remove('fade-in'); // Animation zurücksetzen
            proverbCard.classList.add('fade-out'); // Starte mit Ausblenden

            try {
                // Simuliere einen Netzwerkladen mit Verzögerung
                // await new Promise(resolve => setTimeout(resolve, 500));

                const response = await fetch('./japanese-proverbs.json'); // Pfad zur JSON-Datei
                if (!response.ok) {
                    throw new Error(`HTTP-Fehler: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('Die geladenen Daten sind kein Array oder leer.');
                }
                allProverbs = data;
                console.log('Sprichwörter erfolgreich geladen:', allProverbs);
                displayRandomProverb(); // Zeige sofort ein erstes Sprichwort an
            } catch (error) {
                console.error('Fehler beim Laden der Sprichwörter:', error);
                proverbErrorDisplay.textContent = `Fehler beim Laden der Sprichwörter: ${error.message}`;
                japaneseProverbDisplay.textContent = 'Fehler beim Laden';
                germanProverbDisplay.textContent = 'Bitte versuchen Sie es später erneut.';
                proverbCard.classList.remove('fade-out');
                proverbCard.classList.add('fade-in');
            }
        }

        // Funktion zum Anzeigen eines zufälligen Sprichworts
        function displayRandomProverb() {
            if (allProverbs.length === 0) {
                proverbErrorDisplay.textContent = 'Keine Sprichwörter zum Anzeigen verfügbar.';
                japaneseProverbDisplay.textContent = '';
                germanProverbDisplay.textContent = '';
                return;
            }

            proverbCard.classList.remove('fade-in');
            proverbCard.classList.add('fade-out');

            setTimeout(() => {
                let newIndex;
                do {
                    // Verwende die importierte getRandomElement Funktion
                    newIndex = Math.floor(Math.random() * allProverbs.length);
                } while (newIndex === currentProverbIndex && allProverbs.length > 1); // Vermeide das gleiche Sprichwort zweimal hintereinander

                currentProverbIndex = newIndex;
                const proverb = allProverbs[currentProverbIndex];

                japaneseProverbDisplay.textContent = proverb.japanese;
                germanProverbDisplay.textContent = proverb.german;

                proverbCard.classList.remove('fade-out');
                proverbCard.classList.add('fade-in');
                proverbErrorDisplay.textContent = ''; // Fehlermeldung zurücksetzen
            }, 500); // Warte, bis die Ausblendanimation abgeschlossen ist
        }

        // Event Listener für den Button
        nextProverbButton.addEventListener('click', displayRandomProverb);

        // Lade die Sprichwörter beim Initialisieren der Seite
        loadProverbs();
    }
    // --- ENDE DER ANPASSUNG FÜR DIE JAPANISCHEN SPRICHWÖRTER ---


    // Initialisiere andere Projekte basierend auf vorhandenen Elementen
    if (document.getElementById('userNameInput')) {
        // Code für LocalStorage Demo von Tag 39
        const userNameInput = document.getElementById('userNameInput');
        try {
            const savedUserName = localStorage.getItem('userName');
            if (savedUserName) {
                userNameInput.value = savedUserName;
                console.log(`Name aus localStorage geladen: "${savedUserName}"`);
            } else {
                console.log('Kein Name im localStorage gefunden.');
            }
        } catch (e) {
            console.error('Fehler beim Zugriff auf localStorage (Lesen):', e);
        }
        userNameInput.addEventListener('input', () => {
            const currentName = userNameInput.value;
            try {
                localStorage.setItem('userName', currentName);
                console.log(`Name im localStorage gespeichert: "${currentName}"`);
            } catch (e) {
                console.error('Fehler beim Zugriff auf localStorage (Schreiben):', e);
                alert('Dein Browser blockiert möglicherweise das Speichern von Daten. Bitte prüfe die Einstellungen.');
            }
        });
    }

    if (document.getElementById('toggleHighlightButton')) {
        // Code für Highlight Box
        const toggleHighlightButton = document.getElementById('toggleHighlightButton');
        const highlightBox = document.getElementById('highlightBox');
        if (toggleHighlightButton && highlightBox) {
            toggleHighlightButton.addEventListener('click', () => {
                highlightBox.classList.toggle('highlight');
            });
        }
    }

    if (document.getElementById('restaurantReviewForm')) {
        // Code für Restaurant Review Form
        const restaurantReviewForm = document.getElementById('restaurantReviewForm');
        restaurantReviewForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('restaurantName').value;
            const rating = document.getElementById('rating').value;
            const comment = document.getElementById('comment').value;

            console.log("Restaurant Bewertung eingereicht:");
            console.log("Name:", name);
            console.log("Bewertung:", rating);
            console.log("Kommentar:", comment);

            alert(`Vielen Dank für Ihre Bewertung von ${name}!`);
            restaurantReviewForm.reset();
        });
    }
});
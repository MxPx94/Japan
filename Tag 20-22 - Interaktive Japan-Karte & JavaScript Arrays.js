// --- Tag 20-21: Micro-Projekt 2: Interaktive Japan-Karte ---

console.log("\n--- Tag 20-21: Interaktive Japan-Karte ---");

// 1. Elemente auswählen
const mapInfoDisplay = document.getElementById('mapInfoDisplay');
const hotspotTokyo = document.getElementById('hotspotTokyo');
const hotspotKyoto = document.getElementById('hotspotKyoto');
const hotspotHokkaido = document.getElementById('hotspotHokkaido');
const hotspotOkinawa = document.getElementById('hotspotOkinawa');

// Sammle alle Hotspots in einem Array für einfache Iteration
const allHotspots = document.querySelectorAll('.map-hotspot');

// 2. Event Listener für jeden Hotspot hinzufügen
if (mapInfoDisplay && hotspotTokyo && hotspotKyoto && hotspotHokkaido && hotspotOkinawa) {

    // Funktion, die den Text aktualisiert und den aktiven Button hervorhebt
    function updateMapInfo(infoText, clickedHotspot) {
        mapInfoDisplay.textContent = infoText;

        // Optional: Entferne 'active'-Klasse von allen Hotspots
        allHotspots.forEach(hotspot => {
            hotspot.classList.remove('active');
        });

        // Optional: Füge 'active'-Klasse zum geklickten Hotspot hinzu
        if (clickedHotspot) {
            clickedHotspot.classList.add('active');
        }
    }

    hotspotTokyo.addEventListener('click', function() {
        updateMapInfo("Tokio: Die pulsierende Hauptstadt Japans, bekannt für ihre Wolkenkratzer, Modeviertel und Hightech-Innovationen.", this);
        console.log("Tokio Hotspot geklickt.");
    });

    hotspotKyoto.addEventListener('click', function() {
        updateMapInfo("Kyoto: Die alte Kaiserstadt Japans, berühmt für ihre unzähligen Tempel, Gärten, Geishas und traditionellen Holzhäuser.", this);
        console.log("Kyoto Hotspot geklickt.");
    });

    hotspotHokkaido.addEventListener('click', function() {
        updateMapInfo("Hokkaido: Die nördlichste und zweitgrößte Insel Japans, bekannt für ihre atemberaubende Natur, Skipisten und frische Meeresfrüchte.", this);
        console.log("Hokkaido Hotspot geklickt.");
    });

    hotspotOkinawa.addEventListener('click', function() {
        updateMapInfo("Okinawa: Eine subtropische Inselkette im Süden Japans, die für ihre wunderschönen Strände, Korallenriffe und eine einzigartige Ryukyu-Kultur bekannt ist.", this);
        console.log("Okinawa Hotspot geklickt.");
    });

    console.log("Event Listener für alle Karten-Hotspots hinzugefügt.");

} else {
    console.log("Fehler: Nicht alle Elemente für die Interaktive Karte wurden gefunden. Stelle sicher, dass die IDs korrekt sind.");
}

// --- Tag 22: JavaScript Arrays ---

// Aufgabe 1: Array mit japanischen Städten erstellen und manipulieren
console.log("\n--- Tag 22: JavaScript Arrays ---");

// Erstelle ein Array mit Namen von 5 japanischen Städten
let japanischeStaedte = ["Tokio", "Kyoto", "Osaka", "Sapporo", "Fukuoka"];
console.log("Ursprüngliches Array: ", japanischeStaedte); // Gib das gesamte Array aus
console.log("Anzahl der Städte im Array: ", japanischeStaedte.length); // Gib die Anzahl aus

// Greife auf die erste und letzte Stadt zu
console.log("Erste Stadt: ", japanischeStaedte[0]); // Index 0 ist immer das erste Element
console.log("Letzte Stadt: ", japanischeStaedte[japanischeStaedte.length - 1]); // Länge - 1 ist der Index des letzten Elements

// Aufgabe 2: Städte hinzufügen/entfernen
console.log("\n--- Tag 22: Array-Manipulation ---");

// Füge eine weitere Stadt zum Array hinzu (am Ende)
japanischeStaedte.push("Nagoya");
console.log("Nach 'Nagoya' hinzufügen (push): ", japanischeStaedte);

// Entferne die zweite Stadt aus dem Array (Index 1)
// Methode 1: splice() - entfernt Elemente an einem bestimmten Index
// Syntax: splice(startIndex, deleteCount)
japanischeStaedte.splice(1, 1); // Entfernt 1 Element ab Index 1 (Kyoto)
console.log("Nach dem Entfernen der zweiten Stadt (splice): ", japanischeStaedte);

// Alternative zum Entfernen der zweiten Stadt (wenn man shift/unshift verwendet)
// let ersteStadtEntfernt = japanischeStaedte.shift(); // Entfernt das erste Element
// console.log("Nach 'shift' (erste Stadt entfernt): ", japanischeStaedte);
// japanischeStaedte.unshift("NeueErsteStadt"); // Fügt am Anfang hinzu
// console.log("Nach 'unshift' (neue erste Stadt hinzugefügt): ", japanischeStaedte);


// --- Tag 22: Micro-Projekt 3 Start: Japan Reiseplaner (Liste) ---

console.log("\n--- Tag 22: Japan Reiseplaner ---");

// 1. Erstelle ein leeres Array für Reiseziele
let reiseziele = [];
console.log("Leeres 'reiseziele' Array erstellt: ", reiseziele);

// 2. Elemente für das Eingabefeld und den Button auswählen
const newTravelDestinationInput = document.getElementById('newTravelDestinationInput');
const addDestinationButton = document.getElementById('addDestinationButton');
// Optional: Das ul-Element für zukünftige Anzeige
const travelDestinationsList = document.getElementById('travelDestinationsList');


// 3. Event Listener zum Button hinzufügen
if (newTravelDestinationInput && addDestinationButton && travelDestinationsList) {
    addDestinationButton.addEventListener('click', function() {
        // a) Wert aus dem Eingabefeld holen
        let destination = newTravelDestinationInput.value.trim(); // .trim() entfernt Leerzeichen am Anfang/Ende

        // b) Überprüfen, ob der Wert nicht leer ist
        if (destination !== "") {
            // c) Wert dem reiseziele Array hinzufügen
            reiseziele.push(destination);
            console.log("Reiseziel hinzugefügt. Aktuelles Array: ", reiseziele);

            // Optional für spätere Schritte: Reiseziel direkt auf der Seite anzeigen
            // const listItem = document.createElement('li');
            // listItem.textContent = destination;
            // travelDestinationsList.appendChild(listItem);

            // d) Eingabefeld leeren
            newTravelDestinationInput.value = "";
            newTravelDestinationInput.focus(); // Setzt den Fokus zurück ins Eingabefeld
        } else {
            console.log("Eingabefeld ist leer. Kein Reiseziel hinzugefügt.");
            alert("Bitte gib ein Reiseziel ein, bevor du auf 'Hinzufügen' klickst.");
        }
    });
    console.log("Event Listener für 'Reiseziel hinzufügen' Button hinzugefügt.");
} else {
    console.log("Fehler: Elemente für den Japan Reiseplaner nicht gefunden. Überprüfe die IDs.");
}
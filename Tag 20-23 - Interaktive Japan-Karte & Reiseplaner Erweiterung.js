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

// --- Tag 22: Micro-Projekt 3 Start: Japan Reiseplaner (Liste) ---
// --- Tag 23: Projekt "Japan Reiseplaner" erweitern ---

console.log("\n--- Tag 22/23: Japan Reiseplaner (Liste) ---");

// 1. Array für Reiseziele (muss hier deklariert werden, wenn es im Projekt global sein soll)
let reiseziele = [];
console.log("Initiales 'reiseziele' Array: ", reiseziele);

// 2. Elemente für das Eingabefeld, den Button und die Liste auswählen
const newTravelDestinationInput = document.getElementById('newTravelDestinationInput');
const addDestinationButton = document.getElementById('addDestinationButton');
const travelDestinationsList = document.getElementById('travelDestinationsList'); // Das <ul>-Element

// Funktion: Die Liste der Reiseziele auf der HTML-Seite anzeigen
/**
 * Aktualisiert die Anzeige der Reiseziele im HTML-Dokument.
 * Leert die bestehende Liste und fügt alle Elemente des reiseziele-Arrays neu ein.
 */
function displayTravelDestinations() {
    // Überprüfen, ob das Listenelement gefunden wurde
    if (!travelDestinationsList) {
        console.error("Fehler: Das <ul>-Element mit der ID 'travelDestinationsList' wurde nicht gefunden!");
        return; // Funktion abbrechen, wenn das Element nicht da ist
    }

    // 1. Das <ul>-Element leeren, um Duplikate zu vermeiden
    // Alternative 1: travelDestinationsList.innerHTML = '';
    // Alternative 2 (etwas performanter bei sehr großen Listen):
    while (travelDestinationsList.firstChild) {
        travelDestinationsList.removeChild(travelDestinationsList.firstChild);
    }
    console.log("Bestehende Liste geleert.");

    // 2. Über das 'reiseziele' Array iterieren und Elemente hinzufügen
    if (reiseziele.length === 0) {
        // Optional: Eine Nachricht anzeigen, wenn die Liste leer ist
        const noItemsMessage = document.createElement('li');
        noItemsMessage.textContent = "Noch keine Reiseziele hinzugefügt.";
        noItemsMessage.style.fontStyle = 'italic';
        noItemsMessage.style.color = 'rgba(255, 255, 255, 0.7)';
        travelDestinationsList.appendChild(noItemsMessage);
        console.log("Liste ist leer, Nachricht angezeigt.");
    } else {
        for (let i = 0; i < reiseziele.length; i++) {
            // Neues <li>-Element erstellen
            const listItem = document.createElement('li');
            // Textinhalt des <li>-Elements setzen
            listItem.textContent = reiseziele[i];
            // Das <li>-Element zum <ul>-Element hinzufügen
            travelDestinationsList.appendChild(listItem);
            console.log(`"${reiseziele[i]}" zu Liste hinzugefügt.`);
        }
    }
    console.log("Reiseziele auf der Webseite aktualisiert.");
}


// 3. Event Listener zum Button hinzufügen
if (newTravelDestinationInput && addDestinationButton && travelDestinationsList) {
    // Hier fügen wir den Event Listener hinzu.
    // Falls du vorher einen anderen Listener für diesen Button hattest,
    // ersetze einfach den alten addEventListener-Aufruf durch diesen.
    // Ein removeEventListener ist nur nötig, wenn du das Skript dynamisch mehrmals lädst.
    // Für unsere Übungszwecke ist die einfache Zuweisung in Ordnung.

    addDestinationButton.addEventListener('click', function() {
        let destination = newTravelDestinationInput.value.trim(); // .trim() entfernt Leerzeichen am Anfang/Ende

        if (destination !== "") {
            // Reiseziel zum Array hinzufügen
            reiseziele.push(destination);
            console.log("Reiseziel hinzugefügt. Aktuelles Array: ", reiseziele);

            // Eingabefeld leeren
            newTravelDestinationInput.value = "";
            newTravelDestinationInput.focus(); // Setzt den Fokus zurück ins Eingabefeld

            // *** WICHTIG: Funktion zum Aktualisieren der HTML-Liste aufrufen ***
            displayTravelDestinations();

        } else {
            console.log("Eingabefeld ist leer. Kein Reiseziel hinzugefügt.");
            alert("Bitte gib ein Reiseziel ein, bevor du auf 'Hinzufügen' klickst.");
        }
    });
    console.log("Event Listener für 'Reiseziel hinzufügen' Button hinzugefügt und mit 'displayTravelDestinations' verknüpft.");

    // Optional: Zeige die Liste beim initialen Laden der Seite an, falls schon Elemente da wären
    // (In unserem Fall ist das Array anfangs leer, aber es ist gute Praxis für persistentere Daten)
    displayTravelDestinations();

} else {
    console.warn("WARNUNG: Nicht alle Elemente für den Japan Reiseplaner wurden im HTML gefunden. Überprüfe die IDs: 'newTravelDestinationInput', 'addDestinationButton', 'travelDestinationsList'.");
}


// --- Tag 24: JavaScript while und do...while Schleifen. break und continue ---

// Aufgabe 1: while-Schleife mit Math.random()
console.log("\n--- Tag 24: while-Schleife (Zufallszahl > 0.8) ---");
let zufallszahl = 0;
let versucheZufall = 0;
while (zufallszahl <= 0.8) {
    zufallszahl = Math.random(); // Generiert eine Zufallszahl zwischen 0 (inklusive) und 1 (exklusive)
    versucheZufall++;
    console.log(`Versuch ${versucheZufall}: Zufallszahl = ${zufallszahl.toFixed(4)}`); // .toFixed(4) für bessere Lesbarkeit
}
console.log(`Zufallszahl größer als 0.8 (${zufallszahl.toFixed(4)}) wurde nach ${versucheZufall} Versuchen generiert.`);


// Aufgabe 2: Würfelsimulation mit while-Schleife bis zur 6
console.log("\n--- Tag 24: Würfel-Simulation (bis zur 6) ---");
let gewuerfelteZahl = 0;
let versucheWuerfel = 0;
while (gewuerfelteZahl !== 6) {
    // Math.random() * 6 erzeugt Zahlen von 0 bis 5.999...
    // Math.floor() rundet ab, also 0 bis 5
    // + 1 verschiebt den Bereich auf 1 bis 6
    gewuerfelteZahl = Math.floor(Math.random() * 6) + 1;
    versucheWuerfel++;
    console.log(`Wurf ${versucheWuerfel}: Du hast eine ${gewuerfelteZahl} gewürfelt.`);
}
console.log(`Es hat ${versucheWuerfel} Versuche gedauert, um eine 6 zu würfeln.`);


// Aufgabe 3: Array-Iteration mit continue und break
console.log("\n--- Tag 24: Array-Iteration (continue & break) ---");

// Wir nutzen das 'japanischeStaedte' Array vom Tag 22
// (Stellen Sie sicher, dass es in Ihrer Datei über diesem Codeblock deklariert ist)
console.log("Array für continue/break Beispiel: ", japanischeStaedte);

// Beispiel für continue: Überspringe eine bestimmte Stadt
console.log("\n--- Iteration mit 'continue' (Überspringe 'Fukuoka') ---");
for (let i = 0; i < japanischeStaedte.length; i++) {
    const stadt = japanischeStaedte[i];
    if (stadt === "Fukuoka") { // Wenn die Stadt "Fukuoka" ist
        console.log(`(Überspringe: ${stadt})`);
        continue; // Springe zur nächsten Iteration der Schleife
    }
    console.log(`Besuche: ${stadt}`);
}

// Beispiel für break: Schleife abbrechen, wenn eine bestimmte Stadt gefunden wird
console.log("\n--- Iteration mit 'break' (Abbruch bei 'Sapporo') ---");
for (let i = 0; i < japanischeStaedte.length; i++) {
    const stadt = japanischeStaedte[i];
    if (stadt === "Sapporo") { // Wenn die Stadt "Sapporo" ist
        console.log(`'${stadt}' gefunden! Schleife wird abgebrochen.`);
        break; // Brich die Schleife komplett ab
    }
    console.log(`Gerade besucht: ${stadt}`);
}
console.log("Schleife beendet (oder abgebrochen).");
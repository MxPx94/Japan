// Für Tag 22, 23, 24: Array für japanische Städte
let japanischeStaedte = ["Tokio", "Kyoto", "Osaka", "Sapporo", "Fukuoka"];

// Für Tag 22, 23: Array für den Reiseplaner
let reiseziele = [];

// Für Tag 17, 18, 19: Referenz zur Hauptüberschrift (muss vor der Verwendung abgerufen werden)
let mainGalleryTitle = null; 

// Für Tag 22, 23: Referenzen für den Reiseplaner (müssen vor der Verwendung abgerufen werden)
let newTravelDestinationInput = null;
let addDestinationButton = null;
let travelDestinationsList = null;

// Für Tag 20/21: Referenzen für die interaktive Karte
let mapInfoDisplay = null;
let hotspotTokyo = null;
let hotspotKyoto = null;
let hotspotHokkaido = null;
let hotspotOkinawa = null;
let allHotspots = null; // NodeList aller Hotspots


// ====================================================================
// DOMContentLoaded Event Listener (WICHTIG: Code ausführen, wenn DOM bereit ist)
// ====================================================================
// Dies stellt sicher, dass alle HTML-Elemente geladen sind, bevor JavaScript versucht, darauf zuzugreifen.
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM ist vollständig geladen und geparst.");

    // DOM-Elemente initialisieren, sobald das DOM geladen ist
    mainGalleryTitle = document.getElementById('mainGalleryTitle');
    newTravelDestinationInput = document.getElementById('newTravelDestinationInput');
    addDestinationButton = document.getElementById('addDestinationButton');
    travelDestinationsList = document.getElementById('travelDestinationsList');

    mapInfoDisplay = document.getElementById('mapInfoDisplay');
    hotspotTokyo = document.getElementById('hotspotTokyo');
    hotspotKyoto = document.getElementById('hotspotKyoto');
    hotspotHokkaido = document.getElementById('hotspotHokkaido');
    hotspotOkinawa = document.getElementById('hotspotOkinawa');
    allHotspots = document.querySelectorAll('.map-hotspot'); // NodeList


    // ====================================================================
    // HIER BEGINNEN DIE AUFGABEN DER JEWEILIGEN TAGE
    // ====================================================================

     // --- Tag 20-21: Micro-Projekt 2: Interaktive Japan-Karte ---

    console.log("\n--- Tag 20-21: Interaktive Japan-Karte ---");

    // Sicherstellen, dass alle Hotspot-Elemente gefunden wurden
    if (mapInfoDisplay && hotspotTokyo && hotspotKyoto && hotspotHokkaido && hotspotOkinawa) {
        function updateMapInfo(infoText, clickedHotspot) {
            mapInfoDisplay.textContent = infoText;
            
            // Entferne 'active'-Klasse von ALLEN Hotspots
            if (allHotspots) { // Stelle sicher, dass allHotspots nicht null ist
                allHotspots.forEach(hotspot => {
                    hotspot.classList.remove('active');
                });
            }
            
            // Füge 'active'-Klasse zum geklickten Hotspot hinzu
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
    // (japanischeStaedte und reiseziele sind oben global deklariert)

    // Aufgabe 1: Array mit japanischen Städten erstellen und manipulieren
    console.log("\n--- Tag 22: JavaScript Arrays ---");
    console.log("Ursprüngliches Array 'japanischeStaedte': ", japanischeStaedte); // Gib das gesamte Array aus
    console.log("Anzahl der Städte im Array: ", japanischeStaedte.length); // Gib die Anzahl aus
    console.log("Erste Stadt: ", japanischeStaedte[0]); // Index 0 ist immer das erste Element
    console.log("Letzte Stadt: ", japanischeStaedte[japanischeStaedte.length - 1]); // Länge - 1 ist der Index des letzten Elements

    // Aufgabe 2: Städte hinzufügen/entfernen
    console.log("\n--- Tag 22: Array-Manipulation ---");
    japanischeStaedte.push("Nagoya");
    console.log("Nach 'Nagoya' hinzufügen (push): ", japanischeStaedte);
    japanischeStaedte.splice(1, 1); // Entfernt 1 Element ab Index 1 (Kyoto)
    console.log("Nach dem Entfernen der zweiten Stadt (splice): ", japanischeStaedte);


    // --- Tag 22/23: Micro-Projekt 3: Japan Reiseplaner (Liste) ---

    console.log("\n--- Tag 22/23: Japan Reiseplaner (Liste) ---");

    // Funktion: Die Liste der Reiseziele auf der HTML-Seite anzeigen
    function displayTravelDestinations() {
        if (!travelDestinationsList) {
            console.error("Fehler: Das <ul>-Element mit der ID 'travelDestinationsList' wurde nicht gefunden!");
            return;
        }

        // 1. Das <ul>-Element leeren, um Duplikate zu vermeiden
        while (travelDestinationsList.firstChild) {
            travelDestinationsList.removeChild(travelDestinationsList.firstChild);
        }
        console.log("Bestehende Liste geleert.");

        // 2. Über das 'reiseziele' Array iterieren und Elemente hinzufügen
        if (reiseziele.length === 0) {
            const noItemsMessage = document.createElement('li');
            noItemsMessage.textContent = "Noch keine Reiseziele hinzugefügt.";
            noItemsMessage.style.fontStyle = 'italic';
            noItemsMessage.style.color = 'rgba(255, 255, 255, 0.7)';
            travelDestinationsList.appendChild(noItemsMessage);
            console.log("Liste ist leer, Nachricht angezeigt.");
        } else {
            for (let i = 0; i < reiseziele.length; i++) {
                const listItem = document.createElement('li');
                listItem.textContent = reiseziele[i];
                travelDestinationsList.appendChild(listItem);
                console.log(`"${reiseziele[i]}" zu Liste hinzugefügt.`);
            }
        }
        console.log("Reiseziele auf der Webseite aktualisiert.");
    }

    // Event Listener zum Button hinzufügen
    if (newTravelDestinationInput && addDestinationButton && travelDestinationsList) {
        const addDestinationHandler = function() {
            let destination = newTravelDestinationInput.value.trim();

            if (destination !== "") {
                reiseziele.push(destination);
                console.log("Reiseziel hinzugefügt. Aktuelles Array: ", reiseziele);

                newTravelDestinationInput.value = "";
                newTravelDestinationInput.focus();

                displayTravelDestinations(); // Wichtig: Liste aktualisieren
            } else {
                console.log("Eingabefeld ist leer. Kein Reiseziel hinzugefügt.");
                alert("Bitte gib ein Reiseziel ein, bevor du auf 'Hinzufügen' klickst.");
            }
        };
        addDestinationButton.addEventListener('click', addDestinationHandler);
        console.log("Event Listener für 'Reiseziel hinzufügen' Button hinzugefügt und mit 'displayTravelDestinations' verknüpft.");

        // Initialer Aufruf, um ggf. eine leere Liste oder Standardnachricht anzuzeigen
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
        zufallszahl = Math.random();
        versucheZufall++;
        console.log(`Versuch ${versucheZufall}: Zufallszahl = ${zufallszahl.toFixed(4)}`);
    }
    console.log(`Zufallszahl größer als 0.8 (${zufallszahl.toFixed(4)}) wurde nach ${versucheZufall} Versuchen generiert.`);


    // Aufgabe 2: Würfelsimulation mit while-Schleife bis zur 6
    console.log("\n--- Tag 24: Würfel-Simulation (bis zur 6) ---");
    let gewuerfelteZahl = 0;
    let versucheWuerfel = 0;
    while (gewuerfelteZahl !== 6) {
        gewuerfelteZahl = Math.floor(Math.random() * 6) + 1;
        versucheWuerfel++;
        console.log(`Wurf ${versucheWuerfel}: Du hast eine ${gewuerfelteZahl} gewürfelt.`);
    }
    console.log(`Es hat ${versucheWuerfel} Versuche gedauert, um eine 6 zu würfeln.`);


    // Aufgabe 3: Array-Iteration mit continue und break
    console.log("\n--- Tag 24: Array-Iteration (continue & break) ---");

    // Das 'japanischeStaedte' Array wird am ANFANG dieser Datei deklariert.
    console.log("Array für continue/break Beispiel: ", japanischeStaedte);

    // Beispiel für continue: Überspringe eine bestimmte Stadt
    console.log("\n--- Iteration mit 'continue' (Überspringe 'Fukuoka') ---");
    for (let i = 0; i < japanischeStaedte.length; i++) {
        const stadt = japanischeStaedte[i];
        if (stadt === "Fukuoka") {
            console.log(`(Überspringe: ${stadt})`);
            continue;
        }
        console.log(`Besuche: ${stadt}`);
    }

    // Beispiel für break: Schleife abbrechen, wenn eine bestimmte Stadt gefunden wird
    console.log("\n--- Iteration mit 'break' (Abbruch bei 'Sapporo') ---");
    for (let i = 0; i < japanischeStaedte.length; i++) {
        const stadt = japanischeStaedte[i];
        if (stadt === "Sapporo") {
            console.log(`'${stadt}' gefunden! Schleife wird abgebrochen.`);
            break;
        }
        console.log(`Gerade besucht: ${stadt}`);
    }
    console.log("Schleife beendet (oder abgebrochen).");

 // --- Tag 25: Array-Methoden: forEach, map, filter, find ---

    console.log("\n--- Tag 25: Array-Methoden ---");
    
    // Wichtig: Da 'japanischeStaedte' in Tag 22 manipuliert wurde,
    // arbeiten wir hier mit dem aktuellen Zustand des Arrays.
    console.log("Aktuelles 'japanischeStaedte' Array für Tag 25 Aufgaben: ", japanischeStaedte);

    // Aufgabe 1: Nutze forEach, um dein japanStaedte-Array auszugeben.
    console.log("\n--- forEach Beispiel ---");
    japanischeStaedte.forEach(function(stadt, index) {
        console.log(`forEach: Stadt ${index + 1}: ${stadt}`);
    });
    // Alternative mit Arrow-Funktion:
    // japanischeStaedte.forEach(stadt => console.log(`forEach (Arrow): ${stadt}`));


    // Aufgabe 2: Nutze map, um ein neues Array zu erstellen, das zu jeder Stadt den Zusatz " besuchen!" enthält.
    console.log("\n--- map Beispiel ---");
    const staedteZumBesuchen = japanischeStaedte.map(function(stadt) {
        return stadt + " besuchen!";
    });
    // Alternative mit Arrow-Funktion:
    // const staedteZumBesuchen = japanischeStaedte.map(stadt => stadt + " besuchen!");
    console.log("Neues Array mit Zusatz ' besuchen!': ", staedteZumBesuchen);


    // Aufgabe 3: Nutze filter, um ein Array mit Städten zu erstellen, deren Namen länger als 5 Buchstaben sind.
    console.log("\n--- filter Beispiel (Namen länger als 5 Buchstaben) ---");
    const langeStaedtenamen = japanischeStaedte.filter(function(stadt) {
        return stadt.length > 5;
    });
    // Alternative mit Arrow-Funktion:
    // const langeStaedtenamen = japanischeStaedte.filter(stadt => stadt.length > 5);
    console.log("Städte mit Namen länger als 5 Buchstaben: ", langeStaedtenamen);

    // Nutze find, um die erste Stadt zu finden, die mit "O" beginnt.
    console.log("\n--- find Beispiel (erste Stadt beginnend mit 'O') ---");
    const ersteStadtMitO = japanischeStaedte.find(function(stadt) {
        return stadt.startsWith('O');
    });
    // Alternative mit Arrow-Funktion:
    // const ersteStadtMitO = japanischeStaedte.find(stadt => stadt.startsWith('O'));
    if (ersteStadtMitO) {
        console.log("Erste Stadt, die mit 'O' beginnt: ", ersteStadtMitO);
    } else {
        console.log("Keine Stadt im Array beginnt mit 'O'.");
    }

// --- Tag 26: JavaScript Objekte ---

    console.log("\n--- Tag 26: JavaScript Objekte ---");

    // Aufgabe 1: Erstelle ein Objekt japanReise
    const japanReise = {
        ziel: "Tokio",
        dauerInTagen: 10,
        budget: 2500, // in Euro oder USD
        aktivitaeten: ["Tempel besuchen", "Street Food probieren", "Einkaufen in Shibuya", "Sumo-Kampf sehen"],
        reisetyp: "Städtetrip" // Zusätzliche Eigenschaft für später
    };
    console.log("Objekt 'japanReise' erstellt: ", japanReise);

    // Aufgabe 2: Eigenschaften des Objekts ausgeben, ändern und neue hinzufügen
    console.log("\n--- Objekt-Eigenschaften ausgeben, ändern, hinzufügen ---");
    
    // Eigenschaften ausgeben
    console.log("Ziel der Reise: " + japanReise.ziel); // Punkt-Notation
    console.log("Dauer: " + japanReise["dauerInTagen"] + " Tage"); // Klammer-Notation
    console.log("Budget: " + japanReise.budget + " EUR");
    console.log("Aktivitäten: " + japanReise.aktivitaeten.join(", "));

    // Eigenschaft ändern
    japanReise.dauerInTagen = 14;
    console.log("Dauer der Reise geändert zu: " + japanReise.dauerInTagen + " Tage.");

    // Neue Eigenschaft hinzufügen
    japanReise.transportmittel = "Flugzeug";
    console.log("Neues Transportmittel hinzugefügt: " + japanReise.transportmittel);
    console.log("Aktualisiertes 'japanReise' Objekt: ", japanReise);


    // Aufgabe 3: Füge dem Objekt eine Methode zeigeReiseInfo() hinzu
    console.log("\n--- Objekt-Methode 'zeigeReiseInfo()' ---");
    japanReise.zeigeReiseInfo = function() {
        console.log(`Meine Reise nach ${this.ziel} dauert ${this.dauerInTagen} Tage.`);
        console.log(`Das geplante Budget beträgt ${this.budget} EUR.`);
        console.log(`Geplante Aktivitäten: ${this.aktivitaeten.join(", ")}.`);
        console.log(`Der Reisetyp ist ein ${this.reisetyp}.`);
        console.log(`Die Anreise erfolgt per ${this.transportmittel}.`);
    };

    // Methode aufrufen
    japanReise.zeigeReiseInfo();
    console.log("Methode 'zeigeReiseInfo()' erfolgreich aufgerufen.");

}); // Ende von DOMContentLoaded
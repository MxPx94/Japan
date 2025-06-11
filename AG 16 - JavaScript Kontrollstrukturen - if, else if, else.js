// AG 16: JavaScript Kontrollstrukturen: if, else if, else

// Aufgabe 1: Funktion, die prüft, ob eine Zahl positiv, negativ oder Null ist
console.log("\n--- Aufgabe 1: Zahl prüfen (Positiv, Negativ, Null) ---");

/**
 * Prüft, ob eine Zahl positiv, negativ oder Null ist und gibt eine entsprechende Nachricht aus.
 * @param {number} zahl Die zu prüfende Zahl.
 */
function pruefeZahlStatus(zahl) {
    if (zahl > 0) {
        console.log(`Die Zahl ${zahl} ist positiv.`);
    } else if (zahl < 0) {
        console.log(`Die Zahl ${zahl} ist negativ.`);
    } else { // Wenn sie weder > 0 noch < 0 ist, muss sie 0 sein
        console.log(`Die Zahl ${zahl} ist Null.`);
    }
}

// Funktion mit verschiedenen Zahlen aufrufen
pruefeZahlStatus(10);   // Erwartet: Die Zahl 10 ist positiv.
pruefeZahlStatus(-5);  // Erwartet: Die Zahl -5 ist negativ.
pruefeZahlStatus(0);    // Erwartet: Die Zahl 0 ist Null.
pruefeZahlStatus(3.14); // Erwartet: Die Zahl 3.14 ist positiv.


// Aufgabe 2: Informationen über japanische Präfektur
console.log("\n--- Aufgabe 2: Japanische Präfektur Info ---");

let japanischePraefektur = "Kyoto"; // Testwert
// Ändere diesen Wert, um andere Ausgaben zu testen, z.B. "Hokkaido", "Okinawa", "Aichi"

/**
 * Gibt spezifische Informationen über eine japanische Präfektur aus.
 * @param {string} praefektur Der Name der japanischen Präfektur.
 */
function gibPraefekturInfo(praefektur) {
    // Normalisiere die Eingabe, um Groß-/Kleinschreibung zu ignorieren
    let praefekturKlein = praefektur.toLowerCase();

    if (praefekturKlein === "hokkaido") {
        console.log("Hokkaido ist die nördlichste Präfektur Japans und bekannt für Schnee, Skipisten und frische Meeresfrüchte.");
    } else if (praefekturKlein === "okinawa") {
        console.log("Okinawa ist eine Inselgruppe im Süden Japans, berühmt für ihre subtropischen Strände, Korallenriffe und einzigartige Kultur.");
    } else if (praefekturKlein === "tokio") {
        console.log("Tokio ist die Hauptstadt Japans und ein pulsierendes Zentrum für Technologie, Mode und Kultur mit unzähligen Attraktionen.");
    } else if (praefekturKlein === "kyoto") {
        console.log("Kyoto ist bekannt für seine zahlreichen Tempel, Gärten, Geishas und traditionellen Holzhäuser.");
    }
    else {
        console.log(`Die Präfektur ${praefektur} ist uns unbekannt oder wir haben keine spezifischen Informationen darüber.`);
    }
}

// Funktion mit der Variablen aufrufen
gibPraefekturInfo(japanischePraefektur); // Test mit dem aktuell gesetzten Wert (z.B. "Kyoto")
gibPraefekturInfo("Hokkaido"); // Test mit Hokkaido
gibPraefekturInfo("Okinawa"); // Test mit Okinawa
gibPraefekturInfo("Nagoya"); // Test mit unbekannter Präfektur (ergibt 'unbekannt')


// Aufgabe 3: Benutzer fragen, ob er in Japan war
console.log("\n--- Aufgabe 3: Japan-Besuch abfragen ---");

// prompt() gibt immer einen String zurück
let warInJapanAntwort = prompt("Warst du schon einmal in Japan? (Antworte mit 'ja' oder 'nein')");

// Normalisiere die Antwort, um Groß-/Kleinschreibung zu ignorieren und unnötige Leerzeichen zu entfernen
let antwortBereinigt = warInJapanAntwort ? warInJapanAntwort.trim().toLowerCase() : '';

if (antwortBereinigt === "ja") {
    alert("Das ist großartig! Ich hoffe, es hat dir gefallen.");
    console.log("Benutzer war in Japan.");
} else if (antwortBereinigt === "nein") {
    alert("Kein Problem! Japan ist ein wunderschönes Reiseziel, das einen Besuch wert ist.");
    console.log("Benutzer war noch nicht in Japan.");
} else {
    alert("Ich habe deine Antwort nicht verstanden. Bitte antworte mit 'ja' oder 'nein'.");
    console.log("Benutzer hat eine unerwartete Antwort gegeben oder abgebrochen.");
}

// Initialisierung, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', () => {

    // --- Aufgabe 1: Japanische Sprichwörter dynamisch erstellen ---
    const proverbsList = document.getElementById('japaneseProverbsList');
    const japaneseProverbs = [
        "猿も木から落ちる (Saru mo ki kara ochiru) - Auch Affen fallen von Bäumen. (Jeder macht Fehler)",
        "七転び八起き (Nana korobi ya oki) - Siebenmal fallen, achtmal aufstehen. (Gib niemals auf)",
        "蛙の子は蛙 (Kaeru no ko wa kaeru) - Ein Froschkind ist ein Frosch. (Der Apfel fällt nicht weit vom Stamm)",
        "知らぬが仏 (Shiranu ga hotoke) - Nicht zu wissen ist Buddha. (Unwissenheit ist ein Segen)",
        "花より団子 (Hana yori dango) - Knödel statt Blumen. (Praktischer Nutzen vor Ästhetik)"
    ];

    japaneseProverbs.forEach(proverbText => {
        const listItem = document.createElement('li'); // Erstellt ein neues <li>-Element
        listItem.textContent = proverbText; // Setzt den Textinhalt des <li>
        proverbsList.appendChild(listItem); // Fügt das <li> zur <ul>-Liste hinzu
});
})
    
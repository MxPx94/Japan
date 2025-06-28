// Aufgabe 2: Erste JavaScript-Zeilen und Variablen

// 1. Nachrichten in der Browser-Konsole ausgeben
console.log("Hallo Welt! Dies ist meine erste JavaScript-Ausgabe.");
console.log("Ich lerne gerade JavaScript und es macht Spaß!");

// 2. Variablen für Namen und Alter deklarieren und ausgeben
let meinName = "Max Px"; // String-Datentyp für den Namen
const meinAlter = 31; // Number-Datentyp für das Alter. 'const' weil es sich nicht ändern wird.

console.log("Mein Name ist: " + meinName);
console.log("Ich bin " + meinAlter + " Jahre alt.");

// Aufgabe 3: Variablen für japanische Stadt und Einwohnerzahl, Ausgabe als Satz

// Variablen für eine japanische Stadt und ihre Einwohnerzahl
let japanischeStadt = "Tokio"; // String-Datentyp
let einwohnerzahl = 13960000; // Number-Datentyp (Beispielwert für Tokio, Stand 2020)

// Ausgabe als Satz in der Konsole
console.log("Eine der größten Städte in Japan ist " + japanischeStadt + " mit etwa " + einwohnerzahl + " Einwohnern.");

// Du kannst auch Template Literale verwenden, um Sätze schöner zu formatieren:
console.log(`Besonders beeindruckend ist ${japanischeStadt}, die Hauptstadt Japans.`);




// NEU: AG 12: JavaScript Operatoren und Dialoge

// Aufgabe 1: Experimentieren mit arithmetischen Operatoren in der Konsole
console.log("--- Aufgabe 1: Arithmetische Operatoren ---");

let zahl1 = 10;
let zahl2 = 5;

let summe = zahl1 + zahl2;
console.log("Summe (10 + 5): " + summe); // Ausgabe: Summe (10 + 5): 15

let differenz = zahl1 - zahl2;
console.log("Differenz (10 - 5): " + differenz); // Ausgabe: Differenz (10 - 5): 5

let produkt = zahl1 * zahl2;
console.log("Produkt (10 * 5): " + produkt); // Ausgabe: Produkt (10 * 5): 50

let quotient = zahl1 / zahl2;
console.log("Quotient (10 / 5): " + quotient); // Ausgabe: Quotient (10 / 5): 2

let rest = 13 % 5; // Modulo-Operator: gibt den Rest der Division zurück
console.log("Rest von 13 geteilt durch 5 (13 % 5): " + rest); // Ausgabe: Rest von 13 geteilt durch 5 (13 % 5): 3

let potenz = 2 ** 3; // Potenz-Operator (ES6)
console.log("2 hoch 3 (2 ** 3): " + potenz); // Ausgabe: 2 hoch 3 (2 ** 3): 8


// Aufgabe 2: Lieblingsessen in Japan abfragen und ausgeben (prompt, alert)
console.log("\n--- Aufgabe 2: Prompt und Alert Dialoge ---");

// prompt() zeigt ein Eingabefeld an und gibt die Eingabe als String zurück
let lieblingsessen = prompt("Was ist dein Lieblingsessen in Japan?");

// alert() zeigt eine Nachricht an
if (lieblingsessen) { // Überprüfen, ob der Benutzer etwas eingegeben hat und nicht abgebrochen hat
    alert("Dein Lieblingsessen in Japan ist: " + lieblingsessen + ". Eine gute Wahl!");
    console.log("Der Benutzer hat als Lieblingsessen eingegeben: " + lieblingsessen);
} else {
    alert("Du hast nichts eingegeben oder abgebrochen.");
    console.log("Der Benutzer hat die Eingabe abgebrochen oder nichts eingegeben.");
}


// Aufgabe 3: Zwei Zahlen abfragen und deren Summe in der Konsole ausgeben
console.log("\n--- Aufgabe 3: Summe von zwei Zahlen ---");

// prompt() gibt immer einen String zurück, auch wenn Zahlen eingegeben werden.
// Daher müssen wir die Eingabe mit parseFloat() oder parseInt() in eine Zahl umwandeln.
let ersteZahlString = prompt("Bitte gib die erste Zahl ein:");
let zweiteZahlString = prompt("Bitte gib die zweite Zahl ein:");

// parseFloat() wandelt in eine Dezimalzahl um, parseInt() in eine Ganzzahl
let ersteZahl = parseFloat(ersteZahlString);
let zweiteZahl = parseFloat(zweiteZahlString);

// Überprüfen, ob die Eingaben gültige Zahlen waren
if (isNaN(ersteZahl) || isNaN(zweiteZahl)) {
    console.log("Fehler: Eine oder beide Eingaben waren keine gültigen Zahlen.");
    alert("Bitte gib nur gültige Zahlen ein, um die Summe zu berechnen.");
} else {
    let summeDerZahlen = ersteZahl + zweiteZahl;
    console.log("Die Summe von " + ersteZahl + " und " + zweiteZahl + " ist: " + summeDerZahlen);
    alert("Die Summe deiner Zahlen ist: " + summeDerZahlen); // Optional: Summe auch als Alert anzeigen
}

// Beispiel für confirm() (nicht direkt in den Aufgaben, aber nützlich zum Experimentieren)
// let bestaetigung = confirm("Möchtest du eine Bestätigung? (OK oder Abbrechen)");
// if (bestaetigung) {
//     console.log("Der Benutzer hat bestätigt.");
// } else {
//     console.log("Der Benutzer hat abgebrochen.");
// }



// Aufgabe 2: Funktion grussJapan(name)
console.log("\n--- Aufgabe 2: Japanischer Gruß ---");

/**
 * Gibt einen personalisierten japanischen Gruß in der Konsole aus.
 * @param {string} name Der Name der Person, die begrüßt werden soll.
 */
function grussJapan(name) {
    console.log("Konnichiwa, " + name + "-san!");
}

// Funktion mit verschiedenen Namen aufrufen
grussJapan("Gast");

// Aufgabe 3: Funktion für die Bucket List Seite
console.log("\n--- Aufgabe 3: Bucket List Konsolen-Nachricht ---");

/**
 * Gibt eine spezifische Nachricht für die Japan Bucket List in der Konsole aus.
 */
function zeigeBucketListNachricht() {
    console.log("Willkommen zur Japan Bucket List! Erkunde unvergessliche Erlebnisse.");
    console.log("Diese Liste enthält meine Traumziele und Aktivitäten in Japan.");
}

// Die Funktion aufrufen, um die Nachricht in der Konsole auszugeben
zeigeBucketListNachricht();

// Optional: Du könntest diese Funktion auch in der HTML-Datei nach dem Laden der Seite aufrufen.
// Zum Beispiel in deiner gallery.html:
// <script src="script.js"></script>
// <script>
//     zeigeBucketListNachricht(); // Ruft die Funktion nach dem Laden des Skripts auf
// </script>
// Beachte, dass dies nur eine Demonstration des Aufrufs ist. Der aktuelle Code in script.js ist ausreichend für die Aufgabe.
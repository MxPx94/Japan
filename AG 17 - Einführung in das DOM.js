// AG 17: Einführung in das DOM

// Aufgabe 1: Verstehen des DOM (Kein Code erforderlich, nur Verständnis)
console.log("\n--- Aufgabe 1: Verständnis des DOM ---");
console.log("Das DOM (Document Object Model) ist eine Programmierschnittstelle (API) für HTML- und XML-Dokumente.");
console.log("Es stellt die Struktur eines Dokuments als Baum von Objekten dar, auf die JavaScript zugreifen und sie manipulieren kann.");
console.log("Jedes Element, Attribut und Text in einem HTML-Dokument kann über das DOM als Objekt angesprochen werden.");


// Aufgabe 2: Hauptüberschrift mittels getElementById auswählen und Inhalt ausgeben
console.log("\n--- Aufgabe 2: Hauptüberschrift via ID ---");

// Wähle das h1-Element mit der ID "mainGalleryTitle" aus
// document.getElementById() gibt das erste Element mit der angegebenen ID zurück
const mainHeading = document.getElementById('mainGalleryTitle');

// Überprüfen, ob das Element gefunden wurde, bevor wir darauf zugreifen
if (mainHeading) {
    // textContent gibt den gesamten Textinhalt des Elements zurück (ohne HTML)
    console.log("Inhalt der Hauptüberschrift: " + mainHeading.textContent);
} else {
    console.log("Fehler: Hauptüberschrift mit der ID 'mainGalleryTitle' wurde nicht gefunden.");
}


// Aufgabe 3: Alle Grid-Items (Bucket List Einträge) auswählen und Anzahl ausgeben
console.log("\n--- Aufgabe 3: Anzahl der Grid-Items ---");

// Wähle alle Elemente mit der Klasse "grid-item" aus
// document.getElementsByClassName() gibt eine HTMLCollection von Elementen zurück
const gridItemsByClass = document.getElementsByClassName('grid-item');
console.log("Anzahl der Grid-Items (via getElementsByClassName): " + gridItemsByClass.length);

// Alternative mit querySelectorAll (empfohlen für modernere Entwicklung)
// querySelectorAll() gibt eine NodeList von Elementen zurück
const gridItemsByQuery = document.querySelectorAll('.grid-item');
console.log("Anzahl der Grid-Items (via querySelectorAll): " + gridItemsByQuery.length);

// Du könntest auch nach Tag-Namen suchen, wenn alle Bucket List Einträge z.B. p-Tags wären
// const allParagraphs = document.getElementsByTagName('p');
// console.log("Anzahl aller p-Tags auf der Seite: " + allParagraphs.length);

// Beispiel: Wenn du den Inhalt des ersten Grid-Items ausgeben möchtest:
if (gridItemsByQuery.length > 0) {
    console.log("Inhalt des ersten Grid-Items: " + gridItemsByQuery[0].textContent.trim().split('\n')[0]);
    // .trim() entfernt Leerzeichen am Anfang/Ende, .split('\n')[0] nimmt die erste Zeile bei Zeilenumbrüchen
}
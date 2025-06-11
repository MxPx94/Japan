// --- Tag 19: Events in JavaScript ---

// Aufgabe 1: Button-Klick-Event
console.log("\n--- Tag 19: Button-Klick-Event ---");

// 1. Wähle den Button per ID aus
const myButton = document.getElementById('myInteractiveButton');

// 2. Überprüfe, ob der Button gefunden wurde
if (myButton) {
    // 3. Füge einen Event Listener hinzu
    // addEventListener nimmt zwei Argumente:
    // a) Den Event-Typ als String (z.B. 'click', 'mouseover', 'submit')
    // b) Eine Funktion (den Event-Handler), die ausgeführt wird, wenn das Event auftritt
    myButton.addEventListener('click', function() {
        console.log("Der Button wurde geklickt! Arigato!");
        // Optional: Du könntest hier auch einen Alert anzeigen
        // alert("Danke fürs Klicken!");
    });
    console.log("Event Listener für 'myInteractiveButton' hinzugefügt.");
} else {
    console.log("Fehler: Button mit der ID 'myInteractiveButton' nicht gefunden.");
}


// Aufgabe 2: Mouseover/Mouseout auf der Hauptüberschrift
console.log("\n--- Tag 19: Überschrift Hover-Effekt ---");

// Die Hauptüberschrift (mainGalleryTitle) wurde bereits in Tag 17/18 ausgewählt.
// const mainGalleryTitle = document.getElementById('mainGalleryTitle'); // Referenz ist schon da

if (mainGalleryTitle) {
    // Speichere die Originalfarbe, bevor wir sie ändern
    // Da die Farbe über CSS gesetzt wird, ist es besser, die Klasse zu togglen oder direkt zu überschreiben.
    // Für dieses Beispiel gehen wir davon aus, dass die Farbe per CSS gesetzt ist und wir sie für JS festlegen.
    // Oder wir lesen die aktuelle Farbe aus (komplexer bei CSS).
    // Für diesen einfachen Fall: Direkt die Farbe setzen und zurücksetzen.
    const originalColor = mainGalleryTitle.style.color || 'white'; // Standardmäßig weiß, falls nicht inline gesetzt

    // Event Listener für 'mouseover' (Maus fährt über das Element)
    mainGalleryTitle.addEventListener('mouseover', function() {
        mainGalleryTitle.style.color = '#c72474'; // Lila-Farbe beim Überfahren
        mainGalleryTitle.style.textShadow = '3px 3px 6px rgba(255, 255, 255, 0.8)'; // Optional: Schatteneffekt
        console.log("Maus über Hauptüberschrift: Farbe geändert.");
    });

    // Event Listener für 'mouseout' (Maus fährt vom Element weg)
    mainGalleryTitle.addEventListener('mouseout', function() {
        mainGalleryTitle.style.color = originalColor; // Setze Originalfarbe zurück (weiß aus CSS)
        mainGalleryTitle.style.textShadow = '2px 2px 4px #000000'; // Originalschatten aus CSS
        console.log("Maus von Hauptüberschrift entfernt: Farbe zurückgesetzt.");
    });
    console.log("Event Listener für 'mouseover' und 'mouseout' auf 'mainGalleryTitle' hinzugefügt.");

} else {
    console.log("Fehler: Hauptüberschrift mit der ID 'mainGalleryTitle' nicht gefunden für Mouse-Events.");
}

const infoButton = document.getElementById("infoButton");
const infoTextElement = document.getElementById("infoText");

infoButton.addEventListener("click", function() {
    infoTextElement.textContent = "Tokio ist die Hauptstadt Japans und hat über 13 Millionen Einwohner.";
    console.log("Button geklickt!");
});
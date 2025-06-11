// --- Tag 18: DOM-Manipulation ---

// Aufgabe 1: Text der Hauptüberschrift ändern
console.log("\n--- Tag 18: Überschrift ändern ---");
// const mainGalleryTitle = document.getElementById('mainGalleryTitle'); // Bereits deklariert in Tag 17
if (mainGalleryTitle) {
    mainGalleryTitle.textContent = "Meine Japan-Reise Highlights!";
    console.log("Hauptüberschrift geändert zu: " + mainGalleryTitle.textContent);
} else {
    console.log("Fehler: Hauptüberschrift mit der ID 'mainGalleryTitle' nicht gefunden (AG 18).");
}


// Aufgabe 2: Bild-src-Attribut ändern
console.log("\n--- Tag 18: Bild ändern ---");
// Wähle das erste Bild innerhalb eines beliebigen .grid-item aus
const firstGridImage = document.querySelector('.grid-item img');

// URL für ein neues Bild (Beispiel: Tokyo Tower)
const newImageUrl = "https://bit.ly/43Kdzup";

if (firstGridImage) {
    firstGridImage.setAttribute('src', newImageUrl);
    firstGridImage.setAttribute('alt', 'Tokyo Tower bei Nacht'); // Alt-Text anpassen
    console.log("Bild-Src erfolgreich geändert auf: " + firstGridImage.src);
} else {
    console.log("Fehler: Kein Bild innerhalb eines '.grid-item' gefunden.");
}


// Aufgabe 3: Data-Attribut hinzufügen und auslesen
console.log("\n--- Tag 18: Data-Attribut ---");
// Wähle das <main>-Element mit der ID "mainContent" aus
const mainContentElement = document.getElementById('mainContent');

if (mainContentElement) {
    mainContentElement.setAttribute('data-content-type', 'gallery-data');
    console.log("Data-Attribut 'data-content-type' zu main-Element hinzugefügt.");

    const contentType = mainContentElement.getAttribute('data-content-type');
    console.log("Ausgelesenes Data-Attribut 'data-content-type': " + contentType);

    // Moderne Methode mit dataset
    mainContentElement.dataset.region = "Kanto"; // Setzt data-region="Kanto"
    console.log("Data-Attribut 'data-region' mit dataset gesetzt.");
    console.log("Ausgelesenes Data-Attribut 'data-region' (via dataset): " + mainContentElement.dataset.region);

} else {
    console.log("Fehler: Main-Element mit der ID 'mainContent' nicht gefunden.");
}
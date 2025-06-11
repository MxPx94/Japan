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
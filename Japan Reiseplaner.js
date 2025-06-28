document.addEventListener('DOMContentLoaded', () => {
    // --- Vorherige Aufgaben (unverändert, nur gekürzt dargestellt) ---
    const proverbsList = document.getElementById('japaneseProverbsList');
    if (proverbsList) {
        const japaneseProverbs = [
            "猿も木から落ちる (Saru mo ki kara ochiru) - Auch Affen fallen von Bäumen. (Jeder macht Fehler)",
            "七転び八起き (Nana korobi ya oki) - Siebenmal fallen, achtmal aufstehen. (Gib niemals auf)",
            "蛙の子は蛙 (Kaeru no ko wa kaeru) - Ein Froschkind ist ein Frosch. (Der Apfel fällt nicht weit vom Stamm)",
            "知らぬが仏 (Shiranu ga hotoke) - Nicht zu wissen ist Buddha. (Unwissenheit ist ein Segen)",
            "花より団子 (Hana yori dango) - Knödel statt Blumen. (Praktischer Nutzen vor Ästhetik)"
        ];
        japaneseProverbs.forEach(proverbText => {
            const listItem = document.createElement('li');
            listItem.textContent = proverbText;
            proverbsList.appendChild(listItem);
        });
    }

    const toggleHighlightButton = document.getElementById('toggleHighlightButton');
    const highlightBox = document.getElementById('highlightBox');
    if (toggleHighlightButton && highlightBox) {
        toggleHighlightButton.addEventListener('click', () => {
            highlightBox.classList.toggle('highlight');
        });
    }

    const restaurantReviewForm = document.getElementById('restaurantReviewForm');
    if (restaurantReviewForm) {
        restaurantReviewForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const restaurantName = document.getElementById('restaurantName').value;
            const rating = document.getElementById('rating').value;
            const comment = document.getElementById('comment').value;
            console.log('--- Restaurant Bewertung ---');
            console.log('Restaurant Name:', restaurantName);
            console.log('Bewertung:', rating + ' von 5 Sternen');
            console.log('Kommentar:', comment);
            restaurantReviewForm.reset();
        });
    }

    const addDestinationForm = document.getElementById('addDestinationForm');
    const destinationInput = document.getElementById('destinationInput');
    const reisezieleListe = document.getElementById('reisezieleListe');
    if (addDestinationForm && destinationInput && reisezieleListe) {
        addDestinationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const destinationText = destinationInput.value.trim();
            if (destinationText !== "") {
                const listItem = document.createElement('li');
                listItem.textContent = destinationText;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Löschen';
                // ... (Styling für Delete Button - unverändert) ...
                deleteButton.style.marginLeft = '10px';
                deleteButton.style.padding = '5px 10px';
                deleteButton.style.backgroundColor = '#d9534f';
                deleteButton.style.color = 'white';
                deleteButton.style.border = 'none';
                deleteButton.style.borderRadius = '3px';
                deleteButton.style.cursor = 'pointer';
                deleteButton.style.transition = 'background-color 0.2s ease';
                deleteButton.addEventListener('mouseover', () => {
                    deleteButton.style.backgroundColor = '#c9302c';
                });
                deleteButton.addEventListener('mouseout', () => {
                    deleteButton.style.backgroundColor = '#d9534f';
                });
                deleteButton.addEventListener('click', () => {
                    reisezieleListe.removeChild(listItem);
                });
                listItem.appendChild(deleteButton);
                reisezieleListe.appendChild(listItem);
                destinationInput.value = '';
            } else {
                alert('Bitte geben Sie ein Reiseziel ein!');
            }
        });
    }

    // --- JSON-Aufgaben von Tag 31 (unverändert) ---
    // Der Code hier wurde gekürzt, da er nur für Konsolen-Ausgaben war
    // und nicht direkt mit der Anzeige interagiert.
    // console.log('\n=== Tag 31: JSON-Einführung (Wiederholung) ===');
    // ...

    // --- Fetch API Aufgaben von Tag 32 (unverändert) ---
    // Der Code hier wurde gekürzt, da er nur für Konsolen-Ausgaben war
    // und nicht direkt mit der Anzeige interagiert.
    // console.log('\n=== Tag 32: Einführung in die Fetch API (Wiederholung) ===');
    // ...


    // =======================================================
    // === NEU: Micro-Projekt 4 "Japanische Sprichwörter Anzeige" ===
    // =======================================================

    const japaneseProverbDisplay = document.getElementById('japaneseProverb');
    const germanProverbDisplay = document.getElementById('germanProverb');
    const nextProverbButton = document.getElementById('nextProverbButton');
    const proverbErrorDisplay = document.getElementById('proverbError');
    const proverbCard = document.querySelector('.proverb-card'); // Element für Animation

    let allProverbs = []; // Hier werden alle geladenen Sprichwörter gespeichert
    let currentProverbIndex = -1; // Index des aktuell angezeigten Sprichworts

    // Funktion zum Laden der Sprichwörter aus der JSON-Datei
    async function loadProverbs() {
        try {
            const response = await fetch('japanese-proverbs.json');
            if (!response.ok) {
                throw new Error(`Netzwerkantwort war nicht ok: ${response.status} ${response.statusText}`);
            }
            allProverbs = await response.json();
            console.log("Sprichwörter erfolgreich geladen:", allProverbs);

            if (allProverbs.length > 0) {
                displayRandomProverb(); // Zeige sofort ein zufälliges Sprichwort an
            } else {
                proverbErrorDisplay.textContent = 'Keine Sprichwörter in der Datei gefunden.';
            }

        } catch (error) {
            console.error("Fehler beim Laden der sprichwoerter.json-Datei:", error);
            proverbErrorDisplay.textContent = 'Fehler beim Laden der Sprichwörter. Bitte versuchen Sie es später erneut.';
            japaneseProverbDisplay.textContent = '';
            germanProverbDisplay.textContent = '';
        }
    }

    // Funktion zum Anzeigen eines zufälligen Sprichworts
    function displayRandomProverb() {
        if (allProverbs.length === 0) {
            japaneseProverbDisplay.textContent = 'Keine Sprichwörter verfügbar.';
            germanProverbDisplay.textContent = '';
            return;
        }

        // Finde einen zufälligen Index, der nicht der aktuelle ist (wenn möglich)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * allProverbs.length);
        } while (newIndex === currentProverbIndex && allProverbs.length > 1); // Vermeide dasselbe Sprichwort, es sei denn, es ist das einzige

        currentProverbIndex = newIndex;
        const randomProverb = allProverbs[currentProverbIndex];

        // Führe eine kleine "Fade"-Animation durch
        if (proverbCard) {
            proverbCard.classList.remove('fade-in');
            proverbCard.classList.add('fade-out');

            // Setze den Text erst nach einer kurzen Verzögerung, um den Fade-Effekt zu sehen
            setTimeout(() => {
                japaneseProverbDisplay.textContent = randomProverb.japanisch;
                germanProverbDisplay.textContent = randomProverb.deutsch;

                proverbCard.classList.remove('fade-out');
                proverbCard.classList.add('fade-in');
            }, 300); // Entspricht der Transitionsdauer im CSS
        } else {
             japaneseProverbDisplay.textContent = randomProverb.japanisch;
             germanProverbDisplay.textContent = randomProverb.deutsch;
        }
    }

    // Event Listener für den Button "Nächstes Sprichwort"
    if (nextProverbButton) {
        nextProverbButton.addEventListener('click', displayRandomProverb);
    }

    // Beim Laden der Seite die Sprichwörter laden
    loadProverbs();


    // =======================================================
    // === NEUE AUFGABEN FÜR TAG 36: Vertiefung Promises ===
    // =======================================================

    console.log('\n=== Tag 36: Vertiefung Promises & Fehlerbehandlung ===');

    // Aufgabe 1: Schreibe eine Funktion, die ein Promise zurückgibt,
    // das nach 2 Sekunden mit einer Erfolgsnachricht "resolved" wird.
    // Nutze .then() um die Nachricht auszugeben.
    function createResolvedPromise(message) {
        return new Promise((resolve) => {
            console.log("Aufgabe 1: Promise startet...");
            setTimeout(() => {
                resolve(message); // Das Promise wird erfolgreich erfüllt
            }, 2000); // Nach 2 Sekunden
        });
    }

    // Aufruf der Funktion und Verarbeitung mit .then()
    createResolvedPromise("Aufgabe 1 erfolgreich: Die Daten wurden nach 2 Sekunden geladen!")
        .then(data => {
            console.log(data); // "Aufgabe 1 erfolgreich: Die Daten wurden nach 2 Sekunden geladen!"
        });


    // Aufgabe 2: Modifiziere die Funktion, sodass sie zufällig entweder "resolved" oder "rejected" wird.
    // Fange den Fehler mit .catch() ab.
    function createRandomPromise(successMessage, errorMessage) {
        return new Promise((resolve, reject) => {
            console.log("\nAufgabe 2: Zufälliges Promise startet...");
            const isSuccess = Math.random() > 0.5; // 50% Chance für Erfolg

            setTimeout(() => {
                if (isSuccess) {
                    resolve(successMessage); // Erfolgreich
                } else {
                    reject(errorMessage); // Fehler
                }
            }, 2000); // Nach 2 Sekunden
        });
    }

    // Aufruf der Funktion und Verarbeitung mit .then() und .catch()
    createRandomPromise("Aufgabe 2 erfolgreich: Zufälliges Promise war ein Erfolg!", "Aufgabe 2 Fehler: Zufälliges Promise ist fehlgeschlagen!")
        .then(data => {
            console.log(data); // Wird bei Erfolg ausgeführt
        })
        .catch(error => {
            console.error(error); // Wird bei Fehler ausgeführt
        });

    // Ein zweiter Aufruf, um die Zufälligkeit zu zeigen
    createRandomPromise("Aufgabe 2.1 erfolgreich: Dieser zweite Versuch war ein Erfolg!", "Aufgabe 2.1 Fehler: Dieser zweite Versuch ist fehlgeschlagen!")
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });

    // Aufgabe 3: Überarbeite deinen fetch()-Code im Sprichwörter-Projekt,
    // um sicherzustellen, dass Fehler korrekt behandelt und dem Benutzer
    // (z.B. in der Konsole oder auf der Seite) angezeigt werden.
    //
    // DIESE ÜBERARBEITUNG WURDE BEREITS IN DER `loadProverbs`-FUNKTION OBEN VORGENOMMEN.
    //
    // Zusammenfassung der Überarbeitung in `loadProverbs`:
    // 1. Der `fetch`-Aufruf ist in einem `try...catch`-Block gekapselt.
    // 2. `if (!response.ok)`: Prüft den HTTP-Statuscode (z.B. 404, 500). Wenn er nicht im 2xx-Bereich liegt,
    //    wird ein `Error` geworfen, der direkt vom `catch`-Block abgefangen wird.
    //    Dies ist wichtig, da `fetch` bei HTTP-Fehlern kein `reject` auslöst, sondern `response.ok` auf `false` setzt.
    // 3. Im `catch`-Block wird der Fehler in der Konsole ausgegeben (`console.error`).
    // 4. Zusätzlich wird eine benutzerfreundliche Fehlermeldung auf der HTML-Seite im `proverbErrorDisplay`-Element angezeigt.
    // 5. Optional wurde der 'Nächstes Sprichwort'-Button deaktiviert, wenn das Laden fehlschlägt,
    //    um zu verhindern, dass der Benutzer versucht, nicht vorhandene Sprichwörter anzuzeigen.


    // =======================================================
    // === NEUE AUFGABEN FÜR TAG 37: async/await ===
    // =======================================================

    console.log('\n=== Tag 37: async/await ===');

    // Aufgabe 1: Schreibe die Promise-basierte Funktion von gestern (Aufgabe 1)
    // mit async/await um.
    async function createResolvedPromiseAsync(message) {
        console.log("Aufgabe 1 (async/await): Promise startet...");
        // await kann nur in einer async-Funktion verwendet werden.
        // new Promise wird weiterhin benötigt, wenn keine API oder eingebaute async-Funktion vorliegt.
        // Aber hier nutzen wir await auf dem Promise aus der createResolvedPromise
        await new Promise(resolve => setTimeout(resolve, 2000));
        return message; // Der Wert, der resolved wird
    }

    // Aufruf der async-Funktion. Sie gibt implizit ein Promise zurück.
    // Daher können wir .then() und .catch() verwenden.
    createResolvedPromiseAsync("Aufgabe 1 (async/await) erfolgreich: Die Daten wurden nach 2 Sekunden geladen!")
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Fehler in Aufgabe 1 (async/await):", error);
        });


    // Aufgabe 2: Konvertiere den fetch()-Aufruf in deinem Sprichwörter-Projekt zu async/await.
    // DIESE ANPASSUNG WURDE BEREITS IN DER `loadProverbs`-FUNKTION OBEN VORGENOMMEN.
    // `async function loadProverbs()` und die `await`-Schlüsselwörter wurden hinzugefügt.


    // Aufgabe 3: Erstelle eine async Funktion, die nacheinander zwei simulated API Calls
    // (mit Promises, die nach einer Verzögerung resolven) ausführt und die Ergebnisse kombiniert.

    // Hilfsfunktion: Simuliert einen API-Aufruf mit einer Verzögerung
    function simulatedApiCall(data, delay, shouldFail = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error(`Simulierter API-Fehler für: ${data.name || data}`));
                } else {
                    resolve(data);
                }
            }, delay);
        });
    }

    async function fetchDataSequentially() {
        console.log('\nAufgabe 3: Sequenzielle API-Aufrufe starten...');
        try {
            // Erster API-Aufruf
            console.log('Aufgabe 3: Rufe ersten Datensatz ab (Benutzerdaten)...');
            const userData = await simulatedApiCall({ id: 1, name: 'Taro Yamada' }, 1500);
            console.log('Aufgabe 3: Erster Datensatz erhalten:', userData);

            // Zweiter API-Aufruf, der vom ersten abhängen könnte oder einfach danach stattfindet
            console.log('Aufgabe 3: Rufe zweiten Datensatz ab (Post-Daten von Benutzer)...');
            const postData = await simulatedApiCall({ userId: userData.id, title: 'Reisebericht Japan' }, 1000);
            console.log('Aufgabe 3: Zweiter Datensatz erhalten:', postData);

            // Ergebnisse kombinieren
            const combinedData = { ...userData, ...postData };
            console.log('Aufgabe 3: Kombinierte Daten:', combinedData);
            return combinedData;

        } catch (error) {
            console.error('Aufgabe 3 Fehler: Fehler beim sequenziellen API-Aufruf:', error.message);
            throw error; // Fehler weiterwerfen, falls die aufrufende Funktion ihn auch fangen soll
        }
    }

    // Aufruf der sequenziellen Funktion
    fetchDataSequentially()
        .then(result => {
            console.log('Aufgabe 3: Sequenzielle Aufrufe abgeschlossen. Ergebnis:', result);
        })
        .catch(error => {
            // Dieser Catch-Block fängt Fehler ab, die von fetchDataSequentially weitergeworfen wurden
            console.error('Aufgabe 3: Hauptfehlerbehandlung für sequenzielle Aufrufe:', error.message);
        });

    // Beispiel für einen Fehlerfall im sequenziellen Aufruf
    async function fetchDataSequentiallyWithError() {
         console.log('\nAufgabe 3: Sequenzielle API-Aufrufe mit Fehler starten...');
         try {
             console.log('Aufgabe 3: Rufe ersten Datensatz ab (Benutzerdaten)...');
             const userData = await simulatedApiCall({ id: 2, name: 'Hanako Suzuki' }, 1500);
             console.log('Aufgabe 3: Erster Datensatz erhalten:', userData);

             console.log('Aufgabe 3: Rufe zweiten Datensatz ab (Post-Daten von Benutzer - Fehler provozieren)...');
             // Hier wird ein Fehler provoziert
             const postData = await simulatedApiCall('Fehler beim Abrufen von Posts', 1000, true);
             console.log('Aufgabe 3: Zweiter Datensatz erhalten:', postData); // Diese Zeile wird nicht erreicht

             const combinedData = { ...userData, ...postData };
             console.log('Aufgabe 3: Kombinierte Daten:', combinedData);

         } catch (error) {
             console.error('Aufgabe 3 Fehler (mit Fehlertest): Fehler beim sequenziellen API-Aufruf:', error.message);
             // In einer realen Anwendung könntest du hier UI-Elemente aktualisieren oder einen Fallback bereitstellen.
         }
     }

     fetchDataSequentiallyWithError(); // Ruft die Funktion mit Fehlerprovokation auf

// =======================================================
    // === NEUE AUFGABEN FÜR TAG 38: Fehlerbehandlung try...catch...finally & throw ===
    // =======================================================

    console.log('\n=== Tag 38: Fehlerbehandlung try...catch...finally & throw ===');

    // Aufgabe 1: Schreibe eine Funktion, die eine Zahl als Input nimmt.
    // Wenn der Input keine Zahl ist, wirf einen Fehler. Fange den Fehler außerhalb der Funktion ab.
    function processNumberInput(input) {
        if (typeof input !== 'number' || isNaN(input)) {
            // Werfe einen neuen Error-Objekt mit einer aussagekräftigen Nachricht
            throw new Error(`InvalidInputError: Erwartet wurde eine Zahl, aber erhalten: ${input} (${typeof input})`);
        }
        return input * 2;
    }

    console.log('\n--- Aufgabe 1: Eigene Fehler werfen und fangen ---');

    // Erfolgreicher Aufruf
    try {
        const result = processNumberInput(10);
        console.log("Aufgabe 1 (Erfolg): Das Ergebnis ist:", result);
    } catch (error) {
        // Dieser Block wird nicht ausgeführt, da kein Fehler geworfen wird
        console.error("Aufgabe 1 (Fehler): Ein unerwarteter Fehler trat auf:", error.message);
    }

    // Fehlerhafter Aufruf (Input ist keine Zahl)
    try {
        const result = processNumberInput("fünf"); // String statt Zahl
        console.log("Aufgabe 1 (Erfolg): Das Ergebnis ist:", result); // Diese Zeile wird nicht erreicht
    } catch (error) {
        // Dieser Block wird ausgeführt, weil processNumberInput einen Fehler geworfen hat
        console.error("Aufgabe 1 (Fehler): Fangen des Fehlers für 'fünf':", error.message);
        // Sie können hier auch spezifischere Aktionen basierend auf dem Fehlertyp durchführen
        if (error.message.startsWith("InvalidInputError")) {
            console.log("Aufgabe 1: Es handelt sich um einen ungültigen Eingabefehler.");
        }
    }

    // Weiterer fehlerhafter Aufruf (Input ist null)
    try {
        const result = processNumberInput(null); // null ist keine Zahl
        console.log("Aufgabe 1 (Erfolg): Das Ergebnis ist:", result);
    } catch (error) {
        console.error("Aufgabe 1 (Fehler): Fangen des Fehlers für 'null':", error.message);
    }


    // Aufgabe 2: Integriere try...catch in deine bestehenden Projekte
    // an Stellen, wo Fehler auftreten könnten.
    // (Bereits in `loadProverbs` für Fetch/JSON-Parsing und in `fetchDataSequentially`
    // für simulierte API-Aufrufe umgesetzt. Hier weitere Beispiele.)

    console.log('\n--- Aufgabe 2: try...catch in bestehenden Projekten ---');

    // Beispiel 1: DOM-Manipulation, wenn ein Element nicht gefunden wird
    // Obwohl document.getElementById null zurückgibt, wenn das Element nicht existiert,
    // kann der Versuch, auf Eigenschaften von null zuzugreifen, einen Fehler werfen.
    // Ein 'if (element)' Check ist meist einfacher, aber try...catch ist auch möglich.
    try {
        const nonExistentElement = document.getElementById('nonExistentId');
        if (nonExistentElement) {
            nonExistentElement.textContent = 'Dieser Text wird gesetzt.';
            console.log("Aufgabe 2: Text auf nicht-existentem Element gesetzt (wird nicht erreicht)");
        } else {
             // Hier fängt der catch-Block den Fehler nicht ab, da wir ihn nicht werfen.
             // Stattdessen wird nur ein Log-Eintrag gemacht.
            console.warn("Aufgabe 2: Element 'nonExistentId' nicht gefunden (warn)");
        }
    } catch (error) {
        console.error("Aufgabe 2 (Fehler): DOM-Manipulation fehlgeschlagen:", error.message);
    }

    // Um einen DOM-Fehler mit try-catch zu zeigen, müssten wir explizit eine ungültige Aktion ausführen
    try {
        // Dies wird einen TypeError werfen, wenn parentElement null ist
        // const parentElement = document.getElementById('someNonExistentParent');
        // parentElement.appendChild(document.createElement('div'));
        console.log("Aufgabe 2: Beispiel für DOM-Fehler nur zur Verdeutlichung.");
    } catch (error) {
        console.error("Aufgabe 2 (Fehler): Tatsächlicher DOM-Fehler:", error.message);
    }

    // Beispiel 2: Parsen von potentiell ungültigem JSON-String
    const invalidJsonString = '{"name": "Alice", "age": 30,}'; // Komma am Ende ist ungültig
    const validJsonString = '{"city": "Tokyo"}';

    try {
        const parsedData = JSON.parse(invalidJsonString);
        console.log("Aufgabe 2 (Erfolg): Gültiges JSON geparst:", parsedData); // Diese Zeile wird nicht erreicht
    } catch (error) {
        console.error("Aufgabe 2 (Fehler): Fehler beim Parsen von ungültigem JSON:", error.message);
    }

    try {
        const parsedData = JSON.parse(validJsonString);
        console.log("Aufgabe 2 (Erfolg): Gültiges JSON geparst:", parsedData);
    } catch (error) {
        console.error("Aufgabe 2 (Fehler): Fehler beim Parsen von gültigem JSON (wird nicht erreicht):", error.message);
    }


    // Aufgabe 3: Nutze das finally-Block, um Code auszuführen,
    // egal ob ein Fehler auftrat oder nicht (z.B. einen Lade-Spinner ausblenden).

    console.log('\n--- Aufgabe 3: finally-Block verwenden ---');

    const loadingSpinner = document.createElement('div');
    loadingSpinner.textContent = 'Lade Daten...';
    loadingSpinner.style.padding = '10px';
    loadingSpinner.style.margin = '20px auto';
    loadingSpinner.style.backgroundColor = '#ffd700';
    loadingSpinner.style.color = '#333';
    loadingSpinner.style.borderRadius = '5px';
    loadingSpinner.style.textAlign = 'center';
    loadingSpinner.style.display = 'none'; // Standardmäßig versteckt

    // Füge den Spinner zur Seite hinzu, z.B. vor der Sprichwörter-Sektion
    const proverbDisplaySection = document.getElementById('proverbDisplaySection');
    if (proverbDisplaySection) {
        proverbDisplaySection.parentNode.insertBefore(loadingSpinner, proverbDisplaySection);
    } else {
        document.body.appendChild(loadingSpinner);
    }


    async function fetchDataWithFinally(shouldFail) {
        loadingSpinner.style.display = 'block'; // Lade-Spinner anzeigen
        console.log("Aufgabe 3: Datenabruf startet. Lade-Spinner sichtbar.");

        try {
            const data = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (shouldFail) {
                        reject(new Error("Simulierter Datenabruf-Fehler!"));
                    } else {
                        resolve("Daten erfolgreich geladen!");
                    }
                }, 1500); // 1.5 Sekunden Verzögerung
            });
            console.log("Aufgabe 3 (Erfolg):", data);
            return data;

        } catch (error) {
            console.error("Aufgabe 3 (Fehler):", error.message);
            throw error; // Fehler weiterwerfen, damit der aufrufende Code ihn auch fangen kann, falls nötig
        } finally {
            // Dieser Block wird IMMER ausgeführt, egal ob try erfolgreich war oder catch einen Fehler abgefangen hat.
            loadingSpinner.style.display = 'none'; // Lade-Spinner ausblenden
            console.log("Aufgabe 3: Lade-Spinner unsichtbar. (finally-Block ausgeführt)");
        }
    }

    // Beispiel 1: Erfolgreicher Aufruf mit finally
    fetchDataWithFinally(false)
        .then(result => console.log("Aufgabe 3: Gesamter Prozess abgeschlossen (Erfolg):", result))
        .catch(err => console.error("Aufgabe 3: Gesamter Prozess abgeschlossen (Fehler im Catch außen):", err.message));

    // Beispiel 2: Fehlerhafter Aufruf mit finally
    // Verwende setTimeout, um die Aufrufe zeitlich zu trennen, damit die Spinner-Anzeige sichtbar wird
    setTimeout(() => {
        fetchDataWithFinally(true)
            .then(result => console.log("Aufgabe 3: Gesamter Prozess abgeschlossen (Erfolg):", result)) // Wird nicht erreicht
            .catch(err => console.error("Aufgabe 3: Gesamter Prozess abgeschlossen (Fehler im Catch außen):", err.message));
    }, 3000); // Startet den zweiten Aufruf 3 Sekunden nach dem ersten

// =======================================================
    // === NEUE AUFGABEN FÜR TAG 39: Web Storage API ===
    // =======================================================

    console.log('\n=== Tag 39: Web Storage API (localStorage und sessionStorage) ===');

    // Aufgabe 1: Speichere den Namen des Benutzers im localStorage,
    // wenn er ihn in ein Eingabefeld eingibt. Wenn die Seite neu geladen wird,
    // soll der Name wieder im Feld stehen.
    const userNameInput = document.getElementById('userNameInput');

    if (userNameInput) {
        // Beim Laden der Seite: Versuche, den gespeicherten Namen aus localStorage zu laden
        try {
            const savedUserName = localStorage.getItem('userName');
            if (savedUserName) {
                userNameInput.value = savedUserName;
                console.log(`Aufgabe 1: Name aus localStorage geladen: "${savedUserName}"`);
            } else {
                console.log('Aufgabe 1: Kein Name im localStorage gefunden.');
            }
        } catch (e) {
            console.error('Aufgabe 1: Fehler beim Zugriff auf localStorage (Lesen):', e);
        }


        // Bei jeder Eingabe im Feld: Speichere den aktuellen Wert im localStorage
        userNameInput.addEventListener('input', () => {
            const currentName = userNameInput.value;
            try {
                localStorage.setItem('userName', currentName);
                console.log(`Aufgabe 1: Name im localStorage gespeichert: "${currentName}"`);
            } catch (e) {
                console.error('Aufgabe 1: Fehler beim Zugriff auf localStorage (Schreiben):', e);
                alert('Dein Browser blockiert möglicherweise das Speichern von Daten. Bitte prüfe die Einstellungen.');
            }
        });
    } else {
        console.warn("Element mit ID 'userNameInput' für Aufgabe 1 nicht gefunden.");
    }


    // Aufgabe 2: Experimentiere mit sessionStorage. Was ist der Unterschied zu localStorage?
    console.log('\n--- Aufgabe 2: sessionStorage Experimente ---');

    // sessionStorage.setItem('sessionData', 'Dies ist eine temporäre Sitzungsdaten.');
    // console.log('sessionStorage gesetzt:', sessionStorage.getItem('sessionData'));

    // Der Hauptunterschied zwischen localStorage und sessionStorage:
    // localStorage: Daten bleiben nach dem Schließen des Browsers oder des Tabs persistent.
    //              Sie haben kein Ablaufdatum und bleiben, bis sie explizit gelöscht werden.
    // sessionStorage: Daten bleiben nur für die Dauer der Browsersitzung erhalten.
    //                 Wenn der Tab oder das Fenster geschlossen wird, werden die Daten gelöscht.
    //                 Jeder Tab hat seine eigene, isolierte sessionStorage.

    // Testen Sie dies:
    // 1. Öffnen Sie die Konsole.
    // 2. Führen Sie folgende Befehle aus:
    //    localStorage.setItem('persistentTest', 'Ich bleibe!');
    //    sessionStorage.setItem('temporaryTest', 'Ich verschwinde beim Schließen des Tabs!');
    // 3. Laden Sie die Seite neu (F5): Beide Werte sollten noch da sein.
    // 4. Öffnen Sie einen NEUEN Tab mit der gleichen URL:
    //    localStorage.getItem('persistentTest') sollte funktionieren.
    //    sessionStorage.getItem('temporaryTest') sollte NULL sein (neuer Tab, neue Sitzung).
    // 5. Schließen Sie den aktuellen Tab vollständig und öffnen Sie ihn erneut:
    //    localStorage.getItem('persistentTest') sollte noch da sein.
    //    sessionStorage.getItem('temporaryTest') sollte NULL sein.

    // Löschen von Daten:
    // localStorage.removeItem('persistentTest');
    // sessionStorage.removeItem('temporaryTest');
    // localStorage.clear(); // Löscht alles im localStorage für diese Domain/Origin
    // sessionStorage.clear(); // Löscht alles im sessionStorage für diesen Tab/Sitzung


    // Aufgabe 3 (Projekt "Japan Reiseplaner"): Speichere die reiseziele-Liste im localStorage,
    // sodass sie auch nach dem Schließen und erneuten Öffnen des Browsers erhalten bleibt.
    // Lade die Liste beim Start der Seite aus dem localStorage.
    // (Denke daran, dass localStorage nur Strings speichert, also JSON.stringify und JSON.parse verwenden).



    // Array, das die aktuellen Reiseziele speichert (als JavaScript-Objekte/Strings)
    let reisezieleArray = [];

    // Funktion zum Speichern der aktuellen reisezieleArray im localStorage
    function saveReiseziele() {
        try {
            // localStorage speichert nur Strings, also konvertiere das Array zu JSON-String
            localStorage.setItem('japanReiseziele', JSON.stringify(reisezieleArray));
            console.log("Aufgabe 3: Reiseziele im localStorage gespeichert.", reisezieleArray);
        } catch (e) {
            console.error('Aufgabe 3: Fehler beim Speichern der Reiseziele im localStorage:', e);
        }
    }

    // Funktion zum Laden der Reiseziele aus dem localStorage und Anzeigen
    function loadReiseziele() {
        try {
            const savedReisezieleJSON = localStorage.getItem('japanReiseziele');
            if (savedReisezieleJSON) {
                // Konvertiere den JSON-String zurück in ein JavaScript-Array
                reisezieleArray = JSON.parse(savedReisezieleJSON);
                console.log("Aufgabe 3: Reiseziele aus localStorage geladen:", reisezieleArray);

                // Füge jedes geladene Reiseziel zur DOM-Liste hinzu
                reisezieleArray.forEach(destinationText => {
                    addDestinationToDOM(destinationText);
                });
            } else {
                console.log("Aufgabe 3: Keine gespeicherten Reiseziele im localStorage gefunden.");
            }
        } catch (e) {
            console.error('Aufgabe 3: Fehler beim Laden/Parsen der Reiseziele aus localStorage:', e);
            reisezieleArray = []; // Setze das Array zurück, falls Fehler beim Parsen auftraten
        }
    }

    // Hilfsfunktion zum Hinzufügen eines Reiseziels zum DOM (jetzt ausgelagert, um von loadReiseziele wiederverwendet zu werden)
    function addDestinationToDOM(destinationText) {
        const listItem = document.createElement('li');
        listItem.textContent = destinationText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.style.marginLeft = '10px';
        deleteButton.style.padding = '5px 10px';
        deleteButton.style.backgroundColor = '#d9534f';
        deleteButton.style.color = 'white';
        deleteButton.style.border = 'none';
        deleteButton.style.borderRadius = '3px';
        deleteButton.style.cursor = 'pointer';
        deleteButton.style.transition = 'background-color 0.2s ease';

        deleteButton.addEventListener('mouseover', () => {
            deleteButton.style.backgroundColor = '#c9302c';
        });
        deleteButton.addEventListener('mouseout', () => {
            deleteButton.style.backgroundColor = '#d9534f';
        });

        deleteButton.addEventListener('click', () => {
            // Entferne das Element aus dem DOM
            reisezieleListe.removeChild(listItem);
            // Entferne das Element auch aus dem reisezieleArray
            reisezieleArray = reisezieleArray.filter(item => item !== destinationText);
            // Speichere das aktualisierte Array im localStorage
            saveReiseziele();
        });

        listItem.appendChild(deleteButton);
        reisezieleListe.appendChild(listItem);
    }


    // Modifiziere den Event Listener für das Hinzufügen von Zielen
    if (addDestinationForm && destinationInput && reisezieleListe) {
        addDestinationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const destinationText = destinationInput.value.trim();

            if (destinationText !== "") {
                if (!reisezieleArray.includes(destinationText)) { // Optional: Duplikate vermeiden
                    addDestinationToDOM(destinationText); // Füge zum DOM hinzu
                    reisezieleArray.push(destinationText); // Füge zum Array hinzu
                    saveReiseziele(); // Speichere das aktualisierte Array
                    destinationInput.value = '';
                } else {
                    alert('Dieses Reiseziel wurde bereits hinzugefügt!');
                }
            } else {
                alert('Bitte geben Sie ein Reiseziel ein!');
            }
        });
    }


    // Beim DOMContentLoaded: Lade die Reiseziele aus localStorage
    loadReiseziele();

});


// Allgemeine Quiz-Elemente
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const questionArea = document.getElementById('question-area');
const resultArea = document.getElementById('result-area');
const scoreSpan = document.getElementById('score');
const totalQuestionsSpan = document.getElementById('total-questions');
const restartButton = document.getElementById('restart-button');

// NEU: Elemente für Timer und Fortschritt
const progressText = document.getElementById('progress-text');
const timerBarContainer = document.querySelector('.timer-bar-container'); // Container für den Balken
const timerBar = document.getElementById('timer-bar');

// NEU: Elemente für Highscores
const highscoreList = document.getElementById('highscore-list');

// Quiz-Daten
const questions = [
    {
        question: "Was ist die Hauptstadt Japans?",
        options: ["Kyoto", "Osaka", "Tokyo", "Sapporo"],
        correctAnswer: "Tokyo"
    },
    {
        question: "Welcher Berg ist der höchste Japans?",
        options: ["Mount Fuji", "Mount Aso", "Mount Ontake", "Mount Kita"],
        correctAnswer: "Mount Fuji"
    },
    {
        question: "Welches Gericht ist KEIN traditionelles japanisches Gericht?",
        options: ["Sushi", "Ramen", "Kimchi", "Tempura"],
        correctAnswer: "Kimchi"
    },
    {
        question: "Wie nennt man die traditionelle japanische Kampfkunst der Schwerthandhabung?",
        options: ["Karate", "Judo", "Kendo", "Aikido"],
        correctAnswer: "Kendo"
    },
    {
        question: "Welche Blume ist ein Nationalsymbol Japans und blüht im Frühling?",
        options: ["Rose", "Kirschblüte", "Tulpe", "Sonnenblume"],
        correctAnswer: "Kirschblüte"
    },
    {
        question: "Welche Stadt war die alte Hauptstadt Japans vor Tokyo?",
        options: ["Nara", "Kyoto", "Kamakura", "Osaka"],
        correctAnswer: "Kyoto"
    },
    {
        question: "Welches Tier gilt in Japan als Glücksbringer und ist oft als winkende Figur zu sehen?",
        options: ["Panda", "Katze", "Hund", "Kranich"],
        correctAnswer: "Katze" // Maneki-Neko
    },
    {
        question: "Wie viele Hauptinseln hat Japan?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4" // Honshu, Hokkaido, Kyushu, Shikoku
    },
    {
        question: "Welches Getränk wird oft bei japanischen Teezeremonien serviert?",
        options: ["Oolong-Tee", "Grüntee", "Schwarztee", "Kamillentee"],
        correctAnswer: "Grüntee" // Insbesondere Matcha
    },
    {
        question: "Welcher Sport ist in Japan sehr beliebt und hat seinen Ursprung dort?",
        options: ["Baseball", "Fußball", "Sumo", "Basketball"],
        correctAnswer: "Sumo"
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionButton = null; // Speichert den aktuell ausgewählten Button

// NEU: Timer-Variablen
const TIME_PER_QUESTION = 15; // Sekunden pro Frage
let timerInterval = null;
let timeLeft = TIME_PER_QUESTION;

// NEU: Highscore-Konstante
const HIGHSCORE_KEY = 'japanQuizHighscores';
const MAX_HIGHSCORES = 5; // Anzahl der Highscores, die gespeichert werden sollen

// --- Hilfsfunktionen ---

/**
 * Mischt die Elemente eines Arrays zufällig (Fisher-Yates-Algorithmus).
 * @param {Array} array Das zu mischende Array.
 * @returns {Array} Das gemischte Array.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Tausch der Elemente
    }
    return array;
}

// --- Timer-Funktionen ---


/**
 * Startet den Timer für die aktuelle Frage.
 */
function startTimer() {
    timeLeft = TIME_PER_QUESTION;
    timerBar.style.backgroundColor = '#ffd700'; // Standardfarbe (Gold)

    // Wichtig: Transition zuerst entfernen, dann Breite setzen, dann Transition wieder hinzufügen
    timerBar.style.transition = 'none'; // Temporär Transition entfernen
    timerBar.style.width = '100%'; // Balken auf volle Breite setzen

    // Verzögert die Anwendung der Transition, um Reflow zu erzwingen und einen sanften Start zu ermöglichen
    setTimeout(() => {
        timerBar.style.transition = `width ${TIME_PER_QUESTION}s linear`; // Transition mit Dauer der Frage setzen
        timerBar.style.width = '0%'; // Startet das Schrumpfen des Balkens
    }, 50); // Eine kleine Verzögerung (z.B. 50ms) kann hier Wunder wirken

    // Vorherigen Interval löschen, falls vorhanden
    stopTimer();

    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 5 && timerBar.style.backgroundColor !== 'rgb(220, 53, 69)') { // Wechselt die Farbe, wenn weniger als 5 Sekunden verbleiben (und nicht schon rot ist)
            timerBar.style.backgroundColor = '#dc3545'; // Rot
        }
        if (timeLeft <= 0) {
            stopTimer();
            // Optionen deaktivieren, falls nicht schon geschehen
            Array.from(optionsContainer.children).forEach(btn => {
                btn.disabled = true;
            });
            // Automatisch als falsch beantworten
            checkAnswer(null); // Null bedeutet, dass keine Option gewählt wurde (Zeit abgelaufen)
            nextButton.textContent = 'Nächste Frage';
            nextButton.disabled = false; // Button aktivieren
            selectedOptionButton = null; // Auswahl zurücksetzen
        }
    }, 1000); // Aktualisiert alle 1 Sekunde
}

/**
 * Stoppt den laufenden Timer.
 */
function stopTimer() {
    clearInterval(timerInterval);
    // Beachte: wir entfernen die Transition hier nicht explizit, damit der Balken bei einem Klick in seiner Position bleibt.
    // Die Transition wird in startTimer() neu gesetzt.
}

/**
 * Setzt den Timer visuell zurück, ohne ihn zu starten.
 */
function resetTimer() {
    stopTimer(); // Stoppt jeglichen laufenden Timer
    timeLeft = TIME_PER_QUESTION; // Setzt die Zeit intern zurück
    timerBar.style.transition = 'none'; // Temporär Transition entfernen
    timerBar.style.width = '100%'; // Balken auf 100% setzen
    timerBar.style.backgroundColor = '#ffd700'; // Farbe auf Standard (Gold) setzen
    // Keine setTimeout hier, da wir nur zurücksetzen und nicht sofort wieder starten
}

// --- Highscore-Funktionen ---

/**
 * Lädt die gespeicherten Highscores aus dem LocalStorage.
 * @returns {Array} Eine Liste von Highscore-Objekten ({ name: string, score: number }).
 */
function loadHighscores() {
    const highscoresJson = localStorage.getItem(HIGHSCORE_KEY);
    return highscoresJson ? JSON.parse(highscoresJson) : [];
}

/**
 * Speichert einen neuen Highscore im LocalStorage.
 * @param {number} finalScore Der erreichte Punktestand.
 */
function saveHighscore(finalScore) {
    const playerName = prompt("Quiz beendet! Gib deinen Namen für den Highscore ein:");
    if (!playerName) return; // Abbruch, wenn kein Name eingegeben wurde

    let highscores = loadHighscores();
    highscores.push({ name: playerName, score: finalScore });

    // Sortiere absteigend nach Score
    highscores.sort((a, b) => b.score - a.score);

    // Begrenze die Liste auf die MAX_HIGHSCORES
    highscores = highscores.slice(0, MAX_HIGHSCORES);

    localStorage.setItem(HIGHSCORE_KEY, JSON.stringify(highscores));
}

/**
 * Zeigt die Highscore-Liste im HTML an.
 */
function displayHighscores() {
    const highscores = loadHighscores();
    highscoreList.innerHTML = ''; // Vorherige Einträge löschen

    if (highscores.length === 0) {
        highscoreList.innerHTML = '<li>Noch keine Highscores vorhanden. Sei der Erste!</li>';
        return;
    }

    highscores.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${index + 1}. ${entry.name}</span><span>${entry.score} Punkte</span>`;
        highscoreList.appendChild(listItem);
    });
}


// --- Quiz-Logik ---

/**
 * Initialisiert das Quiz: Mischt Fragen und Optionen, setzt alles zurück und zeigt die erste Frage.
 */
function startQuiz() {
    shuffledQuestions = shuffleArray([...questions]); // Fragen mischen
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = 'Nächste Frage';
    nextButton.disabled = true; // Deaktiviert den Button, bis eine Option gewählt wurde
    selectedOptionButton = null;

    // Bereiche ein- und ausblenden
    questionArea.classList.remove('hidden');
    resultArea.classList.add('hidden');
    timerBarContainer.classList.remove('hidden'); // Timer-Container sichtbar machen

    displayQuestion();
    updateProgressText(); // Fortschrittsanzeige aktualisieren
}

/**
 * Zeigt die aktuelle Frage und ihre Optionen an.
 */
function displayQuestion() {
    resetTimer(); // Timer zurücksetzen und starten
    startTimer();

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Alte Optionen entfernen

    const shuffledOptions = shuffleArray([...currentQuestion.options]); // Optionen mischen

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(button, option));
        optionsContainer.appendChild(button);
    });

    // Button deaktivieren, bis eine Option gewählt ist
    nextButton.disabled = true;
    nextButton.textContent = 'Nächste Frage';
}

/**
 * Behandelt die Auswahl einer Option.
 * @param {HTMLElement} button Der geklickte Button.
 * @param {string} selectedAnswer Die ausgewählte Antwort.
 */
function selectOption(button, selectedAnswer) {
    if (selectedOptionButton) {
        // Entfernt "selected" von der vorherigen Auswahl
        selectedOptionButton.classList.remove('selected');
    }
    
    // Setzt die Animation für die Auswahl zurück, um sie bei erneuter Auswahl abzuspielen
    button.classList.remove('selected');
    void button.offsetWidth; // Force reflow to restart animation
    button.classList.add('selected');

    selectedOptionButton = button;
    nextButton.disabled = false; // "Nächste Frage" Button aktivieren

    // Optionen deaktivieren, sobald eine gewählt wurde
    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
    });

    stopTimer(); // Timer stoppen, sobald eine Option gewählt wurde
    checkAnswer(selectedAnswer); // Antwort sofort überprüfen
}

/**
 * Überprüft die ausgewählte Antwort und gibt visuelles Feedback.
 * @param {string|null} selectedAnswer Die vom Benutzer ausgewählte Antwort oder null, wenn die Zeit abgelaufen ist.
 */
function checkAnswer(selectedAnswer) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const allOptionButtons = Array.from(optionsContainer.children);

    let isCorrect = false;

    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        isCorrect = true;
        if (selectedOptionButton) {
            selectedOptionButton.classList.add('correct');
        }
    } else {
        // Nur wenn eine Option ausgewählt wurde und diese falsch ist
        if (selectedOptionButton) {
            selectedOptionButton.classList.add('wrong');
        }
        // Die korrekte Antwort hervorheben
        allOptionButtons.forEach(button => {
            if (button.textContent === currentQuestion.correctAnswer) {
                button.classList.add('correct'); // Richtige Antwort grün hervorheben
            }
        });
    }

    // Wenn der Timer abgelaufen ist und keine Antwort gewählt wurde,
    // trotzdem die richtige Antwort hervorheben.
    if (selectedAnswer === null) {
         allOptionButtons.forEach(button => {
            if (button.textContent === currentQuestion.correctAnswer) {
                button.classList.add('correct');
            }
            button.disabled = true; // Alle Buttons deaktivieren
        });
    }

    // "Nächste Frage" Button aktivieren (falls nicht schon durch Timer)
    // und Text anpassen, wenn es die letzte Frage ist
    nextButton.disabled = false;
    if (currentQuestionIndex === shuffledQuestions.length - 1) {
        nextButton.textContent = 'Ergebnis anzeigen';
    } else {
        nextButton.textContent = 'Nächste Frage';
    }
}

/**
 * Aktualisiert den Text der Fortschrittsanzeige.
 */
function updateProgressText() {
    progressText.textContent = `Frage ${currentQuestionIndex + 1} von ${shuffledQuestions.length}`;
}


/**
 * Zeigt das Ergebnis des Quiz an und die Highscores.
 */
function showResult() {
    questionArea.classList.add('hidden');
    resultArea.classList.remove('hidden');
    timerBarContainer.classList.add('hidden'); // Timer-Container ausblenden
    scoreSpan.textContent = score;
    totalQuestionsSpan.textContent = shuffledQuestions.length;

    // STELL SICHER, DASS DIESE ZEILE HIER IST:
    saveHighscore(score); // Highscore speichern
    displayHighscores(); // Highscores anzeigen
}

// --- Event-Listener ---
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
        updateProgressText();
        // Zustand des Buttons zurücksetzen
        nextButton.textContent = 'Nächste Frage';
        nextButton.disabled = true;
        selectedOptionButton = null; // Auswahl zurücksetzen
    } else {
        showResult();
    }
});

restartButton.addEventListener('click', startQuiz);

// Quiz beim Laden der Seite starten
startQuiz();
displayHighscores(); // Zeigt Highscores auch beim ersten Laden an
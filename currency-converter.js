    
    // =======================================================
    // === Tag 40-42: Micro-Projekt 5: "Japanischer Währungsrechner" (JETZT NUR AUF SEINER EIGENEN SEITE) ===
    // =======================================================

    // Überprüfen, ob die Elemente für den Währungsrechner auf der aktuellen Seite existieren
    const jpyAmountInput = document.getElementById('jpyAmount');
    const convertButton = document.getElementById('convertButton');

    if (jpyAmountInput && convertButton) { // Nur ausführen, wenn die Elemente vorhanden sind
        console.log('\n=== Tag 40-42: Japanischer Währungsrechner (auf eigener Seite) ===');

        // WICHTIG: Ersetze 'YOUR_API_KEY' durch deinen tatsächlichen API-Schlüssel von exchangerate-api.com
        const API_KEY = 'de5607a89d06da3187884c00'; // <<< HIER DEINEN API-SCHLÜSSEL EINFÜGEN!
        const API_BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/JPY`;

        const FALLBACK_RATES = {
            'EUR': 0.00625,
            'USD': 0.00667
        };

        const currencyRadios = document.querySelectorAll('input[name="targetCurrency"]');
        const convertedAmountDisplay = document.getElementById('convertedAmount');
        const exchangeRateInfoDisplay = document.getElementById('exchangeRateInfo');
        const converterErrorDisplay = document.getElementById('converterError');

        async function getExchangeRates() {
            converterErrorDisplay.textContent = '';
            exchangeRateInfoDisplay.textContent = 'Lade Wechselkurse...';

            try {
                const response = await fetch(API_BASE_URL);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`API Fehler: ${errorData.error_type || response.statusText}. Bitte prüfe deinen API-Schlüssel oder das Ratenlimit.`);
                }

                const data = await response.json();

                if (data.result === 'error') {
                    throw new Error(`API Fehler: ${data.error_type}`);
                }

                console.log("Wechselkurse von API erhalten:", data);
                exchangeRateInfoDisplay.textContent = `Aktuelle Kurse von Exchangerate-API (Stand: ${new Date(data.time_last_update_utc).toLocaleDateString()})`;
                return data.conversion_rates;

            } catch (error) {
                console.error("Fehler beim Abrufen der Wechselkurse:", error);
                converterErrorDisplay.textContent = `Fehler beim Laden der Wechselkurse: ${error.message}. Verwende Fallback-Kurse.`;
                exchangeRateInfoDisplay.textContent = 'Verwende feste Wechselkurse.';
                return FALLBACK_RATES;
            }
        }

        async function convertCurrency() {
            const jpyAmount = parseFloat(jpyAmountInput.value);
            let targetCurrency = 'EUR';

            for (const radio of currencyRadios) {
                if (radio.checked) {
                    targetCurrency = radio.value;
                    break;
                }
            }

            if (isNaN(jpyAmount) || jpyAmount < 0) {
                converterErrorDisplay.textContent = 'Bitte geben Sie einen gültigen positiven Betrag in JPY ein.';
                convertedAmountDisplay.textContent = '0.00 ' + targetCurrency;
                exchangeRateInfoDisplay.textContent = '';
                return;
            }

            converterErrorDisplay.textContent = '';

            const rates = await getExchangeRates();

            if (rates && rates[targetCurrency]) {
                const convertedAmount = jpyAmount * rates[targetCurrency];
                convertedAmountDisplay.textContent = `${convertedAmount.toFixed(2)} ${targetCurrency}`;
                console.log(`${jpyAmount} JPY sind ${convertedAmount.toFixed(2)} ${targetCurrency}`);
            } else {
                converterErrorDisplay.textContent = `Wechselkurs für ${targetCurrency} nicht verfügbar.`;
                convertedAmountDisplay.textContent = 'Fehler';
                console.error(`Wechselkurs für ${targetCurrency} nicht in den erhaltenen Daten gefunden.`);
            }
        }

        convertButton.addEventListener('click', convertCurrency);

        jpyAmountInput.addEventListener('input', () => {
            clearTimeout(jpyAmountInput.dataset.timeout);
            jpyAmountInput.dataset.timeout = setTimeout(convertCurrency, 500);
        });

        currencyRadios.forEach(radio => {
            radio.addEventListener('change', convertCurrency);
        });

        // Beim Start der Seite einmal umrechnen (mit Standardwerten)
        convertCurrency();
};
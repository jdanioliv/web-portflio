// 1. TAB SWITCHER (CAMBIADOR DE PESTAÑAS DEL LAB)

const tabButtons = document.querySelectorAll('.lab-tab');
const tabPanels = document.querySelectorAll('.lab-panel');

// En Python: for button in tabButtons:
tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // 1. Quitamos la clase activa de todos los botones y paneles
        tabButtons.forEach((btn) => btn.classList.remove('lab-tab--active'));
        tabPanels.forEach((panel) => panel.classList.remove('lab-panel--active'));

        // 2. Activamos el botón pulsado
        button.classList.add('lab-tab--active');

        // 3. Mostramos el panel cuyo ID coincide con data-target
        const targetId = button.dataset.target;
        const targetPanel = document.getElementById(targetId);

        if (targetPanel) {
            targetPanel.classList.add('lab-panel--active');
        }
    });
});

// 2. MINI-APP 1: ANALIZADOR DE TEXTO Y DATOS EN TIEMPO REAL
const textInput = document.getElementById('analyzer-input');
const charCountEl = document.getElementById('stat-chars');
const noSpacesCountEl = document.getElementById('stat-no-spaces');
const wordCountEl = document.getElementById('stat-words');
const readTimeEl = document.getElementById('stat-time');
const clearBtn = document.getElementById('analyzer-clear-btn');

// Verificamos que el textarea exista en la página antes de conectar eventos
if (textInput) {
    // En Python: def updateTextStats():
    function updateTextStats() {
        const rawText = textInput.value;

        // 1. Caracteres totales (Python: len(rawText))
        const charCount = rawText.length;

        // 2. Caracteres sin espacios (elimina espacios y saltos de línea)
        const noSpacesCount = rawText.replace(/\s/g, '').length;

        // 3. Conteo de palabras (Python: len(rawText.strip().split()))
        const cleanedText = rawText.trim();
        let wordCount = 0;
        if (cleanedText !== '') {
            wordCount = cleanedText.split(/\s+/).length;
        }

        // 4. Tiempo de lectura estimado en segundos (200 palabras/minuto)
        const readingTimeSeconds = Math.ceil((wordCount / 200) * 60);

        // 5. Actualizamos los números en el HTML
        charCountEl.textContent = charCount;
        if (noSpacesCountEl) {
            noSpacesCountEl.textContent = noSpacesCount;
        }
        wordCountEl.textContent = wordCount;
        readTimeEl.textContent = `${readingTimeSeconds}s`;
    }

    // Escuchamos cada tecla que el usuario escribe o borra
    textInput.addEventListener('input', updateTextStats);

    // Botón para vaciar el texto y reiniciar a 0
    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        updateTextStats();
        textInput.focus();
    });
}
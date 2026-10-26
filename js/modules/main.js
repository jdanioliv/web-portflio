// 1. TAB SWITCHER (CAMBIADOR DE PESTAÑAS DEL LAB)

const tabButtons = document.querySelectorAll('.lab-tab');
const tabPanels = document.querySelectorAll('.lab-panel');

// En Python: for button in tabButtons:
tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Quitamos la clase activa de todos los botones y paneles
        tabButtons.forEach((btn) => btn.classList.remove('lab-tab--active'));
        tabPanels.forEach((panel) => panel.classList.remove('lab-panel--active'));

        // Activamos el botón pulsado
        button.classList.add('lab-tab--active');

        // Mostramos el panel cuyo ID coincide con data-target
        const targetId = button.dataset.target;
        const targetPanel = document.getElementById(targetId);

        if (targetPanel) {
            targetPanel.classList.add('lab-panel--active');
        }
    });
});

// 2. MINI-APP ANALIZADOR DE TEXTO Y DATOS EN TIEMPO REAL
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

        // Caracteres totales (Python: len(rawText))
        const charCount = rawText.length;

        // Caracteres sin espacios (elimina espacios y saltos de línea)
        const noSpacesCount = rawText.replace(/\s/g, '').length;

        // Conteo de palabras (Python: len(rawText.strip().split()))
        const cleanedText = rawText.trim();
        let wordCount = 0;
        if (cleanedText !== '') {
            wordCount = cleanedText.split(/\s+/).length;
        }

        // Tiempo de lectura estimado en segundos (200 palabras/minuto)
        const readingTimeSeconds = Math.ceil((wordCount / 200) * 60);

        // Actualizamos los números en el HTML
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


// 3. MINI-APP LAZY LOADER PARA PYSCRIPT
let isPyScriptLoaded = false;

function loadPyScriptEngine() {
    // Evita descargar Python más de una vez
    if (isPyScriptLoaded) return;
    isPyScriptLoaded = true;

    const statusBadge = document.getElementById('py-engine-status');
    const loaderBox = document.getElementById('py-loader-box');
    const loaderText = document.getElementById('py-loader-text');
    const workspace = document.getElementById('py-workspace');

    // Estado: Cargando
    statusBadge.textContent = 'Motor Python: Cargando...';
    statusBadge.className = 'engine-badge engine-badge--loading';

    // Inyectamos el motor de PyScript en el <head>
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://pyscript.net/releases/2024.1.1/core.js';

    // Conectamos nuestro archivo de Python real (python/log_analyzer.py)
    const pyScriptTag = document.createElement('script');
    pyScriptTag.type = 'py';
    pyScriptTag.src = './python/log_analyzer.py';

    // Estado: Listo
    window.addEventListener('py:ready', () => {
        statusBadge.textContent = 'Motor Python 3.11: Activo';
        statusBadge.className = 'engine-badge engine-badge--ready';
        loaderBox.style.display = 'none';
        workspace.classList.remove('py-workspace--hidden');
    });

    // Estado: Error de red
    script.addEventListener('error', () => {
        statusBadge.textContent = 'Error de Red';
        statusBadge.className = 'engine-badge engine-badge--error';
        loaderText.textContent = 'Error al descargar PyScript. Verifica tu conexión a internet.';
    });

    document.head.appendChild(script);
    document.body.appendChild(pyScriptTag);
}
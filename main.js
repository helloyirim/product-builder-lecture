document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const lottoNumbersContainer = document.querySelector('.lotto-numbers');
    const themeSwitch = document.getElementById('theme-switch');

    // Function to generate unique random numbers
    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1); // Lotto numbers 1-45
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    // Function to display numbers
    function displayNumbers(numbers) {
        lottoNumbersContainer.innerHTML = ''; // Clear previous numbers
        numbers.forEach(num => {
            const span = document.createElement('span');
            span.classList.add('number');
            span.textContent = num;
            lottoNumbersContainer.appendChild(span);
        });
    }

    // Event listener for generate button
    generateBtn.addEventListener('click', () => {
        const generatedNumbers = generateLottoNumbers();
        displayNumbers(generatedNumbers);
    });

    // Theme Toggle Functionality
    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Check for saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        themeSwitch.checked = true;
        applyTheme(true);
    } else {
        themeSwitch.checked = false;
        applyTheme(false);
    }

    // Event listener for theme switch
    themeSwitch.addEventListener('change', (event) => {
        applyTheme(event.target.checked);
    });

    // Initial display of placeholder numbers
    displayNumbers(['?', '?', '?', '?', '?', '?']);
});
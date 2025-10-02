
        // DOM Elements
        const temperatureInput = document.getElementById('temperature');
        const convertBtn = document.getElementById('convert-btn');
        const convertedValue = document.querySelector('.converted-value');
        const errorMessage = document.getElementById('error-message');
        const conversionOptions = document.querySelectorAll('.conversion-option');
        const formulaText = document.getElementById('formula-text');
        
        // Variables
        let conversionType = 'celsiusToFahrenheit';
        
        // Event Listeners
        convertBtn.addEventListener('click', handleConversion);
        
        conversionOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Remove active class from all options
                conversionOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                option.classList.add('active');
                // Update conversion type
                conversionType = option.dataset.type;
                
                // Update formula text
                updateFormulaText();
            });
        });
        
        // Functions
        function handleConversion() {
            // Clear previous error message
            hideError();
            
            // Get input value
            const inputValue = temperatureInput.value.trim();
            
            // Validate input
            if (inputValue === '') {
                showError('Please enter a temperature value.');
                return;
            }
            
            if (!isNumeric(inputValue)) {
                showError('Please enter a valid number.');
                return;
            }
            
            // Convert to number
            const temperature = parseFloat(inputValue);
            
            // Perform conversion
            let result;
            let fromUnit, toUnit;
            
            if (conversionType === 'celsiusToFahrenheit') {
                result = celsiusToFahrenheit(temperature);
                fromUnit = '°C';
                toUnit = '°F';
            } else {
                result = fahrenheitToCelsius(temperature);
                fromUnit = '°F';
                toUnit = '°C';
            }
            
            // Display result
            displayResult(temperature, result, fromUnit, toUnit);
        }
        
        function celsiusToFahrenheit(celsius) {
            return (celsius * 9/5) + 32;
        }
        
        function fahrenheitToCelsius(fahrenheit) {
            return (fahrenheit - 32) * 5/9;
        }
        
        function displayResult(inputTemp, result, fromUnit, toUnit) {
            // Format to 2 decimal places
            const formattedResult = result.toFixed(2);
            convertedValue.textContent = `${inputTemp} ${fromUnit} is ${formattedResult} ${toUnit}`;
        }
        
        function isNumeric(value) {
            return !isNaN(value) && !isNaN(parseFloat(value));
        }
        
        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.classList.remove('hidden');
            convertedValue.textContent = 'Conversion failed';
        }
        
        function hideError() {
            errorMessage.classList.add('hidden');
        }
        
        function updateFormulaText() {
            if (conversionType === 'celsiusToFahrenheit') {
                formulaText.textContent = 'Celsius to Fahrenheit: F = (9/5 × C) + 32';
            } else {
                formulaText.textContent = 'Fahrenheit to Celsius: C = 5/9 × (F - 32)';
            }
        }
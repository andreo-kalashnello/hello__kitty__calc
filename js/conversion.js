import { 
    getOutputValue,
    updateOutput 
 } from './ui.js';

document.getElementById('conversionBtn').addEventListener('click', function() {
    const options = document.getElementById('conversionOptions');
    options.classList.toggle('show');
});

document.getElementById('lengthConv').addEventListener('click', function() {
    const inputValue =  getOutputValue();

    const fromUnit = document.getElementById('fromLength');
    const toUnit = document.getElementById('toLength');

    let result;

    if (fromUnit.value === "Centimeters" && toUnit.value === "Meters") {
        result = inputValue / 100;
    } else if (fromUnit.value === "Centimeters" && toUnit.value === "Kilometers") {
        result = inputValue / 100000;
    } else if (fromUnit.value === "Meters" && toUnit.value === "Centimeters") {
        result = inputValue * 100;
    } else if (fromUnit.value === "Meters" && toUnit.value === "Kilometers") {
        result = inputValue / 1000;
    } else if (fromUnit.value === "Kilometers" && toUnit.value === "Centimeters") {
        result = inputValue * 100000;
    } else if (fromUnit.value === "Kilometers" && toUnit.value === "Meters") {
        result = inputValue * 1000;
    } else {
        result = inputValue;
    }
    
    updateOutput(result); 
});

document.getElementById('weightConv').addEventListener('click', function() {
    const inputValue =  getOutputValue();

    const fromUnit = document.getElementById('fromWeight');
    const toUnit = document.getElementById('toWeight');

    let result;

    if (fromUnit.value === "Grams" && toUnit.value === "Kilograms") {
        result = inputValue / 1000;
    } else if (fromUnit.value === "Grams" && toUnit.value === "Tonnes") {
        result = inputValue / 1000000;
    } else if (fromUnit.value === "Kilograms" && toUnit.value === "Grams") {
        result = inputValue * 1000;
    } else if (fromUnit.value === "Kilograms" && toUnit.value === "Tonnes") {
        result = inputValue / 1000;
    } else if (fromUnit.value === "Tonnes" && toUnit.value === "Grams") {
        result = inputValue * 1000000;
    } else if (fromUnit.value === "Tonnes" && toUnit.value === "Kilograms") {
        result = inputValue * 1000;
    } else {
        result = inputValue;
    }

    updateOutput(result);
});

document.getElementById('areaConv').addEventListener('click', function() {
    const inputValue =  getOutputValue();

    const fromUnit = document.getElementById('fromArea');
    const toUnit = document.getElementById('toArea');

    let result;

    if (fromUnit.value === "Square Centimeters" && toUnit.value === "Square Meters") {
        result = inputValue / 10000;
    } else if (fromUnit.value === "Square Centimeters" && toUnit.value === "Square Kilometers") {
        result = inputValue / 100000000;
    } else if (fromUnit.value === "Square Centimeters" && toUnit.value === "Hectares") {
        result = inputValue / 100000;
    } else if (fromUnit.value === "Square Meters" && toUnit.value === "Square Centimeters") {
        result = inputValue * 10000;
    } else if (fromUnit.value === "Square Meters" && toUnit.value === "Square Kilometers") {
        result = inputValue / 1000000;
    } else if (fromUnit.value === "Square Meters" && toUnit.value === "Hectares") {
        result = inputValue / 10000;
    } else if (fromUnit.value === "Square Kilometers" && toUnit.value === "Square Centimeters") {
        result = inputValue * 100000000;
    } else if (fromUnit.value === "Square Kilometers" && toUnit.value === "Square Meters") {
        result = inputValue * 1000000;
    } else if (fromUnit.value === "Square Kilometers" && toUnit.value === "Hectares") {
        result = inputValue * 100;
    } else if (fromUnit.value === "Hectares" && toUnit.value === "Square Centimeters") {
        result = inputValue * 100000;
    } else if (fromUnit.value === "Hectares" && toUnit.value === "Square Meters") {
        result = inputValue * 10000;
    } else if (fromUnit.value === "Hectares" && toUnit.value === "Square Kilometers") {
        result = inputValue / 100;
    } else {
        result = inputValue;
    }

    updateOutput(result);
});
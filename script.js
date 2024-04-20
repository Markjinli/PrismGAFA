async function fetchLaptops() {
    const response = await fetch('https://raw.githubusercontent.com/yourusername/laptop-finder/main/data.csv');
    const data = await response.text();
    displayLaptops(parseCSV(data));
}

function parseCSV(csvData) {
    return csvData.split('\n').map(row => row.split(','));
}

function displayLaptops(laptops) {
    const table = document.getElementById('laptop-table').getElementsByTagName('tbody')[0];
    laptops.forEach((laptop, index) => {
        if (index === 0) return; // Skip header row
        const row = table.insertRow();
        laptop.forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });
    });
}

function filterLaptops() {
    const maxPrice = document.getElementById('priceRange').value;
    const allRows = document.getElementById('laptop-table').getElementsByTagName('tbody')[0].rows;
    Array.from(allRows).forEach(row => {
        const price = parseFloat(row.cells[1].textContent);
        if (price > maxPrice) {
            row.style.display = 'none';
        } else {
            row.style.display = '';
        }
    });
}

function updatePriceRange(value) {
    document.getElementById('priceValue').textContent = value;
}

window.onload = fetchLaptops;

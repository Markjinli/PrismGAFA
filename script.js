async function fetchLaptops() {
    const response = await fetch('https://raw.githubusercontent.com/Markjinli/PrismGAFA/main/Laptop_Data_UTF8.csv');
    const data = await response.text();
    displayLaptops(parseCSV(data));
}

function parseCSV(csvData) {
    const rows = csvData.split('\n').slice(1); // 去掉CSV头部
    return rows.map(row => row.split(','));
}

function displayLaptops(laptops) {
    const tableBody = document.getElementById('laptop-table').getElementsByTagName('tbody')[0];
    laptops.forEach((laptop) => {
        const row = tableBody.insertRow();
        laptop.forEach(text => {
            const cell = row.insertCell();
            cell.textContent = text;
        });
    });
}

function filterLaptops() {
    const minPrice = parseFloat(document.getElementById('minPrice').value);
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);
    const allRows = document.getElementById('laptop-table').getElementsByTagName('tbody')[0].rows;
    Array.from(allRows).forEach(row => {
        const price = parseFloat(row.cells[1].textContent);
        if (price < minPrice || price > maxPrice) {
            row.style.display = 'none';
        } else {
            row.style.display = '';
        }
    });
}

function updatePriceRange() {
    const minPriceValue = document.getElementById('minPrice').value;
    const maxPriceValue = document.getElementById('maxPrice').value;
    document.getElementById('minPriceValue').textContent = minPriceValue;
    document.getElementById('maxPriceValue').textContent = maxPriceValue;
}

window.onload = fetchLaptops;

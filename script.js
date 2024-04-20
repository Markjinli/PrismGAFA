async function fetchLaptops() {
    try {
        const response = await fetch('https://markjinli.github.io/PrismGAFA/data/Laptop_Data_UTF8.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        displayLaptops(parseCSV(data));
    } catch (e) {
        console.error('Failed to fetch laptops:', e);
    }
}

function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');  // 如果有标题行
    const rows = lines.slice(1);          // 去掉标题行
    return rows.map(row => row.split(',').map(cell => cell.trim()));
}

function displayLaptops(laptops) {
    const tableBody = document.getElementById('laptop-table').getElementsByTagName('tbody')[0];
    laptops.forEach(laptop => {
        const row = tableBody.insertRow();
        const imgCell = row.insertCell();
        const img = document.createElement('img');
        img.src = 'https://markjinli.github.io/PrismGAFA/images/Y7000.JPG'; // 图片链接现在直接从CSV的第一列读取
        img.style.width = '100px';
        imgCell.appendChild(img);

        laptop.slice(1).forEach(text => { // 从第二列开始读取其余数据
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
        const price = parseFloat(row.cells[2].textContent);
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

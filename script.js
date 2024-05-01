async function fetchLaptops() {
    try {
        const response = await fetch('https://markjinli.github.io/PrismGAFA/Laptop_Data_UTF8.csv');
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
        laptop.forEach((cellData, index) => {
            const cell = row.insertCell();
            if (index === 0) { // 第一列是图片URL
                const img = document.createElement('img');
                img.src = cellData;
                img.alt = 'Laptop Image';
                cell.appendChild(img);
            } else {
                cell.textContent = cellData;
            }
        });
    });
}

window.onload = fetchLaptops;

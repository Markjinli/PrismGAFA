async function fetchLaptops() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Markjinli/PrismGAFA/main/Laptop_Data_UTF8.csv');
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
    return rows.map(row => {
        const values = row.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header.trim()] = values[index].trim();
            return obj;
        }, {});
    });
}

function displayLaptops(laptops) {
    const tableBody = document.getElementById('laptop-table').getElementsByTagName('tbody')[0];
    laptops.forEach(laptop => {
        const row = tableBody.insertRow();
        const imgCell = row.insertCell();
        const img = document.createElement('img');
        img.src = `function displayLaptops(laptops) {
    const tableBody = document.getElementById('laptop-table').getElementsByTagName('tbody')[0];
    laptops.forEach(laptop => {
        const row = tableBody.insertRow();
        const imgCell = row.insertCell();
        const img = document.createElement('img');
        // 确保URL路径和文件名正确
        img.src = `https://markjinli.github.io/PrismGAFA/images/${encodeURI(laptop['Model'])}.JPG`;
        img.style.width = '100px'; // 设置图片大小
        imgCell.appendChild(img);

        Object.values(laptop).forEach((text, index) => {
            if (index === 0) return; // Skip the model for the image URL
            const cell = row.insertCell();
            cell.textContent = text;
        });
    });
}
`;
        img.style.width = '100px'; // 设置图片大小
        imgCell.appendChild(img);

        Object.values(laptop).forEach((text, index) => {
            if (index === 0) return; // Skip image URL
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
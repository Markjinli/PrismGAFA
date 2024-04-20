async function fetchLaptops() {
    const response = await fetch('https://raw.githubusercontent.com/yourusername/laptop-finder/main/data.csv');
    const data = await response.text();
    parseCSV(data);
}

function parseCSV(csvData) {
    // 解析CSV数据并更新HTML表格
}

function filterLaptops() {
    // 根据用户输入的价格范围等筛选数据
}

window.onload = fetchLaptops;

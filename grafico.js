document.addEventListener('DOMContentLoaded', function () {
    // Obtener datos de la API REST
    getDataFromApi().then(data => {
        // Filtrar datos para el día actual (por ejemplo, martes)
        const todayData = filterDataForToday(data);

        // Preparar datos para Chart.js
        const chartData = prepareChartData(todayData);

        // Crear gráfico
        createChart(chartData);
    });
});

// Función para obtener datos de la API REST
async function getDataFromApi() {
    const response = await fetch('URL_DE_TU_API_REST');
    const data = await response.json();
    return data;
}

// Función para filtrar datos para el día actual
function filterDataForToday(data) {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }); // Obtener el día actual, por ejemplo, "Tuesday"
    return data.filter(entry => entry.day === today);
}

// Función para preparar datos para Chart.js
function prepareChartData(data) {
    const labels = data.map(entry => entry.hour);
    const values = data.map(entry => entry.amount);

    return {
        labels: labels,
        datasets: [{
            label: 'Cantidad de Gente',
            data: values,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    };
}

// Función para crear el gráfico con Chart.js
function createChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: [{
                    type: 'linear',
                    position: 'bottom'
                }],
                y: [{
                    type: 'linear',
                    position: 'left'
                }]
            }
        }
    });
}
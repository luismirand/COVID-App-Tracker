
const stateNames = {
    'al': 'Alabama',
    'ak': 'Alaska',
    'az': 'Arizona',
    'ar': 'Arkansas',
    'ca': 'California',
    'co': 'Colorado',
    'ct': 'Connecticut',
    'de': 'Delaware',
    'fl': 'Florida',
    'ga': 'Georgia',
    'hi': 'Hawaii',
    'id': 'Idaho',
    'il': 'Illinois',
    'in': 'Indiana',
    'ia': 'Iowa',
    'ks': 'Kansas',
    'ky': 'Kentucky',
    'la': 'Louisiana',
    'me': 'Maine',
    'md': 'Maryland',
    'ma': 'Massachusetts',
    'mi': 'Michigan',
    'mn': 'Minnesota',
    'ms': 'Mississippi',
    'mo': 'Missouri',
    'mt': 'Montana',
    'ne': 'Nebraska',
    'nv': 'Nevada',
    'nh': 'New Hampshire',
    'nj': 'New Jersey',
    'nm': 'New Mexico',
    'ny': 'New York',
    'nc': 'North Carolina',
    'nd': 'North Dakota',
    'oh': 'Ohio',
    'ok': 'Oklahoma',
    'or': 'Oregon',
    'pa': 'Pennsylvania',
    'ri': 'Rhode Island',
    'sc': 'South Carolina',
    'sd': 'South Dakota',
    'tn': 'Tennessee',
    'tx': 'Texas',
    'ut': 'Utah',
    'vt': 'Vermont',
    'va': 'Virginia',
    'wa': 'Washington',
    'wv': 'West Virginia',
    'wi': 'Wisconsin',
    'wy': 'Wyoming'
};

let covidChartInstance;

document.getElementById('fetch-data').addEventListener('click', function() {
    const stateAbbr = document.getElementById('states').value;

    if (!stateAbbr) {
        alert("Por favor, selecciona un estado.");
        return;
    }

    const apiUrlCurrent = `https://api.covidtracking.com/v1/states/${stateAbbr}/current.json`;
    const apiUrlHistorical = `https://api.covidtracking.com/v1/states/${stateAbbr}/daily.json`;

    // Obtener datos actuales
    fetch(apiUrlCurrent)
        .then(response => response.json())
        .then(data => {
            displayStats(data, stateAbbr);
            createChart(data); // Gráfico actual
        });

    // Obtener datos históricos
    fetch(apiUrlHistorical)
        .then(response => response.json())
        .then(data => {
            createTrendChart(data); // Gráfico de tendencia
        })
        .catch(error => {
            document.getElementById('stats-content').innerHTML = `<p class="error-message">Error: ${error.message}</p>`;
            console.error('Error:', error);
        });
});


function displayStats(data, stateAbbr) {
    const stateName = stateNames[stateAbbr]; 
    const statsContent = `
        <h2>Datos de COVID-19 para ${stateName}</h2>
        <p>Casos confirmados: <br> <strong>${formatNumber(data.positive)}</strong></p>
        <p>Hospitalizaciones: <br> <strong>${formatNumber(data.hospitalizedCurrently)}</strong></p>
        <p>Recuperaciones: <br> <strong>${data.recovered ? formatNumber(data.recovered) : 'N/A'}</strong></p>
        <p>Muertes: <br> <strong>${formatNumber(data.death)}</strong></p>
    `;
    document.getElementById('stats-content').innerHTML = statsContent;
}


function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function createChart(data) {
    const ctx = document.getElementById('covidChart').getContext('2d');


    if (covidChartInstance) {
        covidChartInstance.destroy();
    }

    const chartData = {
        labels: ['Casos Confirmados', 'Hospitalizaciones', 'Recuperaciones', 'Muertes'],
        datasets: [{
            label: 'Datos de COVID-19',
            data: [data.positive, data.hospitalizedCurrently, data.recovered || 0, data.death],
            backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0', '#ffcd56'],
            borderWidth: 1
        }]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return formatNumber(value);
                    }
                }
            }
        }
    };


    covidChartInstance = new Chart(ctx, {
        type: 'pie', 
        data: chartData,
        options: chartOptions
    });
}


let covidTrendChartInstance;

function createTrendChart(data) {
    const ctx = document.getElementById('covidTrendChart').getContext('2d');


    const dates = data.slice(0, 14).map(item => item.date).reverse(); 
    const positiveCases = data.slice(0, 14).map(item => item.positive).reverse();


    const formattedDates = dates.map(date => {
        const year = String(date).slice(0, 4);
        const month = String(date).slice(4, 6);
        const day = String(date).slice(6, 8);
        return `${month}/${day}/${year}`;
    });


    if (covidTrendChartInstance) {
        covidTrendChartInstance.destroy();
    }


    covidTrendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: formattedDates,
            datasets: [{
                label: 'Casos Confirmados en los Últimos 14 Días',
                data: positiveCases,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Fecha'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                }
            }
        }
    });
}

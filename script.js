
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
        document.getElementById('stats-content').innerHTML = `<p class="error-message">Por favor, Selecciona un estado</p>`;
        return;
    }

    const apiUrl = `https://api.covidtracking.com/v1/states/${stateAbbr}/current.json`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            displayStats(data, stateAbbr);
            createChart(data);
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
        <p>Casos confirmados: <strong>${formatNumber(data.positive)}</strong></p>
        <p>Hospitalizaciones: <strong>${formatNumber(data.hospitalizedCurrently)}</strong></p>
        <p>Recuperaciones: <strong>${data.recovered ? formatNumber(data.recovered) : 'N/A'}</strong></p>
        <p>Muertes: <strong>${formatNumber(data.death)}</strong></p>
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

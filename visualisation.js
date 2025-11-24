document.addEventListener("DOMContentLoaded", () => {

    // Wildlife Chart
    const wildlifeCanvas = document.getElementById('wildlifeChart');
    if (wildlifeCanvas) {
        const wildlifeCtx = wildlifeCanvas.getContext('2d');
        new Chart(wildlifeCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sightings',
                    data: [12, 19, 7, 14, 22, 30],
                    borderColor: '#2d5016',
                    backgroundColor: 'rgba(45, 80, 22, 0.2)',
                    borderWidth: 2,
                    pointRadius: 4,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Forest Loss Chart
    const forestCanvas = document.getElementById('forestChart');
    if (forestCanvas) {
        const forestCtx = forestCanvas.getContext('2d');
        new Chart(forestCtx, {
            type: 'bar',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Hectares Lost',
                    data: [50, 80, 40, 60, 90],
                    backgroundColor: '#4a7c2a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

});

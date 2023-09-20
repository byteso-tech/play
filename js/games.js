document.addEventListener('DOMContentLoaded', function () {
    // Initialize DataTable
    const dataTable = $('#gameTable').DataTable();

    // Fetch the list of games from the API
    fetch('http://localhost:3080/api/games', {
        method: 'GET',
        headers: {
            'x-api-key': 'e2b89f5b45984c410bb4efbc8861d51433fe0988'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch game data.');
        }
    })
    .then(data => {
        // Populate the DataTable with game data
        data.forEach(game => {
            const startedDate = new Date(game.started);
            const formattedDate = `${startedDate.getFullYear()}-${(startedDate.getMonth() + 1).toString().padStart(2, '0')}-${startedDate.getDate().toString().padStart(2, '0')}`;
            const formattedTime = `${startedDate.getHours().toString().padStart(2, '0')}:${startedDate.getMinutes().toString().padStart(2, '0')}:${startedDate.getSeconds().toString().padStart(2, '0')}`;
            
            dataTable.row.add([
                game.id,
                game.screen_no,
                game.client_phone,
                game.hourly_rate,
                `${formattedDate} | ${formattedTime}`,
                game.inplay ? 'Yes' : 'No'
            ]).draw();
        });
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
});

// Function to confirm ending the game
function confirmEndGame(gameId) {
    Swal.fire({
        title: 'Are you sure you want to end the game?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, end it',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            // User confirmed, send a PUT request to end the game
            endGame(gameId);
        }
    });
}

// Function to end the game and update inplay status
function endGame(gameId) {
    // Send a PUT request to update the game's inplay status to false
    fetch(`https://bytesotech.cloud/games/api/games/${gameId}`, {
        method: 'PUT',
        headers: {
            'x-api-key': 'e2b89f5b45984c410bb4efbc8861d51433fe0988',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inplay: 0 // Set inplay to false
        })
    })
    .then(response => {
        if (response.ok) {
            // Game ended successfully, show a success message
            Swal.fire('Game Ended', 'The game has been ended successfully.', 'success')
            .then(() => {
                // Refresh the page to update the table
                location.reload();
            });
        } else {
            throw new Error('Failed to end the game.');
        }
    })
    .catch(error => {
        console.error('An error occurred while ending the game:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize DataTable
    const inplayTable = $('#inplayTable').DataTable();

    // Fetch the list of games from the API
    fetch('https://bytesotech.cloud/games/api/games', {
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
        // Filter the games where inplay is true
        const inplayGames = data.filter(game => game.inplay);

        // Populate the DataTable with in-play game data
        inplayGames.forEach(game => {
            const startedDate = new Date(game.started);
            const now = new Date();
            
            // Calculate the elapsed time in minutes
            const elapsedMinutes = (now - startedDate) / 60000; // 1 minute = 60000 milliseconds

            // Calculate the cost (elapsed time in hours * hourly rate)
            const cost = (elapsedMinutes / 60) * game.hourly_rate;

            // Format elapsed time as "X hours Y minutes"
            const elapsedHours = Math.floor(elapsedMinutes / 60);
            const remainingMinutes = elapsedMinutes % 60;
            const elapsedTimeFormatted = `${elapsedHours} Hrs ${remainingMinutes.toFixed(0)} Min`;
            const formattedTime = `${startedDate.getHours().toString().padStart(2, '0')}:${startedDate.getMinutes().toString().padStart(2, '0')}:${startedDate.getSeconds().toString().padStart(2, '0')}`;

            // Add the "End Game" button
            const endGameButton = `<button class="btn btn-danger" onclick="confirmEndGame(${game.id})">End Game</button>`;
            
            inplayTable.row.add([
                game.id,
                game.screen_no,
                game.client_phone,
                game.hourly_rate,
                `${formattedTime}`,
                `${elapsedTimeFormatted}`,
                `$ ${cost.toFixed(2)}`, // Display cost with 2 decimal places
                endGameButton
            ]).draw();
        });
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
});

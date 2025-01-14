document.addEventListener('DOMContentLoaded', () => {

    // RPS = Rock, Paper, Scissor

    //getting all the required DOM elements required
    const gameBroadcast = document.querySelector('.gameBroadcast');
    const lapScoreDisplay = document.querySelector('.lapScore');
    const userScoreDisplay = document.querySelector('.userScore');
    const lapRPS = document.querySelectorAll('.lapRPS');
    const userRPS = document.querySelectorAll('.userRPS');

    let selectedUserChoice = null;
    let selectedLapChoice = null;

    let userChoiceMade = false;
    let lapChoiceMade = false;
    let reset = false;
    let gameOver = false;
    let clickCount = 0;
    let lapScore = 0;
    let userScore = 0;

    // selecting each user RPS and adding a click event listener
    userRPS.forEach((eachUserRPS) => {

        eachUserRPS.addEventListener('click', () => {

            if (userChoiceMade === false && !gameOver) { // Ensure the game isn't over
                userChoiceMade = true;
                userSelection(eachUserRPS, eachUserRPS.id);
                selectedUserChoice = eachUserRPS;
                lapSelection();
            }
        });
    });

    //Changes applied to UI when user selection is made
    const userSelection = (selection, selectionID) => {

        selection.classList.remove('rounded-full');
        selection.classList.remove('md:hover:rounded-3xl');
        selection.classList.remove('hover:rounded-3xl');
    }

    //Computer selects a random number between 0 and 3 to choose rock, paper, scissor and changes made to UI accordingly
    const lapSelection = () => {
        lapChoiceMade = true;
        let lapChoice = null;
        let computerChoice = Math.floor(Math.random() * 3);

        switch (computerChoice) {
            case 0:
                lapChoice = 'lapRock';
                break;

            case 1:
                lapChoice = 'lapPaper';
                break;

            case 2:
                lapChoice = 'lapScissor';
                break;
        }

        // UI changed in accordance with Lap selection
        lapRPS.forEach((eachLapRPS) => {
            if (eachLapRPS.id === lapChoice) {
                eachLapRPS.classList.remove('rounded-full');
                eachLapRPS.classList.remove('md:hover:rounded-3xl');
                eachLapRPS.classList.remove('hover:rounded-3xl');

                selectedLapChoice = eachLapRPS;
                displayScore();
            }
        });
    };

    // Deciding the winner and displayig score/ Also end the game if anyone scores 10 and give user the option to restart
    const displayScore = () => {
        if (selectedUserChoice.id === 'userRock' && selectedLapChoice.id === 'lapRock') {
            gameBroadcast.innerHTML = 'DRAW. Click anywhere to continue playing';
        }

        if (selectedUserChoice.id === 'userRock' && selectedLapChoice.id === 'lapPaper') {
            gameBroadcast.innerHTML = 'LapGenius WON. Click anywhere to continue playing';
            lapScore++;
            lapScoreDisplay.innerHTML = lapScore;
        }

        if (selectedUserChoice.id === 'userRock' && selectedLapChoice.id === 'lapScissor') {
            gameBroadcast.innerHTML = "You WON!! Click anywhere to continue playing"
            userScore++;
            userScoreDisplay.innerHTML = userScore;
        }

        // =====================================================

        if (selectedUserChoice.id === 'userPaper' && selectedLapChoice.id === 'lapPaper') {
            gameBroadcast.innerHTML = 'DRAW. Click anywhere to continue playing';
        }

        if (selectedUserChoice.id === 'userPaper' && selectedLapChoice.id === 'lapRock') {
            gameBroadcast.innerHTML = 'You WON!! Click anywhere to continue playing';
            userScore++;
            userScoreDisplay.innerHTML = userScore;
        }

        if (selectedUserChoice.id === 'userPaper' && selectedLapChoice.id === 'lapScissor') {
            gameBroadcast.innerHTML = "LapGenius WON. Click anywhere to continue playing"
            lapScore++;
            lapScoreDisplay.innerHTML = lapScore;
        }

        // ==================================================
        if (selectedUserChoice.id === 'userScissor' && selectedLapChoice.id === 'lapScissor') {
            gameBroadcast.innerHTML = 'DRAW. Click anywhere to continue playing';
        }

        if (selectedUserChoice.id === 'userScissor' && selectedLapChoice.id === 'lapRock') {
            gameBroadcast.innerHTML = 'LapGenius WON. Click anywhere to continue playing';
            lapScore++;
            lapScoreDisplay.innerHTML = lapScore;
        }

        if (selectedUserChoice.id === 'userScissor' && selectedLapChoice.id === 'lapPaper') {
            gameBroadcast.innerHTML = "You WON!! Click anywhere to continue playing"
            userScore++;
            userScoreDisplay.innerHTML = userScore;
        }

        if (userScore === 10 || lapScore === 10) {

            if (userScore === 10) {
                gameBroadcast.classList.add('bg-[#40b8da]');
                gameBroadcast.classList.remove('text-white');
                gameBroadcast.classList.add('text-black');
                gameBroadcast.classList.add('font-semibold');
                gameBroadcast.innerHTML = 'Congragulations You WON!! Click anywhere to Restart the Game'
                gameOver = true;
                clickCount++;
            }

            if (lapScore === 10) {
                gameBroadcast.classList.add('bg-[#fb2223]');
                gameBroadcast.classList.remove('text-white');
                gameBroadcast.classList.add('text-black');
                gameBroadcast.classList.add('font-semibold');
                gameBroadcast.innerHTML = 'LapGenius WON. Click anywhere to Restart the Game';
                gameOver = true;
                clickCount++;
            }
        }

        if (!gameOver) {
            reset = true;
            clickCount++;
        }
    };

    //Resetting UI before for the next round of game
    const resetUI = () => {

        selectedLapChoice.classList.add('rounded-full');
        selectedLapChoice.classList.add('md:hover:rounded-3xl');
        selectedLapChoice.classList.add('hover:rounded-3xl');

        selectedUserChoice.classList.add('rounded-full');
        selectedUserChoice.classList.add('md:hover:rounded-3xl');
        selectedUserChoice.classList.add('hover:rounded-3xl');

        // Reset flags for a new round
        clickCount = 0;
        userChoiceMade = false;
        lapChoiceMade = false;
        reset = false;
        selectedUserChoice = null;
        selectedLapChoice = null;

        gameBroadcast.innerHTML = `Choose &nbsp; <i class="fa-solid fa-hand-back-fist"></i> &nbsp;&nbsp;<i class="fa-solid fa-hand"></i> &nbsp;&nbsp;<i class="fa-solid fa-hand-scissors"></i>`;
    };

    // configuring page click event to trigger restting of UI or restarting the game
    document.addEventListener('click', () => {


        if (reset) {
            clickCount++;

            if (clickCount > 2) {
                resetUI();
            }
        }

        if (gameOver) {

            clickCount++;

            if (clickCount > 2) {
                location.reload();
            }
        }
    });

});
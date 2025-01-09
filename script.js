let participantsList = [];

function addParticipant() {
    const participantName = document.getElementById('participantName').value.trim();
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '';
    
    if (!validateName(participantName)) {
        errorDiv.textContent = 'Invalid name. Please enter only letters and spaces.';
        return;
    }

    participantsList.push(participantName);
    displayParticipants();
    document.getElementById('participantName').value = '';
}

function validateName(name) {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}

function displayParticipants() {
    const participantsDiv = document.getElementById('participants');
    participantsDiv.innerHTML = '';
    participantsList.forEach(participant => {
        const div = document.createElement('div');
        div.className = 'participant';
        div.textContent = participant;
        participantsDiv.appendChild(div);
    });
}

function drawMatches() {
    const matchesDiv = document.getElementById('matches');
    matchesDiv.innerHTML = '';
    
    if (participantsList.length % 2 !== 0 || participantsList.length === 0 || participantsList.length === 1) {
        document.getElementById('error').textContent = 'Number of participants must be even.';
        return;
    }


    // Shuffle participants
    const shuffledParticipants = [...participantsList].sort(() => 0.5 - Math.random());

    // Form teams of 2
    let teams = [];
    for (let i = 0; i < shuffledParticipants.length; i += 2) {
        teams.push(shuffledParticipants[i] + " & " + shuffledParticipants[i + 1]);
    }

    // Create matches 2 teams vs 2 teams
    for (let i = 0; i < teams.length; i += 2) {
      console.log(">>>", teams)
        const matchDiv = document.createElement('div');
        matchDiv.className = 'match';

        const team1Div = document.createElement('div');
        team1Div.className = 'team';
        team1Div.textContent = teams[i];


        const team2Div = document.createElement('div');
        team2Div.className = 'team';
        team2Div.textContent = teams[i + 1];

      
        matchDiv.appendChild(team1Div);
        // if(teams.length > 2) {
          matchDiv.appendChild(team2Div);
        // }
        matchesDiv.appendChild(matchDiv);
    }

    // Trigger confetti
    launchConfetti();
}

function launchConfetti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
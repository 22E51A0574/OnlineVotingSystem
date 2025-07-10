let votes = {
  A: 0,
  B: 0,
  C: 0
};
let totalVotes = 0;

const ctx = document.getElementById('resultsChart').getContext('2d');
let resultsChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Candidate A', 'Candidate B', 'Candidate C'],
      datasets: [{
          label: 'Votes',
          data: [votes.A, votes.B, votes.C],
          backgroundColor: [
              '#3498db',
              '#e74c3c',
              '#2ecc71'
          ],
          borderColor: [
              '#2980b9',
              '#c0392b',
              '#27ae60'
          ],
          borderWidth: 2
      }]
  },
  options: {
      responsive: true,
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});

function vote(candidate) {
  if (localStorage.getItem('hasVoted')) {
      alert("You've already voted!");
      return;
  }

  votes[candidate] += 1;
  totalVotes += 1;
  localStorage.setItem('hasVoted', 'true');

  updateResults();
  showConfirmation(candidate);
}

function updateResults() {
  resultsChart.data.datasets[0].data = [votes.A, votes.B, votes.C];
  resultsChart.update();

  document.getElementById('totalVotes').textContent = totalVotes;
}

function showDetailedResults() {
  document.getElementById('votesA').textContent = votes.A;
  document.getElementById('votesB').textContent = votes.B;
  document.getElementById('votesC').textContent = votes.C;

  document.getElementById('percentA').textContent = totalVotes > 0 ? ((votes.A / totalVotes) * 100).toFixed(2) + '%' : '0%';
  document.getElementById('percentB').textContent = totalVotes > 0 ? ((votes.B / totalVotes) * 100).toFixed(2) + '%' : '0%';
  document.getElementById('percentC').textContent = totalVotes > 0 ? ((votes.C / totalVotes) * 100).toFixed(2) + '%' : '0%';

  document.getElementById('detailedResults').style.display = 'block';
}

function resetVotes() {
  votes = { A: 0, B: 0, C: 0 };
  totalVotes = 0;
  localStorage.removeItem('hasVoted');

  updateResults();
  document.getElementById('detailedResults').style.display = 'none';
  alert("Votes have been reset!");
}

function showConfirmation(candidate) {
  const confirmationMessage = document.createElement('div');
  confirmationMessage.classList.add('confirmation');
  confirmationMessage.innerHTML = `Thank you for voting for Candidate ${candidate}!`;

  document.body.appendChild(confirmationMessage);

  setTimeout(() => {
      confirmationMessage.classList.add('fade-out');
      setTimeout(() => confirmationMessage.remove(), 500);
  }, 3000);
}
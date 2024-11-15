// script.js
document.getElementById('form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const appointmentDate = document.getElementById('date').value;
  
    // Example API request to book appointment
    const response = await fetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, appointmentDate })
    });
  
    if (response.ok) {
      alert("Appointment booked successfully!");
    } else {
      alert("Failed to book appointment.");
    }
  });
  
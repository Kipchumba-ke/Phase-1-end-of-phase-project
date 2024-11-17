document.getElementById('user').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = document.getElementById('user');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const appointmentDate = document.getElementById('date').value;

    try {
        const response = await fetch('http://127.0.0.1:3000/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, appointmentDate }),
        });

        if (response.ok) {
            alert("Appointment booked successfully!");
            form.reset();
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert("Failed to book appointment.");
    }
});

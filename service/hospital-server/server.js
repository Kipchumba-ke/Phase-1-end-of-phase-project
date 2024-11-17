const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const appointments = [];

app.post('/appointments', (req, res) => {
    const { name, email, appointmentDate } = req.body;

    if (!name || !email || !appointmentDate) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    const newAppointment = { id: appointments.length + 1, name, email, appointmentDate };
    appointments.push(newAppointment);

    res.status(201).send({ message: 'Appointment booked successfully', appointment: newAppointment });
});

app.get('/appointments', (req, res) => {
    res.send(appointments);
});

app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});

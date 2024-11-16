const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/feedback', (req, res) => {
    fs.readFile('feedback.json', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Unable to read feedback data.' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/feedback', (req, res) => {
    const newFeedback = req.body;

    if (!newFeedback.name || !newFeedback.rating || !newFeedback.text) {
        res.status(400).json({ error: 'Name, rating, and feedback text are required.' });
        return;
    }

    fs.readFile('feedback.json', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Unable to read feedback data.' });
            return;
        }

        const feedbackData = JSON.parse(data);
        feedbackData.feedbacks.push(newFeedback);

        fs.writeFile('feedback.json', JSON.stringify(feedbackData, null, 2), (err) => {
            if (err) {
                res.status(500).json({ error: 'Unable to save feedback data.' });
                return;
            }
            res.status(201).json({ message: 'Feedback saved successfully!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

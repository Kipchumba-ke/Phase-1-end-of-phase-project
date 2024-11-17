const feedbackDisplay = document.getElementById("feedback-display");
const loadMoreButton = document.getElementById("load-more");
const submitFeedbackButton = document.getElementById("submit-feedback");
const feedbackName = document.getElementById("feedback-name");
const feedbackText = document.getElementById("feedback-text");
const starInputs = document.querySelectorAll('input[name="rate"]');

let feedbackData = [];
let currentPage = 1;
const itemsPerPage = 3;

function fetchFeedback() {
    fetch('http://localhost:3000/api/feedback')
        .then(response => response.json())
        .then(data => {
            feedbackData = data.feedbacks;
            displayFeedback(currentPage);
        })
        .catch(error => console.error('Error fetching feedback:', error));
}


function displayFeedback(page) {
    feedbackDisplay.innerHTML = "";
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const feedbackToShow = feedbackData.slice(startIndex, endIndex);

    feedbackToShow.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <p>${item.text}</p>
            <strong>${item.name} - ${item.rating} Stars</strong>
        `;
        feedbackDisplay.appendChild(card);
    });

    if (feedbackData.length > endIndex) {
        loadMoreButton.style.display = "block";
    } else {
        loadMoreButton.style.display = "none";
    }
}

submitFeedbackButton.addEventListener("click", () => {
    const selectedRating = [...starInputs].find(input => input.checked)?.value;
    const name = feedbackName.value.trim();
    const text = feedbackText.value.trim();

    if (!name || !selectedRating || !text) {
        alert("Please provide your name, a rating, and feedback!");
        return;
    }

    const newFeedback = { name, rating: parseInt(selectedRating), text };

    fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedback),
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to save feedback');
            return response.json();
        })
        .then(() => {
            feedbackName.value = "";
            feedbackText.value = "";
            starInputs.forEach(input => input.checked = false);

            fetchFeedback();
        })
        .catch(error => console.error('Error submitting feedback:', error));
});

loadMoreButton.addEventListener("click", () => {
    currentPage++;
    displayFeedback(currentPage);
});

fetchFeedback();

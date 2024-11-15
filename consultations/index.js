document.getElementById("fetchDataButton").addEventListener("click", () => {
    const weekInput = document.getElementById("weekInput").value;
    const infoContainer = document.getElementById("info");

    // Reset content before adding new data
    infoContainer.classList.remove("expanded");
    document.getElementById("youHeading").innerText = "";
    document.getElementById("you").innerText = "";
    document.getElementById("babyHeading").innerText = "";
    document.getElementById("baby").innerText = "";
    document.getElementById("thinkHeading").innerText = "";
    document.getElementById("think").innerText = "";

    if (weekInput < 1 || weekInput > 40 || isNaN(weekInput)) {
        alert("Please enter a valid week number between 1 and 40.");
        return;
    }

    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            const weekData = data.pregnancy.find(item => item.week == weekInput);
            if (weekData) {
                document.getElementById("youHeading").innerText = "What's happening to you:";
                document.getElementById("you").innerText = weekData.you;

                document.getElementById("babyHeading").innerText = "Baby's development:";
                document.getElementById("baby").innerText = weekData.baby;

                document.getElementById("thinkHeading").innerText = "What to think about:";
                document.getElementById("think").innerText = weekData.think;

                infoContainer.classList.add("expanded");
            } else {
                alert("No data available for the entered week.");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Failed to fetch data. Please try again later.");
        });
});


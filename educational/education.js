let jsonData = {};

async function fetchData() {
    try {
        const response = await fetch('db.json');
        jsonData = await response.json();
        renderMainView();
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}

function renderMainView() {
    const container = document.querySelector('.container');
    container.innerHTML = `
        <h1>Mother and Child Health Journey</h1>
        <div class="service-cards">
            ${Object.keys(jsonData).map(key => `
                <div class="card">
                    <h2>${jsonData[key].title}</h2>
                    <button onclick="renderDetailView('${key}')">LEARN MORE</button>
                </div>
            `).join('')}
        </div>
    `;
}

function renderDetailView(key) {
    const container = document.querySelector('.container');
    const selectedData = jsonData[key];
    let contentHtml = '';

    if (key === 'vaccination') {
        contentHtml = `
            <table>
                <thead>
                    <tr>
                        <th>Age</th>
                        <th>Vaccine</th>
                        <th>Disease Prevented</th>
                    </tr>
                </thead>
                <tbody>
                    ${selectedData.body.map(entry => `
                        <tr>
                            <td>${entry.age}</td>
                            <td>${entry.vaccine}</td>
                            <td>${entry["Disease Prevented"]}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } else {
        contentHtml = selectedData.body.map(item => `<p>${item}</p>`).join('');
    }

    container.innerHTML = `
        <h1>${selectedData.title}</h1>
        <div class="content">
            ${contentHtml}
        </div>
        <h3>References and Further Reading</h3>
        <ul>
            ${
                Array.isArray(selectedData.articles)
                    ? selectedData.articles.map(article => `<li><a href="${article}" target="_blank">${article}</a></li>`).join('')
                    : `<li><a href="${selectedData.articles}" target="_blank">${selectedData.articles}</a></li>`
            }
        </ul>
        <button onclick="renderMainView()" class="back-button">Back</button>
    `;
}

document.addEventListener('DOMContentLoaded', fetchData);

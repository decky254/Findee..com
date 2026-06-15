async function search() {
    const text = document.getElementById("text").value;
    const location = document.getElementById("location").value;

    const res = await fetch("https://YOUR-BACKEND-URL.onrender.com/search", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text, location})
    });

    const data = await res.json();

    // 🧠 AI understanding
    document.getElementById("aiBox").innerHTML = `
        <h3>🧠 AI Understanding</h3>
        <pre>${JSON.stringify(data.ai_analysis, null, 2)}</pre>
    `;

    // 💡 Did you know
    document.getElementById("didBox").innerHTML = `
        <h3>💡 Did You Know?</h3>
        ${data.did_you_know.map(x => `<p>• ${x}</p>`).join("")}
    `;

    // 🔗 Results
    document.getElementById("results").innerHTML = `
        <h3>🔗 Results</h3>
        ${data.results.map(r => `
            <div class="card">
                <h4>${r.title}</h4>
                <p>${r.category} → ${r.subcategory}</p>
                <a href="${r.url}" target="_blank">Open Link</a>
            </div>
        `).join("")}
    `;
}

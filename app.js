async function search() {
    const text = document.getElementById("text").value;
    const location = document.getElementById("location").value;

    const res = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text, location})
    });

    const data = await res.json();

    document.getElementById("ai").innerHTML =
        `<h3>AI Understanding</h3><pre>${JSON.stringify(data.ai_analysis, null, 2)}</pre>`;

    document.getElementById("didyouknow").innerHTML =
        "<h3>Did You Know?</h3>" +
        data.did_you_know.map(d => `<p>💡 ${d}</p>`).join("");

    document.getElementById("results").innerHTML =
        "<h3>Results</h3>" +
        data.results.map(r => `<p><a href="${r.url}" target="_blank">${r.title}</a></p>`).join("");
}

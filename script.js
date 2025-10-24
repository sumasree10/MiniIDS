let logsData = [];
let currentFilter = "ALL";
let knownMalicious = new Set(); // Track previously alerted MALICIOUS IPs

async function loadLogs() {
    try {
        const response = await fetch("logs.json?cache=" + Date.now());
        const newLogs = await response.json();

        // Check for new malicious logs
        newLogs.forEach(log => {
            if (log.status === "MALICIOUS" && !knownMalicious.has(log.ip)) {
                alert(`⚠️ New MALICIOUS activity detected from ${log.ip}`);
                knownMalicious.add(log.ip);
            }
        });

        logsData = newLogs;
        renderTable();
    } catch (err) {
        console.error("Error loading logs:", err);
        alert("Cannot load logs. Make sure IDS.java has run and generated logs.json!");
    }
}

function renderTable() {
    const tbody = document.querySelector("#logTable tbody");
    tbody.innerHTML = "";

    logsData
        .filter(log => currentFilter === "ALL" || log.status === currentFilter)
        .forEach(log => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${log.ip}</td>
                <td><span class="status ${log.status.toLowerCase()}">${log.status}</span></td>
            `;
            tbody.appendChild(row);
        });

    // Update stats
    const total = logsData.length;
    const normalCount = logsData.filter(log => log.status === "NORMAL").length;
    const maliciousCount = logsData.filter(log => log.status === "MALICIOUS").length;
    document.getElementById("logStats").textContent =
        `Total Logs: ${total} | Normal: ${normalCount} | Malicious: ${maliciousCount}`;
}

// Event listeners
document.getElementById("loadLogs").addEventListener("click", loadLogs);

// Filter toggle buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.getAttribute("data-status");
        renderTable();
    });
});

// Auto-refresh every 5 seconds
setInterval(loadLogs, 5000);

// Initial load
loadLogs();

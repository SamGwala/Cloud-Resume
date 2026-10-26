const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const printBtn = document.getElementById("printBtn");
if (printBtn) printBtn.addEventListener("click", () => window.print());

/*
  Visitor counter.
  Leave API_URL empty until the backend (API Gateway + Lambda + DynamoDB) is live:
  the visitor line stays hidden, so the page never shows an "API pending" message.
  When ready, set it to your endpoint, e.g.
  "https://YOUR-API-ID.execute-api.YOUR-REGION.amazonaws.com/prod/visitors"
  The Lambda must increment the DynamoDB count atomically and the API must allow
  CORS for your site's domain. It should return JSON like { "count": 123 }.
*/
const API_URL = "";

const countEl = document.getElementById("visitorCount");
const visitorLine = document.querySelector(".visitor");

if (countEl && visitorLine) {
  if (!API_URL) {
    visitorLine.hidden = true;
  } else {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Visitor API returned " + response.status);
        return response.json();
      })
      .then((data) => {
        countEl.textContent = Number(data.count).toLocaleString("en-ZA");
      })
      .catch(() => {
        visitorLine.hidden = true;
      });
  }
}

/* SkyGuard status table, built from skyguard-status.js */
(function renderSkyGuardStatus() {
  const data = window.SKYGUARD;
  const body = document.getElementById("skyguard-status-body");
  if (!data || !body) return;

  const slug = (s) => String(s).toLowerCase().replace(/\s+/g, "-");
  (data.components || []).forEach((c) => {
    const tr = document.createElement("tr");
    const name = document.createElement("td");
    name.textContent = c.name;
    const status = document.createElement("td");
    const pill = document.createElement("span");
    pill.className = "pill st-" + slug(c.status);
    pill.textContent = c.status;
    status.appendChild(pill);
    tr.append(name, status);
    body.appendChild(tr);
  });

  const comps = data.components || [];
  const done = comps.filter((c) => c.status === "Operational").length;
  const scen = data.scenarios || [];
  const run = scen.filter((s) => s.status === "Run").length;

  const summary = document.getElementById("skyguard-summary");
  if (summary) {
    summary.textContent = done + " of " + comps.length + " components operational · " +
      run + " of " + scen.length + " failure scenarios run end to end";
  }

  const updated = document.getElementById("skyguard-updated");
  if (updated && data.updated) {
    const d = new Date(data.updated + "T00:00:00Z");
    updated.textContent = "Last updated " +
      d.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  }

  const labels = { diagram: "Architecture diagram", recording: "Failure-run recording",
                   runbook: "Runbook", decision: "Decision record", repo: "Repository" };
  const box = document.getElementById("skyguard-evidence");
  if (box) {
    const links = Object.keys(labels).filter((k) => data.links && data.links[k]);
    if (!links.length) { box.hidden = true; }
    else {
      box.appendChild(document.createTextNode("Evidence: "));
      links.forEach((k, i) => {
        if (i) box.appendChild(document.createTextNode(" · "));
        const a = document.createElement("a");
        a.href = data.links[k];
        a.textContent = labels[k];
        if (/^https?:/.test(a.href)) { a.target = "_blank"; a.rel = "noopener"; }
        box.appendChild(a);
      });
    }
  }
})();

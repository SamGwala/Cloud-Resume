/*
  SkyGuard status: the ONLY file you edit to update the project section.
  Change a status, change "updated", save, upload. No HTML edits needed.

  Component status: "Designed" | "In build" | "Operational"
  Scenario status:  "Designed" | "Run"
  Evidence links:   leave "" until the thing exists; empty links are hidden automatically.
  Defaults below are deliberately conservative. Promote an item only when you can demo it.
*/
window.SKYGUARD = {
  updated: "2026-10-22",

  components: [
    { name: "Terraform modules (network, compute, IAM, monitoring)", status: "Designed" },
    { name: "Detection: CloudWatch alarms and health checks → EventBridge", status: "Designed" },
    { name: "Classification and context enrichment (Lambda)", status: "Designed" },
    { name: "Remediation via Systems Manager (restart, instance replacement)", status: "Designed" },
    { name: "Recovery validation and escalation", status: "Designed" },
    { name: "Incident history (DynamoDB)", status: "Designed" },
    { name: "Observability: metrics, structured logs, Grafana dashboards", status: "Designed" },
    { name: "CI/CD pipeline (validate, scan, test, build, deploy)", status: "Designed" }
  ],

  scenarios: [
    { name: "Application crash", status: "Designed" },
    { name: "Service failure", status: "Designed" },
    { name: "Resource exhaustion", status: "Designed" },
    { name: "Unhealthy instance", status: "Designed" },
    { name: "Failed remediation", status: "Designed" },
    { name: "Failed deployment", status: "Designed" },
    { name: "Repeated incident", status: "Designed" }
  ],

  links: {
    repo: "https://github.com/SamGwala/SkyGuard",
    diagram: "",
    recording: "",
    runbook: "",
    decision: ""
  }
};

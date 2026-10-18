# Sam Gwala — Cloud Resume Challenge

Static CV website built with HTML, CSS and JavaScript.

## Files

- `index.html` — CV structure/content
- `style.css` — responsive styling
- `script.js` — browser functionality and visitor-counter integration point

## Cloud Resume Challenge architecture

Planned AWS deployment:

Browser
  ↓
CloudFront
  ↓
S3 static website bucket

Visitor counter:
Browser → API Gateway → Lambda → DynamoDB

Infrastructure:
Terraform → S3 + CloudFront + API Gateway + Lambda + DynamoDB + IAM

CI/CD:
GitHub Actions → validation/tests → Terraform/deployment

## Before publishing

1. Replace the placeholder LinkedIn URL.
2. Replace the placeholder email address.
3. Update the SkyGuard and UN Smart Facility repository links to their exact repositories.
4. Add the visitor-counter API URL to `script.js` after the backend is deployed.

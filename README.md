# riyadhalmahmud.tech - Personal Portfolio

Live Deployment: [https://riyadhalmahmud.tech/](https://riyadhalmahmud.tech/)

## Overview

This repository contains the source code for the professional portfolio of Riyadh Al Mahmud. The project is a highly optimized, responsive web application engineered to bridge the gap between software specifications and operational project execution.

The system acts as a decoupled, headless architecture, dynamically sourcing its primary content data models from a remote spreadsheet infrastructure. This setup eliminates heavy database overhead to ensure rapid data syncs, minimal loading latencies, and total separation of concerns.

## Core Technical Features

* **Zero-Latency Static Engine:** Built utilizing Vite and TypeScript to ensure lightning-fast browser parsing and instantaneous layout rendering.
* **Headless Data Pipeline:** Dynamically injects structured portfolio content from a managed Google Sheets backend API asynchronously.
* **Automated CI/CD Pipeline:** Integrated via GitHub Actions to orchestrate seamless automated compilation and immediate production server deployment.
* **Clean Data Layout:** Styled with utility modules via Tailwind CSS, strictly structured to prioritize text scannability and professional information hierarchy.
* **Code Architecture Quality:** Validated and monitored via Oxlint to guarantee optimal static compilation and rigid code structure integrity.

## Development & Local Execution

To clone the platform and initialize the development ecosystem locally, ensure you have Node.js installed:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/r7riyadh/portfolio.git
   cd portfolio/app
   npm install
   npm run dev
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

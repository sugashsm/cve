# CVE Project

This project is part of the recruitment process for **Securin** and demonstrates skills in logical problem-solving, code quality, and a structured approach to addressing the task requirements. Below are the details of the project setup, implementation, and usage.

## Table of Contents
- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Usage Instructions](#usage-instructions)
- [Approach](#approach)
- [Screenshots](#screenshots)
- [Contact](#contact)

---

## Project Overview

This project involves fetching CVE (Common Vulnerabilities and Exposures) data from the NVD API, processing it, and storing it in a database. It provides a UI to display, filter, and interact with the data. The project adheres to best practices and ensures data quality and vulnerability-free code.

---

## Problem Statement

1. **Fetch CVE Data**: Consume CVE information from the NVD CVE API and store it in a database.
   - API Base URL: `https://services.nvd.nist.gov/rest/json/cves/2.0`
   - Use pagination (`startIndex` and `resultsPerPage`) to access all CVEs.

2. **Data Processing**:
   - Cleanse and deduplicate data.
   - Ensure high data quality.

3. **Batch Synchronization**:
   - Periodically synchronize the CVE database in batch mode (full refresh or incremental updates).

4. **Develop APIs**:
   - Fetch and filter CVE details by:
     - CVE ID
     - Specific year
     - CVE Score
     - Last modified in N days

5. **UI Visualization**:
   - Display CVE data in a table with a "Total Records" count.
   - Include "Results Per Page" options (`10`, `50`, `100`) to dynamically update displayed records.



## Folder Structure

```
cve/
├── .next/                  # Next.js build files
├── app/                    # Application files
│   ├── api/cve/            # API endpoints
│   │   ├── [id]/           # Fetch CVE by ID
│   │   └── cves/           # Fetch CVEs
│   │       └── [id]/       # Fetch CVE details
│   ├── list/               # List page
│   │   └── page.js         # Main list page
│   ├── layout.js           # Layout configuration
│   └── page.js             # Root page
├── lib/                    # Libraries and utilities
│   ├── models/             # Database models
│   │   └── cve.js          # CVE model
│   └── utils/              # Utility functions
│       └── mongodb.js      # MongoDB connection
├── public/                 # Static assets
├── .env.local              # Environment variables
├── .gitignore              # Git ignored files
├── jsconfig.json           # JS configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies
├── README.md               # Project documentation
├── tailwind.config.mjs     # Tailwind CSS configuration

```
## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cve-project.git
   cd cve-project

# CVE 
A full-stack project that integrates with the NVD CVE API to fetch, process, and visualize Common Vulnerabilities and Exposures (CVE) data. This application includes a backend for data ingestion and API services, a frontend for dynamic UI visualization, and a MongoDB database for secure storage.

Tech Stack:
- Frontend: Next.js, Tailwind CSS
- Backend: Node.js
- Database: MongoDB
- API: NVD CVE API

## Table of Contents
- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Approach](#approach)
- [Screenshots](#screenshots)
- [Future Enhancement](#future-enhancements)
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
   - Fetch CVE details by:
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

2.Install dependencies:
```
npm install
```
## if you prefer Yarn:
```
yarn install
```
3.Configure environment variables in .env.local:
```
MONGO_URI=<your_mongodb_connection_string>
```
4. Start the development server:
```
npm run dev
```
## if using Yarn:
```
yarn dev
```
## Approach
1. **Initial Data Fetch**:
- Use the NVD CVE API to fetch all CVE data during the initial setup or a scheduled batch synchronization process.
- Fetch data in batches using startIndex and resultsPerPage for pagination.

2. **Data Processing and Storage**:
- Process the fetched data to ensure it is cleansed and deduplicated.
- Store the processed data in MongoDB using a defined schema.
  
3. **Data Retrieval**:
- APIs fetch data directly from MongoDB for frontend requests, eliminating the need for repeated API calls to the NVD service.

4. **UI Visualization**:
- Build a responsive interface using Next.js and Tailwind CSS.
- Display CVE data in a paginated table with options to filter and sort.

5. **Testing**:
- Ensure all API endpoints and UI features are covered with appropriate unit and integration tests.


## Screenshots 

![image](https://github.com/user-attachments/assets/d44fc85d-643b-47e8-80f1-1d25389be321)
![image](https://github.com/user-attachments/assets/329397f2-9d4c-4079-aa63-d106d96c9ac2)

## Future Enhancements
- Add advanced filtering and sorting options.
- Implement authentication and authorization.
- Provide detailed CVE analytics using charts.

## Contact
For queries or feedback, reach out at:
- Name: Sugash Srimari Rajendran 
- Email: sugash.smr@gmail.com
- GitHub: sugashsm



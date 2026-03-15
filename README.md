# Resume Analyzer Frontend

A modern, responsive web application that analyzes resumes using AI and provides detailed feedback, match scores, and improvement suggestions based on job descriptions.

Built using **Next.js, TypeScript, and Tailwind CSS** for a fast and scalable frontend experience.

---

#  Table of Contents

* Features
* Tech Stack
* Prerequisites
* Installation
* Getting Started
* Project Structure
* Environment Variables
* Build & Deployment
* Deployment on Render
* Usage
* Contributing
* License
* Support

---

#  Features

• Upload resumes in **PDF or DOCX format**
• Analyze resumes against **job descriptions**
• AI-generated **match score (0-100)**
• Identify **missing skills**
• Detect **resume weaknesses**
• Provide **improvement plan and suggestions**
• Clean **dashboard UI with analysis results**
• Fully **responsive design**

---

#  Tech Stack

| Layer              | Technology    |
| ------------------ | ------------- |
| Frontend Framework | Next.js       |
| Language           | TypeScript    |
| Styling            | Tailwind CSS  |
| State Management   | React Hooks   |
| API Communication  | Fetch / Axios |
| Deployment         | Render        |

---

#  Prerequisites

Make sure the following are installed:

* Node.js (v18 or higher)
* npm or yarn
* Git

Check installed versions:

```
node --version
npm --version
```

---

#  Installation

### 1 Clone the Repository

```
git clone https://github.com/Patil-Shital-9236/resume-analyzer-frontend.git
```

```
cd resume-analyzer-frontend
```

---

### 2 Install Dependencies

Using npm

```
npm install
```

Using yarn

```
yarn install
```

Using pnpm

```
pnpm install
```

---

#  Getting Started

Start the development server

```
npm run dev
```

or

```
yarn dev
```

Application will run at

```
http://localhost:3000
```

The page automatically reloads when you make changes.

---

#  Project Structure

```
resume-analyzer-frontend
│
├── src
│   ├── app
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components
│   │   └── reusable UI components
│   │
│   └── services
│       └── API service functions
│
├── public
│   └── static assets
│
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

#  Environment Variables

Create a `.env.local` file in the root folder.

Example:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
NEXT_PUBLIC_API_TIMEOUT=30000
```

Important:

Only variables starting with **NEXT_PUBLIC_** are exposed to the browser.

Never expose secret keys in frontend.

---

#  Build & Run Production

Build the application

```
npm run build
```

Start production server

```
npm start
```

---

#  Deployment on Render

### Step 1 Create Render Account

Go to

```
https://render.com
```

Sign up using GitHub.

---

### Step 2 Create New Web Service

Dashboard → **New + → Web Service**

Select repository

```
resume-analyzer-frontend
```

---

### Step 3 Configure Deployment

| Setting       | Value                        |
| ------------- | ---------------------------- |
| Environment   | Node                         |
| Branch        | main                         |
| Build Command | npm install && npm run build |
| Start Command | npm start                    |
| Node Version  | 18                           |

---

### Step 4 Add Environment Variables

Example

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

---

### Step 5 Deploy

Click

```
Create Web Service
```

After deployment your app will be available at

```
https://resume-analyzer-frontend.onrender.com
```

---

#  Usage

### 1 Upload Resume

User uploads a resume file.

Supported formats:

* PDF
* DOCX

---

### 2 Paste Job Description

User pastes the target job description.

Optional fields

* Job Title
* Company

---

### 3 Run Analysis

System performs AI analysis and returns:

* Resume match score
* Missing skills
* Weaknesses
* Improvement plan
* Summary feedback

---

#  API Integration

Frontend communicates with backend APIs.

Example endpoints

```
POST /upload-resume
POST /full-analysis
GET /analysis-history
```

Backend handles:

* Resume parsing
* AI analysis
* Skill extraction
* Score calculation

---

#  Contributing

Contributions are welcome.

Steps:

1 Fork the repository

2 Create new branch

```
git checkout -b feature/new-feature
```

3 Commit changes

```
git commit -m "Add new feature"
```

4 Push branch

```
git push origin feature/new-feature
```

5 Create Pull Request

---

#  Support

If you encounter issues:

Open GitHub Issue

```
https://github.com/Patil-Shital-9236/resume-analyzer-frontend/issues
```

---

#  Author

Shital Patil

GitHub
[https://github.com/Patil-Shital-9236](https://github.com/Patil-Shital-9236)

Project Repository
[https://github.com/Patil-Shital-9236/resume-analyzer-frontend](https://github.com/Patil-Shital-9236/resume-analyzer-frontend)

---

Last Updated: March 2026

Project Status: Active Development

---

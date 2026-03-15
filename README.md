
---

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
* Deployment on Vercel
* Usage
* API Integration
* Contributing
* License
* Support

---

#  Features

• Upload resumes in **PDF format**
• Analyze resumes against **job descriptions**
• AI-generated **match score (0–100)**
• Identify **missing skills**
• Detect **resume weaknesses**
• Provide **improvement plan and suggestions**
• Clean **dashboard UI with analysis results**
• Fully **responsive design**

---

#  Tech Stack

| Layer              | Technology   |
| ------------------ | ------------ |
| Frontend Framework | Next.js      |
| Language           | TypeScript   |
| Styling            | Tailwind CSS |
| State Management   | React Hooks  |
| API Communication  | Fetch API    |
| Deployment         | Vercel       |

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

# Getting Started

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
│   ├── services
│   │   └── api.ts
│   │
│   └── utils
│       └── helper functions
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
NEXT_PUBLIC_API_URL=https://resume-analyzer-backend-uk1x.onrender.com
```

Important:

Only variables starting with **NEXT_PUBLIC_** are exposed to the browser.

Never expose secret keys in frontend applications.

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

# Deployment on Vercel

### Step 1 Create Vercel Account

Go to

```
https://vercel.com
```

Sign up using GitHub.

---

### Step 2 Import Project

Click **Add New → Project**

Select repository

```
resume-analyzer-frontend
```

---

### Step 3 Configure Deployment

| Setting          | Value         |
| ---------------- | ------------- |
| Framework Preset | Next.js       |
| Build Command    | npm run build |
| Output Directory | .next         |
| Install Command  | npm install   |
| Node Version     | 18+           |

---

### Step 4 Add Environment Variables

Example

```
NEXT_PUBLIC_API_URL=https://resume-analyzer-backend-uk1x.onrender.com
```

---

### Step 5 Deploy

Click

```
Deploy
```

After deployment your app will be available at

```
https://resume-analyzer-frontend-eight-nu.vercel.app
```

---

#  Usage

### 1 Upload Resume

User uploads a resume file.

Supported formats:

* PDF
* DOCX

---

### 2 Enter Job Description

User pastes the target job description.

Optional fields:

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

Frontend communicates with backend APIs hosted on **Render**.

Base API URL

```
https://resume-analyzer-backend-uk1x.onrender.com
```

Example endpoints used by the frontend:

```
POST /api/auth/register
POST /api/auth/login
POST /api/resume/upload
POST /api/analyze
POST /api/full-analysis
POST /api/jd/analyze
GET  /api/user/profile
```

Backend handles:

* Resume parsing
* AI analysis
* Skill extraction
* Score calculation
* User authentication

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

#  License

This project is licensed under the MIT License.

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

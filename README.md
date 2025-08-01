# 📄 Resumind – Smart Resume Analyzer

**Resumind** is a web app that gives smart, AI-powered feedback on your resume to help you land your dream job.  
Upload your resume, describe the job you're applying for, and get ATS-friendly insights and suggestions — instantly.

---

## 🚀 Features

- ✅ Upload your resume (PDF)
- 🧠 AI-powered resume analysis
- 📸 PDF to image conversion
- 📊 ATS score and feedback
- 💾 Resume + feedback saved using Puter KV storage
- 🔐 Authentication with Puter Auth
- ⚡ Fast and responsive UI built with React + Zustand

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Zustand  
- **Storage & Auth:** [Puter.js](https://puter.com)  
- **AI:** Puter AI API  
- **PDF to Image:** pdfjs-dist  
- **Routing:** React Router DOM  

---

## 🛠️ Installation

Paste these commands in your terminal:


```git clone https://github.com/Maazthepal/ResumeAi.git``` <br>
```cd resumeA``` <br>
```npm install```<br>
```npm run dev```<br>

# 📁 Folder Structure

src/ <br>
├── components/   &nbsp;     #Reusable UI components <br>
├── lib/          &nbsp;     #Puter logic, PDF tools, utils <br>
├── Routes/       &nbsp;     #App pages: Upload, Resume, Auth <br>
├── public/       &nbsp;     #Images and static files <br>

# 🧪 How It Works

User uploads a PDF resume.

Resume is uploaded to Puter file system.

pdf2img.ts converts it to PNG using pdfjs-dist.

Both PDF and image are stored in KV.

AI is given a job title and description to tailor the analysis.

Feedback is parsed and rendered on the review page.

# 🧠 AI Prompt Strategy

The prompt is customized using:

✅ Job Title

🏢 Company Name

✍️ Job Description

This ensures personalized resume feedback using context-aware instructions.

## 🙋‍♂️ Author

Maaz Asif📬 LinkedIn • ✉️ https://www.linkedin.com/in/maaz-asif-7060b2279/

🛠️ Optional: Environment Variables

If using environment variables with Puter, define them in a .env file:

VITE_PUTER_API_KEY=your_key_here

# ℹ️ License

MIT — feel free to fork and modify.
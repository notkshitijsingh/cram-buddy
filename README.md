# Cram Buddy

Cram Buddy is a **Next.js & Flask-based web application** that processes PDFs and converts them into structured study materials, including **chapter selection, slides, and quizzes**. It allows users to upload PDFs, parses the content, and presents it in a more interactive and digestible format.

## 🚀 Features

- **Upload PDFs**: Users can upload PDFs via a Next.js multi-part Form API.
- **Automated Processing**: The Flask backend extracts text and structures it.
- **Chapter Selector**: Users can navigate through different sections of the document.
- **Slides Generator**: Converts content into slides for easy learning.
- **Quiz Creator**: Generates quizzes based on document content.
- **Interactive UI**: Next.js frontend provides an intuitive experience.

## 📜 System Architecture

1. **PDF Upload & Storage**
   - Users upload PDFs through the Next.js frontend.
   - The file is processed and stored on a local server.

2. **Processing in Flask Backend**
   - Flask receives the **blob-ified** PDF via a POST request.
   - The **PDF processor** extracts text and passes it to different agents:
     - **Chapters Agent**: Identifies different sections.
     - **Slides Agent**: Converts text into structured slides.
     - **Quiz Agent**: Generates relevant questions.

3. **Data Parsing & Presentation**
   - The processed JSON data is returned to the Next.js app.
   - The **Chapter Selector** organizes content.
   - Users can view slides or attempt quizzes on client-side pages.

## 🛠️ Tech Stack

### **Frontend (Next.js)**
- **React & Next.js**: Interactive UI & routing.
- **Tailwind CSS**: Styling framework.
- **Blob Storage & JSON Parsing**: Converts and stores structured content.

### **Backend (Flask)**
- **Flask**: API server for PDF processing.
- **PyMuPDF / PDFMiner**: Extracts text from PDFs.
- **Natural Language Processing (NLP)**: Generates quizzes dynamically.

## 📂 Folder Structure

```bash
cram-buddy/
│-- frontend/       # Next.js app
│   │-- pages/      # Client-side pages (Chapter Selector, Slides, Quiz)
│   │-- components/ # Reusable UI components
│-- backend/        # Flask API
│   │-- app.py      # Flask server & routes
│   │-- pdf_parser.py # Processes PDF content
│   │-- agents/     # AI modules for quizzes, slides, and chapters
│-- public/         # Static assets
│-- README.md       # Documentation
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/notkshitijsingh/cram-buddy.git
cd cram-buddy
```

### 2️⃣ Install Dependencies

#### **Frontend (Next.js)**
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:3000
```

#### **Backend (Flask)**
```bash
cd backend
pip install -r requirements.txt
python app.py  # Runs on http://localhost:5000
```

### 3️⃣ Upload & Process PDFs
- Open `http://localhost:3000` in your browser.
- Upload a PDF and select the processing mode (Chapters, Slides, Quiz).
- The results will be displayed on the UI.

## 🔥 Future Enhancements
- **AI Summarization**: Improve text summarization for slides.
- **Multilingual Support**: Process PDFs in different languages.
- **Cloud Storage**: Store PDFs securely using AWS S3/GCP.

## 🤝 Contribution
Want to contribute? Fork the repository and create a pull request!

## 📝 License
MIT License. See `LICENSE` for details.

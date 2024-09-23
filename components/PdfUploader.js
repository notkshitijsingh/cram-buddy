"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import styles from "../styles/PdfUploader.module.css";

export default function PdfUploader() {
    const [pdfFile, setPdfFile] = useState(null);
    const router = useRouter();

    const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file.type === "application/pdf") {
        setPdfFile(file);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    const goToSlides = () => {
        router.push("/slides");
    };

    const goToQuiz = () => {
        router.push("/quiz");
    };

    return (
        <div className={styles.uploader}>
            <label htmlFor="pdfUpload">Upload PDF:</label>
            <input
                type="file"
                id="pdfUpload"
                accept="application/pdf"
                onChange={handleFileUpload}
            />
            {pdfFile && <p>Uploaded: {pdfFile.name}</p>}
            {pdfFile &&
                <div className={styles.navigation}>
                    <button className={styles.navButton} onClick={goToSlides}>
                        ← Slides
                    </button>
                    <button className={styles.navButton} onClick={goToQuiz}>
                        Quiz →
                    </button>
                </div>
            }
        </div>
    );
}

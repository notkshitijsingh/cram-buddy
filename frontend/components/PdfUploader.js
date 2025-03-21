"use client";

import React, { useState } from "react";
import styles from "../styles/PdfUploader.module.css";
import { uploadPDF } from "@/app/api/sendRequest";
import { useRouter } from "next/navigation";

export default function PdfUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const router = useRouter();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("/api/uploadPdf", {
                method: "POST",
                body: formData,
            });
        
            if (response.ok) {
                const data = await response.json();
                setUploadStatus(`File uploaded successfully! Now processing...`);
                try {
                    const result = await uploadPDF();
                    console.log("API Response:", result);
        
                    // Save the result to @/utils/api_response.json via an API route
                    await fetch("/api/saveResult", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(result),
                    });
        
                    setUploadStatus(`File processing complete. Result saved.`);
                } catch (error) {
                    console.error("Error:", error);
                }
            } else {
                const error = await response.json();
                setUploadStatus(`Upload failed: ${error.error}`);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("An error occurred while uploading the file.");
        }        
    };
    
    const goToChapters = () => {
        router.push("/chapters");
    };

    return (
        <>
        <div className={styles.uploader}>
            <h2>Upload Your PDF</h2>
            <input type="file" accept="application/pdf" onChange={handleFileChange}/>
            <button className={styles.roundButton} onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
        {uploadStatus ? 
        <div className={styles.navigation}>
                <button className={styles.navButton} onClick={goToChapters}>
                    Chapters →
                </button>
        </div> : null}
        </>
    );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "../styles/PdfUploader.module.css";

export default function ChapterSelect({ chapters }) {
  const [submitDone, setSubmitDone] = useState(false);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const router = useRouter();

  const handleCheckboxChange = (chapterIndex) => {
    setSelectedChapters((prev) =>
      prev.includes(chapterIndex)
        ? prev.filter((index) => index !== chapterIndex)
        : [...prev, chapterIndex]
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/saveChapters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedChapters }),
      });
  
      if (response.ok) {
        console.log('Selected chapters saved successfully');
        setSubmitDone(true);
      } else {
        console.error('Error saving selected chapters');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const goToSlides = () => {
    router.push("/slides");
  };

  const goToQuiz = () => {
    router.push("/quiz");
  };
  

  return (
    <>
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Select Chapters</h1>
      <ul className="space-y-2 list-none">
        {chapters.map((chapter, index) => (
          <li key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`chapter-${index}`}
              value={chapter}
              checked={selectedChapters.includes(index)}
              onChange={() => handleCheckboxChange(index)}
              className="w-4 h-4"
            />
            <label htmlFor={`chapter-${index}`} className="text-sm">
              {chapter}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
    {submitDone ? 
        <div className={styles.navigation}>
                <button className={styles.navButton} onClick={goToQuiz}>
                    ← Quiz
                </button>
                <button className={styles.navButton} onClick={goToSlides}>
                    Slides →
                </button>
        </div> : null}
    </>
  );
}

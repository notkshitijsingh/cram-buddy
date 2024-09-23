"use client";

import { useState } from "react";
import styles from "../styles/Quiz.module.css";
import { useRouter } from "next/navigation";

export default function Quiz({ questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const router = useRouter();

    const handleAnswer = (option) => {
        if (option === "correct") {
            setScore(score + 1);
        }
        if (currentQuestion < Object.keys(questions).length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            alert(`Quiz finished! Your score is: ${score}`);
        }
    };

    const goToSlides = () => {
        router.push("/slides");
    };

    const goToHome = () => {
        router.push("/");
    };

    const questionData = questions[`ques${currentQuestion + 1}`];

    return (
        <div className={styles.quiz}>
        <h2>Question {currentQuestion + 1}</h2>
        {Object.keys(questionData).map((option, index) => (
            <button
            key={index}
            onClick={() => handleAnswer(option === "correct" ? "correct" : "incorrect")}
            >
            {questionData[option]}
            </button>
        ))}

        <div className={styles.navigation}>
            <button className={styles.navButton} onClick={goToHome}>
            ← Home
            </button>
            <button className={styles.navButton} onClick={goToSlides}>
            Slides →
            </button>
        </div>
        </div>
    );
}

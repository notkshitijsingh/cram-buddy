"use client";

import { useState, useEffect } from "react";
import styles from "../styles/Quiz.module.css";
import { useRouter } from "next/navigation";

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

export default function Quiz({ questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const questionData = questions[`ques${currentQuestion + 1}`];
        const options = [
            { key: "correct", text: questionData.correct },
            { key: "option2", text: questionData.option2 },
            { key: "option3", text: questionData.option3 },
            { key: "option4", text: questionData.option4 }
        ];
        setShuffledOptions(shuffle(options));
    }, [currentQuestion, questions]);

    const handleAnswer = (option) => {
        if (option === "correct") {
            setScore((prevScore) => prevScore + 1);
        }

        if (currentQuestion < Object.keys(questions).length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setTimeout(() => {
                alert(`Quiz finished! Your score is: ${score + (option === "correct" ? 1 : 0)}`);
            }, 100);
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
            <h3>Question {currentQuestion + 1}</h3>
            <h2>{questionData.question}</h2>

            {shuffledOptions.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswer(option.key)}
                >
                    {option.text}
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

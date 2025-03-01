"use client";

import { useState, useEffect } from "react";
import styles from "../styles/Quiz.module.css";
import { useRouter } from "next/navigation";

import selected from "@/utils/selected.json";

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

export default function Quiz({ questions }) {
    const selectedChapters = selected.selectedChapters;
    const [allQuestions, setAllQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const router = useRouter();

    // Flatten the chapter data into a single array of questions
    useEffect(() => {
        const flattenedQuestions = Object.values(questions).flat();
        setAllQuestions(flattenedQuestions);
    }, [questions]);

    useEffect(() => {
        if (allQuestions.length > 0) {
            const questionData = allQuestions[currentQuestion];
            const options = [
                { key: "correct", text: questionData.correct },
                { key: "option2", text: questionData.option2 },
                { key: "option3", text: questionData.option3 },
                { key: "option4", text: questionData.option4 }
            ];
            setShuffledOptions(shuffle(options));
        }
    }, [currentQuestion, allQuestions]);

    const handleAnswer = (option) => {
        if (option === "correct") {
            setScore((prevScore) => prevScore + 1);
        }

        if (currentQuestion < allQuestions.length - 1) {
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

    if (allQuestions.length === 0) {
        return <p>Loading questions...</p>;
    }

    const questionData = allQuestions[currentQuestion];

    return (
        <div className={styles.quiz}>
            <h3>Question {currentQuestion + 1} of {allQuestions.length}</h3>
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

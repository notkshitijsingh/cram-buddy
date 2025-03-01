"use client";

import { useState } from "react";
import styles from "../styles/SlideShow.module.css";
import { useRouter } from "next/navigation";

export default function SlideShow({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [theme, setTheme] = useState("light"); // Theme state
    const router = useRouter();

    const goToHome = () => {
        router.push("/");
    };

    const goToQuiz = () => {
        router.push("/quiz");
    };

    const nextSlide = () => {
        if (currentSlide < Object.keys(slides).length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const slideData = slides[`slide${currentSlide + 1}`];

    return (
        <div className={styles.slideshow}>
            {/* Apply theme only to slide */}
            <div className={`${styles.slide} ${styles[theme]}`}>
                <h2>{slideData.title}</h2>

                {slideData.subtitle && (
                    <h3>{slideData.subtitle}</h3>
                )}

                {slideData.body && (
                    <p>{slideData.body}</p>
                )}

                {slideData.image && (
                    <img src={slideData.image} alt="Slide image" />
                )}
            </div>

            <div className={styles.console}>
                <button className={styles.prevButton} onClick={prevSlide} disabled={currentSlide === 0}>
                    ← Previous
                </button>
                <button className={styles.nextButton} onClick={nextSlide} disabled={currentSlide === Object.keys(slides).length - 1}>
                    Next →
                </button>
            </div>

            <div className={styles.navigation}>
                <button className={styles.navButton} onClick={goToHome}>
                    ← Home
                </button>

                {/* Theme selector dropdown */}
                <select className={styles.themeSelector} value={theme} onChange={handleThemeChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="sunset">Sunset</option>
                    <option value="forest">Forest</option>
                </select>

                <button className={styles.navButton} onClick={goToQuiz}>
                    Quiz →
                </button>
            </div>
        </div>
    );
}

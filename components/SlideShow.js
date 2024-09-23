"use client";

import styles from "../styles/SlideShow.module.css";
import { useRouter } from "next/navigation";

export default function SlideShow({ slides }) {
    const router = useRouter();

    const goToHome = () => {
        router.push("/");
    };

    const goToQuiz = () => {
        router.push("/quiz");
    };

    return (
        <div className={styles.slideshow}>
            {Object.keys(slides).map((slide, index) => (
                <div key={index} className={styles.slide}>
                    <h2>{slides[slide].title}</h2>
                    <p>{slides[slide].body}</p>
                </div>
            ))}

        <div className={styles.navigation}>
            <button className={styles.navButton} onClick={goToHome}>
                ← Home
            </button>
            <button className={styles.navButton} onClick={goToQuiz}>
                Quiz →
            </button>
        </div>
        </div>
    );
}

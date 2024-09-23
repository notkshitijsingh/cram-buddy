import Quiz from '../../components/Quiz';
import quizData from '../../utils/quizData.json'; // quiz JSON data

export default function QuizPage() {
    return (
        <main>
            <h1>Quiz</h1>
            <Quiz questions={quizData} />
        </main>
    );
}

import Quiz from '../../components/Quiz';
import quizData from '@/utils/api_response.json'; // quiz JSON data

export default function QuizPage() {
    return (
        <main>
            <h1>Quiz</h1>
            <Quiz questions={quizData.quiz} />
        </main>
    );
}

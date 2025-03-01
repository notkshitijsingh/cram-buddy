import google.generativeai as genai
import json
import re
import yaml


class QuizAgent:
    def __init__(self, config_path="configs/default.yaml"):
        # Load configuration
        with open(config_path) as f:
            config = yaml.safe_load(f)
            self.api_key = config['api_keys']['gemini-2']
            self.model_name = config['model']['gemini']
            self.input_txt = config['input']['chapters']
            self.output_json = config['output']['quiz']
            self.num_questions = config.get('num_questions_per_chapter', 2)

        # Configure Gemini API
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(self.model_name)

    def parse_response_text(self, text):
        """Extracts question and options from response text if not in JSON format."""
        match = re.search(r'question":\s*"([^"]+)"', text)
        question = match.group(1) if match else "Question not found"

        correct_match = re.search(r'correct":\s*"([^"]+)"', text)
        correct = correct_match.group(1) if correct_match else "Correct answer not found"

        options = []
        for i in range(2, 5):
            option_match = re.search(fr'option{i}":\s*"([^"]+)"', text)
            options.append(option_match.group(1) if option_match else f"Option {i} not found")

        return {
            "question": question,
            "correct": correct,
            "option2": options[0],
            "option3": options[1],
            "option4": options[2],
        }

    def generate_quiz(self, chapter_text):
        """Generate quiz questions with 4 options, with Option A as the correct one."""
        quiz = []
        for _ in range(self.num_questions):
            prompt = (
                f"Generate a multiple-choice question with 4 options based on the following chapter text:\n\n{chapter_text}\n\n"
                f"Each question should be in JSON format with keys 'question', 'correct' (for the correct answer), and "
                f"'option2', 'option3', 'option4' (for similar but incorrect answers). Ensure 'correct' is the correct answer."
            )

            try:
                response = self.model.generate_content(prompt)
                response_text = response.text.strip()

                # Parse response safely
                try:
                    question_data = json.loads(response_text)
                except json.JSONDecodeError:
                    question_data = self.parse_response_text(response_text)

                quiz.append(question_data)
            except Exception as e:
                print(f"Error generating question: {e}")
                continue

        return quiz

    def generate_chapter_quizzes(self):
        # Load the text content from the input file
        with open(self.input_txt, "r") as file:
            text_content = file.read()

        # Split content into chapters based on markers (e.g., "## Chapter X: Title")
        chapters = text_content.split("Chapter ")[1:]
        chapter_texts = {
            f"Chapter {i + 1}": chap.split("\n", 1)[1].strip()
            for i, chap in enumerate(chapters)
        }

        # Generate quiz for each chapter
        quiz_data = {}
        for chapter, text in chapter_texts.items():
            print(f"Generating quiz for {chapter}...")
            quiz_data[chapter] = self.generate_quiz(text)

        # Save the quiz data to a JSON file
        with open(self.output_json, "w") as outfile:
            json.dump(quiz_data, outfile, indent=4)

        print(f"Quiz questions saved to {self.output_json}.")


# Example usage:
# agent = QuizAgent()
# agent.generate_chapter_quizzes()

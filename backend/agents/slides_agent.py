import google.generativeai as genai
import json
import yaml

class SlideGenerator:
    def __init__(self, config_path="configs/default.yaml"):
        """
        Initialize SlideGenerator by loading configuration from a YAML file.
        Configure the Google Gemini API using the provided API key and model.
        """
        with open(config_path) as f:
            config = yaml.safe_load(f)
            self.api_key = config['api_keys']['gemini-3']
            self.model_name = config['model']['gemini']
            self.input_file = config['input']['chapters']
            self.output_file = config['output']['slides']

        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(self.model_name)

    def parse_chapters(self):
        """
        Parse chapters from the input text file.
        Assumes chapters are marked with '## Chapter X: Title'.
        """
        with open(self.input_file, "r") as file:
            text_content = file.read()

        chapters = text_content.split("Chapter ")[1:]
        return {
            f"Chapter {i + 1}": chap.split("\n", 1)[1] if "\n" in chap else chap
            for i, chap in enumerate(chapters)
        }

    def generate_slide(self, chapter_title, chapter_text):
        """
        Generate a slide for a chapter using Google Gemini API.
        Returns a dictionary with title, subtitle, and body.
        """
        prompt = (
            f"Create a PowerPoint slide with the following details:\n"
            f"Title: {chapter_title}\n\n{chapter_text}\n\n"
            f"Format: Title, optional Subtitle, and key points as Body."
        )
        try:
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()

            # Parse response for title, subtitle, and body
            title = chapter_title
            body = response_text
            subtitle = None
            if "Subtitle:" in response_text:
                body, subtitle = response_text.split("Subtitle:", 1)
                subtitle = subtitle.strip()

            return {
                "title": title,
                "subtitle": subtitle if subtitle else "",
                "body": body.strip()
            }

        except ValueError as e:
            # Handle API errors with a fallback slide
            print(f"Error generating slide for '{chapter_title}': {e}")
            return {
                "title": chapter_title,
                "subtitle": "",
                "body": "Summary unavailable due to API restrictions."
            }

    def generate_slides(self):
        """
        Parse chapters, generate slides for each, and save them to a JSON file.
        """
        chapters = self.parse_chapters()
        slides = {}

        for i, (chapter_title, chapter_text) in enumerate(chapters.items(), start=1):
            slide_content = self.generate_slide(chapter_title.strip(), chapter_text.strip())
            slides[f"slide{i}"] = slide_content

        with open(self.output_file, "w") as outfile:
            json.dump(slides, outfile, indent=4)

        print(f"Slides saved to {self.output_file}.")

# Example usage:
# generator = SlideGenerator(config_path="configs/default.yaml")
# generator.generate_slides()

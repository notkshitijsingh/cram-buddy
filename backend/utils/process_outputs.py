import json
import yaml

def process_outputs_from_yaml(yaml_file):
    """
    Processes chapters, quiz, and slides based on file paths specified in a YAML file.

    Parameters:
        yaml_file (str): Path to the YAML configuration file.

    Returns:
        dict: A dictionary containing processed `chapters`, `quiz`, and `slides`.
    """
    # Load YAML configuration
    with open(yaml_file, 'r') as f:
        config = yaml.safe_load(f)

    # Extract file paths from YAML
    chapters_file = config["output"]["chapters"]
    quiz_file = config["output"]["quiz"]
    slides_file = config["output"]["slides"]

    # Process chapters
    chapters = []
    with open(chapters_file, 'r') as f:
        for line in f:
            # Match lines that start with "Chapter <number>: <title>"
            if line.startswith("Chapter"):
                parts = line.split(":", 1)  # Split at the first colon
                if len(parts) == 2:
                    chapter_number = parts[0].strip()  # "Chapter 6"
                    chapter_name = parts[1].strip()    # "Conclusion"
                    chapters.append(f"{chapter_number}: {chapter_name}")
    
    # Process quiz
    with open(quiz_file, 'r') as f:
        quiz = json.load(f)  # Assuming quiz.json is already in JSON format

    # Process slides
    with open(slides_file, 'r') as f:
        slides = json.load(f)  # Assuming slides.json is already in JSON format

    return {
        "chapters": chapters,
        "quiz": quiz,
        "slides": slides
    }
import google.generativeai as genai
import pdfplumber
import yaml

class ChaptersAgent:
  def __init__(self, config_path="configs/default.yaml"):
    with open(config_path) as f:
      config = yaml.safe_load(f)
      self.api_key = config['api_keys']['gemini-1']
      self.model_name = config['model']['gemini']
      self.output_file = config['output']['chapters']
      self.pdf_file = config['input']['pdf']
    """Configure Gemini AI with your API key and model name."""
    genai.configure(api_key=self.api_key)
    self.model = genai.GenerativeModel(self.model_name)
    
  def extract_text_from_pdf(self, pdf_path):
    """Extracts text from each page in a PDF and returns a combined text."""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text
  
  def split_text_into_chapters(self, text):
    """Splits the extracted text into chapters using Google Gemini."""
    prompt = f"Split the following text into multiple chapters with appropriate titles. Format each chapter as 'Chapter X: Title' followed by the text.\n\n{text}"
    response = self.model.generate_content(prompt)
    return response.text
  
  def generate_chapters(self):
    output_txt = self.output_file
    
    # Step 1: Extract text from the PDF
    pdf_text = self.extract_text_from_pdf(self.pdf_file)

    # Step 2: Use Google Gemini API to split text into chapters and title them
    chapters_text = self.split_text_into_chapters(pdf_text)

    # Step 3: Write the output to a text file
    with open(output_txt, "w") as file:
        file.write(chapters_text)

    print(f"Chapters with titles saved to {output_txt}.")
    
# Example usage:
# my_agent = ChaptersAgent()
# my_agent.generate_chapters()